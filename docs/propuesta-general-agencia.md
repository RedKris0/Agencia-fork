# Propuesta general de la Agencia de Enlace y Seguimiento Estudiantil

Fecha: 2026-11-11 · Estado: **borrador para revisión del líder (@rafajaque)** · Autor: Claude, a partir de la conversación con el líder, de varias rondas de investigación web y de la lectura del repositorio.

Este documento reúne **el problema, lo que se hará, cómo se hará, qué lo diferencia, cómo se financiará y venderá, con qué datos se decide y qué falta por verificar**. Es la versión consolidada de la conversación. Reemplaza como visión general a dos borradores anteriores, que quedan como anexos de detalle:

- [`propuesta-ruta-de-ingreso-asistido.md`](propuesta-ruta-de-ingreso-asistido.md): MVP del 2 de diciembre, cronograma, matriz de la Ley 21.719 y decisiones D1 a D15. **Su sección 7 (venta) quedó superada por la sección 8 de este documento.**
- [`propuesta-estandar-de-transicion.md`](propuesta-estandar-de-transicion.md): estándar de transición para colegios, con su revisión externa.
- El ADR 0027 (propuesta sin fusionar) queda superado por este documento.

Si algo de aquí contradice a `AGENTS.md`, gana `AGENTS.md`. **Este documento no modifica ningún ADR, el entregable ni el código.**

---

## 0. Cómo leer este documento

Cada dato lleva una etiqueta de confianza. **Nada marcado como [Buscador] o [Suposición] debe publicarse en el portal ni citarse como hecho** sin verificarlo en el original (AGENTS.md 2.1).

| Etiqueta | Significa |
|---|---|
| **[Repo]** | Verificado leyendo archivos del repositorio o GitHub el 2026-11-11 |
| **[Leído]** | Se leyó el texto de la página, del PDF, de la ley o del decreto. Muchas páginas web pasan por un resumidor automático, así que no es siempre lectura literal |
| **[Resumen oficial]** | Se leyó el resumen oficial de un estudio (J-PAL, revista), no el estudio |
| **[Buscador]** | Solo un extracto de buscador. **No verificado** |
| **[Suposición]** | Inferencia del autor o de un investigador |
| **[Líder]** | Decisión o postura expresada por el líder |

---

## 1. Resumen ejecutivo

**Problema.** Jóvenes de colegios vulnerables se desconectan de la educación superior por desconocimiento de becas y trámites, pocos recursos y falta de orientación. La información del Estado está repartida en 4 a 6 sitios y algunos indicadores se prestan a mala lectura.

**Fin mayor.** Que más jóvenes de colegios vulnerables **ingresen a la educación superior informados y se queden estudiando**. Es una aspiración de largo plazo a la que la agencia contribuye; no es un resultado que se le atribuya ni que se prometa.

**Qué es la agencia.** Una plataforma **gratuita y abierta**, sin cuenta para su uso básico, que reúne en un solo recorrido: comparar carreras con datos oficiales explicados, simular el puntaje, armar una hoja de decisión y conocer los pasos del FUAS y los plazos. Sobre eso se agrega una **capa para colegios**: un estándar de transición, una autoevaluación y un panel agregado, más una **jornada de ayuda con el FUAS**.

**Lo que dice la evidencia (verificada en originales).** Informar solo no mueve la matrícula; **ayudar con el trámite sí**. Por eso la agencia no es solo un portal: incluye una jornada de ayuda humana en el trámite.

**Cómo se financia.** Hoy **no hay comprador ni financiador confirmado**. La vía más realista es **filantropía y empresas** (el modelo de Por Una Carrera), financiando el bien público gratuito y su evaluación. Una capa de pago para colegios o instituciones es una **hipótesis** por probar. Ninguna fuente le cobra al estudiante, ni hay publicidad.

**Qué se hace hasta el 2 de diciembre de 2026.** El MVP: cuatro tareas centrales sin cuenta ni datos personales, tres funciones avanzadas como intención condicionada, y la publicación del estándar de transición como documento.

**Qué viene después.** Un piloto en 2027 con 1 o 2 liceos que incluye **solo T1, T2 y T4** del estándar, con evaluación publicada.

**Lo que este documento no afirma.** Que la agencia suba la matrícula o baje la deserción; que los estándares británicos "funcionaron con un grupo similar"; que un panel de seguimiento mejore resultados (no hay estudio que lo pruebe); que alguien vaya a pagar.

---

## 2. El problema

### 2.1 Lo que se sabe y con qué fuerza

| Hallazgo | Fuente | Etiqueta | Límite |
|---|---|---|---|
| En una encuesta a 1.076 estudiantes de 3.º y 4.º medio de colegios con índice de vulnerabilidad superior a 70 %: **63,94 %** no sabe qué es el FUAS; **57,25 %** no conoce los requisitos de gratuidad; **64,22 %** no conoce los de mantenerla; **56,5 %** no sabe qué es el puntaje ponderado; **72,5 %**, el Ranking; **45,17 %**, el NEM | Formando Chile, vía El Mostrador, 2023-06-06 | [Leído] | Muestra de un solo programa, no representativa |
| **40,2 %** de 4.º medio no postuló a beneficios en 2022 | El Desconcierto, 2023-09-26, que lo atribuye al Mineduc | [Leído], cifra **no verificada** en el original | No usar como dato duro |
| Egresados de 2020: 143.191 de 258.418 sin matrícula en 2021 | Centro de Estudios del Mineduc, citado en el ADR 0012 | [Repo] | Es no matrícula inmediata, no necesariamente exclusión definitiva |
| Acceso inmediato 2022: 37,8 % en colegios municipales y 68,7 % en particulares pagados | SIES, *Acceso a la Educación Superior en Chile 2022* | [Repo] | Informe de enero de 2023 |
| Retención de primer año, cohorte 2022: 76,0 % (universidades 81,6 %, IP 72,1 %, CFT 71,7 %). Con beneficios 82,0 %; sin ellos 66,5 % | SIES, agosto de 2023 | [Repo] | La diferencia por beneficios es **asociación**, no efecto causal |
| En 2019, 25.464 estudiantes perdieron la gratuidad; 17.310 por **exceder la duración formal de la carrera** | Mineduc vía El Mercurio, citado por prensa | [Leído], de prensa | Es de 2019; no hay cifras de primer y segundo año |
| 2.263 orientadores para todo el país; cada uno atiende más de 7 colegios | Fundación Por Una Carrera vía El Dínamo (2024) | [Leído], cifra de una fundación | No oficial |

