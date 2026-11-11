import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import catalogo from '../../datos/beneficios/beneficios_2027.json' with { type: 'json' };
import calendario from '../../datos/beneficios/plazos_2027.json' with { type: 'json' };

test('los beneficios y plazos conservan sus datos y fuentes sin JavaScript', async ({ browser, baseURL }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const pagina = await contexto.newPage();
  await pagina.goto('/beneficios');
  const beneficios = pagina.getByRole('region', { name: 'Busca beneficios' });
  await expect(beneficios.getByRole('article')).toHaveCount(catalogo.beneficios.length);
  for (const beneficio of catalogo.beneficios) {
    const tarjeta = beneficios.getByRole('article').filter({ has: pagina.getByRole('heading', { name: beneficio.nombre_oficial, exact: true }) });
    await expect(tarjeta).toContainText(beneficio.explicacion_simple);
    await expect(tarjeta).toContainText(beneficio.cobertura.descripcion);
    await expect(tarjeta).toContainText(beneficio.postulacion);
    for (const requisito of beneficio.requisitos_simples) await expect(tarjeta).toContainText(requisito);
    await expect(tarjeta.getByRole('link', { name: beneficio.url, exact: false })).toHaveAttribute('href', beneficio.url);
    await expect(tarjeta.locator('time')).toHaveAttribute('datetime', beneficio.fecha_consulta);
  }
  const plazos = pagina.getByRole('region', { name: 'Calendario de plazos' });
  await expect(plazos.getByRole('listitem')).toHaveCount(calendario.plazos.length);
  for (const plazo of calendario.plazos) {
    const fila = plazos.getByRole('listitem').filter({ has: pagina.getByRole('heading', { name: plazo.proceso, exact: true }) });
    await expect(fila).toContainText(plazo.descripcion);
    await expect(fila.getByRole('link', { name: plazo.url, exact: false })).toHaveAttribute('href', plazo.url);
    await expect(fila.locator('time').last()).toHaveAttribute('datetime', plazo.fecha_consulta);
    if (plazo.inicio && plazo.termino) {
      await expect(fila.locator('time').nth(0)).toHaveAttribute('datetime', plazo.inicio);
      await expect(fila.locator('time').nth(1)).toHaveAttribute('datetime', plazo.termino);
    } else {
      await expect(fila).toContainText('Fecha pendiente');
      await expect(fila).toContainText(plazo.motivo_sin_fecha!);
    }
  }
  await pagina.getByRole('link', { name: 'Ver calendario', exact: true }).click();
  await expect(pagina.getByRole('heading', { name: 'Calendario de plazos', exact: true })).toBeInViewport();
  await contexto.close();
});

test('la búsqueda actualiza el catálogo y mantiene disponible el calendario', async ({ page }) => {
  await page.goto('/beneficios');
  const buscador = page.getByRole('searchbox');
  const beneficios = page.getByRole('region', { name: 'Busca beneficios' });
  await buscador.fill('  gratuidad  ');
  await expect(page.getByRole('status')).toHaveText('1 beneficio encontrado.');
  await expect(beneficios.getByRole('article')).toHaveCount(1);
  await expect(beneficios.getByRole('heading', { name: 'Gratuidad', exact: true })).toBeVisible();
  await buscador.fill('busqueda sin coincidencias');
  await expect(page.getByRole('status')).toHaveText('0 beneficios encontrados.');
  await expect(beneficios.getByRole('article')).toHaveCount(0);
  await expect(beneficios.getByText('No encontramos beneficios con esa búsqueda. Prueba con otro nombre.')).toBeVisible();
  await expect(page.getByRole('region', { name: 'Calendario de plazos' }).getByRole('listitem')).toHaveCount(calendario.plazos.length);
  await buscador.fill('');
  await expect(beneficios.getByRole('article')).toHaveCount(catalogo.beneficios.length);
});

test('los accesos al calendario y al catálogo trasladan el foco de teclado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/beneficios');
  const calendario = page.getByRole('link', { name: 'Ver calendario', exact: true });
  await calendario.focus();
  await calendario.press('Enter');
  const titulo = page.getByRole('heading', { name: 'Calendario de plazos', exact: true });
  await expect(titulo).toBeFocused();
  await expect(titulo).toBeInViewport();
  expect(await titulo.evaluate(elemento => getComputedStyle(elemento).outlineStyle)).toBe('solid');
  const catalogo = page.getByRole('link', { name: 'Buscar beneficios', exact: true });
  await catalogo.focus();
  await catalogo.press('Enter');
  await expect(page.getByRole('heading', { name: 'Busca beneficios', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('searchbox')).toBeFocused();
});

for (const tema of ['light', 'dark'] as const) {
  test(`beneficios y calendario cumplen accesibilidad en tema ${tema}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: tema, reducedMotion: 'reduce' });
    await page.goto('/beneficios');
    for (const ancho of [360, 375, 768, 1280]) {
      await page.setViewportSize({ width: ancho, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    const informe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(informe.violations).toEqual([]);
    await page.setViewportSize({ width: 375, height: 900 });
    await page.locator('html').evaluate(elemento => { elemento.style.fontSize = '200%'; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
