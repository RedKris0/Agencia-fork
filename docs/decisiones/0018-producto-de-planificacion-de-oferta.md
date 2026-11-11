# 0018 — Producto de planificación de oferta y apoyo: finalidad, método y límites

Fecha: 2026-11-07 · Estado: propuesta (pendiente de revisión del líder, @rafajaque, y de revisión legal antes de cualquier oferta comercial; revisión legal completada el 2026-11-10 y confirmada por el líder, que cubre también la base histórica de mifuturo.cl y la aplicación del [ADR 0025](0025-celdas-suprimidas-visibles-sin-cifra.md)) · Relacionado: [ADR 0010](0010-modulo-de-permanencia.md), [ADR 0015](0015-cuenta-del-estudiante-y-vinculo-institucional.md), [ADR 0016](0016-prediccion-condicionada-de-riesgo.md), [ADR 0017](0017-pronostico-agregado-piloto-sede-privada.md)

## Contexto

Las instituciones de educación superior necesitan saber cuántos alumnos de primer año entrarán, en qué carreras, en qué sedes y con qué jornada, para decidir secciones, docentes, salas y apoyos. Ese es el valor que puede ofrecer el proyecto sin tocar datos personales.

Durante la investigación surgió la tentación de ofrecer también un "perfil" del grupo que entra (sexo, edad, nivel socioeconómico, origen escolar). Ese uso queda descartado en este ADR, por tres razones verificadas:

- **Ley 20.609 (Ley Zamudio), artículo 2°:** la discriminación arbitraria comprende distinciones fundadas en sexo, edad, situación socioeconómica, apariencia personal o discapacidad, entre otros motivos (texto verificado en bcn.cl, idNorma 1042092).
- **Ley 21.719:** entra en vigencia el **1 de diciembre de 2026**. Define la elaboración de perfiles como tratamiento automatizado para evaluar o predecir rendimiento, situación económica, intereses o comportamiento (artículo 2°, letra w), y considera dato sensible la situación socioeconómica (artículo 2°, letra g) (texto verificado en bcn.cl, idNorma 1209272). El artículo 8° bis, sobre decisiones individuales automatizadas, figura en la ley; su texto completo **no se pudo leer** y queda pendiente de revisión legal.
- **Evidencia del propio sistema:** en la cohorte 2025, la retención de mujeres supera a la de hombres en 3,3 puntos (informe SIES 2026). Un perfil por sexo se asociaría con resultados y, si se usara en admisión, afectaría a personas por una característica protegida.

## Opciones evaluadas

| Opción | A favor | En contra |
|---|---|---|
| **A. Planificación agregada** (cuántos entran, dónde, en qué carrera y jornada, con intervalo) | Sirve para decidir capacidad. Usa datos públicos. No identifica personas. Es verificable | Menos "atractiva" comercialmente que un perfil |
| B. Perfil de quienes entran (sexo, edad, nivel socioeconómico, origen escolar) | Parece más rico | **Descartada.** Riesgo de discriminación. No es necesaria para planificar. Combina variables protegidas |
| C. Clasificar a estudiantes por jornada o horario como "más o menos dispuestos" | Responde a un comentario frecuente | **Descartada.** Sin respaldo en los datos. Es una etiqueta (AGENTS.md 2.4). La diferencia observada en retención (diurna 82,9 %, vespertina 70,2 %, informe SIES 2026) tiene explicaciones estructurales, como trabajo y tiempos de traslado, no motivacionales |

## Decisión propuesta

Ofrecer el **producto A**, con finalidad, método y límites explícitos.

### Finalidad

Planificación de oferta y apoyo institucional. Concretamente:
1. Estimar el número de alumnos de primer año por carrera, sede, jornada y región, para el siguiente proceso.
2. Estimar la permanencia de primer año de esa cohorte, por tipo de institución.
3. Señalar en qué carreras o jornadas la retención histórica es más baja, para orientar apoyo (por ejemplo, tutorías en horario vespertino), **sin** clasificar a estudiantes.

No es finalidad: admitir, seleccionar, priorizar, ranquear personas, ni describir a un grupo como más o menos apto.