### 2.2 Lo que NO tiene respaldo hasta ahora
La investigación **no encontró** fuente que respalde que estudiantes o docentes pidan específicamente un simulador de puntajes o un buscador de PAES anteriores, ni que el PME exija reportar orientación vocacional. Son dolores plausibles que el líder identifica, pero **no deben afirmarse en público como hechos** hasta verificarlos.

### 2.3 Lo que el Estado ofrece hoy
- **mifuturo.cl** ofrece buscador de carreras e instituciones, aranceles, empleabilidad e ingresos; **no se vio comparador ni simulador de puntaje** [Leído].
- Acceso Mineduc y Beneficios Estudiantiles estaban "temporalmente fuera de servicio" al leerlos. DEMRE y SIES no se pudieron abrir.
- Un recorrido completo exige **4 a 6 sitios** [Suposición razonada]. Que DEMRE no tenga un simulador abierto **no está confirmado**: no afirmarlo.

### 2.4 El problema de la "empleabilidad"
- La metodología oficial citada en el repo (`datos/cargar_empleabilidad.py`) la define como **indicador proxy**: titulados que, teniendo información de ingresos, obtuvieron ingresos iguales o superiores al sueldo mínimo. **No mide "tener trabajo"** ni trabajar en el área de estudio [Repo].
- Críticas serias: no mide pertinencia ni calidad del empleo; baja cuando crece la cantidad de titulados (Enfermería: titulados 2.125 en 2020 a 5.652 en 2024; inserción al primer año de 93 % a 78 %) [Leído: 24horas.cl, 2026-08-22].
- **No existe** una fuente chilena confirmada que mida "trabaja en su área" por carrera.
- El comparador **ya muestra** al estudiante qué mide cada indicador (`app/(portal)/comparador/Comparador.tsx`) [Repo].

---

## 3. Objetivos

**Fin mayor:** ingreso informado y permanencia (sección 1).

**Fin específico, medible y bajo control del equipo:**
1. Que una persona complete por sí sola, en menos de 10 minutos, las **cuatro tareas centrales** del MVP (sección 5.1).
2. Que cada estudiante termine con una hoja de decisión de tres opciones y una de respaldo.
3. En el piloto 2027: mejora medida del conocimiento sobre FUAS y gratuidad; más estudiantes que completan el FUAS (confirmación del propio estudiante: "inició", "envió", "obtuvo").
4. Continuidad (renovación de beneficios y segundo año), **solo con consentimiento y reportada como resultado observado, no como efecto causado**.

**Lo que no se promete:** que la agencia aumente la matrícula o reduzca la deserción; predecir deserción; mejorar la salud mental; mostrar dónde trabaja quien estudia cada carrera; que ayude a cumplir una obligación legal de acompañamiento (no existe, ADR 0012).

---

## 4. Teoría del cambio y evidencia verificada

La conclusión de toda la revisión: **la información sola no basta; lo que mueve resultados es la ayuda concreta con el trámite**. Por eso la agencia combina un portal con una jornada de ayuda humana.

| Eslabón | Evidencia | Qué se leyó | Límite |
|---|---|---|---|
| **La ayuda con el trámite sube postulación y matrícula** | H&R Block (Bettinger, Long, Oreopoulos y Sanbonmatsu, QJE 2012): 26.162 personas. Último año, con ayuda: completar el formulario **+15,7 puntos**; matrícula **+8,1 puntos**; haber completado 2 años de universidad en 3: **+8 puntos** (28 % a 36 %). **Solo informar: sin efecto.** Costo ~88 US$ por persona | Documento de trabajo completo y resumen oficial de J-PAL [Leído / Resumen oficial] | Muestra voluntaria de clientes de una empresa en 2 estados; **titulación no concluyente** (+2,7 puntos, intervalo que incluye cero) |
| **Informar costos e ingresos mejora la elección, no la matrícula** | Hastings, Neilson y Zimmerman con el Mineduc de Chile (NBER 21300): 49.166 respuestas. No cambia quién se matricula; baja 3,3 % (4,6 % en nivel bajo) la matrícula en programas de menor retorno; en nivel bajo, **+2,4 puntos** matriculados a 4 años, **pero −1,8 puntos** en titularse en 3 años o menos | [Leído] texto completo | Solo 30 % de los postulantes respondió; no sigue hasta titulación; un año |
| **Una persona que acompaña mueve resultados** | Carrell y Sacerdote (2017): 2.624 estudiantes rezagados en postular. Mentoría +6,0 puntos de matrícula (+14,6 en mujeres, +0,7 en hombres); carta o bono solos: sin efecto. ~US$300 | [Leído] | Colegios voluntarios, muestra mayormente blanca |
| **La asesoría intensiva tiene el mayor efecto y cuesta mucho** | Bottom Line (AER 2025): 2.422 estudiantes de bajos ingresos y "listos". Título a 5 años **+7,6 puntos**; costo US$2.145 a 4.161 | [Leído] NBER | Solo estudiantes con buen rendimiento; inalcanzable para el equipo |
| **Un DVD sobre ayuda financiera, en Chile** | Dinkelman y Martínez: 226 colegios pobres de la RM. Ausentismo **−14 %**; sin efecto en notas ni matrícula de 9.° | [Leído] documento de trabajo | Mide esfuerzo, no acceso a educación superior |
| **Un orientador con IA y un profesor** | "Eligiendo Mi Camino" (Banco Mundial, Perú): experimento aleatorio en más de 100 colegios; resultados preliminares: +0,12 desviaciones estándar en preparación de carrera y +14 % de intención de matricularse en institutos técnicos; ~1 US$ por estudiante | [Leído] blog del Banco Mundial (31-jul-2026) | **Es intención, no matrícula**; evaluación completa el próximo año |
| **PACE no cambió el ingreso a cualquier institución** | Cooper et al. (2019) para la Dipres: +3,25 puntos en universidades del sistema único de admisión, concentrado en el 15 % de mejores notas | [Leído] PDF completo | Retención y titulación aún sin evaluar |
| **Estándares de orientación del Reino Unido** | Informe de la Careers & Enterprise Company (2021): 2.606 colegios. Con 0, 4 y 8 estándares, egresados sin educación ni empleo a los 16 años: **7,2 %, 6,8 % y 6,5 %**; en el cuarto más desfavorecido, 13,4 % a 10,7 % | [Leído] texto completo | **Observacional y autoevaluado; los autores dicen que no demuestra causa**; mide a los 16 años, no ingreso a superior |
| **Los mensajes masivos no funcionan a escala** | Bird et al. (2021): ~800.000 estudiantes, efecto nulo | [Buscador] | Sin verificar |

