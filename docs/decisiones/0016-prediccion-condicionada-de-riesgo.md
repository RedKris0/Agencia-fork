# 0016 — Revisión condicionada de la prohibición de predicción

Fecha: 2026-11-07 · Estado: aceptada (2026-11-09, por el líder, tras [revisión legal](../revision-legal-adr-pendientes.md); es una compuerta: no habilita ninguna predicción hasta cumplir las 8 precondiciones y la revisión legal del artículo 8° bis) · Revisa: [ADR 0010](0010-modulo-de-permanencia.md), sección 2.4 de AGENTS.md

## Contexto

El ADR 0010 descartó el modelo predictivo de deserción por tres razones: no hay datos históricos propios, la institución ya tiene más señal que nosotros, y prometer precisión que no podemos sostener. AGENTS.md 2.4 prohíbe prometer predicción y ordena no etiquetar a estudiantes como "en riesgo".

Dos hechos nuevos:

1. **Las bases de una licitación pública desierta de un CFT estatal regional** (código y comprador omitidos, ver documento interno de mercado) exigen "analítica predictiva para identificar factores de riesgo asociados a la progresión, retención y permanencia estudiantil, generando alertas tempranas configurables". Es un requisito de evaluación, no opcional.
2. **Los competidores ya venden predicción.** Foris, Scitis, U-Planner (módulo U Retention) y Nimbi declaran modelos predictivos. La predicción es la oferta estándar del mercado, no un nicho.

**Qué datos tenemos y qué no:**

- **Tenemos:** cifras agregadas del SIES, como la retención por tipo de institución y por beneficio (informe de retención, cohorte 2022). Son útiles para describir el problema, pero no identifican a ningún estudiante y no sirven para entrenar un modelo individual.
- **No tenemos:** trayectorias individuales de estudiantes. La Ficha de Trayectoria todavía no existe en la plataforma, el pulso de check-in no está implementado, y los datos institucionales solo llegarían con el vínculo y el consentimiento (ADR 0015).
- **Corrección:** en el chat se dijo que "tenemos datos que respaldan las predicciones". Eso no es cierto hoy. Es una posibilidad futura, condicionada a que las instituciones aporten datos con consentimiento.

## Opciones evaluadas

| Opción | A favor | En contra |
|---|---|---|
| **A. Mantener la prohibición (ADR 0010)** | Coherente con la evidencia de hoy y con la minimización. Evita promesas que no podemos sostener | No cumple los requisitos de las licitaciones públicas de analítica. Nos deja fuera de un segmento del mercado |
| **B. Predicción condicionada**: se habilita solo cuando se cumplen precondiciones verificables (abajo) | Permite competir en el segmento que lo exige. Puede aportar más valor que solo reportar | Requiere datos institucionales con consentimiento, validación, y un equipo que hoy no tenemos. Riesgo de sesgo, de etiquetado y de errores en estudiantes concretos |
| C. Predicción por la institución, sin que la plataforma prediga | No asumimos el riesgo del modelo. Cumplimos el requisito como integradores | Dependemos del modelo de un tercero, y la institución podría no querer compartirlo |

## Decisión propuesta

**Opción B, condicionada.** La plataforma no construirá ni publicará predicciones hasta que se cumplan todas estas precondiciones:

1. **Datos con consentimiento.** Datos de cohortes reales que la institución aporta bajo el vínculo y consentimiento de ADR 0015. No se usan datos sin esa base.
2. **Validación fuera de muestra.** El modelo se prueba con una cohorte distinta a la que se usó para entrenarlo, y se publica su precisión, sensibilidad y especificidad, con el tamaño de la muestra.
3. **Evaluación de sesgo.** Se mide si el modelo falla más para mujeres, estudiantes de CFT, de sedes rurales o de establecimientos de origen concretos. Si lo hace, no se publica sin corrección.
4. **Sin etiquetas visibles para el estudiante.** Nunca se muestra un puntaje de "riesgo" al estudiante. La salida del modelo es una señal interna para una persona de la institución (AGENTS.md 2.4).
5. **Decisión humana.** Ninguna acción sobre un estudiante la toma el modelo. Una persona revisa cada señal y decide si contacta, deriva o no hace nada.
6. **Derecho a explicación y a objeción.** El estudiante puede saber que existe un modelo que lo considera y pedir revisión humana. Con la Ley 21.719, las decisiones automatizadas que lo afecten requieren ese derecho; la revisión legal debe confirmar el alcance.
7. **Lenguaje.** Ningún texto de interfaz, documento comercial ni respuesta del asistente describe la herramienta como "predicción de deserción" en tono de certeza. Se describe como "señales de alerta según indicadores que la institución define", con su precisión medida.
8. **Evidencia.** El componente se registra en `docs/evidencia-permanencia.md` con su nivel de evidencia, como exige AGENTS.md 2.4.

**Mientras no se cumplan**, el módulo de permanencia sigue como en el ADR 0010. Lo que se puede construir ya es la captura de indicadores y el registro de intervenciones, que serán los datos de entrenamiento futuros.

## Justificación

- La presión del mercado y de las bases no basta para cambiar una regla de privacidad. Por eso la opción B exige precondiciones y no libera la predicción.
- La predicción solo tiene sentido con datos reales de estudiantes, y esos datos llegan por el vínculo institucional (ADR 0015). Sin ese vínculo, un modelo sería inferior al de la institución, como dice el ADR 0010.
- El riesgo de sesgo y de error individual es alto en educación, y afecta a grupos que ya están en desventaja. Por eso la evaluación de sesgo es precondición, no mejora posterior.
- La Ley 21.719 regula las decisiones automatizadas. Esa revisión legal se hace antes de implementar, no después.

## Consecuencias

- **AGENTS.md 2.4 debe revisarse.** La frase "no prometer predicción" pasa a depender de esta decisión una vez aceptada. Requiere su propio cambio en el archivo, con revisión del líder.
- **ADR 0010 pasa a "revisado parcialmente".** La prohibición se mantiene hasta que se cumplan las precondiciones.
- **Las bases de licitaciones públicas que exijan predicción** no se responden hasta que las precondiciones se cumplan. Hay que decidir si se postula igual con una oferta parcial o si no se postula. Esa decisión no está en este ADR.
- **Costo:** la validación con datos reales, la evaluación de sesgo y la revisión legal son trabajo que el equipo no tiene presupuestado.
- **Pendiente:** definir el umbral de precisión mínimo aceptable y quién lo aprueba (propuesta: el líder, con el profesional validador en el caso de la capa de acompañamiento).

## Requisito de datos para el análisis individual

El análisis individual necesita datos de la institución (notas, asistencia, avance curricular y carga académica, que son los predictores más fuertes de deserción) y no puede basarse solo en datos de la plataforma. Los datos de la plataforma tienen dos límites:

- **Sesgo de selección.** Solo se registran quienes buscan la plataforma. Los estudiantes con más riesgo, que nunca se registran, quedan fuera de la muestra.
- **Señal débil.** Los intereses, las simulaciones y los beneficios postulados son autorreportados y pueden funcionar como sustituto de la situación socioeconómica. El pulso de check-in solo indica si la persona responde.

Por eso, el análisis individual se alimenta de datos de la institución, por el vínculo del ADR 0015 y con consentimiento. La plataforma es el canal de contacto y de consentimiento, no la fuente principal. Ver el plan en [docs/analisis/plan-de-analisis.md](../analisis/plan-de-analisis.md).

## Pendiente

- Revisión legal de la Ley 21.719 sobre decisiones automatizadas.
- Definición del umbral de precisión y de la muestra mínima.
- Decidir si se postula a licitaciones que exijan predicción antes de cumplir las precondiciones.
