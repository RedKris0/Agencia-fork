# 0017 — Pronóstico agregado de la próxima generación y piloto en una sede privada

Fecha: 2026-11-07 · Estado: aceptada (2026-11-09, por el líder, tras [revisión legal](../revision-legal-adr-pendientes.md); el nombre de la institución no sale del repositorio sin autorización escrita) · Relacionado: [ADR 0010](0010-modulo-de-permanencia.md), [ADR 0012](0012-cadena-causal-y-promesa.md), [ADR 0015](0015-cuenta-del-estudiante-y-vinculo-institucional.md), [ADR 0016](0016-prediccion-condicionada-de-riesgo.md)

## Contexto

Se propone un producto de **pronóstico agregado** de la próxima generación de estudiantes: cuántos egresados de enseñanza media llegarán, a qué carreras y regiones, y qué necesidades de apoyo y de docencia habrá. Usa datos públicos y agregados, así que no requiere consentimiento individual ni el vínculo del ADR 0015.

Para el primer piloto se pidió una **sede de una institución privada**, en la Región de O'Higgins. Eso plantea tres cosas que hay que resolver antes de empezar:

1. **Relación con la institución.** Un piloto con nombre propio puede parecer una recomendación o una relación comercial. El portal público no puede ordenar ni destacar instituciones por ser clientes (AGENTS.md, sección 1).
2. **Tamaño de la muestra.** Una sede pequeña tiene pocos casos por cohorte. Con pocos casos las tasas son inestables, y un pronóstico sin intervalos visibles puede inducir a error.
3. **Lo que se dijo en la conversación.** Una persona de la institución señaló que ya ya tiene sus propios datos y no le interesa la información que puede aportar la plataforma. Es una sola conversación y no representa a la institución. Sirve como hipótesis para preguntar, no como conclusión.

## Opciones evaluadas

| Opción | A favor | En contra |
|---|---|---|
| **A. Piloto solo con datos públicos** (SIES por sede, Mineduc, INE), sin contacto formal con la institución | No requiere acuerdo ni consentimiento. Es verificable y publicable con fuente. No crea relación comercial | Sin datos internos de la sede, el análisis es más limitado. Puede que la sede no tenga cifras publicadas con suficiente detalle |
| B. Piloto con acuerdo escrito con la institución para datos agregados internos | Permite un análisis más completo y una validación con la institución | Crea una relación comercial o de colaboración que debe declararse. Riesgo de que el análisis favorezca a la institución que paga o colabora |
| C. No hacer piloto en una institución específica | Cero riesgo de relación o de imagen | Pierde la validación real del producto |

## Decisión propuesta

**Opción A como primer paso, y B solo con acuerdo escrito.**

1. **Piloto con datos públicos.** Se analiza la sede San Fernando con cifras del SIES, Mineduc y el INE. Si las cifras publicadas no alcanzan el mínimo de casos, el piloto **se cancela** en lugar de forzar un resultado. No se reemplaza con estimaciones sin fuente.
2. **Sin nombre de la institución en publicaciones** hasta tener autorización escrita de la institución. Mientras tanto, el informe interno puede nombrar la sede, pero no se publica.
3. **Declaración de relación.** Si la institución se convierte en cliente o colaborador, el informe lo declara y el piloto se revisa por separado. No se usa el piloto para ordenar ni recomendar la institución en el portal.
4. **Umbral mínimo de casos** por cifra publicada, fijado antes de ver los datos. Las celdas por debajo del umbral se suprimen.
5. **Intervalos de incertidumbre visibles** en cada pronóstico.
6. **Sin etiquetas territoriales.** No se describe la comuna ni la sede como "en riesgo". El lenguaje describe tendencias de la cohorte, con su incertidumbre.
7. **Validación externa.** Antes de presentar resultados como útiles, se comparan con cifras reales de cohortes ya observadas (backtesting), y se publica el error.

## Verificaciones previas

- Que la sede San Fernando exista en el SIES con matrícula de pregrado, y que su desagregación permita un pronóstico. **No verificado todavía.** Una búsqueda encontró un directorio sin fecha (altillo.com) que la lista en Carampangue 1058, pero no es fuente oficial, y no se encontraron cifras de matrícula de la sede.
- Qué fuentes públicas publican cifras de esa sede y de su área de captación (matrícula de enseñanza media por establecimiento y comuna, proyecciones del INE).
- Cuántos casos tiene una cohorte de esa sede, para saber si el umbral se cumple.

## Justificación

- La opción A permite validar el método sin depender de la voluntad de una institución y sin crear una relación que pueda sesgar el análisis.
- Un piloto con una sede pequeña puede parecer más concreto, pero es más propenso a errores por tamaño de muestra. Por eso la cancelación es un resultado válido.
- Nombrar a una institución real en un análisis es un riesgo reputacional y comercial, aunque las cifras sean públicas. Por eso la publicación requiere autorización.

## Consecuencias

- Se necesita definir el umbral mínimo de casos antes de revisar cifras.
- Si la sede no tiene datos suficientes, el piloto se mueve a una región o a un conjunto de sedes de la misma zona.
- El piloto no puede usarse en materiales comerciales sin revisión del líder.
- La conversación con la institución, si ocurre, debe quedar registrada con su fecha y su alcance.

## Pendiente

- Verificar en el SIES los datos de la sede San Fernando.
- Definir el umbral mínimo de casos y quién lo aprueba (propuesta: el líder).
- Decidir si se pide a la institución una conversación formal, y con qué alcance.
