# 0027 — Enfoque de transición y Plan Colegio

Fecha: 2026-11-11 · Estado: propuesta (pendiente de validación con colegios y de aprobación del líder, @rafajaque)

Relacionado: [ADR 0010](0010-modulo-de-permanencia.md) · [ADR 0012](0012-cadena-causal-y-promesa.md) · [ADR 0013](0013-desercion-evitable.md) · [ADR 0015](0015-cuenta-del-estudiante-y-vinculo-institucional.md) · [ADR 0022](0022-autorizacion-de-tutor-para-menores.md) · [análisis de mercado](../mercado/analisis-mercado.md)

## Contexto

El equipo no tenía claro si enfocarse en la desinformación y la salud mental de los estudiantes o en el seguimiento dentro de la educación superior. Al revisar los ADR 0010, 0012 y 0013 se vio que:

1. El acompañamiento psicosocial pesado ya estaba fuera del alcance ("puente, no tratante", ADR 0010). La confusión era más de relato que de producto.
2. La evidencia que el repositorio ya reúne favorece intervenir **en el momento de la postulación y de la renovación de beneficios**, no solo antes ni solo después: el experimento FAFSA de H&R Block (mejora de matrícula y permanencia; la cifra exacta está por verificar en el original) y HAIL, ambos ayuda al postular. En media, la única evidencia citada es el ensayo de Hastings, Neilson y Zimmerman sobre *qué programa* se elige.
3. La renovación de beneficios es el componente mejor respaldado dentro de nuestro alcance (ADR 0010), y ocurre en el primer año de educación superior. Concentrar todo en enseñanza media la dejaría fuera.
4. El modelo de negocio vigente (SaaS a instituciones) compite contra proveedores que venden predicción (Foris, U-Planner, Scitis) y contra licitaciones que exigen predicción e integración propietaria, lo que el ADR 0010 descarta. La única licitación leída (un CFT estatal) quedó desierta.

Además, el líder propuso explorar un "pre universitario online" con vista de avance para apoderados y un "plan colegio" para grupos grandes.

## Opciones evaluadas

| Opción | A favor | En contra |
|---|---|---|
| **A. Solo enseñanza media** (preparar y no acompañar en la universidad) | Menos alcance; evita el módulo psicosocial | Pierde la renovación de beneficios, lo mejor respaldado; sin seguimiento no se puede medir si la preparación funcionó; los usuarios son casi todos menores |
| **B. Transición: de 3° medio a la renovación de beneficios del primer año** (propuesta) | Un solo camino continuo; une lo mejor respaldado (postulación y renovación); la Ficha del estudiante tiene sentido de punta a punta | Cubre más tramos; hay que validar quién paga |
| **C. Mantener las tres etapas actuales** | Sin cambios de documentación | El relato sigue difuso; el comprador principal pide predicción |

Sobre la **forma de venderlo** se consultaron Claude, Codex y Antigravity con el mismo encargo (ver bitácora del 2026-11-11):

| Modelo comercial | Quién paga | Veredicto |
|---|---|---|
| **Plan Colegio de Transición** | Colegio, sostenedor o SLEP | Recomendado por los tres |
| Pre universitario pagado por apoderados | Apoderado | Descartado como producto principal: rompe "gratis para el estudiante, siempre" (AGENTS.md sección 1) y compite con clases de contenido, que decidimos no dar. Solo se admite como sesiones o materiales opcionales, nunca para desbloquear el portal ni la Ficha (Codex) |
| Plan Institución (continuidad del primer año) | IP, CFT o universidad | Se mantiene como segunda línea; tiene demanda documentada, pero choca con la exigencia de predicción |
| Plan municipal o SLEP | Sostenedor público | Posible por el mismo canal que el colegio; compra pública lenta |
| Módulo para preuniversitarios (B2B) | Preuniversitario | Descartado: tensiona la neutralidad y el comprador compite con el concepto (idea de Antigravity, no adoptada) |

## Decisión

Se propone:

1. **Enfoque de transición (opción B).** El producto acompaña a una persona desde 3° medio hasta la renovación de beneficios de su primer año, como un solo camino. Sigue la lógica de cuatro momentos:
   - **3° medio:** explorar con datos citados y aprender cómo estudiar (estrategias con evidencia, sin "estilos de aprendizaje").
   - **4° medio:** simulador de puntaje, cupos frente a demanda, calendario y lista de beneficios.
   - **Postulación y matrícula:** ayuda concreta con el trámite del FUAS, paso a paso, y qué hacer si no quedó. No basta informar: en el experimento de H&R Block la información sola no tuvo efecto medible y la ayuda para completar el formulario sí (leído solo en resumen).
   - **Primer año:** renovación, avance mínimo, plazos, relatos de pares, derivación y pulso (ADR 0010).
