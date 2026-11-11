# 0013 — Deserción evitable por desinformación: extensión de la promesa y capa comercial

Fecha: 2026-11-05 · Estado: aceptada (2026-11-09, por el líder, tras [revisión legal](../revision-legal-adr-pendientes.md); condición: el costo de deserción se cita siempre como techo y con su fuente; el `TODO(fuente)` sigue abierto)

Respaldo: [ADR 0012](0012-cadena-causal-y-promesa.md) · [anexo de evidencia](../evidencia-acceso-salud-mental.md) (sección 2) · [informe de fundamentación](../informe-fundamentacion.md) (persistencia con y sin beneficios)

Relacionado: [ADR 0010](0010-modulo-de-permanencia.md)

## Contexto

El ADR 0012 fijó que el desenlace de la cadena es la **exclusión** y autorizó una promesa sobre acceso y permanencia. Dejó fuera, a propósito, el costo de la deserción: el anexo de evidencia advierte que esas cifras son de deserción y no de no ingreso, y que no deben presentarse como costo de la desinformación en el acceso.

Esa advertencia sigue vigente. Pero hay tres vínculos entre desinformación y deserción que ya tienen respaldo en el repositorio:

1. **Elección de programa.** El ensayo aleatorizado de Hastings, Neilson y Zimmerman con el Ministerio de Educación (Mineduc) muestra que informar cambia *qué programa* se elige.
2. **Beneficios.** Persistencia de 88,2% con beneficios contra 74,4% sin ellos (cohorte 2022, informes de retención del Servicio de Información de Educación Superior, SIES; ver [informe de fundamentación](../informe-fundamentacion.md)). Es una diferencia observada, no un efecto causal. TODO(fuente): confirmar contra el informe SIES qué mide exactamente esa persistencia.
3. **Estrategias de estudio.** Ya cubiertas por el módulo de permanencia (ADR 0010).

Además, el modelo de negocio actual (arriendo de acceso a instituciones) tiene un motivo de compra difuso: la Ley 21.091 no obliga a las instituciones a acompañar, de modo que la acreditación es una ventaja y no una necesidad.

El costo de la deserción es, en cambio, dinero concreto para la institución: arancel que deja de percibir.

## Opciones evaluadas

### Opción A — No tocar nada

Mantener la promesa y el discurso del ADR 0012.

- A favor: cero riesgo de deriva de mensaje.
- En contra: se desaprovecha un argumento documentado y el motivo de compra sigue difuso.

### Opción B — Afirmar que la plataforma reduce el 20% del gasto perdido por deserción

- A favor: titular fuerte.
- En contra: el 20% es el costo *total* de la deserción, que tiene causas económicas, académicas, familiares y de salud. No sabemos qué fracción es evitable por información. Cualquier jurado o comprador lo desarma con una pregunta.

### Opción C — Usar el costo de deserción como techo y medir la fracción evitable (elegida)

El costo total es el **techo** del problema. La fracción evitable por información y orientación es una incógnita que se estima con datos propios.

- A favor: defendible eslabón por eslabón; da a la institución un cálculo con sus propios números; no cambia el producto.
- En contra: sin piloto no hay cifra de impacto; obliga a esperar para prometer resultados.

### Opción D — Cobro ligado a resultado desde el inicio

- A favor: alinea incentivos con el cliente.
- En contra: sin datos de piloto, el riesgo recae en un equipo estudiantil; además, que la institución pague por menos deserción crea presión para retener a un estudiante aunque le convenga irse.

## Decisión

Se adopta la **opción C**. La opción D queda descartada por ahora y se reevalúa después del piloto.

### Eslabón agregado a la cadena

| Eslabón | Afirmación | Estado de la evidencia |
|---|---|---|
| E | La desinformación contribuye a la deserción por mala elección de programa y pérdida de beneficios | Elección: experimental en Chile (Hastings et al.). Beneficios: diferencia observada, no causal. **Fracción atribuible: sin estimar** |

### Promesa autorizada (amplía la del ADR 0012)

> La plataforma reduce la exclusión de la educación superior causada por desinformación sobre beneficios estudiantiles, y acompaña la permanencia de quienes ingresan, apoyando una elección informada de programa y la renovación oportuna de beneficios.

### Promesas prohibidas (se suman a las del ADR 0012)

En todo material del producto, comercial o académico, queda prohibido:

- afirmar que la plataforma recupera, ahorra o evita "el 20%" del gasto en deserción, o cualquier porcentaje o monto de deserción evitada, mientras no exista medición propia;
- presentar el costo total de deserción como costo de la desinformación;
- afirmar que la plataforma predice o detecta deserción (ADR 0010);
- prometer reducción de deserción como resultado garantizado.