**No se citan por no estar verificados:** Castleman y Page (mensajes de texto), Owen y Westlund (panel por estudiante), Mulhern (Naviance), y las cifras "8 % menos" y "20 % menos" de jóvenes sin estudio ni empleo atribuidas a los estándares británicos.

**Una limitación general:** casi toda la evidencia causal es de Estados Unidos; para Chile hay solo dos estudios (Hastings y Dinkelman y Martínez), y ninguno mide la ayuda con el FUAS. **No existe un estudio que aísle el efecto de un panel de seguimiento para colegios**; los aumentos de Luisiana (48 % a 85 %) y Texas (+12,5 puntos) son efecto de un **mandato** de completar el formulario, no del seguimiento [Resumen / buscador].

---

## 5. Qué se hace y cómo

### 5.1 El portal del estudiante (MVP del 2 de diciembre)

**Definición de "bueno":** una persona entra desde un teléfono de 360 px, **sin cuenta y sin dejar datos**, y completa en menos de 10 minutos estas **cuatro tareas centrales**:

| Tarea | Qué hace | Qué lo hace posible |
|---|---|---|
| **T1** | Busca y compara dos carreras e interpreta una cifra | Explorador, fichas y comparador con "qué mide" y fuente, URL y fecha |
| **T2** | Simula su puntaje ponderado y ve cuánto le falta. Su Puntaje Ranking oficial **lo ingresa él mismo** (la plataforma no lo calcula, ADR 0024) | Simulador (PR 132) sobre `lib/calculos/2027/puntaje-ponderado.ts` |
| **T3** | Arma su hoja de decisión: tres opciones y una de respaldo | Hoja imprimible o descargable, que no se guarda en servidor |
| **T4** | Identifica los pasos del FUAS y su próximo plazo | Guía paso a paso, lista de documentos y calendario con fuente y vigencia |

**Estado real hoy [Repo, 2026-11-11]:**
- En `main` hay cinco pantallas: portada, beneficios, explorador con fichas, comparador y componentes.
- La lógica del puntaje ponderado existe con pruebas; **la pantalla del simulador está en el PR 132 de Alejandro, abierto**. Ese PR también toca la capa de datos de la oferta (`lib/datos/`, `scripts/exportar-oferta.ts`), así que su revisión no es trivial.
- El PR 62 (carga DEMRE 2027) figura **cerrado sin fusionar**, mientras la guía del líder lo da por corregido y la de Cristóbal por abierto: **verificar en producción**.
- No existen aún la hoja de decisión, la guía del FUAS paso a paso ni el calendario como pantalla (tarea C14 de Cristóbal).

**Capa 2 (intención condicionada, el líder aceptó las tres primeras):**

| Función | Qué aporta | Esfuerzo | Fecha de decisión |
|---|---|---|---|
| Simulador inverso ("¿cuánto me falta?" frente al último corte) | Lo más útil para el estudiante | Medio; **requiere puntajes de corte cargados (por verificar)** | 16 nov |
| "Mi ruta" guardada solo en el teléfono y descarga de plazos (.ics) | Acompañamiento sin recolectar nada | Medio | 20 nov |
| Competitividad en la ficha (cupos frente a demanda) | Diferenciador | Medio; depende del ADR 0026 (sin fusionar) | 20 nov |
| Asistente con fuentes citadas (**excluido por defecto**) | Dudas del FUAS y de lectura de datos | Alto; exige pruebas de crisis, alertas con revisión humana, proveedor de pago y variables en Cloudflare | **20 nov** (go/no-go) |
| PWA instalable | Mejor con datos limitados | Bajo | 20 nov |

**Compromiso e intención.** Solo la base (T1 a T4) es compromiso. Las funciones de la capa 2 salen sin afectar el hito si una dependencia falla. **Congelamiento de funciones: viernes 27 de noviembre.**

**Decisión del líder (11-nov):** el simulador PAES con IA que corrige errores **queda fuera del primer año**. Se orienta a recursos oficiales y gratuitos.

### 5.2 El estándar de transición para colegios

Seis componentes con tres niveles (inicial, satisfactorio, avanzado), adaptados de los *Gatsby Benchmarks* del Reino Unido y alineados con el **estándar 7.3** de los Estándares Indicativos de Desempeño chilenos (DS 27/2020). Detalle completo en [`propuesta-estandar-de-transicion.md`](propuesta-estandar-de-transicion.md).

| # | Componente | En el primer piloto |
|---|---|---|
| **T1** | Plan anual de transición con responsable, publicado a las familias y evaluado | **Sí**, como plantilla breve |
| **T2** | Información oficial y actualizada para estudiantes y familias | **Sí** (es el portal) |
| T3 | Hoja de decisión personal y una reunión individual en 3.° y otra en 4.° medio | No: exige orientadores y tiempo que muchos liceos no tienen |
| **T4** | **Jornada de postulación asistida al FUAS** en 4.° medio, con un adulto designado por el liceo | **Sí** (el componente mejor respaldado) |
| T5 | Al menos 2 encuentros con instituciones de educación superior de distinto tipo | No: respaldo normativo chileno parcial (el 7.3 habla de visitas a *sitios web*) y riesgo de captación |
| T6 | Registro y seguimiento voluntario de destinos hasta el primer año | No: caro, sesgo de no respuesta, sin dato oficial para validarlo |

**Por qué un estándar en Chile.** Lo que las normas chilenas piden hoy: el 7.3 pide orientar "en la toma de decisiones sobre su futuro" y, en el nivel satisfactorio, informar sobre el acceso a la educación superior [Leído]. **No hay ley que obligue** a un colegio a tener orientador ni plan de orientación; en 3.° y 4.° medio Orientación es un taller en horas de libre disposición, no una asignatura (Decreto 193/2019). **Lo que ninguna norma cubre:** el seguimiento de egresados, la ayuda concreta con el FUAS y un indicador de resultado de la transición [Leído]. El estándar se ubica ahí.