2. **Plan Colegio de Transición como forma comercial inicial.** El estudiante usa todo gratis. El colegio recibe calendario, material para orientación y **métricas agregadas de uso**. Los datos individuales llegan al colegio solo si cada estudiante lo autoriza. Se vende como herramienta de orientación y continuidad, no como pre universitario.
3. **Lo informativo funciona sin cuenta.** La Ficha de Trayectoria se crea solo cuando hace falta continuidad (guardar avance, recordatorios, derivación), con autorización del tutor si es menor (ADR 0022).
4. **Fuera del alcance: dar clases de contenido académico** (por ejemplo, preparación PAES). Se orienta hacia recursos gratuitos y se enseña cómo estudiar, no qué estudiar.
5. **Los apoderados no ven la Ficha por defecto.** Solo reciben información pública sobre plazos y beneficios. Cualquier vista de avance exige autorización específica del estudiante y muestra hitos (por ejemplo, "FUAS completado"), nunca desempeño ni respuestas del pulso.
6. **Todo el diseño parte de la Ley 21.719** (matriz más abajo). La plataforma es la responsable de la Ficha; el colegio nunca es encargado de ella, porque eso lo pondría a dar instrucciones sobre datos que pertenecen al estudiante.
7. **El pulso de check-in no se implementa** hasta la revisión legal. Puede ser dato de salud (art. 16 bis) o perfilado (art. 8 bis).
8. **Las métricas para el colegio se entregan solo con tamaño mínimo de grupo**, para que no se pueda reidentificar a nadie en un curso pequeño. El mínimo lo fija el líder con asesoría legal.

### Validación antes de construir (combina las propuestas de Codex y Antigravity)

Esta propuesta **no se acepta** hasta cumplir ambas fases. Los umbrales son una propuesta del equipo y los fija el líder.

- **Fase 0: entrevistas (sin programar).** Cinco entrevistas con orientadores o directivos de colegios, con un mockup en PDF del panel de cohorte (solo agregados). Preguntas: ¿resolvería su labor sin ver nombres individuales?, ¿quién decide la compra?, ¿con qué fondos podría pagarse?, ¿se exige registro ATE (Asistencia Técnica Educativa) para contratar con fondos SEP (Subvención Escolar Preferencial)? Umbral propuesto: al menos 3 de 5 dicen que lo usarían bajo la condición "agregados; Ficha individual solo autorizada".
- **Fase 1: piloto manual de cuatro semanas con un solo curso.** Usa el portal actual, el calendario y una reunión de orientación, sin construir paneles. Se mide **cuántas horas reales** le toma al equipo (tres personas). Se pide una carta de intención no vinculante o la autorización del colegio.

## Base en la Ley 21.719 (matriz ley a producto)

**Advertencia de fuente:** los artículos de esta tabla salen de un consolidado **no oficial** (datacompliance.legal, 20 de marzo de 2026). No se pudo abrir la BCN. Hay que cotejarlos contra el texto oficial y con un abogado antes de citarlos. **Vigencia:** el artículo 1° transitorio fija el 1 de diciembre de 2026, pero hay un proyecto en trámite (Boletín 18.623-07) que la posterga; fuentes no oficiales indican el 15 de octubre de 2027 y que aún no está publicado. Se diseña como si rigiera hoy.

| Función del producto | Qué exige la ley | Decisión de diseño |
|---|---|---|
| Portal informativo sin cuenta | Principio de proporcionalidad: solo datos necesarios (art. 3 c) | No se recolecta nada para explorar, simular ni ver plazos |
| Ficha de Trayectoria de un menor | Menores de 14: siempre consentimiento del tutor. De 14 a 17: reglas de adultos, salvo **datos sensibles de menores de 16, que exigen al tutor** (art. 16 quáter) | Se mantiene la regla estricta de AGENTS.md (tutor para menores de 18) como decisión propia, más exigente que la ley. Cómo se acredita el consentimiento del tutor no figura en el texto leído |
| Situación socioeconómica (simulador, FUAS) | Es dato **sensible** (art. 2 g): consentimiento expreso (art. 16) | Consentimiento separado y expreso; sin interés legítimo ni contrato como base |
| Consentimiento para compartir | Libre, informado, específico, previo, revocable; la prueba la tiene la plataforma; se presume no libre si se condiciona un servicio a algo no necesario (art. 12) | Todo el servicio funciona sin compartir nada. El colegio no puede exigir el consentimiento como condición. Se guarda registro de cada consentimiento |
| Entregar datos individuales al colegio o a un apoderado | Es cesión: con consentimiento, por escrito o medio electrónico idóneo; sin él es nula y se debe borrar (art. 15) | Solo con autorización específica del estudiante, por destinatario, revocable |
| Panel agregado del colegio | El dato anonimizado deja de ser dato personal, pero la anonimización debe ser irreversible y considera los medios razonables de reidentificación (arts. 2 k, 2 f) | Mínimo de tamaño de grupo antes de mostrar una cifra. Nunca listas nominales |
| Rol del colegio que contrata | Responsable es quien decide fines y medios; el encargado actúa por instrucciones y por contrato (arts. 2 n, 2 x, 15 bis) | La plataforma es responsable de la Ficha. El contrato con el colegio lo dice expresamente. **Sin norma expresa para este caso: requiere abogado** |
| Pulso de check-in | Datos de salud solo para fines de leyes sanitarias (art. 16 bis); perfilado con efectos significativos (art. 8 bis); evaluación de impacto si hay sensibles a gran escala (art. 15 ter) | No se implementa hasta la revisión legal. La evaluación de impacto es previa |
| Asistente IA y alojamiento fuera de Chile | Transferencia internacional solo a país adecuado o con garantías contractuales (arts. 27 y 28); infracción grave si no (art. 34 ter m). La lista de países adecuados aún no se encontró | El asistente procesa solo preguntas generales, sin datos identificables (AGENTS.md 2.2). Documentar el instrumento de garantías con Supabase (São Paulo) y Gemini |
| Derechos del titular | Acceso, rectificación, supresión, oposición, portabilidad y bloqueo; respuesta en 30 días corridos prorrogables por 30 (art. 11) | Revisar el ADR 0020 contra estos plazos |
| Seguridad y brechas | Medidas según riesgo y obligación de acreditarlas (art. 14 quinquies); reportar a la Agencia sin dilación y avisar a los titulares si hay datos sensibles o de menores de 14 (art. 14 sexies) | Procedimiento de incidentes escrito antes de abrir la Ficha |
| Equipo sin personalidad jurídica | La ley aplica a personas naturales o jurídicas; hay atenuaciones para empresas de menor tamaño, no una exención (arts. 14 septies, 6° transitorio) | **Pendiente de asesoría legal**: quién es el responsable. Es el mismo problema de forma jurídica que plantea el registro ATE |
| Sanciones | Leves hasta 5.000 UTM, graves hasta 10.000, gravísimas hasta 20.000; tratar datos de menores infringiendo la ley es grave (arts. 34 bis, ter y quáter) | Justifica no avanzar con Ficha y panel antes de la revisión legal |

