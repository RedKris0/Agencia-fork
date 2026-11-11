import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import calendario from '../../datos/beneficios/plazos_2027.json' with { type: 'json' };
import { hoyEnChile, primerPeriodoCerrado } from '../../app/(portal)/beneficios/beneficios';

test('la portada conserva el acceso al calendario y el aviso vigente del FUAS', async ({ page }) => {
  await page.goto('/');
  const acceso = page.getByRole('link', { name: 'Revisar mis plazos de becas y gratuidad (FUAS)', exact: true });
  await expect(acceso).toHaveAttribute('href', '/beneficios#calendario-plazos');
  const cerrado = primerPeriodoCerrado(calendario.plazos, hoyEnChile());
  const aviso = page.getByText('el primer período de postulación ya cerró', { exact: false });
  if (cerrado) {
    await expect(aviso).toBeVisible();
    await expect(page.locator(`time[datetime="${cerrado.cierre}"]`)).toBeVisible();
    await expect(page.locator(`a[href="${cerrado.url}"]`)).toBeVisible();
  } else {
    await expect(aviso).toHaveCount(0);
  }
  await acceso.click();
  await expect(page.getByRole('heading', { name: 'Calendario de plazos', exact: true })).toBeInViewport();
});

const paginas = [
  { ruta: '/carreras', titulo: 'Explora carreras', parada: 'Carreras' },
  { ruta: '/comparador', titulo: 'Compara carreras', parada: 'Comparador' },
  { ruta: '/beneficios', titulo: 'Beneficios y plazos 2027', parada: 'Beneficios' },
];

test('la navegación conserva el logo, el tren y la estación actual entre páginas', async ({ page }) => {
  await page.goto('/');
  for (const pagina of paginas) {
    await page.getByRole('navigation', { name: 'Navegación principal', exact: true }).getByRole('link', { name: pagina.parada === 'Beneficios' ? 'Beneficios y plazos' : pagina.parada, exact: true }).click();
    await expect(page).toHaveURL(pagina.ruta);
    await expect(page.getByRole('heading', { name: pagina.titulo, exact: true })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Agencia de Enlace & Seguimiento Estudiantil', exact: true })).toBeVisible();
    const recorrido = page.getByRole('navigation', { name: 'Recorrido del portal' });
    await expect(recorrido.locator('[aria-current="page"]')).toHaveText(pagina.parada);
    await expect(recorrido.locator('[aria-current="page"] svg')).toHaveCount(1);
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.locator('[data-cabecera-portal] summary').click();
  await page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: 'Carreras', exact: true }).click();
  await expect(page).toHaveURL('/carreras');
  await expect(page.locator('[data-cabecera-portal] details')).not.toHaveAttribute('open');
});

test('las apariciones son más pausadas y las tarjetas vuelven a aparecer al recorrerlas', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  expect(await page.locator('#comparar [data-reveal]').first().evaluate(elemento => parseFloat(getComputedStyle(elemento).transitionDuration))).toBe(0.85);
  await page.goto('/beneficios');
  const tarjetas = page.getByRole('article');
  const ultima = tarjetas.last();
  await expect(ultima).toHaveAttribute('data-pendiente', '');
  await ultima.scrollIntoViewIfNeeded();
  await expect(ultima).not.toHaveAttribute('data-pendiente');
  expect(await ultima.evaluate(elemento => parseFloat(getComputedStyle(elemento).transitionDuration))).toBe(0.85);
  await page.getByRole('link', { name: 'Buscar beneficios', exact: true }).focus();
  await page.getByRole('link', { name: 'Buscar beneficios', exact: true }).press('Enter');
  await expect(ultima).toHaveAttribute('data-pendiente', '');
  await ultima.locator('a').first().focus();
  await expect(ultima).not.toHaveAttribute('data-pendiente');
  expect(await ultima.evaluate(elemento => getComputedStyle(elemento).opacity)).toBe('1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('[data-pendiente]')).toHaveCount(0);
});

test('las tarjetas que vuelven tras filtrar también reciben la mejora de movimiento', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/beneficios');
  await page.getByRole('searchbox').fill('gratuidad');
  await expect(page.getByRole('article')).toHaveCount(1);
  await page.getByRole('searchbox').fill('');
  await expect(page.getByRole('article')).toHaveCount(16);
  await expect(page.getByRole('article').last()).toHaveAttribute('data-pendiente', '');
  await page.getByRole('article').last().scrollIntoViewIfNeeded();
  await expect(page.getByRole('article').last()).not.toHaveAttribute('data-pendiente');
});

test('la identidad y el contenido de las páginas interiores funcionan sin JavaScript', async ({ browser, baseURL }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 375, height: 900 } });
  const pagina = await contexto.newPage();
  for (const destino of paginas) {
    await pagina.goto(destino.ruta);
    await expect(pagina.getByRole('heading', { name: destino.titulo, exact: true })).toBeVisible();
    await expect(pagina.getByRole('navigation', { name: 'Recorrido del portal' })).toBeVisible();
    await expect(pagina.locator('[data-pendiente]')).toHaveCount(0);
    expect(await pagina.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await pagina.getByRole('link', { name: 'Ir al contenido', exact: true }).focus();
    await pagina.getByRole('link', { name: 'Ir al contenido', exact: true }).press('Enter');
    await expect(pagina.locator('main')).toBeFocused();
    await pagina.keyboard.press('Tab');
    await expect(pagina.locator('main input:not([type="hidden"])').first()).toBeFocused();
  }
  await contexto.close();
});

test('las cabeceras conservan el ancho disponible con texto ampliado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const destino of paginas) {
    await page.goto(destino.ruta);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('html').evaluate(elemento => { elemento.style.fontSize = '200%'; });
    for (const ancho of [360, 375, 768, 1280]) {
      await page.setViewportSize({ width: ancho, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${destino.ruta} a ${ancho} px con texto ampliado`).toBe(true);
    }
    await page.locator('html').evaluate(elemento => { elemento.style.fontSize = ''; });
  }
});

test('la ficha que se abre desde una tarjeta conserva la identidad y sus indicadores', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/carreras');
  test.skip(await page.locator('main').getByRole('alert').count() > 0, 'La ficha con contenido requiere una fuente de datos disponible.');
  const primera = page.getByRole('article').first();
  const nombre = await primera.getByRole('heading', { level: 3 }).innerText();
  await primera.getByRole('link', { name: 'Ver ficha de carrera', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(nombre);
  await expect(page.getByRole('navigation', { name: 'Recorrido del portal' }).locator('[aria-current="page"]')).toHaveText('Carreras');
  await expect(page.getByRole('article')).toHaveCount(9);
  for (const tema of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: tema });
    const informe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(informe.violations).toEqual([]);
  }
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.locator('html').evaluate(elemento => { elemento.style.fontSize = '200%'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