**Frase pública.** El líder aceptó: *Alineado con estándares de orientación usados en el Reino Unido, adaptados a Chile.* La revisión de Codex y Antigravity objetó la segunda oración ("medimos y publicamos resultados") porque promete más de lo medible. **Redacción propuesta:** *Inspirado en estándares de orientación usados en el Reino Unido, adaptados a Chile. Publicamos cómo se implementa y qué medimos, con sus límites.* La decide el líder.

### 5.3 Autoevaluación y panel para colegios

**Autoevaluación (equivalente a Compass+, que en el Reino Unido es gratuita):** un cuestionario anual de T1 a T6 con descriptores por nivel. Da un perfil del colegio y recomendaciones. **Sin ranking entre colegios; privado por defecto.** Es autoevaluación y se presenta como herramienta de mejora, no como prueba de efecto.

**Panel agregado:** en el primer piloto se reduce a una **lista de verificación privada de implementación** (T1, T2, T4) y conteos agregados de uso, con tasa de respuesta visible y celdas pequeñas ocultas. Maqueta de referencia con datos de ejemplo: ver la conversación del 11-nov. Lo que ven los colegios en los paneles equivalentes [Leído parcial]: Scoir ofrece 8 informes estándar (postulaciones, resultados y planes, becas, tests, visitas) con CSV o PDF; Xello, completación de tareas por estudiante y grado; el seguimiento de completaciones del formulario de ayuda financiera en EE. UU. muestra conteos por colegio, con colegios de menos de 5 completaciones ocultos.

**Qué no muestra:** datos nominales sin consentimiento expreso, datos de salud ni socioeconómicos, etiquetas de riesgo, puntajes individuales, ranking de colegios.

**Descartado en el primer piloto:** el "código de curso anónimo". Los dos revisores señalaron que en cursos pequeños se puede reidentificar por descarte (Ley 21.719).

**Diseño pendiente de decisión:** un panel solo agregado no le sirve al orientador para saber **a quién** ayudar. Una vía compatible con que la Ficha es del estudiante: que cada estudiante decida si comparte su avance con su orientador. Exige consentimiento (y tutor si es menor) y revisión legal; **queda fuera del primer piloto**.

### 5.4 La jornada de postulación asistida (T4)

Una jornada presencial en el colegio, antes del cierre de postulación, con guía paso a paso y lista de documentos. **Protocolo mínimo** (revisión legal antes de la primera jornada):
1. El estudiante o su familia ingresa a sus propias cuentas desde su dispositivo; el adulto del liceo ayuda con la logística, **no maneja claves ni documentos**.
2. El equipo no está en la sala durante el llenado y no recibe capturas, documentos ni respuestas.
3. Un adulto designado por el liceo, consciente de su deber de reserva sobre datos socioeconómicos.
4. Aviso de privacidad visible y una guía para hacerlo en privado en casa.

### 5.5 Seguimiento

Reducido para el primer piloto a: una **consulta voluntaria única** al final de 4.° medio sobre metas y plan (no destino) y una **solicitud de transparencia al Mineduc** por el agregado de matrícula en educación superior por establecimiento. Hoy el Mineduc publica los seleccionados por quintil y tipo de establecimiento, **no por colegio** [Leído]; no se confirmó si hay datos abiertos que lo permitan.

**La trampa a evitar:** el piloto británico de los estándares **no pudo medir destinos** por falta de datos fiables. Por eso el plan de datos se define antes, no después.

### 5.6 Un producto que ya existe y se mantiene aparte

El **tablero de pronóstico de matrícula** para instituciones (ADR 0017 y 0018, `docs/manual-tablero-pronostico.md`) usa solo datos públicos y agregados. Estimación nacional de primer año 2027: 382.725 (rango 357.992 a 387.869); error mediano por celda 11,9 % [Repo]. Incluye un planificador de secciones. **Producto secundario** para instituciones, no el centro. **Cautela:** el ADR 0018 tiene estados inconsistentes sobre su revisión legal; esta propuesta no se apoya en ella.

### 5.7 Lo que no se hace
Publicidad; cobrar al estudiante o a su familia; clases de contenido PAES y práctica PAES con IA; predicción de deserción; pulso de check-in; traspaso de estudiantes pagado por instituciones; vender datos personales; ordenar o destacar instituciones por ser clientes; uso de los datos de la plataforma en la admisión de los colegios.

---

## 6. La innovación

| Qué | Por qué es distinto | Estado |
|---|---|---|
| **Datos honestos, con "qué mide y qué no" en cada cifra** | La empleabilidad se presta a mala lectura y no encontré lo mismo en sitios equivalentes (no pude abrir todos) | Parcialmente construido (comparador) |
| **Un solo recorrido**: elegir, simular, decidir y tramitar | Hoy exige 4 a 6 sitios | MVP |
| **Abierto y sin cuenta**, para cualquier estudiante, aunque su colegio no participe | Un programa presencial no escala igual; el costo por usuario adicional es casi nulo | Diseño |
| **Un estándar de transición para Chile**, adaptado de los estándares británicos y alineado con el 7.3 | Cubre vacíos que ninguna norma cubre (seguimiento, ayuda con el FUAS, indicador de resultado). **No encontré un equivalente chileno** | Documento; piloto 2027 |
| **Ayuda humana puntual dentro de un portal gratuito** | La evidencia dice que informar solo no basta | Piloto 2027 |
| **Evaluación publicada, con límites** | No encontré evaluación externa de los programas chilenos equivalentes | Plan; no hay grupo de comparación con 1 o 2 liceos |
| **Simulador inverso y competitividad (cupos frente a demanda)** | El Estado no muestra "cuánto me falta" así | Capa 2, condicionada |
| **Indicador de tránsito por colegio** | Nadie lo publica | **Hipótesis**: depende de la respuesta del Mineduc |

**Lo que no se afirma:** que seamos mejores que mifuturo.cl, DEMRE o Por Una Carrera. Ellos tienen años de trayectoria, y Por Una Carrera presencia real en 37 colegios.

---

## 7. Posicionamiento y mercado

**Postura frente a los sitios del Estado:** una alternativa transparente que usa los mismos datos oficiales y los explica. **No** se dice que mifuturo.cl "publica datos falsos": los datos son reales; el problema es cómo se leen.

