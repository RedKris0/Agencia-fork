# 0029 — Base visual Andén urbano

Fecha: 2026-11-11 · Estado: aceptada por el líder ([@rafajaque](https://github.com/rafajaque)) el 2026-11-11

## Contexto

El portal necesita una identidad visual que haga legible el recorrido del
estudiante antes, durante y después de la postulación. Esta decisión fija la
paleta, la tipografía y los tokens temporales compartidos. Las pantallas se
adaptan por entregas posteriores.

## Opciones evaluadas

| Alternativa | A favor | Consideración |
|---|---|---|
| Línea abierta | Recorrido sobre fondo claro y lectura reposada | El recorrido tiene menor presencia visual |
| Andén urbano | Superficies azules, encuentros entre estaciones y coral para la acción | Requiere controlar contraste y movimiento |

## Decisión

Se adopta Andén urbano. El azul marino, el coral y las superficies claras
provienen de los colores de marca existentes. La tipografía es Atkinson
Hyperlegible Next para lectura y Atkinson Hyperlegible Mono para cifras.

Los tokens de movimiento son:

| Token | Valor | Uso |
|---|---:|---|
| rápido | 150 ms | Respuesta de botones |
| normal | 220 ms | Cambios breves de estado |
| entrada | 850 ms | Aparición inicial y al recorrer |
| escalón | 90 ms | Escalonado corto de elementos |
| fundido | 180 ms | Reemplazo visual de carga |
| carga | 1600 ms | Ciclo de espera real |
| curva | `cubic-bezier(0.22, 1, 0.36, 1)` | Desaceleración común |

`prefers-reduced-motion: reduce` resuelve a `0ms` las seis duraciones y
demoras. La curva se conserva porque no es una duración.

## Justificación

- La identidad usa los colores y archivos de marca existentes.
- La jerarquía, los espacios y las superficies separan etapas y estados.
- Los pares de color se verifican con WCAG 2.2 AA mediante `tokens.py`.
- Las fuentes locales evitan una descarga adicional y mantienen la legibilidad.

## Consecuencias

Los tokens compartidos quedan disponibles para las siguientes entregas. Al
cambiar los colores globales, las pantallas que todavía no se rediseñaron pasan
de crema a blanco. Las entregas posteriores deben conservar las fuentes,
fechas y enlaces de los datos oficiales.

## Comprobación de la sección coral tras la revisión

Se inspeccionaron los estilos calculados en Edge con contenido visible, temas
claro y oscuro y anchos de 375 y 1280 px, el 11 de noviembre de 2026. Las
cifras se calculan con la luminancia relativa de WCAG.

| Texto | Tamaño teléfono / computador | Mínimo | Claro | Oscuro |
|---|---:|---:|---:|---:|
| Tu próxima postulación | 25,01 / 39,06 px, negrita | 3 | 5,90 | 6,26 |
| Beneficios y plazos | 14 / 14 px, negrita | 4,5 | 5,90 | 6,26 |
| Cada oportunidad tiene su momento | 31,25 / 39,06 px, negrita | 3 | 5,90 | 6,26 |
| Descripción de beneficios | 16 / 16 px, normal | 4,5 | 5,90 | 6,26 |
| Revisar beneficios, sobre azul | 16 / 16 px, negrita | 4,5 | 12,82 | 12,82 |
| Ver el calendario de plazos | 16 / 16 px, negrita | 4,5 | 5,90 | 6,26 |
| Fecha del catálogo, incluido `time` | 14 / 14 px, normal | 4,5 | 5,90 | 6,26 |

El fondo coral conserva `--color-accion` y el texto usa
`--color-sobre-accion`. Ese par está declarado en `contraste_requerido` con
mínimo 4,5. La acción azul conserva texto blanco y alcanza 12,82:1. La prueba
de portada desplaza la sección a la vista antes de ejecutar axe.