### Uso comercial autorizado

- **Calculadora de costo de deserción por institución**: cohorte × tasa de deserción de primer año × arancel perdido, con los datos de la propia institución. Es una aritmética de stock, verificable, y no afirma cuánto reduce la plataforma.
- Hablar de **progresión**, no de deserción ni retención, ante una universidad (regla 7 del ADR 0012).
- Conversación con el Estado (Mineduc, Subsecretaría de Educación Superior): solo como exploración, sin línea de ingresos asumida.

### Salvaguarda de neutralidad hacia el estudiante

La institución que paga no recibe información de la ficha sin consentimiento del estudiante, y la plataforma no recomienda quedarse ni irse por conveniencia de la institución. Orientar a un estudiante hacia otro programa o institución, cuando le conviene, es un resultado válido y no una falla. Esto refuerza el principio de neutralidad de `AGENTS.md` sección 1.

### Métricas de éxito (sin cambios respecto del ADR 0012)

Beneficios obtenidos, matrícula efectiva, renovación de beneficios y continuidad en segundo año. No se agregan indicadores de predicción.

## Justificación

La deserción es el mismo problema que la exclusión visto después de la matrícula. Las cifras de costo dimensionan el techo del problema. No dicen cuánto es evitable. Cada una se cita con su origen y su alcance (detalle en [verificación de cifras](../verificacion-de-cifras.md)):

- **Pérdida anual por abandono: $546.000 millones (US$ 780 millones).** Cátedra UNESCO de Inclusión en la Educación Universitaria (USACH), *Gratuidad responsable y universal en Chile*, noviembre de 2016, Tabla 6, p. 44. Estimación que parte de la matrícula nueva, las tasas de abandono y los aranceles.
- **26% del gasto público en educación universitaria** (US$ 96,2 millones). IESALC-UNESCO, *Estudio sobre la repitencia y deserción en la educación superior chilena* (2005). Mide solo universidades y es una estimación antigua.
- **Retención de primer año, cohorte 2023: 76,5%**, con 16% sin matrícula en educación superior al año siguiente. SIES, informe de retención 2019-2023.

No se usan el 27,9%, el «más del 20%» ni los US$ 2.660 millones: no tienen un origen verificable (ver la sección «Sin origen verificable» del documento de verificación).

La brecha de persistencia de 13,8 puntos con y sin beneficios es consistente con que la información sobre beneficios importa, pero al no ser causal solo permite decir eso: consistencia, no efecto.

TODO(fuente): repartición de las causas de deserción (económica, vocacional, académica, familiar, salud) según el SIES o estudios del Mineduc sobre motivos de abandono. Sin esta fuente no se puede acotar la fracción evitable; no se inventa una cifra.

## Consecuencias

### Positivas

- El motivo de compra pasa de ventaja difusa a un cálculo con los números de la institución.
- No cambia el producto ni el código: es una capa de argumento y una calculadora.
- Mantiene las métricas bajo control de la plataforma.

### Negativas y costos asumidos

- No se puede prometer una cifra de impacto hasta tener un piloto propio.
- Exige disciplina de citación: el 20% se cita siempre como techo, con su alcance.

### Riesgos

- **Deriva de mensaje**: que el material comercial pase de "techo" a "lo que recuperamos". Mitigación: revisar este ADR junto con el 0012 antes de cada publicación.
- **Conflicto de incentivos** con la institución que paga. Mitigación: la salvaguarda de neutralidad de arriba.

### Pendientes derivados

- [ ] Encontrar la fuente oficial de causas de deserción (ver TODO de la justificación).
- [ ] Diseñar el piloto que mida la fracción evitable (qué cohorte, qué indicador, qué grupo de comparación).
- [ ] Construir la calculadora de costo de deserción por institución.
- [ ] Respuesta de Mineduc a la solicitud de transparencia por la serie de postulaciones al Formulario Único de Acreditación Socioeconómica (FUAS) (folio AJ025T0003786, vence el 2 de diciembre de 2026, prorrogable por 10 días hábiles).
- [ ] Corregir en el resto de la documentación las cifras sin origen verificable (lista en [verificación de cifras](../verificacion-de-cifras.md)).
- [ ] Decidir con el líder si la promesa del ADR 0013 reemplaza a la del ADR 0012 (de ser así, marcar el 0012 como «enmendada por 0013»). Revisar con el líder si la promesa ampliada reemplaza a la del ADR 0012 en el sitio y la presentación.