| Quién | Qué ofrece | Qué se sabe |
|---|---|---|
| **mifuturo.cl** | Datos oficiales | Sin comparador ni simulador a la vista [Leído] |
| **Fundación Por Una Carrera** | Talleres presenciales de proyecto de vida y de postulación al FUAS en 37 colegios (2024); plataforma con login por colegio; chat de IA; becas con seguimiento de 2 años para 100 becarios de Antofagasta Minerals | ONG de 2008. Resultados autorreportados: 57,5 % de asesorados ingresó a superior y 88,7 % obtuvo algún beneficio estatal; **sin evaluación externa que encontrara** [Leído] |
| **PACE** (Estado) | Acompañamiento en más de 650 establecimientos focalizados | Un oficio de Hacienda cuestiona su presupuesto 2027 [Leído, El Mostrador] |
| **INACAP** | Chat de orientación con IA gratuito, 72 mil usuarios y 470 mil conversaciones | Una institución orientando hacia sí misma [Leído] |
| **Edumetrics** | Test vocacional y un "informe para colegios" a más de 40 colegios | Sin precios públicos; no se vio qué ve el colegio [Leído] |
| **Foris, U-Planner, Ucampus** | Alertas y seguimiento dentro de la universidad | Operan después del ingreso, con datos de la institución [Leído en parte] |
| **Naviance, Xello, Scoir, Unifrog, Compass+** (extranjero) | Plataformas y paneles para colegios | Adopción masiva, **evidencia débil de efecto**; Compass+ es gratuita y financiada por el Estado [Leído parcial] |

**Corrección:** no encontré nada sobre Scitis, Bettersoft ni Psicometrix, así que no se afirma que existan como proveedores de retención.

**El hueco que propongo:** nadie neutral y gratuito para el estudiante cubre **elegir, postular y mantener beneficios** en un solo recorrido, con cada cifra explicada, y además ofrece a los colegios un marco para organizar su trabajo. **Es una hipótesis**: solo significa que las búsquedas no lo hallaron.

---

## 8. Cómo se financia y cómo se vende

### 8.1 Punto de partida honesto
**No hay comprador ni financiador confirmado.** Hay evidencia de quién pagó por algo equivalente, no de que alguien pagará por esto.

### 8.2 Modelo: bien público gratuito más tres fuentes

| Fuente | Rol | Estado |
|---|---|---|
| **Filantropía y empresas** | Financian el bien público gratuito, el piloto y su evaluación. **Es el modelo de Por Una Carrera** | La más plausible; exige entidad sin fines de lucro |
| **Colegios y sostenedores** | Primero **socios del piloto sin costo**; una capa de pago (panel, informes, soporte) solo después de validar que pagarían | **Hipótesis sin validar** |
| **Instituciones de educación superior** | Actividades de vinculación con el medio en colegios de su territorio, con reglas públicas | **Hipótesis y zona gris de neutralidad: decisión del líder** |

### 8.3 Qué dice la evidencia sobre compradores

- **Chile: ninguna compra confirmada** de una plataforma de orientación o de un panel de seguimiento (colegio, sostenedor o institución). Mercado Público no se pudo consultar por proveedor, así que es "no encontrado", no "no existe".
- **Lo que sí compran los municipios** son preuniversitarios PAES y plataformas de gestión escolar [Leído en agregadores]: Lo Espejo $12.999.990 (un solo oferente); Villa Alegre hasta $16.065.000 con IVA para 80 jóvenes; Talcahuano $2.500.000 por un año para un liceo; Casablanca $19.327.731 con fondos SEP (gestión escolar, no orientación). Una licitación de permanencia de un CFT estatal, de unos $13,7 millones anuales, **quedó desierta** [Repo].
- **Hay una línea de gasto concreta en el PME 2026:** el gasto 410 500, "asesoría técnica y actividades de información y orientación", y la cuenta 410 501 de Asistencia Técnica Educativa (ATE), que exige entidades del registro [Leído].
- **Extranjero** [contratos leídos]: Seattle (2020) pagó ~US$217.000 al año por Naviance, unos **US$11,30 por estudiante** (inferencia sobre las unidades de la orden); Chicago (2022), ~US$2 millones al año con SchoolLinks para todo el distrito. El rango observado es de **US$2,40 a 11,30 por estudiante**, con lo más repetido entre 3 y 6 (varios contratos solo en extractos). **El comprador es el distrito, no el colegio.**
- **Dato contra la idea de que el colegio paga:** el producto más parecido en Chile, el monitoreo de Por Una Carrera, lo paga la filantropía; en 2024 los colegios aportaron unos $60 millones (10 %) de sus ingresos.

### 8.4 Financiadores confirmados y convocatorias
- **Ya financiaron algo parecido** (vistos en documentos): Fundación Luksic (Aspiraciones sobre el Futuro, 63.000 estudiantes en 2025; fondo FIE para liceos técnicos), Fundación Itaú, Antofagasta Minerals y Viña Santa Rita (vía Por Una Carrera), Fondo Transforma (Colunga y Huneeus; $35 a $90 millones por hasta 36 meses), BHP con Reimagina (US$3 millones).
- **Ninguna convocatoria abierta hoy que calce.** Las de 2026 cerraron y las de 2027 no tienen fecha. Patrones: Transforma, junio-julio; FFOIP, marzo-mayo.
- **Por Una Carrera (referencia financiera, estados firmados):** ingresos de $381 millones (2023) y $592 millones (2024); costos de ~$550 millones; **76 % del ingreso en dos fuentes**; 83 % de ingreso restringido; 12 trabajadores; 11.614 usuarios directos (~$47.000 de costo por usuario); patrimonio de $185 millones, unos 4 meses de costos [Leído].

### 8.5 Vehículo legal: el reloj corre contra el tiempo
- Se necesita una entidad para facturar, firmar convenios y postular a fondos. **Ser sin fines de lucro es requisito de casi todos los fondos leídos.**
- **Antigüedad exigida:** Recuperando Chile pide 2 años de personalidad jurídica; el Registro de Donatarios (Ley 19.885) pide 1 año desde su otorgamiento, más memoria y balance de un año calendario [Leído en ChileAtiende]. **El reloj empieza el día que se otorga la personalidad jurídica.** Cada mes de demora retrasa el acceso a esos fondos.
- **Opciones:** (A) vender o canalizar a través de una universidad; (B) constituir una fundación o corporación; (C) solo pilotos gratuitos con convenio. Recomendación: **C ahora y A o B en paralelo**, con asesoría legal. Una alianza con una fundación existente como entidad ejecutora **no está confirmada como válida**.
- **No existe en Chile una ley de Sociedad BIC** [Buscador]: queda descartada esa figura. (La Ley 21.246 mencionada antes en la conversación es de otro tema.)
- Una fundación puede vender servicios (Por Una Carrera lo hace); el tratamiento tributario debe revisarlo un contador.