### Método (cómo se hizo)

| Componente | Fuente | Fecha de consulta | Método |
|---|---|---|---|
| Cohorte de cuarto medio por residencia | Mineduc, matrícula por estudiante 2020-2026 (datosabiertos.mineduc.cl) | 2026-11-07 | Conteo agregado por comuna de residencia, con supresión < 10 |
| Matrícula de primer año por sede, carrera y jornada | SIES, base de matrícula 2007-2026 (mifuturo.cl) | 2026-11-07 | Suma por año, sede y carrera. Total pregrado 2024 = 350.682 frente a 350.683 del informe oficial |
| Tasa de entrada | Cociente primer año / cohorte del año anterior | 2026-11-07 | Regla del último año observado. Error 2022-2026: −7 % a +1,4 % |
| Retención de primer año | SIES, informe de retención cohorte 2025 (mifuturo.cl) | 2026-11-07 | Tasas por tipo de institución |
| Carreras y sedes | Misma base SIES | 2026-11-07 | Participación del último año (2026); validación 2022-2026: error mediano 11,9 % por celda (≥30 entrantes) |

Resultados de referencia: primer año nacional 2027 estimado en **382.725** (357.992 a 387.869). Permanencia 2028 estimada en **296.601** (277.434 a 300.588). La validación por celda tiene un error mayor que la nacional, por lo que se entrega como tendencia y no como cifra exacta.

### Límites (obligatorios en la oferta)

1. **Solo agregados.** Ninguna celda con menos de 10 estudiantes se entrega. Las celdas bajo el umbral se suprimen (hoy, 8.082 de 15.043 celdas por carrera y sede).
2. **Sin variables protegidas.** No se entregan cruces por sexo, edad, nivel socioeconómico, origen escolar ni discapacidad como herramienta de decisión. La proporción por sexo puede aparecer solo como dato de planificación, nunca para seleccionar.
3. **Sin uso en admisión.** Prohibido en el contrato y en el producto. Cualquier uso para admitir, seleccionar o priorizar personas termina el contrato.
4. **Intervalos visibles.** Cada cifra lleva su intervalo y su error histórico.
5. **Fuente y fecha** en cada cifra (AGENTS.md 2.1).
6. **Sin lenguaje de etiqueta.** No se describe a grupos de estudiantes como "dispuestos" o "en riesgo". Se describe la cohorte y su tendencia.
7. **Auditoría anual** del uso que la institución le da al informe.

### Cómo podría servir

- **Capacidad:** secciones, docentes y salas por carrera y sede, según la cifra de entrada con su intervalo.
- **Apoyo focalizado:** programas de tutoría por jornada o por carrera donde la retención histórica es más baja, sin etiquetar a estudiantes.
- **Seguimiento de cohorte:** comparar cada año la cifra estimada con la observada, y publicar el error, lo que genera confianza.

## Consecuencias

- **Antes del 1 de diciembre de 2026:** revisión legal del producto y del contrato, incluyendo la lectura completa del artículo 8° bis de la Ley 21.719.
- **Compatibilidad con ADR 0016:** este producto no predice el riesgo de personas. Por eso no está sujeto a las precondiciones de predicción individual.
- **Compatibilidad con ADR 0015:** cualquier dato individual de una institución requiere su vínculo y consentimiento. Este producto no los necesita, porque trabaja solo con agregados públicos.
- **Costo:** actualizar el pronóstico cada año, revisar las celdas suprimidas y mantener la auditoría.

## Artículo 8° bis de la Ley 21.719 (texto verificado en bcn.cl, 2026-11-07)

> "El titular de datos tiene derecho a oponerse y a no ser objeto de decisiones basadas en el tratamiento automatizado de sus datos personales, incluida la elaboración de perfiles, que produzca efectos jurídicos en él o le afecte significativamente."

Excepciones: (a) decisión necesaria para celebrar o ejecutar un contrato; (b) consentimiento previo, expreso y en la forma del artículo 12; (c) ley que disponga salvaguardas. **En todos los casos** el responsable debe garantizar la información y transparencia, el derecho a obtener una explicación, la intervención humana, a expresar el punto de vista y a solicitar revisión.

