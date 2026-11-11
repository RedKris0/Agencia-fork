# 0024 — El Puntaje Ranking se ingresa manualmente en el simulador

Fecha: 2026-11-07 · Estado: aceptada (2026-11-09, por el líder, tras [revisión legal](../revision-legal-adr-pendientes.md))

> Renumerado el 2026-11-10: se publicó como 0018, número que ya usaba el ADR de planificación de oferta.

## Contexto

El simulador de puntaje necesita el Puntaje Ranking de cada estudiante. El DEMRE
lo calcula a partir del promedio de notas de cada nivel de enseñanza media
comparado con una población de referencia (los estudiantes del mismo colegio en
las tres generaciones anteriores). Según la [página oficial del DEMRE sobre el
Puntaje Ranking](https://demre.cl/paes/factores-seleccion/puntaje-ranking)
(consultada el 2026-11-07), la fórmula es:

- Si el promedio del estudiante (NEM) es menor o igual al promedio de la población (PROM), su ranking de ese nivel es igual a su NEM.
- Si el NEM es mayor o igual al máximo de la población (MAX), el ranking de ese nivel es 1000.
- En los demás casos: `R = PROM + (NEM − PROM) · (1000 − PROM) / (MAX − PROM)`.
- El Puntaje Ranking final es `(R1 + R2 + R3 + R4) / 4`.

Calcularlo en la aplicación exige tres cosas que no tenemos:

1. Los valores PROM y MAX de la población de referencia de cada colegio. El DEMRE los calcula, pero no los publica por colegio en una fuente que podamos citar ni descargar.
2. Una implementación de la fórmula que coincida con el documento oficial. La que se escribió en el PR 61 usa otra expresión en el tramo intermedio y no reproduce el ejemplo del documento.
3. Una respuesta clara sobre qué fórmula aplica a la Admisión 2027. La página oficial describe la fórmula vigente y anuncia un nuevo ranking, que las noticias ubican en el Proceso de Admisión 2028.

Sin esos tres puntos, cualquier valor calculado podría estar mal y el estudiante tomaría decisiones con un número que no es el oficial. AGENTS.md (sección 2.1) pide no publicar lo que no se puede verificar en una fuente oficial.

## Opciones evaluadas

### Opción A — Calcular el Puntaje Ranking en la aplicación
- Pros: la experiencia es automática y no depende de que el estudiante conozca su número.
- Contras: exige datos de referencia que no tenemos y una fórmula verificada. Hoy ninguno de los dos está resuelto.

### Opción B — El estudiante ingresa su Puntaje Ranking
- Pros: usa el número oficial que el estudiante ya recibió. No necesita fórmulas ni datos de colegios. Es verificable.
- Contras: el estudiante tiene que saber su número, y un error al escribirlo afecta el resultado. Se mitiga con validación de rango (100 a 1000) y con una explicación de dónde encontrarlo.

### Opción C — Calcular con PROM y MAX que ingresa el estudiante
- Pros: sirve a quien tiene esos valores.
- Contras: casi nadie los tiene. Agrega complejidad sin resolver la falta de datos oficiales.

## Decisión

Para la primera versión del simulador se elige la **opción B**. La aplicación no calcula el Puntaje Ranking. Se ingresa como dato del estudiante, validado entre 100 y 1000.

## Justificación

- Evita publicar un valor que no es el oficial, en línea con AGENTS.md 2.1.
- La fórmula de la página del DEMRE está verificada, pero la implementación del PR 61 no la reproduce. Corregirla no basta: faltan los datos de referencia.
- El ranking es un dato que el estudiante ya tiene. Ingresarlo no pide datos personales adicionales (RUN, contraseña o datos del colegio).

## Consecuencias

- El simulador muestra el Puntaje Ranking como «el que ingresaste», nunca como un valor calculado por la plataforma.
- Hay que explicar en la interfaz, en lenguaje claro, dónde encontrar el puntaje y que la plataforma no lo calcula.
- El ponderado sí se calcula en la aplicación, porque usa ponderaciones oficiales cargadas desde el DEMRE y no depende de los datos de colegios.
- Cuando el DEMRE publique los datos de referencia por colegio, o cuando el nuevo ranking entre en vigencia, este ADR debe revisarse. Ese cambio se decide en un ADR nuevo.
- El PR 61 deja de implementar el cálculo del ranking y mantiene solo la validación del valor ingresado y el cálculo del ponderado.