### 8.6 Costo de un equipo de tres
Con costos reales de Por Una Carrera 2024 por persona: **~$49 millones al año más una reserva de ~$16 millones** [Suposición, con la cuenta mostrada en la conversación]. La infraestructura es baja: Supabase Pro 25 US$ al mes; una conversación con IA cuesta del orden de 0,002 US$ (estimación sin medir uso real) [Buscador]. El costo real son las personas.

### 8.7 Qué se vende y a quién (hipótesis a validar)
- **El portal público es siempre gratuito.** Lo que se podría vender son servicios que el estudiante no necesita: panel agregado, informes periódicos, material y soporte para orientadores, y la jornada de postulación asistida.
- **Pagador probable:** un sostenedor, SLEP o corporación, no el liceo individual, usando la línea 410 500 del PME. Para entrar como proveedor nuevo: estar "Hábil" en ChileProveedores y, para montos bajos, Compra Ágil (hasta 100 UTM, con tres cotizaciones; el monto en pesos y las reglas vigentes **por verificar**). El Registro ATE se exigió en bases de ATE ligadas al PME con fondos SEP y no en los preuniversitarios leídos.
- **Hipótesis de motivo de compra:** un colegio podría querer un informe verificable de su acompañamiento para diferenciarse de otros colegios. Hay un caso: la Red SIP usa su ingreso a educación superior (+10 a +15 puntos sobre el promedio de subvencionados, autorreporte sin auditoría) como argumento [Leído]. **No encontré evidencia de que paguen por eso.**
- **Riesgo:** con una reforma que permitiría que los colegios seleccionen estudiantes (proyecto presentado en junio de 2026; **el estado de su tramitación es contradictorio entre fuentes**), un indicador de tránsito puede usarse como marketing y reflejar a quién se admite, no cuánto ayuda el colegio. Salvaguardas: prohibir en el contrato el uso en admisión (como ya hace el ADR 0018 para el pronóstico), mostrar proceso y no resultados, comparar al colegio solo consigo mismo, y exigir que toda cifra citada lleve su metodología y su tasa de respuesta.

### 8.8 Plan de validación comercial (una sola hipótesis)
**Hipótesis única:** *una fundación que financie iniciativas de educación o niñez, por medio de una entidad sin fines de lucro, financiaría el piloto 2027 si se le presenta el MVP funcionando y un diseño de evaluación honesto.*
- **Responsable:** el líder. **Conversaciones:** cinco, entre el 16 de noviembre y el 15 de diciembre (fechas sin fijar): tres con fundaciones o programas de responsabilidad social, una con un colegio o sostenedor y una con una dirección de vinculación con el medio de una institución. **Contacto sugerido para empezar:** Fundación Luksic.
- **Guion corto:** qué problema reconocen; qué evidencia piden; a qué tipo de entidad pueden financiar; montos y plazos habituales; **qué condición concreta les impediría financiar o comprar**; y, a sostenedores: *"¿usarían un informe verificado de su acompañamiento para diferenciarse? ¿cuánto valor le darían?"*.
- **Pasos baratos adicionales:** pedir una cotización a Edumetrics; buscar a Edumetrics y a Por Una Carrera como proveedores en Mercado Público y en transparencia municipal.
- **Decisión:** si al menos una conversación termina en invitación a postular o carta de intención, se define el vehículo legal. Si ninguna, se revisa la hipótesis de pagador en enero. Los umbrales los fija el líder.
- **Pregunta abierta, hoy sin respuesta:** **por qué participaría voluntariamente un liceo vulnerable**, dado que el estándar chileno 7.3 no tiene sanción ni financiamiento (hallazgo de la revisión de Antigravity).

### 8.9 Modelos descartados y por qué
| Modelo | Por qué se descarta |
|---|---|
| **Publicidad** | Prohibida por AGENTS.md sección 1. Además: ~7.500 a 22.500 US$ al año como techo con todo el país (aritmética ilustrativa); el público vulnerable vale poco; anuncios de instituciones rompen la neutralidad; cookies chocan con la Ley 21.719; pesan en teléfonos con datos limitados. No encontré una cifra confiable de ingreso por publicidad en un sitio educativo chileno |
| **Cobrar a instituciones por contactos o posición** (UCAS Media, Quero Bolsa, Niche, Cappex) | Rompe la neutralidad |
| **Pre universitario pagado por apoderados** | Rompe "gratis para el estudiante" y compite con Cepech |
| **Vender datos agregados** | Riesgo legal (reidentificación) y de confianza |
| **Traspaso de estudiantes pagado por instituciones** | Convierte la Ficha en un activo comercial |

---

## 9. Marco legal y reglas del proyecto

### 9.1 Ley 21.719 (protección de datos personales)
**Advertencia de fuente:** los artículos salen de un consolidado **no oficial** (datacompliance.legal, 20 de marzo de 2026). **Hay que cotejarlos con el texto oficial y con un abogado.** El detalle y la matriz función por función están en la sección 10 de `propuesta-ruta-de-ingreso-asistido.md`.

- **Vigencia:** el artículo 1.º transitorio fija el **1 de diciembre de 2026**; hay un proyecto en trámite (Boletín 18.623-07) que la posterga, con nueva fecha propuesta del 15 de octubre de 2027, no publicado al 5 de noviembre según fuentes no oficiales. **Se diseña como si rigiera hoy.**
- **Consecuencias de diseño:** el MVP **no tiene cuentas ni servidor con datos personales**. La situación socioeconómica es dato sensible (art. 2 g): consentimiento expreso. Para menores: tutor siempre bajo 14 años; para datos sensibles bajo 16 (art. 16 quáter); AGENTS.md exige tutor para menores de 18, más estricto que la ley. El pulso de check-in **no se implementa** hasta revisión legal. Entregar datos al colegio o a un apoderado es una cesión que exige consentimiento por escrito (art. 15). Las métricas para el colegio se muestran solo con un tamaño mínimo de grupo (por definir). Transferencia a Brasil (alojamiento) y a un proveedor de IA extranjero exige garantías (arts. 27 y 28).
- **Quién es el responsable de datos** de un equipo sin personalidad jurídica: **pendiente de asesoría legal**.

