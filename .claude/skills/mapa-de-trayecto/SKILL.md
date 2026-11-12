---
name: mapa-de-trayecto
description: Reglas del sistema visual "Mapa de trayecto". Úsala al construir o modificar cualquier pantalla, componente o estilo de la plataforma.
---

# Mapa de trayecto · reglas para construir interfaz

Antes de escribir una línea de interfaz, lee `docs/diseno.md`. Esta skill es su versión operativa. La base visual vigente es **Andén urbano** ([ADR 0029](../../../docs/decisiones/0029-base-visual-anden-urbano.md)): fondo blanco, cabecera azul marino y modo oscuro azul marino.

> **Decisión del líder (11-nov-2026): el indicador mantiene las 4 estaciones** («Explorar → Postular → Llegar → Avanzar»). El alcance vigente ([ADR 0031](../../../docs/decisiones/0031-producto-y-organizacion.md)) cubre «Explorar» y «Postular»; «Llegar» y «Avanzar» quedan como etapas futuras, sin pantallas por ahora, y se mostrarán como próximas (con texto, no solo color) hasta que exista el trabajo de permanencia. Los tokens `estacion-*` y el componente `IndicadorEstacion` no cambian.

## La idea en una frase
La trayectoria del estudiante es una línea de metro con 4 estaciones: **Explorar → Postular → Llegar → Avanzar**. Cada pantalla debe responder sin leer: ¿dónde estoy?, ¿qué hago aquí?, ¿qué viene después?

## Reglas duras (un PR que las rompe se rechaza)

1. **Solo tokens.** Colores, tamaños, espacios, radios y duraciones salen de `diseno/tokens.css`:
   - Bien: `color: var(--color-texto); padding: var(--espacio-4);`
   - Mal: `color: #333; padding: 15px;` o clases de Tailwind con colores propios (`text-blue-600`).
   - Bandas y bloques de apoyo: `--color-superficie-suave`. Cabecera azul: `--color-marca-fondo` con `--color-marca-texto` y `--color-marca-linea`.
2. **Colores de marca nunca como texto.** Para texto usa la variante `-texto`: `--color-linea-texto`, `--color-accion-texto`, `--color-alerta-texto`, `--color-exito-texto`.
3. **Una acción principal por pantalla**, en `--color-accion` con texto `--color-sobre-accion`. Las demás acciones son botones secundarios (borde `--color-linea`). Única excepción: la sección de beneficios de la portada con fondo coral (ADR 0029). Tren, rieles, estación activa, indicadores y subrayados usan `--color-linea` o tokens de marca, nunca el coral (decisión del líder, 11-nov-2026).
4. **Nunca solo color.** Estación = color + número + nombre. Estado = color + ícono + palabra.
5. **Objetivo táctil mínimo de 44 × 44 px** (`--objetivo-tactil`) en todo lo que se toca.
6. **Foco visible siempre:** `outline: var(--anillo-foco) solid var(--color-foco); outline-offset: 2px;`. Prohibido `outline: none` sin reemplazo.
7. **Tipografía:** `--fuente-texto` para todo; `--fuente-cifras` para puntajes, montos y porcentajes (alinean en columnas). Tamaños en `rem`, nunca `px`.
8. **Esquinas `--radio` (4 px).** Sin sombras salvo menús flotantes. Sin degradados.
9. **Íconos Lucide, siempre con texto.** Sin emojis.
10. **Movimiento** solo para explicar un cambio. Respuestas: `--mov-rapido` o `--mov-normal`. Aparición de contenido: `--mov-entrada` con `--mov-escalon` entre elementos; reemplazo de carga: `--mov-fundido` y `--mov-carga`. Curva: `--mov-curva`. Todo se anula con `prefers-reduced-motion`, y un token de duración nuevo debe agregarse en `tokens.json`, no en el componente.

## Patrones de la plataforma

- **Indicador de estación:** en el encabezado de cada página del estudiante. Línea horizontal de 4 px (`--borde-linea`) con 4 puntos; el actual relleno y con la etiqueta "Estás aquí".
- **Ficha de carrera:** nombre, institución y sede arriba; luego bloques de dato. Cada bloque = cifra grande en `--fuente-cifras` + qué mide + período + enlace "Fuente: SIES, 2025".
- **Sin dato:** el bloque muestra "Sin datos suficientes" en `--color-texto-suave` + una frase de por qué. Nunca un 0 ni un guion solo.
- **Comparador:** columnas por carrera (máx. 3), filas por indicador, cifras alineadas a la derecha, unidades en el encabezado.

## Antes de abrir el PR

- [ ] Probado a 360 px de ancho y a 200% de zoom.
- [ ] Recorrido completo solo con teclado.
- [ ] Probado en modo oscuro.
- [ ] `python3 scripts/tokens.py --check` pasa.
- [ ] Si agregaste algo visual nuevo, su justificación quedó en `docs/diseno.md` (o en un ADR si cambia tokens).
