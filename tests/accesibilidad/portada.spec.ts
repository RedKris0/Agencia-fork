import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const tema of ['light', 'dark'] as const) {
  test(`la sección coral visible conserva contraste en tema ${tema}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: tema, reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const ancho of [375, 1280]) {
      await page.setViewportSize({ width: ancho, height: 960 });
      await page.locator('#beneficios').scrollIntoViewIfNeeded();
      await expect(page.locator('#beneficios [data-reveal][data-pendiente]')).toHaveCount(0);
      const informe = await new AxeBuilder({ page }).include('#beneficios')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(informe.violations, `${tema}, ${ancho} px`).toEqual([]);
    }
  });
}

test("las estaciones desplazan suavemente y el contenido vuelve a aparecer al regresar", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect.poll(() => page.locator("html").evaluate(elemento => getComputedStyle(elemento).scrollBehavior)).toBe("smooth");
  const contenidoComparar = page.locator("#comparar [data-reveal]").first();
  const estaciones = page.getByRole("navigation", { name: "Estaciones de esta página" });
  const posiciones = page.evaluate(() => new Promise<number[]>(resolver => {
    const recorrido: number[] = [];
    const registrar = () => recorrido.push(scrollY);
    addEventListener("scroll", registrar);
    setTimeout(() => {
      removeEventListener("scroll", registrar);
      resolver(recorrido);
    }, 1800);
  }));
  await estaciones.getByRole("link", { name: "Comparar", exact: true }).click();
  expect(new Set(await posiciones).size).toBeGreaterThan(2);
  await expect(contenidoComparar).not.toHaveAttribute("data-pendiente");
  await estaciones.getByRole("link", { name: "Fuentes", exact: true }).click();
  await expect(contenidoComparar).toHaveAttribute("data-pendiente", "");
  await estaciones.getByRole("link", { name: "Comparar", exact: true }).click();
  await expect(contenidoComparar).not.toHaveAttribute("data-pendiente");
  await estaciones.getByRole("link", { name: "Explorar", exact: true }).click();
  const fuentes = page.locator("#fuentes [data-reveal]").last();
  await expect(fuentes).toHaveAttribute("data-pendiente", "");
  await page.locator("#fuentes a").first().focus();
  await expect(fuentes).not.toHaveAttribute("data-pendiente");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator("html").evaluate(elemento => getComputedStyle(elemento).scrollBehavior)).toBe("auto");
  await expect(page.locator("[data-pendiente]")).toHaveCount(0);
});

test("la portada ofrece cuatro diapositivas con destinos reales y controles de teclado", async ({ page }) => {
  await page.goto("/");
  const carrusel = page.getByRole("region", { name: "Encuentra tu próximo paso" });
  await expect(carrusel).toBeVisible();
  await expect(carrusel.getByRole("group", { name: "1 de 4" })).toBeVisible();
  await expect(carrusel.getByRole("link", { name: "Encontrar una carrera" })).toHaveAttribute("href", "/carreras");
  await carrusel.getByRole("button", { name: "Diapositiva siguiente" }).click();
  await expect(carrusel.getByRole("button", { name: "Ir a diapositiva 2" })).toHaveAttribute("aria-pressed", "true");
  await expect(carrusel.getByRole("link", { name: "Comparar carreras" })).toHaveAttribute("href", "/comparador");
  await carrusel.getByRole("button", { name: "Diapositiva siguiente" }).press("End");
  await expect(carrusel.getByRole("button", { name: "Ir a diapositiva 4" })).toHaveAttribute("aria-pressed", "true");
  await expect(carrusel.getByRole("link", { name: "Consultar las fuentes" })).toHaveAttribute("href", "#fuentes");
  await carrusel.getByRole("button", { name: "Diapositiva anterior" }).press("Home");
  await expect(carrusel.getByRole("button", { name: "Ir a diapositiva 1" })).toHaveAttribute("aria-pressed", "true");
  const enlace = carrusel.getByRole("link", { name: "Encontrar una carrera" });
  await enlace.focus();
  await enlace.press("ArrowRight");
  await expect(enlace).toBeFocused();
  await expect(carrusel.getByRole("button", { name: "Ir a diapositiva 1" })).toHaveAttribute("aria-pressed", "true");
  const pista = carrusel.getByLabel("Diapositivas. Usa las flechas para avanzar o retroceder.", { exact: true });
  await pista.focus();
  const foco = await pista.evaluate(elemento => ({ estilo: getComputedStyle(elemento).outlineStyle, desplazamiento: parseFloat(getComputedStyle(elemento).outlineOffset) }));
  expect(foco.estilo).toBe("solid");
  expect(foco.desplazamiento).toBeLessThan(0);
});

test("el tren acompaña el recorrido y respeta la reducción de movimiento", async ({ page }) => {
  await page.goto("/");
  const tren = page.locator("[data-tren]");
  await expect(tren).toHaveAttribute("style", /translate3d/);
  const inicio = await tren.getAttribute("style");
  await page.getByRole("navigation", { name: "Estaciones de esta página" }).getByRole("link", { name: "Beneficios" }).click();
  await expect(page.getByRole("link", { name: "Beneficios", exact: true })).toHaveAttribute("aria-current", "location");
  await expect(tren).not.toHaveAttribute("style", inicio!);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(async () => page.locator("[data-pendiente]").count()).toBe(0);
  const posicion = await tren.getAttribute("style");
  await page.mouse.wheel(0, 20);
  await page.waitForTimeout(100);
  await expect(tren).toHaveAttribute("style", posicion!);
});

test("todo el contenido está disponible sin JavaScript", async ({ browser }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const pagina = await contexto.newPage();
  await pagina.goto(test.info().project.use.baseURL!);
  await expect(pagina.locator("main section")).toHaveCount(4);
  await expect(pagina.locator("[data-pendiente]")).toHaveCount(0);
  await expect(pagina.locator("[aria-roledescription=diapositiva]")).toHaveCount(4);
  await expect(pagina.getByRole("heading", { name: "Tu camino a la educación superior" })).toBeVisible();
  expect(await pagina.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await contexto.close();
});

test.describe("carrusel táctil", () => {
  test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  test("se desliza con un gesto y conserva el ancho móvil", async ({ page }) => {
    await page.goto("/");
    const pista = page.getByLabel("Diapositivas. Usa las flechas para avanzar o retroceder.", { exact: true });
    await pista.scrollIntoViewIfNeeded();
    const caja = (await pista.boundingBox())!;
    const sesion = await page.context().newCDPSession(page);
    const y = caja.y + caja.height / 2;
    await sesion.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: caja.x + caja.width * 0.85, y }] });
    for (let paso = 1; paso <= 6; paso++) {
      await sesion.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: caja.x + caja.width * (0.85 - paso * 0.11), y }] });
      await page.waitForTimeout(30);
    }
    await sesion.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(page.getByRole("button", { name: "Ir a diapositiva 2" })).toHaveAttribute("aria-pressed", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
});