### 9.2 Reforma del Sistema de Admisión Escolar
El proyecto de junio de 2026 permitiría que colegios seleccionen estudiantes, con resguardos para los prioritarios de la SEP. Efecto sobre la agencia: refuerza la prohibición de usar datos de la plataforma en la admisión, y el riesgo de marketing con cifras del panel (sección 8.7). Su estado de tramitación **debe verificarse en el sitio del Congreso**.

### 9.3 Reglas de AGENTS.md que condicionan todo
Gratis para el estudiante siempre; neutralidad; datos oficiales con fuente, URL y fecha; la Ficha es del estudiante y se comparte solo con consentimiento; la IA responde con fuentes oficiales y deriva en crisis, no es terapeuta; sin datos personales en IA de plan gratuito; solo valores de `diseno/tokens.json`; WCAG 2.2 AA y 360 px; cambio más pequeño que resuelve la tarea; ningún cambio llega a `main` sin revisión con la pauta `revisar-pr`.

---

## 10. Plan y cronograma

### 10.1 Hasta el 2 de diciembre de 2026

| Semana | Fechas | Qué |
|---|---|---|
| 2 | **mié 11 al lun 16 nov** | Revisar y fusionar el PR 132 (simulador) y el PR 96; verificar puntajes de corte y la carga DEMRE en producción; diseñar la hoja de decisión; reescribir los objetivos del entregable; iniciar contactos legales; ficha real desplegada |
| 3 | **mar 17 al lun 23 nov** | Guía del FUAS paso a paso y calendario (C14); hoja imprimible; "Mi ruta" y .ics; simulador inverso. **Viernes 20 nov: go/no-go del asistente.** Lunes 23: despliegue de los objetivos de explorador y simulador |
| 4 | **mar 24 al lun 30 nov** | Competitividad en la ficha (si el ADR 0026 se aprueba). **Viernes 27 nov: congelamiento.** Pruebas con 5 usuarios (24 al 30), accesibilidad, rendimiento, lenguaje claro, verificación cruzada de datos |
| Cierre | **mar 1 y mié 2 dic** | Publicación y presentación. Fecha legal: 1 de diciembre de 2026 (salvo prórroga publicada) |

**Planes de contingencia:** si el PR 132 no llega, un simulador mínimo solo con el ponderado, sin tocar la capa de datos; si el calendario no llega, publicar solo los hitos verificados y marcar el resto "por confirmar"; si la carga DEMRE no está verificada, mostrar solo las carreras verificadas y "sin dato" en el resto; si el equipo no alcanza, se cortan primero el asistente, luego competitividad, "Mi ruta" y el simulador inverso.

### 10.2 Después (propuesta, sin compromiso)
| Cuándo | Qué |
|---|---|
| Nov a dic 2026 | Constituir la entidad o acordar una alianza; cinco conversaciones; medición de base; solicitud de transparencia por datos por colegio |
| Ene a mar 2027 | Carta de intención o convenio con un liceo; kit del piloto |
| Mar a oct 2027 | Piloto con 1 o 2 liceos (T1, T2, T4), con jornada de postulación asistida en temporada |
| Dic 2027 a 2028 | Informe de resultados; decisión sobre T3, T5 y T6 |

**Las fechas del proceso de admisión y del FUAS 2027 no se verificaron.** Hay que confirmarlas en la fuente oficial.

---

## 11. Cómo se mide

### 11.1 MVP (2 de diciembre)
| Indicador | Meta |
|---|---|
| Tareas centrales completadas sin ayuda (5 usuarios × 4 tareas) | ≥ 80 % (16 de 20) |
| Tiempo total de T1 a T4 por usuario | < 10 minutos |
| Cobertura y trazabilidad: carreras publicadas con fuente, URL y fecha | 100 % |
| Indicadores mostrados con "qué mide y qué no" | 100 % |
| Usuarios que arman su hoja de decisión | ≥ 80 % |
| Calidad: lint, pruebas, `python3 scripts/tokens.py --check`, 360 px y teclado | Todos pasan |

**Prueba con 5 usuarios (24 al 30 de nov):** personas de 16 a 24 años del segmento, preferentemente mayores de 18 o con autorización del tutor; consentimiento informado simple sin recolectar datos personales; tareas T1 a T4 con guion fijo y **sin datos reales del FUAS**; ficha por persona con tiempo, ayuda requerida y errores; registros anónimos y borrados al cerrar.

### 11.2 Piloto 2027
Conocimiento antes y después con cuestionario propio; avance en el trámite confirmado por el estudiante (sin guardar formularios); renovación y segundo año solo con consentimiento y tasa de respuesta visible; matrícula, retención y titulación **como contexto, nunca como efecto**. **Con 1 o 2 liceos no habrá prueba causal**; aleatorizar por colegio exige muchos colegios (los estudios chilenos de Hastings y de Dinkelman y Martínez lo hicieron con cientos).

---

## 12. Riesgos

| Riesgo | Mitigación |
|---|---|
| **No hay comprador ni financiador confirmado** | Filantropía primero; piloto como evidencia; conversaciones que preguntan qué lo impediría |
| **Vehículo legal inexistente y relojes de antigüedad** (1 a 2 años) | Constituir o aliarse ya |
| Los colegios no pagan por orientación; sí por preuniversitario | Colegio como socio del piloto sin costo; probar disposición a pagar con la pregunta del guion |
| **Un liceo vulnerable no tiene incentivo para participar** | Sin respuesta hoy; explorar PACE, SLEP y financiamiento externo |
| Ley 21.719 puede regir el 1 de diciembre | MVP sin cuentas ni datos en servidor; protocolo T4 y revisión legal |
| Uso de las métricas para marketing o selección de alumnos | Cláusula contractual, proceso y no resultados, metodología en toda cifra |
| El equipo no cierra todo en 21 días | Capas, go/no-go, congelamiento el 27 de noviembre |
| Un plazo o regla desactualizada perjudica a un estudiante | Datos con vigencia, fuente y fecha; revisión de textos |
| Competir por los mismos financiadores que Por Una Carrera | Presentarse como bien público digital abierto con evaluación; explorar alianza |
| Cifras de prensa o de buscador se cuelan como hechos | Etiquetas de este documento; verificación obligatoria |