**Lectura preliminar (no es asesoría legal):**
- El producto de planificación agregada **no toma decisiones sobre personas**, así que el artículo 8° bis no se activa. Eso sostiene la decisión de este ADR.
- Un perfil usado para **admitir o seleccionar** sí produciría un efecto significativo sobre personas. La excepción contractual no cubre una selección que discrimine. Confirma la decisión de excluirlo.
- Un sistema de alerta individual (ADR 0016) sí quedaría bajo este artículo: exigiría las salvaguardas de la letra final, incluida la explicación y la revisión humana. Es una razón más para mantener la precondición de ese ADR.

## Estado de los pendientes

| Pendiente | Estado | Quién |
|---|---|---|
| Leer el artículo 8° bis | **Hecho** (texto arriba) | — |
| Revisión legal del producto y del contrato | **Pendiente.** Requiere un abogado o asesoría legal. Las preguntas para esa revisión están abajo | Asesoría legal |
| Decisión del líder sobre oferta y precio | **Pendiente** | Líder (@rafajaque) |
| Validación con una institución real | **Pendiente.** Requiere contacto con la institución y autorización del líder. No se nombra a ninguna institución en materiales sin autorización escrita | Líder |

## Precio: análisis de compras públicas (2026-11-07)

Búsqueda en agregadores de Mercado Público (todolicitaciones.cl, ganalicitaciones.cl). No se pudo consultar el buscador oficial de mercadopublico.cl desde aquí. No se encontró ninguna licitación adjudicada de estudios de deserción, proyección de matrícula o permanencia en instituciones chilenas.

