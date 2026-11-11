import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const rutaConTres = '/comparador?carreras=I70S1C41J1V1,I87S1C49J1V3,I72S1C75J1V1';

async function abrirComparacion(pagina: Page) {
  await pagina.goto(rutaConTres);
  test.skip(await pagina.locator('main').getByRole('alert').count() > 0, 'La comparación con contenido requiere una fuente de datos disponible.');
  await expect(pagina.getByRole('link', { name: 'Quitar carrera', exact: true })).toHaveCount(3);
}

test('la búsqueda GET funciona sin JavaScript', async ({ browser, baseURL }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false });
  const pagina = await contexto.newPage();
  await pagina.goto(`${baseURL}/comparador`);
  const formulario = pagina.locator('form');
  await expect(formulario).toHaveAttribute('method', 'get');
  await formulario.getByRole('textbox').fill('Enfermería');
  await formulario.getByRole('button', { name: 'Buscar', exact: true }).click();
  expect(new URL(pagina.url()).searchParams.get('q')).toBe('Enfermería');
  await expect(pagina.getByRole('textbox')).toHaveValue('Enfermería');
  if (await pagina.locator('main').getByRole('alert').count()) {
    await expect(pagina.getByText('No encontramos carreras', { exact: false })).toHaveCount(0);
  }
  await contexto.close();
});

test('quitar una carrera conserva las otras dos sin JavaScript', async ({ browser, baseURL }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const pagina = await contexto.newPage();
  await abrirComparacion(pagina);
  const quitar = pagina.getByRole('link', { name: 'Quitar carrera', exact: true });
  const destino = await quitar.first().getAttribute('href');
  await quitar.first().click();
  await expect(pagina).toHaveURL(`${baseURL}${destino}`);
  await expect(quitar).toHaveCount(2);
  await expect(pagina.locator('input[name="carreras"]')).toHaveValue('I87S1C49J1V3,I72S1C75J1V1');
  await contexto.close();
});

test('agregar una carrera desde la búsqueda funciona sin JavaScript', async ({ browser, baseURL }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const pagina = await contexto.newPage();
  await pagina.goto('/comparador?q=Enfermer%C3%ADa');
  test.skip(await pagina.locator('main').getByRole('alert').count() > 0, 'Agregar una carrera requiere una fuente de datos disponible.');
  const agregar = pagina.getByRole('list', { name: 'Resultados para agregar' }).getByRole('link').first();
  const destino = await agregar.getAttribute('href');
  await agregar.click();
  await expect(pagina).toHaveURL(`${baseURL}${destino}`);
  await expect(pagina.getByRole('link', { name: 'Quitar carrera', exact: true })).toHaveCount(1);
  expect(new URL(pagina.url()).searchParams.get('carreras')).toBeTruthy();
  await contexto.close();
});

test('el teléfono permite cambiar entre las tres opciones con teclado', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await abrirComparacion(page);
  const opciones = page.getByRole('group', { name: 'En teléfono, elige dos carreras para ver lado a lado' }).getByRole('checkbox');
  await expect(opciones.nth(0)).toBeChecked();
  await expect(opciones.nth(1)).toBeChecked();
  await expect(opciones.nth(2)).toBeDisabled();
  await opciones.nth(0).focus();
  await opciones.nth(0).press('Space');
  await expect(opciones.nth(2)).toBeEnabled();
  await opciones.nth(2).focus();
  expect(await opciones.nth(2).evaluate(elemento => getComputedStyle(elemento).outlineStyle)).toBe('solid');
  await opciones.nth(2).press('Space');
  const tabla = page.getByRole('region', { name: 'Datos comparados' });
  await expect(tabla.getByText('Psicología', { exact: true })).toBeVisible();
  await expect(tabla.getByText('Enfermería', { exact: true })).toBeHidden();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(tabla.getByText('Enfermería', { exact: true })).toBeVisible();
  await page.setViewportSize({ width: 375, height: 900 });
  await page.locator('html').evaluate(elemento => { elemento.style.fontSize = '200%'; });
  const fuente = tabla.getByRole('link').first();
  await fuente.focus();
  await expect.poll(() => fuente.evaluate(enlace => {
    const caja = enlace.getBoundingClientRect();
    return caja.top >= 0 && caja.bottom <= innerHeight;
  })).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

for (const tema of ['light', 'dark'] as const) {
  test(`las columnas y los datos son accesibles en tema ${tema}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: tema, reducedMotion: 'reduce' });
    await abrirComparacion(page);
    for (const ancho of [360, 375, 768, 1024, 1280]) {
      await page.setViewportSize({ width: ancho, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    for (const ancho of [375, 1280]) {
      await page.setViewportSize({ width: ancho, height: 900 });
      const informe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(informe.violations).toEqual([]);
    }
    await expect(page.getByRole('region', { name: 'Datos comparados' }).getByRole('heading', { level: 2 })).toHaveCount(6);
    await expect(page.getByText('Sin datos suficientes', { exact: true }).first()).toBeVisible();
  });
}