---

## 13. Decisiones

### 13.1 Tomadas por el líder
- Posicionarse como alternativa transparente a mifuturo.cl y los sitios del Estado.
- Descartar la publicidad como fuente de ingresos.
- Dejar el simulador PAES con IA fuera del primer año.
- Incluir tres funciones avanzadas en el MVP como intención condicionada.
- Aceptar la frase "alineado con estándares usados en el Reino Unido, adaptados a Chile" (con la segunda oración objetada por la revisión).

### 13.2 Pendientes del líder
1. **Vehículo legal:** A, B o C con A o B en paralelo; asesoría legal esta semana.
2. **Frase pública:** la de la sección 5.2 o la original.
3. **Si una institución puede financiar actividades en colegios de su territorio**, con reglas públicas y sin efecto en el buscador.
4. **Si el panel incluye, además del avance de estudiantes, una autoevaluación del colegio** (propuesta aquí).
5. Cambios al entregable (objetivos, simulador de puntaje y no de beneficios, OE3 sin Ficha ni pulso) y al calendario.
6. Umbrales de éxito del piloto y de las conversaciones.
7. Con quién conversar primero y a quién se le pide la cotización de Edumetrics.
8. Qué se hace con el ADR 0027 y con las entradas previas de la bitácora.

---

## 14. Lo que no se sabe (a verificar antes de afirmar)

1. Texto oficial de la Resolución 2076/2021 y de las orientaciones del PME.
2. Castleman y Page, Owen y Westlund y Mulhern en el original; errores estándar de H&R Block y de Bottom Line.
3. Existencia de datos abiertos de matrícula en educación superior por colegio de egreso.
4. Texto oficial de la Ley 21.719 y estado del Boletín 18.623-07; estado de la reforma de admisión escolar.
5. Quién es el responsable de datos de un equipo sin personalidad jurídica; revisión legal del protocolo T4.
6. Cuánto tarda y cuesta constituir una fundación; si una alianza con una fundación existente califica ante los fondos.
7. Monto en pesos del tope de Compra Ágil y reglas vigentes; requisito del Registro ATE.
8. Si la vinculación con el medio es obligatoria en la acreditación desde mayo de 2025.
9. Si DEMRE tiene simulador oficial abierto y dónde están hoy las PAES anteriores.
10. Si los puntajes de corte y las ponderaciones están cargados en producción; fechas del proceso de admisión y del FUAS 2027.
11. Precio de Edumetrics y de otros proveedores en Chile; si algún colegio o sostenedor chileno ha comprado un panel de este tipo.
12. Fondos filantrópicos con convocatoria abierta y sus bases.
13. Cifra de 40,2 % y de 2.263 orientadores en el original.
14. Las cifras de Por Una Carrera sobre sus resultados son autorreporte; el estado de resultados de 2023 y su carátula no concilian (superávit de $31 millones frente a $24 millones).

---

## 15. Correcciones respecto de documentos previos

- **ADR 0012:** la cifra "+8 puntos de permanencia" del experimento de H&R Block **sí está respaldada** por el resumen oficial de J-PAL (haber completado dos años de universidad en tres, de 28 % a 36 %), además de +8,1 puntos de matrícula. Lo que no está respaldado es la titulación.
- **`propuesta-ruta-de-ingreso-asistido.md`:** su sección 7 (venta) queda superada por la sección 8 de este documento; en particular, la sugerencia de un "Plan Colegio" como fuente de ingresos pasa a ser **hipótesis a validar**, no modelo base.
- **ADR 0027:** superado.
- Se retiró lo dicho antes sobre proveedores que no se encontraron (Scitis, Bettersoft, Psicometrix) y la mención a una "Ley 21.246" de Sociedades BIC.

---

## 16. Fuentes clave
- Encuesta de Formando Chile: https://www.elmostrador.cl/noticias/pais/2023/06/06/encuesta-revela-que-estudiantes-vulnerables-desconocen-como-postular-a-gratuidad-universitaria/ [Leído]
- Estándar 7.3 (DS 27/2020): https://www.curriculumnacional.cl/614/articles-207508_estandar.pdf [Leído]
- Bases 3.° y 4.° medio (Decreto 193/2019): curriculumnacional.cl [Leído]
- Guía estatutaria británica de orientación en colegios (DfE, 2026): gov.uk, "Careers guidance and access for education and training providers" [Leído]
- Informe de la Careers & Enterprise Company (Percy y Tanner, 2021) y briefing 2024/25: careersandenterprise.co.uk [Leído]
- H&R Block (NBER w15361): https://www.nber.org/papers/w15361 ; resumen oficial J-PAL: https://www.povertyactionlab.org/policy-insight/increasing-college-access-making-application-process-easier [Leído]
- Hastings, Neilson y Zimmerman (NBER w21300): https://www.nber.org/papers/w21300 [Leído]
- Carrell y Sacerdote (NBER w19031): https://www.nber.org/papers/w19031 [Leído]
- Bottom Line (NBER w33921): https://www.nber.org/papers/w33921 [Leído]
- Evaluación de PACE (Dipres, 2019): https://www.dipres.gob.cl/597/articles-189322_informe_final.pdf [Leído]
- Estados financieros de Por Una Carrera: https://porunacarrera.cl/wp-content/uploads/2024/12/FECU-Social-Simplificada-Reporte-ano-2023.pdf y memoria 2024 [Leído]
- Registro de Donatarios: https://www.chileatiende.gob.cl/fichas/108757-registrar-una-fundacion-o-corporacion-en-el-registro-de-donatarios-de-la-ley-de-donaciones-sociales [Leído]
- Orientaciones del PME 2026: https://liderazgoeducativo.mineduc.cl/wp-content/uploads/sites/55/2026/01/Orientaciones-PME-2026.pdf [Leído]
- Reforma del Sistema de Admisión Escolar: https://www.24horas.cl/actualidad/politica/reforma-sae-fin-tombola-merito-academico-colegios ; https://www.ciperchile.cl/2026/06/30/elegir-o-volver-a-influir-cambios-al-sistema-de-admision-escolar/ [Buscador]
