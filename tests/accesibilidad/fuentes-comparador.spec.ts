import { expect, test } from '@playwright/test';

for (const tema of ['light', 'dark'] as const) {
  test(`las fuentes del comparador conservan el subrayado en tema ${tema}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: tema });
    await page.goto('/comparador?carreras=I70S1C41J1V1,I87S1C49J1V3,I72S1C75J1V1');
    const fuentes = page.getByRole('region', { name: 'Datos comparados' }).locator('a[href^="https://"]');
    expect(await fuentes.count()).toBeGreaterThan(0);
    for (const fuente of await fuentes.all()) {
      await expect(fuente).toHaveCSS('text-decoration-line', 'underline');
    }
  });
}