## Justificación

- La opción B reúne lo mejor respaldado del repositorio (postulación y renovación) y lo hace un solo recorrido, a diferencia de A, que lo parte, y de C, que mantiene el relato difuso.
- El pagador es un tercero porque AGENTS.md exige que el estudiante no pague nunca. El colegio tiene el problema (sus egresados no postulan o pierden beneficios) y un presupuesto potencial.
- Los tres agentes coincidieron en la recomendación de fondo. Es una sola muestra y no demuestra por sí sola que el plan funcione.
- Las métricas agregadas respetan el principio de que la Ficha pertenece al estudiante y reducen el riesgo regulatorio con menores.

## Consecuencias

- Si se acepta, hay que **enmendar** el ADR 0010 (la etapa "después" queda acotada al primer año), la sección 1 de AGENTS.md (las tres etapas pasan a ser un recorrido de transición) y la tabla de productos. Hoy **no se modifica ninguno**.
- Se agrega un cliente nuevo (colegios y sostenedores) con otro ciclo de venta. El Plan Institución queda como línea secundaria y no se retira.
- **Las promesas prohibidas de los ADR 0012 y 0013 siguen vigentes**: nada de salud mental, predicción de deserción ni cifras de impacto sin medición propia.
- Nada de esto cambia el código. No se construye un panel de colegio antes de superar la fase 0.

### Riesgos

1. El colegio solo paga si recibe datos individuales. Mitigación: fase 0.
2. La operación (talleres, soporte, seguimiento) supera la capacidad de tres personas. Mitigación: fase 1, que mide las horas.
3. No hay presupuesto ni urgencia de compra en los colegios. Mitigación: carta de intención antes de construir.
4. Presión de directivos por listas nominales, que vulnerarían la Ley 21.719. Mitigación: ofrecer solo agregados y documentarlo en la ficha comercial.

### Pendientes

- [ ] **Decisión del líder:** desde qué curso puede crearse la Ficha (3° medio con autorización de tutor, o desde 4° medio).
- [ ] **Decisión del líder:** confirmar que dar contenido académico queda fuera del alcance.
- [ ] Verificar qué cubren hoy mifuturo.cl, Acceso Mineduc y PACE (Programa de Acompañamiento y Acceso Efectivo a la Educación Superior) para sostener la diferenciación. Hoy es una suposición.
- [ ] Verificar el registro ATE y las vías de compra de un colegio (afirmación de Antigravity, sin fuente).
- [ ] Cotejar la matriz de arriba contra el texto oficial de la BCN y confirmar el estado del Boletín 18.623-07. Contrastar el ADR 0022 con el art. 16 quáter (tutor para menores de 18 es más estricto que la ley; confirmar que es lo que queremos).
- [ ] Asesoría legal: responsable de datos de un equipo sin personalidad jurídica, rol del colegio, pulso como dato de salud, transferencia a Brasil y a Gemini, y tamaño mínimo de grupo para las métricas.
- [ ] Fijar los umbrales de éxito de las fases 0 y 1.
- [ ] Elegir con qué colegios se hacen las entrevistas y el piloto.
