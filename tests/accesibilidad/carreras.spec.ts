import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('el formulario GET conserva búsqueda y filtros sin JavaScript', async ({ browser, baseURL }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false });
  const pagina = await contexto.newPage();
  await pagina.goto(`${baseURL}/carreras`);
  const formulario = pagina.getByRole('form', { name: 'Buscar y filtrar carreras' });
  await expect(formulario).toHaveAttribute('method', 'get');
  await formulario.getByRole('textbox').fill('Enfermería');
  await formulario.locator('summary').click();
  const region = formulario.locator('input[name="region"]').first();
  const tipo = formulario.locator('input[name="tipo"]').first();
  const jornada = formulario.locator('input[name="jornada"]').first();
  const valores = await Promise.all([region, tipo, jornada].map(casilla => casilla.getAttribute('value')));
  await region.check();
  await tipo.check();
  await jornada.check();
  await formulario.getByRole('button', { name: 'Aplicar filtros' }).click();
  await expect(pagina).toHaveURL(/q=/);
  const parametros = new URL(pagina.url()).searchParams;
  expect(parametros.get('q')).toBe('Enfermería');
  expect(parametros.get('region')).toBe(valores[0]);
  expect(parametros.get('tipo')).toBe(valores[1]);
  expect(parametros.get('jornada')).toBe(valores[2]);
  await expect(pagina.getByRole('textbox')).toHaveValue('Enfermería');
  await pagina.locator('form summary').click();
  await expect(pagina.locator('input[name="region"]:checked')).toHaveCount(1);
  await expect(pagina.locator('input[name="tipo"]:checked')).toHaveCount(1);
  await expect(pagina.locator('input[name="jornada"]:checked')).toHaveCount(1);
  await pagina.getByRole('link', { name: 'Quitar filtros' }).click();
  await expect(pagina).toHaveURL(`${baseURL}/carreras`);
  await contexto.close();
});

test('los filtros se abren con teclado y el foco es visible', async ({ page }) => {
  await page.goto('/carreras');
  const resumen = page.locator('form summary');
  await resumen.focus();
  await expect(resumen).toBeFocused();
  expect(await resumen.evaluate(elemento => getComputedStyle(elemento).outlineStyle)).toBe('solid');
  await resumen.press('Enter');
  await expect(page.locator('form details')).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  await expect(page.locator('input[name="region"]').first()).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.locator('input[name="region"]').first()).toBeChecked();
});

test('la espera de la búsqueda muestra tarjetas y respeta movimiento reducido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/carreras');
  await page.waitForLoadState('networkidle');
  await page.getByRole('textbox').fill('Enfermería');
  // Un destino aparte permite inspeccionar la espera sin que Playwright espere la navegación principal.
  await page.locator('form').evaluate(formulario => {
    const destino = document.createElement('iframe');
    destino.name = 'busqueda-de-prueba';
    destino.hidden = true;
    document.body.append(destino);
    formulario.setAttribute('target', destino.name);
  });
  await page.getByRole('button', { name: 'Buscar', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Buscando carreras…');
  const tarjetas = page.locator('[data-cargando] > div[aria-hidden="true"] > div');
  await expect(tarjetas).toHaveCount(3);
  await expect(tarjetas.first()).toBeVisible();
  expect(await tarjetas.first().locator('span').first().evaluate(elemento => getComputedStyle(elemento).animationName)).toBe('none');
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
  await expect(page.locator('[data-cargando]')).toHaveCount(0);
});

for (const tema of ['light', 'dark'] as const) {
  test(`el explorador se adapta y cumple accesibilidad en tema ${tema}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: tema, reducedMotion: 'reduce' });
    await page.goto('/carreras');
    for (const ancho of [360, 375, 768, 1280]) {
      await page.setViewportSize({ width: ancho, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.getByRole('heading', { name: 'Explora carreras', exact: true })).toBeVisible();
    }
    await page.locator('form summary').click();
    const informe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(informe.violations).toEqual([]);
    if (await page.locator('main').getByRole('alert').count()) {
      await expect(page.getByRole('heading', { name: 'Resultados', exact: true })).toHaveCount(0);
      await expect(page.getByText('No encontramos carreras con esos filtros', { exact: true })).toHaveCount(0);
    } else {
      await expect(page.getByRole('heading', { name: 'Resultados', exact: true })).toBeVisible();
    }
  });
}