| Ancla | Fuente | Valor | Pertinencia |
|---|---|---|---|
| Soporte anual de la plataforma académica U+ (DGAC, Escuela Técnica Aeronáutica, 2026), adjudicado a Bettersoft | [todolicitaciones](https://www.todolicitaciones.cl/licitacion/2251-3-LE26/servicio-de-soporte-tecnico-plataforma-u-eta-2026) | $11.900.000 CLP | Solo soporte de un sistema académico. No incluye analítica ni alertas |
| Plataforma SaaS de permanencia para un CFT estatal regional, **desierta** | Ficha pública de Mercado Público (enlace omitido, ver documento interno) | Estimación entre 100 y 1.000 UTM | **La más pertinente**: mismo producto. Desierta, así que no hay precio adjudicado |
| Valor anual implícito en las bases de esa licitación (garantía de fiel cumplimiento) | Bases técnicas, sección 8 | ≈ $13.700.000 CLP | Derivado del texto, no publicado como precio |
| Seguro de deserción académica (Universidad de Santiago) | [todolicitaciones](https://www.todolicitaciones.cl/busqueda/licitaciones) | UF 288 | Es un seguro, no un servicio. No es comparable |

**Lectura:** el ancla más cercana es la licitación desierta, con un presupuesto implícito de unos $13,7 millones al año para un CFT. Es un techo del presupuesto público, no un precio de mercado. El soporte de Bettersoft ($11,9 millones) da una referencia de lo que cuesta mantener un sistema académico, sin analítica.

**Propuesta de rango para validar (no decidida):** entre $11,9 y $13,7 millones anuales por institución, sujeto a la validación con la institución. El precio final lo decide el líder.

## Institución para validar

**Recomendada: un CFT estatal regional** (comprador omitido en este documento; ver documento interno de mercado).
- Es el único comprador público que ha pedido este producto (permanencia y trayectoria), y su licitación fue declarada desierta. Eso permite entender por qué no hubo adjudicación: precio, requisitos (la integración con U+ es habilitante), alcance o falta de ofertas.
- Tiene sedes en dos comunas, cubiertas por el análisis de cohortes.
- Es una institución pública, así que no hay conflicto con la regla de neutralidad del portal, pero el contacto debe hacerse con cuidado: el proceso fue declarado desierto y no debemos intentar influir en una nueva licitación.

**Alternativa:** una institución privada que use U+ (por ejemplo, las que aparecen en el informe de UNIACC), para contrastar la demanda con el sector privado. Esa opción exige revisar la neutralidad del portal si la institución llega a ser cliente.

**Qué preguntar en la validación:** por qué se declaró desierta la licitación; qué precio esperaban; si cuentan con certificado de integración con U+; qué datos agregados tienen y en qué formato; y si les sirve un informe de planificación.

**Antes de contactar:** autorización del líder y de la asesoría legal, por tratarse de una entidad pública.

## Preguntas para la revisión legal

1. ¿El producto agregado de planificación (sin decisiones sobre personas) está fuera del alcance de los artículos 8° y 8° bis de la Ley 21.719?
2. ¿Qué requisitos tiene el contrato con una institución para que la finalidad (planificación de oferta y apoyo) sea lícita y verificable?
3. ¿Cómo se aplica la regla de finalidad (artículo 3°, letra b) si la institución reutiliza el informe para admitir?
4. ¿Qué responsabilidad tenemos como proveedor si la institución usa el informe de forma discriminatoria (Ley 20.609)?
5. ¿Qué condiciones deben cumplirse antes de un sistema de alerta individual, con la excepción de consentimiento del artículo 8° bis?
6. ¿Aplica el artículo 8° bis a estudiantes menores de 18 años, y cómo se integra con la autorización del tutor?

## Anexo: respuestas a las preguntas de una institución (2026-11-07)

La propuesta completa está en [`docs/mercado/propuesta-institucional.md`](../mercado/propuesta-institucional.md). Resumen de lo que hoy es cierto y de lo que falta:

| Pregunta | Respuesta hoy | Falta |
|---|---|---|
| ¿Ahorra tiempo o plata? | No demostrado. Se mide comparando el error de la planificación actual de la institución con el del producto | Serie histórica de la institución |
| ¿Sirve para lo que nos exigen? | Mapeo parcial verificado en BCN: reporte al SIES, plan de cierre y apoyo a la retención para gratuidad (sin meta numérica). Sin verificar: criterios CNA, convenios de desempeño y Ley 21.850 | Leer los PDF de la CNA, Ley 21.850 verificada en BCN (art. 20: suspende nuevas instituciones en gratuidad en 2028 y 2029); falta confirmar la publicación en el Diario Oficial |
| ¿Puedo auditar sin depender de quien lo vende? | Sí, en parte: registro con cadena de hash verificable (`verificar_cadena()`), scripts en el repositorio y fuentes públicas | Instructivo para correr el método con datos propios |
| ¿Qué pasa con mis datos si me voy? | Por diseño, solo datos públicos y agregados | Cláusula de salida con revisión legal (propuesta en la sección 10 de la propuesta) |

**Historial verificable.** Los pronósticos están registrados antes de conocer sus resultados. El calendario de comparaciones (PAES 2027, matrícula 2027 y retención 2027) está en la sección 4 de la propuesta. Ninguna comparación se oculta si sale mal.

**Competencia.** Compromisos: solo agregados con supresión bajo 10; sin ranking de clientes. En la entrega por archivo, cada institución recibe solo su informe. El esquema de base ya tiene `organizacion` y `miembro` con RLS, pero no hay tabla de salidas o de datos por institución; antes de guardar algo así hay que agregar políticas RLS y su prueba (ADR 0002). Esa prueba no se ha ejecutado aquí.

**Compra pública.** Vías posibles: licitación pública nueva, trato directo con causal verificada o convenio de colaboración sin pago. La elección es de asesoría legal. Las bases técnicas mínimas están en la sección 8 de la propuesta.

**Uso concreto.** Capacidad (secciones, docentes, salas por carrera y sede), tutorías focalizadas por carrera o jornada, y seguimiento anual del error. A nivel de carrera y sede, la validación hacia atrás (2022-2026, 18.178 casos) da cobertura de 94,8 % con total conocido, pero el intervalo mediano es de ×3,2. Eso sirve como orden de magnitud, no para decidir una sección; se entrega como tendencia hasta reducir el ancho.
