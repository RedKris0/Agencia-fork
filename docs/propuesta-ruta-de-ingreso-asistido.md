# Propuesta: Ruta de Ingreso Asistido

Fecha: 2026-11-11 · Estado: **borrador para revisión del líder (@rafajaque)** · Autor: Claude, a partir de la conversación con el líder, cuatro investigaciones web y la lectura del repositorio. Revisión externa pedida a Codex y Antigravity (ver sección 20).

Este documento reúne **todo lo que se hará, cómo se ofrecerá, cómo se financiará y venderá, por qué se decidió así y con qué datos**. No es un ADR ni sustituye a AGENTS.md. Si algo de aquí contradice a AGENTS.md, gana AGENTS.md.

---

## 0. Cómo leer este documento

Cada dato lleva una etiqueta de confianza. **Nada marcado como [Buscador] o [Suposición] debe publicarse en el portal ni citarse como hecho** sin verificarlo antes en la fuente original (AGENTS.md 2.1).

| Etiqueta | Significa |
|---|---|
| **[Repo]** | Verificado leyendo archivos del repositorio o consultando GitHub el 2026-11-11 |
| **[Leído]** | Un investigador abrió la página. A veces la herramienta la resume con un modelo pequeño, así que no es lectura literal |
| **[Buscador]** | Solo un extracto de buscador. No se abrió el original. **No verificado** |
| **[Suposición]** | Inferencia del autor o de un investigador |
| **[Líder]** | Decisión o postura expresada por el líder en la conversación |

---

## 1. Resumen en una página

**Problema.** Estudiantes de colegios vulnerables se desconectan de la educación superior por desconocimiento de becas y trámites, pocos recursos y falta de orientación. Se complican, pierden tiempo y no saben cómo postular a beneficios, simular su puntaje ni dónde preparar la PAES. La información del Estado está repartida en 4 a 6 sitios y algunos indicadores se prestan a mala lectura [Líder; sitios: Leído].

**Fin mayor.** Que más jóvenes de colegios vulnerables **ingresen a la educación superior informados y permanezcan estudiando**, con una base sólida y acompañamiento, y que la deserción evitable baje. Es una **aspiración de largo plazo a la que la plataforma contribuye**: no es un resultado que se le atribuya ni que se prometa (ver 3.3).

**Fin específico (lo que sí se demuestra en este periodo).** Que una persona del segmento pueda, desde su teléfono, sin cuenta y en menos de 10 minutos, **buscar y comparar carreras con cada cifra explicada, simular su puntaje, armar su hoja de decisión y conocer los pasos del FUAS y su próximo plazo**, y que 5 usuarios reales completen el 80 % de esas tareas sin ayuda al 2 de diciembre de 2026.

**Cómo se diferencia.** Es la alternativa transparente a mifuturo.cl y a los otros sitios del Estado: reúne todo en un solo recorrido, explica qué mide y qué no mide cada indicador (por ejemplo, la empleabilidad no mide si la persona trabaja en lo que estudió) y deja el control en el estudiante.

**Cómo se financia.** Hoy **no hay comprador demostrado**. El camino más realista es filantrópico (fondos de fundaciones para organizaciones sin fines de lucro) para financiar el piloto y la evidencia, y después probar si colegios, sostenedores e instituciones pagan. Ningún precio está fijado.

**Qué se construye hasta el 2 de diciembre.** Una base (explorador, fichas, comparador, simulador, hoja de decisión, guía del FUAS y calendario) y tres funciones avanzadas (simulador inverso, "Mi ruta" guardada solo en el teléfono con descarga de plazos, y competitividad de cada carrera). Sin cuentas, sin Ficha, sin pulso, sin paneles.

**Qué viene después.** Un piloto en 2027 con 1 o 2 liceos que suma ayuda humana en el trámite del FUAS, porque la evidencia indica que **informar solo no basta**.

**Lo que este documento no afirma.** Que la plataforma aumente la matrícula o reduzca la deserción (no hay forma de demostrarlo con un piloto de este tamaño), que prediga deserción, que mejore la salud mental, ni que alguien vaya a pagar.

---

## 2. El problema

### 2.1 Qué se sabe y con qué fuerza

| Hallazgo | Fuente | Etiqueta | Límite |
|---|---|---|---|
| En una encuesta a 1.076 estudiantes de 3.º y 4.º medio de colegios con índice de vulnerabilidad superior a 70 % (RM y La Araucanía), **63,94 %** no sabe qué es el FUAS; **57,25 %** no conoce los requisitos de gratuidad; **64,22 %** no conoce los requisitos para mantenerla; **56,5 %** no sabe qué es el puntaje ponderado; **72,5 %** no sabe qué es el Ranking; **45,17 %** no sabe qué es el NEM | Formando Chile, vía El Mostrador, 2023-06-06. https://www.elmostrador.cl/noticias/pais/2023/06/06/encuesta-revela-que-estudiantes-vulnerables-desconocen-como-postular-a-gratuidad-universitaria/ | [Leído] | Muestra de un solo programa (EFIES), no representativa. No generalizar |
| **40,2 %** de 4.º medio no postuló a beneficios en 2022 | El Desconcierto, 2023-09-26, que lo atribuye al Mineduc sin citar el informe. https://eldesconcierto.cl/2023/09/26/gratuidad-becas-y-creditos-estudiantiles-40-que-pudieron-acceder-no-lo-hicieron-en-2022 | [Leído], cifra **no verificada** en el original | No usar como dato duro |
| Egresados de 2020: 143.191 de 258.418 sin matrícula en 2021 | Centro de Estudios del Mineduc, citado en `docs/decisiones/0012-cadena-causal-y-promesa.md` | [Repo] | Es no matrícula inmediata, no necesariamente exclusión definitiva |
| Retención de primer año, cohorte 2022: **76,0 %** (universidades 81,6 %, IP 72,1 %, CFT 71,7 %). Con beneficios 82,0 %; sin beneficios 66,5 % | SIES, *Informe de Retención de 1er año, cohortes 2018-2022*, agosto 2023, citado en `docs/mercado/analisis-mercado.md` | [Repo] | La diferencia por beneficios es una **asociación**, no un efecto causal |
| Retención de la cohorte 2023: 76,5 % | SIES 2019-2023, citada en `docs/decisiones/0013-desercion-evitable.md` | [Repo] | Cifras de prensa para cohortes 2024 y 2025 (77,3 % y 77,9 %) se contradicen y no se usan |
| Hay 2.263 orientadores para todo el país; cada uno atiende en promedio más de 7 establecimientos | Fundación Por Una Carrera, vía El Dínamo, 2024-08-02. https://www.eldinamo.cl/educacion/2024/08/02/desercion-y-frustracion-profesional-el-costo-de-la-alarmante-escasez-de-orientadores-educacionales-en-chile/ | [Buscador] | Sin verificar |
| Acceso a educación superior al año siguiente, cohorte de egresados 2006: 76 % particulares pagados, 36,3 % subvencionados, 28,4 % municipales | Cuadernos de Educación, UAH | [Buscador] | Dato antiguo |
| Acceso inmediato 2022: 37,8 % en municipales y 68,7 % en particulares pagados | SIES, *Acceso a la Educación Superior en Chile 2022*, citado en la bitácora del repo | [Repo] | Es de enero de 2023 |

### 2.2 Qué dolores NO tienen respaldo hasta ahora
La investigación **no encontró** fuente seria que respalde que los estudiantes o docentes pidan específicamente (a) un simulador de puntajes, (b) un buscador de PAES anteriores, ni (c) que los colegios deban reportar acciones de orientación vocacional en el Plan de Mejoramiento Educativo (PME) con fondos SEP [Leído, ausencia]. Son dolores plausibles que el líder identifica, pero no están probados. **No deben afirmarse en público como hechos** hasta verificarlos.

### 2.3 Lo que el Estado ofrece hoy y dónde se fragmenta

| Sitio | Qué cubre | Estado al leerlo (2026-11-11) |
|---|---|---|
| mifuturo.cl | Buscador de carreras e instituciones, aranceles, empleabilidad e ingresos | [Leído]. No se vio comparador ni simulador de puntaje |
| DEMRE (demre.cl, portaldemre.demre.cl) | PAES, temarios, resultados; posible simulador de postulación por temporada (con clave) | No se pudo abrir; simulador por temporada solo [Buscador] |
| Acceso Mineduc (acceso.mineduc.cl) | Desconocido | "Temporalmente fuera de servicio" |
| Beneficios Estudiantiles (FUAS) | FUAS y beneficios | "Temporalmente fuera de servicio" |
| SIES (sies.cl) | Estadísticas | Error de certificado, no se pudo abrir |
| CNA (cnachile.cl) | Buscador de acreditaciones | [Leído]. No busca carreras por área o puntaje, ni empleabilidad |
| Ayuda Mineduc | Portal de atención con enlaces | [Leído]. Son enlaces, no herramientas |

**Fragmentación:** para el recorrido completo (buscar, comparar, simular, ver ponderaciones, postular a becas, ver plazos, ver acreditación, bajar PAES anteriores) un estudiante debe visitar **4 a 6 sitios** [Suposición razonada sobre lecturas parciales]. Que DEMRE **no** tenga simulador abierto a todos **no está confirmado**; no afirmarlo.

### 2.4 El problema de la "empleabilidad"
- La página oficial del Mineduc sobre mifuturo dice que el dato sale del SIES cruzado con el SII, sin margen de error, y no define "empleabilidad al primer año" ni fija umbrales (datos de 2017) [Leído: https://www.mineduc.cl/?p=16942].
- La metodología oficial citada en el repo (`datos/cargar_empleabilidad.py`, PDF de mifuturo 2025-2026) la define como **indicador proxy**: porcentaje de titulados que, teniendo información de ingresos, obtuvieron ingresos iguales o superiores al sueldo mínimo. **No mide "tener trabajo"** y menos aún trabajar en el área de estudio [Repo; el PDF no pudo abrirse en la investigación web, pero el repo lo cita como fuente].
- Críticas serias: no mide pertinencia con la formación ni calidad del empleo, y baja cuando aumenta la cantidad de titulados (Enfermería: titulados 2.125 en 2020 a 5.652 en 2024; inserción al primer año de 93 % a 78 %) [Leído: 24horas.cl, 2026-08-22; Diario Estrategia, 2026-04-03].
- **No existe** una fuente chilena confirmada que mida "trabaja en su área" por carrera [Buscador/Leído, ausencia]. Casen y la encuesta de empleo del INE podrían tenerlo, pero no se verificó si traen variable de carrera.
- El comparador **ya muestra** al estudiante "qué mide" cada indicador (`app/(portal)/comparador/Comparador.tsx`) [Repo]. El sello de datos honestos está parcialmente construido.

---

## 3. Objetivos

### 3.1 Fin mayor
Más jóvenes de colegios vulnerables ingresan a la educación superior **informados** y permanecen hasta titularse; baja la deserción evitable por desinformación y mala elección. Es una **aspiración de largo plazo**, no un resultado atribuible al producto (ver 3.3). [Líder]

### 3.2 Fin específico (medible y bajo control del equipo)
1. **Comprensión** (**solo en el piloto 2027**, cuando exista instrumento, población y meta): mejora medida, antes y después, del conocimiento sobre FUAS, gratuidad y sus requisitos. **No se mide en el MVP.**
2. **Autonomía en el recorrido:** una persona completa por sí sola, en menos de 10 minutos, las cuatro tareas centrales (sección 5.1).
3. **Decisión informada:** cada persona termina con una hoja de decisión de tres opciones realistas y una de respaldo, con datos explicados.
4. **Avance en el trámite oficial** (piloto 2027): más personas completan el FUAS; el estudiante confirma cada paso (inició, envió, obtuvo).
5. **Continuidad** (piloto 2027, solo con consentimiento): renovación de beneficios y segundo año, **reportada como resultado observado y no como efecto causado**.

### 3.3 Lo que no se promete
- Que la plataforma **aumente la matrícula** o **reduzca la deserción**. La evidencia revisada indica que los mensajes y la información a escala no tuvieron efecto, y un piloto pequeño sin grupo de comparación no puede probar efectos.
- **Predecir** deserción, evaluar salud mental o mejorar la salud mental (ADR 0010, 0012, 0013).
- Mostrar **dónde trabaja** quien estudia cada carrera.
- Que ayude a cumplir una obligación legal de acompañamiento (no existe esa obligación: ADR 0012).

---

## 4. Teoría del cambio y evidencia que la respalda

| Eslabón | Lo que se afirma | Evidencia | Etiqueta | Límite |
|---|---|---|---|---|
| 1 | La desinformación sobre beneficios y requisitos reduce la postulación | Encuesta Formando Chile; 40,2 % sin postular | [Leído] / [Leído, sin verificar] | Muestra no representativa; cifra de prensa |
| 2 | **Informar solo no basta; la ayuda concreta con el trámite sí** | Experimento de H&R Block (Bettinger, Long, Oreopoulos y Sanbonmatsu, 2012, QJE): la información sola no tuvo efecto medible, la ayuda para completar el formulario sí. La cifra de +8,1 puntos corresponde a matrícula de dependientes, **no** a permanencia (el ADR 0012 la escribe como permanencia: corregir) | [Buscador] | **No se abrió el PDF.** Verificar cifras antes de citar |
| 3 | Los mensajes automáticos a escala no funcionan | Bird et al. (2021), JEBO: más de 800.000 estudiantes, efecto nulo. Oreopoulos y Petronijevic (2019): ~25.000 universitarios, sin efecto relevante | [Buscador] | Efectos dependen del contexto; Castleman y Page (2015) hallaron efecto local |
| 4 | Informar costos e ingresos mejora **qué programa** se elige, no si se matriculan | Hastings, Neilson y Zimmerman, NBER 21300 (con el Mineduc): desplazó demanda desde carreras de bajo ingreso y alta morosidad (−4,6 % en nivel socioeconómico bajo) | [Leído en página resumen de J-PAL, no el paper] | No es evidencia de acceso |
| 5 | Los mentores pares pueden ayudar en el paso al ingreso a bajo costo | Castleman y Page (2015): ~+4,5 puntos con mentores pares (~US$80 por alumno) | [Buscador] | Mixto según contexto; **no se usa en el primer piloto** |
| 6 | El acompañamiento de intensidad alta (tutoría) tiene el mayor efecto pero es inalcanzable para el equipo | ASAP de CUNY (+18 puntos de titulación a 3 años), citado en `docs/decisiones/0010-modulo-de-permanencia.md` | [Repo] | Costo cercano a US$9.000 por título |
| 7 | PACE aumenta ingreso a universidades solo en un tramo | Cooper et al. (2019), Dipres y Centro de Estudios Mineduc: sin efecto en el ingreso a cualquier institución; +3,25 puntos en universidades del sistema único de admisión; efecto concentrado en el 15 % de mejores notas; retención y titulación aún sin evaluar | [Leído, PDF completo] | PACE opera en liceos focalizados: complementar, no duplicar |
| 8 | No hay evaluación causal conocida de la orientación vocacional en colegios chilenos | Búsqueda sin resultados | [Leído, ausencia] | No citar impacto de orientación vocacional |

**Consecuencia de diseño:** la plataforma no puede ser solo un portal informativo. Por eso el piloto 2027 incluye ayuda humana en el trámite (sección 5.4).

---

## 5. Qué se hace

### 5.1 Base: lo que se entrega el 2 de diciembre de 2026

**Definición de "bueno":** una persona entra desde un teléfono de 360 píxeles de ancho, **sin cuenta y sin dejar datos**, y puede completar en menos de 10 minutos estas **cuatro tareas centrales**:

| Tarea | Qué hace la persona | Qué lo hace posible |
|---|---|---|
| **T1** | Busca y compara dos carreras e interpreta una cifra (por ejemplo, qué mide la empleabilidad) | Explorador, fichas y comparador con "qué mide" y fuente, URL y fecha en cada dato |
| **T2** | Simula su puntaje ponderado y ve cuánto le falta. Su Puntaje Ranking oficial **lo ingresa él mismo**: la plataforma no lo calcula (ADR 0024) | Simulador (PR 132) sobre `lib/calculos/2027/puntaje-ponderado.ts`; `puntaje-ranking.ts` solo valida el rango del valor ingresado. Ambos con pruebas |
| **T3** | Arma su hoja de decisión: tres opciones y una de respaldo | Hoja imprimible o descargable, que no se guarda en servidor |
| **T4** | Identifica los pasos del FUAS y su próximo plazo | Guía paso a paso, lista de documentos y calendario con fuente y fecha de vigencia |

**Estado real hoy [Repo, GitHub y archivos, 2026-11-11]:**
- En `main` hay cinco pantallas: portada, beneficios, explorador con fichas, comparador y una de componentes.
- La lógica del puntaje ponderado existe con pruebas (el Ranking solo se valida, no se calcula), pero **la pantalla del simulador no está en `main`**: está en el PR 132 de Alejandro (`feat/simulador-pantallas`), abierto. Ese PR incluye `app/(portal)/simulador/`, pero también toca la capa de datos de la oferta (`lib/datos/`, `scripts/exportar-oferta.ts`), así que su revisión **no es trivial**.
- El PR 62 (`fix: corrige y verifica la carga DEMRE 2027`) figura **cerrado sin fusionar**, mientras la guía de Cristóbal lo describe como abierto y la guía del líder da la carga por corregida. Estado de la carga **por verificar en producción**.
- El PR 96 de Cristóbal (`docs/cita-ranking-2027`) y el PR 93 del líder (`docs/adr-0023-tablero-compartido`) están abiertos.
- No existen aún la hoja de decisión, la guía del FUAS paso a paso ni la pantalla de calendario como tal. El calendario de la Admisión 2027 está encargado a Cristóbal (`datos/calendario/admision_2027.json`, tarea C14 en su guía).

### 5.2 Funciones avanzadas (capa 2), elegidas por el líder

El líder aceptó incluir las tres primeras; la cuarta es opcional con fecha de corte. [Líder]

| # | Función | Qué aporta | Esfuerzo | Depende de | Fecha de decisión |
|---|---|---|---|---|---|
| A1 | **Simulador inverso:** "¿cuánto me falta?" frente al último puntaje de corte | Es lo más útil para el estudiante; el Estado no lo muestra así | Medio | Que los puntajes de corte estén cargados **[por verificar]** | 16 nov |
| A2 | **"Mi ruta"** guardada **solo en el teléfono** (opciones, checklist y avance) más **descarga de plazos al calendario** (.ics) | Sensación de acompañamiento sin recolectar nada | Medio | Calendario oficial 2027 cargado (C14) | 20 nov |
| A3 | **Competitividad en la ficha:** cupos frente a demanda | Diferenciador real | Medio | Que la medida del ADR 0026 (hoy sin fusionar) sea aprobada | 20 nov |
| A4 | **Asistente con fuentes citadas** (opcional) | Responde dudas del FUAS y de lectura de datos, y deriva en crisis | Alto | Pruebas automáticas del protocolo de crisis (obligatorias, AGENTS.md 2.4) y variables de Gemini en Cloudflare **[por verificar]** | **20 nov** (go/no-go) |
| A5 | PWA instalable | Mejor con datos limitados | Bajo | Nada nuevo | 20 nov |

**Compromiso e intención.** Solo la **base (5.1) es compromiso** y es lo único que debe citar el entregable. Las funciones A1 a A5 son **intención sujeta a su fecha de decisión**: si una dependencia falla, la función sale sin afectar el hito. **El asistente (A4) se excluye por defecto** y solo entra si al 20 de noviembre están verificados: pruebas automáticas de crisis, registro de alertas con una persona que las revise, proveedor de pago configurado y variables de Cloudflare.

**Congelamiento de funciones: viernes 27 de noviembre.** Lo que no esté listo ese día no entra.

### 5.3 Fuera de alcance (hasta después del 2 de diciembre)
Cuentas de estudiante, Ficha de Trayectoria con datos en servidor, pulso de check-in, panel de colegio o institucional, voluntarios pares, traspaso a instituciones, vista para apoderados y clases de contenido PAES.

### 5.4 Después del MVP: Ruta de Ingreso Asistido (piloto 2027)

Cinco componentes. Los dos primeros son el MVP. Los demás se construyen y prueban en el piloto.

| # | Componente | Quién lo hace |
|---|---|---|
| C1 | **Datos honestos, todo en un lugar** (buscador, comparador, simulador con cada cifra explicada) | Software |
| C2 | **Hoja de decisión del estudiante:** intereses, tres opciones comparadas, beneficios aplicables y plazos. Descargable o imprimible, **queda en manos del estudiante** | Software y sesión con orientador |
| C3 | **Postulación asistida:** una jornada presencial en el colegio con un **adulto designado por el liceo**, guía paso a paso y lista de documentos. **El equipo no recibe claves, documentos ni datos socioeconómicos** | Orientador del liceo y equipo |
| C4 | **Base de estudio:** no se dan clases de contenido. Se orienta hacia recursos gratuitos oficiales o de universidades y se enseña a estudiar con estrategias con evidencia (práctica de recuperación, práctica espaciada, autoexplicación), con contenido revisado por un profesional (AGENTS.md 2.4) | Software y material revisado |
| C5 | **Calendario de renovación y avance mínimo**, del estudiante. Sin traspaso pagado a instituciones | Software |

**Voluntarios pares:** no en el primer piloto. Solo después de un convenio con el liceo que defina adulto responsable, protocolo de contacto, canal de denuncia y prohibición de contacto privado no supervisado. Los dos revisores críticos coincidieron en que es una operación de protección de menores que tres estudiantes no pueden asumir sin ese marco.

### 5.5 Un producto que ya existe y se mantiene aparte
El **tablero de pronóstico de matrícula** para instituciones (ADR 0017 y 0018, `docs/manual-tablero-pronostico.md`) usa solo datos públicos y agregados, sin personas. Estimación nacional de primer año 2027: 382.725 (rango 357.992 a 387.869) [Repo]. Error mediano por celda: 11,9 % [Repo]. Incluye un planificador de secciones (sección 8.4 del manual) [Repo]. Sirve como **producto secundario** para instituciones, no como el centro de la propuesta. **Cautela:** el ADR 0018 tiene estados inconsistentes sobre su revisión legal (el encabezado la da por completada y las consecuencias la dejan pendiente); esta propuesta no se apoya en ella.

---

## 6. Cómo se ofrece (por actor)

| Actor | Qué recibe | Formato y frecuencia | Lo produce |
|---|---|---|---|
| **Estudiante** | Portal gratuito: explorador, comparador, simulador, hoja de decisión, guía del FUAS, calendario | Web móvil, siempre disponible | Software |
| **Estudiante** (piloto) | Jornada de postulación asistida | Presencial, 1 a 3 sesiones por curso en temporada | Orientador y equipo |
| **Colegio o sostenedor** | Kit de orientación (guía para orientador, presentación, enlaces oficiales por etapa) y boletín de plazos | PDF anual y PDF mensual en temporada | Software y revisión humana |
| **Colegio o sostenedor** (piloto) | Informe de tres cifras agregadas de uso, **solo si el grupo supera un tamaño mínimo** (por definir) para no identificar a nadie, y **no antes de la revisión legal** | PDF de una página, mensual | Software y revisión |
| **Institución de educación superior** | Acceso al tablero de pronóstico de matrícula y, a futuro, alianza de vinculación con el medio | Software; actualización anual | Software |
| **Financiador** | Informe de actividades, cambios de fuentes y resultados agregados y anónimos | PDF semestral | Persona |

**Neutralidad:** el buscador y el comparador tratan igual a todas las instituciones, sean clientes o no. Ninguna institución paga por aparecer mejor ni por recibir estudiantes. Toda relación comercial se declara públicamente (AGENTS.md sección 1; ADR 0017).

---

## 7. Cómo se financia y cómo se vende

### 7.1 Punto de partida honesto
**No existe comprador demostrado.** Lo que se hallaron son:
- Compras reales de **preuniversitarios PAES** por municipios, no de orientación.
- Cero compras verificadas de instituciones de educación superior por captación, alerta temprana o seguimiento (el buscador oficial de Mercado Público no fue accesible).
- Varias universidades desarrollan alerta temprana con fondos propios o con PACE [Buscador].

### 7.2 Compras públicas relevantes (Mercado Público y agregadores, 2023 a 2026)

| Compra | Comprador | Monto | Detalle | Etiqueta |
|---|---|---|---|---|
| Preuniversitario comunal (cód. 750998-8-LE26) | Municipalidad de Lo Espejo | **$12.999.990** adjudicado | Cepech SPA, único oferente; material físico y plataforma virtual | [Leído en agregador] https://www.todolicitaciones.cl/licitacion/750998-8-LE26/servicio-de-preuniversitario-comunal |
| Preuniversitario y ensayo PAES 2024 | Municipalidad de Villa Alegre | Máximo **$16.065.000** con IVA, hasta 80 jóvenes | Garantía de seriedad $300.000; fiel cumplimiento 5 %; evaluación: experiencia 25 %, plataformas 25 %, requisitos formales 10 % | [Leído, bases] |
| Plataforma educativa, Liceo A-21 | DAEM de Talcahuano | **$2.500.000** neto por un año | 3 oferentes; adjudicatario contradictorio en la página | [Leído] |
| Plataforma integral de gestión escolar | Casablanca | **$19.327.731** adjudicado | Financiada con fondos SEP; es gestión escolar, no orientación | [Leído] |
| Preuniversitarios y ensayos PAES varios | Lo Barnechea, Las Condes, Peñalolén, Providencia, Quinta Normal, Codegua, otros | Sin monto leído | Adjudicados a Cepech 2023 a 2026 | [Leído solo listado] |
| Plataforma de permanencia estudiantil | CFT estatal de una región | Valor anual aproximado $13,7 millones | Declarada desierta; exigía integración con U+ y analítica predictiva | [Repo, `docs/mercado/analisis-mercado.md`] |

**No se halló ninguna licitación de orientación vocacional pura, simulador o ayuda con becas.** Cepech domina el nicho de preuniversitarios municipales.

### 7.3 Cómo entra un proveedor nuevo
- **Compra Ágil:** hasta 100 UTM, con tres cotizaciones; desde diciembre de 2024 (Ley 21.634) se prioriza a micro y pequeñas empresas. Requiere estar "Hábil" en ChileProveedores [Leído en instructivo municipal]. Monto en pesos del tope y vigencia de reglas **por verificar** en fuente oficial.
- **Licitación tipo LE** (100 a 1.000 UTM): persona natural o jurídica con giro afín, sin inhabilidades del art. 4 de la Ley 19.886, garantías de seriedad y fiel cumplimiento.
- **Registro ATE** (Asistencia Técnica Educativa): se exigió en bases de Puente Alto (2021) para ATE ligada al PME con fondos SEP, y **no** se exigió en los preuniversitarios leídos. El art. 30 de la Ley 20.248 y el DTO 235 lo regulan; el texto menciona entidad sin fines de lucro o persona con posgrado, **sin verificar en fuente oficial** [Buscador].

### 7.4 Financiamiento filantrópico (la vía más accesible hoy)
| Fuente | Monto | Requisito | Estado | Etiqueta |
|---|---|---|---|---|
| Fondo Transforma (Fundaciones Colunga y Huneeus) | $35 a $90 millones, hasta 36 meses | Organizaciones sin fines de lucro; foco niñez y adolescencia | **Sin convocatoria 2026 verificada**; el sitio oficial estaba en venta | [Buscador] |
| Fundación Luksic (fondo de iniciativas educativas) | No verificado | No verificado | No verificado | [Buscador] |
| FFOIP (Segegob) | Tope $2,5 a $4 millones | Sin fines de lucro; catastro OIP | Concurso 2026 cerrado; es chico y no de tecnología | [Leído en ficha] |
| Corfo (Innovación Social, Educación y conocimiento) | No verificado | No verificado | No verificado | [Buscador] |

**Dato clave:** Fundación Por Una Carrera declara en su memoria 2022 que inició *Talentos para Chile* gracias al Fondo Transforma y trabaja con Fundación Luksic [Buscador, memoria no abierta]. Es un modelo que ya existe en el mismo terreno.

### 7.5 Cuatro pagadores posibles y qué se sabe

| Pagador | Por qué pagaría | Evidencia | Estado |
|---|---|---|---|
| **Fundaciones y fondos** | Financiar acceso y permanencia con evaluación | Por Una Carrera y Fondo Transforma | Hipótesis más plausible; exige ser sin fines de lucro |
| **Colegios y sostenedores** | La misma línea de gasto que hoy dedican a preuniversitario (SEP y presupuesto municipal), para resolver FUAS, elección y traspaso que el preuniversitario no resuelve | Compras de preuniversitarios y de plataformas escolares | **Hipótesis sin validar.** Un revisor advirtió que los municipios compran preparación para subir puntajes, no orientación |
| **Instituciones de educación superior** | Retención de primer año; actividades de vinculación con el medio | Retención 76 a 78 %; vinculación con el medio **obligatoria desde mayo de 2025 según un extracto de buscador, sin verificar**. Ninguna compra confirmada | **Hipótesis sin validar** |
| **Estado** | Complementar PACE en liceos focalizados | PACE existe; evaluación mixta | Sin explorar |

### 7.6 Secuencia propuesta
1. **Ahora:** MVP gratis para todos, sin cobrar a nadie.
2. **Noviembre a diciembre de 2026:** decidir el vehículo legal y conversar con un colegio o sostenedor, una dirección de vinculación con el medio y una fundación.
3. **2027:** piloto con 1 o 2 liceos, financiado por fondos filantrópicos; el colegio participa como **socio sin costo**.
4. **Con resultados:** probar si colegios y sostenedores compran la jornada y el kit, y si instituciones firman alianzas.

### 7.7 Precio
**No se fija ningún precio.** Se fijará después de las conversaciones y a partir de horas reales del piloto, mantención de datos y acceso. Los montos de la sección 7.2 son **anclajes de referencia**, no una tarifa: una plataforma escolar de un liceo ($2,5 millones) y un preuniversitario municipal ($13 a $16 millones) son productos distintos. Un revisor advirtió que no se debe extrapolar un precio desde ellos.

### 7.8 Vehículo legal (decisión pendiente)
Un equipo de tres estudiantes sin personalidad jurídica no puede facturar, firmar convenios de datos, postular a la mayoría de los fondos ni inscribirse como proveedor. Opciones:

| Opción | A favor | En contra |
|---|---|---|
| **A. Vender o canalizar a través de una universidad** (vinculación con el medio o convenio) | Sin trámite propio; encaja con un proyecto de título | Depende de que acepte; el dinero no es nuestro |
| **B. Constituir una entidad sin fines de lucro** (corporación o fundación) | Compatible con los fondos filantrópicos y con el requisito ATE; vehículo propio | Trámite, costo, tiempo, abogado |
| **C. Solo pilotos gratuitos con convenio** | Cero burocracia; valida valor | No genera ingresos |

Se recomienda **C ahora y A o B en paralelo**, según lo que diga una asesoría legal. Puede que una persona natural emita boleta de honorarios por servicios sueltos, **sin confirmar con contador**.

### 7.9 Plan de validación comercial (una sola hipótesis)

**Hipótesis única:** *una fundación que financie iniciativas de educación o niñez, por medio de una entidad sin fines de lucro, financiaría el piloto 2027 si se le presenta el MVP funcionando y un diseño de evaluación honesto.* El colegio entra como socio del piloto sin costo. La compra por colegios e instituciones **no se prueba todavía**, salvo con la pregunta final del guion.

- **Responsable:** el líder.
- **Conversaciones:** cinco, entre el 16 de noviembre y el 15 de diciembre (fechas sin fijar): tres con fundaciones o programas de responsabilidad social, una con un colegio o sostenedor y una con una dirección de vinculación con el medio de una institución.
- **Guion corto:** qué problema reconocen; qué evidencia piden para financiar; a qué tipo de entidad pueden financiar (¿solo sin fines de lucro?, ¿persona natural?, ¿a través de una universidad?); montos y plazos habituales; **qué condición concreta les impediría financiar o comprar**.
- **Materiales:** MVP en línea, resumen de dos páginas de esta propuesta y diseño del piloto.
- **Decisión:** si al menos una conversación termina en invitación a postular o carta de intención, se define el vehículo legal. Si ninguna, se revisa la hipótesis de pagador en enero. Los umbrales los fija el líder.
- **Costos:** horas del equipo por función y presupuesto mínimo **no estimados**; se calculan con el piloto.

---

## 8. Posicionamiento y diferenciación

**Frase:** *La ruta neutral y verificable para que cada estudiante entienda, compare y complete su camino a la educación superior.*

**Tres diferenciadores comprobables:**
1. **Todo en un recorrido.** Reúne lo que hoy exige entre 4 y 6 sitios.
2. **Datos honestos.** Cada cifra lleva fuente, URL, fecha, definición y lo que no mide. Se contrasta con la empleabilidad de mifuturo.
3. **Neutral y del estudiante.** No ordena por quién paga; el estudiante decide qué guarda y qué comparte.

**Competencia y complementos:**
| Quién | Qué hace | Qué se sabe |
|---|---|---|
| mifuturo.cl | Datos oficiales | Sin comparador ni simulador a la vista [Leído] |
| PACE | Acompañamiento en liceos focalizados | Pagado por el Estado; **posible recorte** según una nota de prensa [Buscador] |
| Fundación Por Una Carrera | Orientación, postulación a gratuidad y becas, hábitos de estudio; tiene "Zona de apoderados" | ONG financiada por donaciones; declara 82 % de asignación de beneficios vs 73 % nacional y más de 20.000 asesorados desde 2015: **cifras propias, no verificadas** [Leído] |
| INACAP, orientación con IA | Chat de orientación gratuito | 72 mil usuarios según prensa [Buscador]; sesgo a su institución por suposición |
| Preuniversitarios (Cepech, Filadd, otros) | Preparación PAES | Dominan las compras municipales; algunos con vista para apoderados [Buscador] |
| Xello y Naviance (EE. UU.) | Orientación vendida a colegios y distritos; familias gratis | Modelo comparable; precios no públicos; Naviance, un contrato estatal de US$8,50 por estudiante [Buscador] |

**Afirmaciones que NO se pueden hacer todavía:**
- Que seamos "mejores" que mifuturo o DEMRE.
- Que mifuturo "publica datos falsos": los datos son reales, el problema es cómo se leen.
- Que DEMRE no ofrezca simulador o PAES anteriores.
- Que aumentemos matrícula, beneficios o equidad.
- Que los colegios demanden esta solución hoy.

---

## 9. Datos que usa el portal

| Dato | Origen | Estado en el repo |
|---|---|---|
| Oferta de carreras (11.364 carreras procesadas) | Mineduc, scripts en `datos/` | [Repo] procesadas según el entregable; **cuántas están cargadas en el portal está por verificar** (el entregable dice que no todas) |
| Empleabilidad e ingresos | SIES, mifuturo | [Repo] cargado (`datos/cargar_empleabilidad.py`); Derecho con período desplazado |
| Ponderaciones y vacantes | DEMRE | **Estado contradictorio en el repo:** la guía del líder y la bitácora la dan por corregida y verificada; el PR 62 figura cerrado sin fusionar y la guía de Cristóbal lo da por abierto. **Verificar en producción antes del 2 de diciembre** |
| Puntajes de corte | DEMRE | **Por verificar** si están cargados |
| Calendario de la Admisión 2027 | Oficial | Pendiente: tarea C14 de Cristóbal |
| Reglas de beneficios | Beneficios Estudiantiles / Mineduc | Datos con vigencia (AGENTS.md 2.1); **no se escriben en el código** |

**Regla:** los datos cambiantes viven en la base o en archivos versionados con fecha de vigencia. Un dato no verificable en fuente oficial **no se publica** (AGENTS.md 2.1).

---

## 10. Marco legal: Ley 21.719

**Advertencia de fuente.** Los artículos salen de un texto consolidado **no oficial** (datacompliance.legal, 20 de marzo de 2026) porque la Biblioteca del Congreso no abrió durante la investigación. **Hay que cotejarlos con el texto oficial y con un abogado antes de citarlos.**

**Vigencia.** El artículo 1.º transitorio fija el **1 de diciembre de 2026**. Hay un proyecto en trámite (Boletín 18.623-07) que la posterga; según fuentes no oficiales, el Senado habría aprobado postergarla hasta el **15 de octubre de 2027** (esa es la nueva fecha de entrada en vigencia, no la fecha de aprobación), el proyecto está en la Cámara y no estaba publicado al 5 de noviembre. Estado **por verificar** en fuente oficial. **Se diseña como si rigiera hoy.**

| Función | Qué exige la ley | Decisión de diseño |
|---|---|---|
| Portal informativo sin cuenta | Proporcionalidad: solo datos necesarios (art. 3 c) | No se recolecta nada para explorar, simular ni ver plazos |
| Hoja de decisión y "Mi ruta" | Minimización | Se guardan **solo en el dispositivo** del estudiante, no en servidor |
| Situación socioeconómica (FUAS) | Es dato **sensible** (art. 2 g); consentimiento expreso (art. 16) | El portal **no recibe** antecedentes socioeconómicos: la guía explica el trámite sin pedirlos |
| Menores | Menores de 14: siempre consentimiento del tutor. De 14 a 17: reglas de adultos, salvo **datos sensibles de menores de 16, que exigen al tutor** (art. 16 quáter). Obligación especial de establecimientos y de quienes traten datos de menores | AGENTS.md exige tutor para menores de 18, más estricto que la ley. Cómo se acredita el consentimiento del tutor **no aparece en el texto leído** |
| Consentimiento | Libre, informado, específico, previo, revocable; la prueba la tiene el responsable; se presume no libre si se condiciona un servicio a algo no necesario (art. 12) | Todo el servicio funciona sin compartir nada |
| Informe agregado al colegio | El dato anonimizado deja de ser personal, pero la anonimización debe ser irreversible considerando medios razonables de reidentificación (arts. 2 k, 2 f) | **Tamaño mínimo de grupo** antes de mostrar una cifra; nunca listas nominales |
| Pulso de check-in | Datos de salud solo para fines de leyes sanitarias (art. 16 bis); perfilado (art. 8 bis); evaluación de impacto (art. 15 ter) | **No se implementa** hasta revisión legal |
| Asistente con IA y alojamiento en Brasil | Transferencia internacional solo a país adecuado o con garantías (arts. 27 y 28); infracción grave si no | El asistente procesa solo preguntas generales sin datos identificables (AGENTS.md 2.2). Documentar el instrumento de garantías con Supabase (São Paulo) y Gemini |
| Derechos del titular | Acceso, rectificación, supresión, oposición, portabilidad, bloqueo; 30 días corridos prorrogables por 30 (art. 11) | Revisar el ADR 0020 |
| Seguridad y brechas | Medidas según riesgo; reportar a la Agencia sin dilación y avisar a titulares si hay datos sensibles o de menores de 14 (arts. 14 quinquies, 14 sexies) | Procedimiento de incidentes antes de cualquier Ficha |
| Equipo sin personalidad jurídica | La ley aplica a personas naturales o jurídicas; hay atenuaciones para empresas de menor tamaño, no exención (arts. 14 septies, 6.º transitorio) | **Pendiente de asesoría legal**: quién es el responsable |
| Sanciones | Leves hasta 5.000 UTM, graves hasta 10.000, gravísimas hasta 20.000; tratar datos de menores infringiendo la ley es grave | Justifica no avanzar con Ficha y paneles sin revisión legal |

**Qué cambia en el MVP:** al no tener cuentas ni servidor con datos personales, el MVP evita casi toda esta carga. Esta es una de las razones centrales de la decisión D5.

---

## 11. Reglas del repositorio que condicionan todo (AGENTS.md)

1. Gratis para el estudiante, siempre; sin muros de pago, anuncios ni datos vendidos (sección 1).
2. Neutralidad: nunca ordenar ni destacar instituciones por ser clientes (sección 1).
3. Datos oficiales con fuente, URL y fecha; lo no verificable no se publica (2.1).
4. Privacidad: minimización, tutor para menores de 18, datos sensibles con consentimiento separado (2.2).
5. Sin datos personales a APIs de IA de plan gratuito (2.2).
6. Protocolo de crisis con pruebas automáticas; **la IA no es terapeuta**; sin neuromitos; no prometer predicción (2.4).
7. Solo valores de `diseno/tokens.json` mediante variables CSS (2.5).
8. WCAG 2.2 AA; mobile first; 360 px y teclado (2.6; sección 5 "terminado").
9. Cambio más pequeño que resuelve la tarea; nada de funcionalidad no pedida (sección 7).
10. Ningún cambio llega a `main` sin revisión con la pauta `revisar-pr` y confirmación del líder (sección 4).

---

## 12. Decisiones y por qué

| # | Decisión | Alternativas | Razón | Evidencia | Quién |
|---|---|---|---|---|---|
| **D1** | Posicionarse como **alternativa transparente** a mifuturo y a los sitios del Estado, con los mismos datos oficiales, y no como acusación de falsedad | "Competencia directa" como eslogan | Los datos son reales; el problema es la lectura. Decir "falsos" es inexacto y expone al proyecto | Sección 2.4 | [Líder] define la postura; la formulación es de Claude |
| **D2** | Fin mayor amplio, pero **fin específico reducido a lo medible** por el equipo | Prometer matrícula o deserción | Un piloto pequeño sin comparación no prueba efectos; ambos revisores lo marcaron como la falla más grave | Sección 4 | Líder (fin mayor); revisores y Claude (reducción) |
| **D3** | El estudiante no paga nunca | Pre universitario pagado por apoderados | AGENTS.md sección 1 | AGENTS.md | Regla del repo |
| **D4** | **Filantropía primero**, colegio como socio del piloto sin costo, venta después de tener evidencia | Vender a colegios desde ya | No hay comprador demostrado y los municipios compran preuniversitario, no orientación | Sección 7.2 | Claude, con coincidencia de ambos revisores |
| **D5** | **Sin cuentas ni datos personales en servidor** en el MVP | Ficha con consentimiento desde el inicio | Reduce el riesgo legal en tres semanas; la ley puede regir el 1 de diciembre | Sección 10 | Claude; el líder aceptó el MVP sin cuenta |
| **D6** | **No cobrar a instituciones por traspaso de estudiantes** | Cuota por traspaso | Convierte la Ficha en activo comercial e incentiva la captación; choca con neutralidad | AGENTS.md sección 1; ambos revisores | Revisores y Claude |
| **D7** | **Sin voluntarios pares en el primer piloto** | Pares desde el inicio | Es una operación de protección de menores que tres estudiantes no pueden asumir sin convenio y protocolos | Ambos revisores | Revisores y Claude |
| **D8** | Capa 2: simulador inverso, "Mi ruta" local con .ics, competitividad; asistente opcional | Más funciones, o solo el mínimo | Suma a la historia sin romper la regla legal; el líder valoró tener algo más avanzado | Sección 5.2 | [Líder] acepta tres; la cuarta queda opcional |
| **D9** | **Congelar funciones el 27 de noviembre** | Sin corte | Protege la última semana para pruebas, accesibilidad y arreglos | — | Claude |
| **D10** | Simulador de **puntaje**, no de **beneficios** | Simulador de elegibilidad de beneficios | Implicaría reglas de elegibilidad no verificadas; lo que existe y el PR 132 es puntaje | Sección 5.1 | Claude; **el entregable dice "simulador de beneficios": corregir** |
| **D11** | No dar clases de contenido PAES | Competir con preuniversitarios | Otro producto, otra competencia; Cepech domina; PACE no tuvo efecto general en ingreso | Secciones 4 y 7.2 | Claude, propuesta; **pendiente de confirmación del líder** |
| **D12** | Informes al colegio solo con tamaño mínimo de grupo | Informes por curso pequeño | Evitar reidentificación | Sección 10 | Claude |
| **D13** | Mantener el tablero de pronóstico como producto secundario para instituciones | Hacerlo el centro | Lo que el líder quiere resolver es el problema del estudiante, no la planificación de oferta | ADR 0018 | [Líder] corrigió el foco |
| **D14** | **Comprometer solo la base**; la capa 2 es intención con fecha de decisión; el asistente se excluye por defecto | Comprometer todo | 21 días para tres personas con dependencias abiertas (PR 132, C14, carga DEMRE). La revisión de Codex lo marcó como falla alta | Secciones 5.1 y 16.1 | Claude, propuesta; **el líder decide** |
| **D15** | Informes a colegios fuera del MVP y sin salida antes de la revisión legal | Ofrecerlos en el piloto desde el inicio | Falta definir el tamaño mínimo y el modelo de anonimización | Sección 10 | Revisión de Codex y Claude |

---

## 13. Cronograma

Calendario del equipo tomado de `docs/equipo/README.md` [Repo]; propuestas de reparto marcadas como tales.

### 13.1 Hasta el 2 de diciembre de 2026

| Semana | Fechas | Qué | Responsable propuesto |
|---|---|---|---|
| 2 | **mié 11 al lun 16 nov** | Revisar y fusionar PR 132 (simulador) y PR 96; verificar si los puntajes de corte están cargados; diseñar la hoja de decisión; **reescribir OG y OE del entregable**; iniciar contactos legales; ficha real desplegada (hito del 16 nov) | Líder (revisiones, legal), Alejandro (pantallas), Cristóbal (datos) |
| 3 | **mar 17 al lun 23 nov** | Guía del FUAS paso a paso; calendario (C14); hoja imprimible; "Mi ruta" local y .ics; simulador inverso. **Viernes 20 nov: go/no-go del asistente** (pruebas de crisis y variables de Gemini). **Lunes 23 nov: despliegue de OE1 y OE2** | Alejandro, Cristóbal |
| 4 | **mar 24 al lun 30 nov** | Competitividad en la ficha (si el ADR 0026 se aprueba). **Viernes 27 nov: congelamiento de funciones.** Pruebas con 5 usuarios (24 al 30), accesibilidad, rendimiento, lenguaje claro, verificación cruzada de datos | Equipo |
| Cierre | **mar 1 y mié 2 dic** | Publicación y presentación; informe de datos | Equipo |

**Fecha legal:** el 1 de diciembre de 2026 es la fecha de vigencia de la Ley 21.719 salvo que se publique la prórroga.

### 13.2 Después (propuesta, sin compromiso)
| Cuándo | Qué |
|---|---|
| Nov a dic 2026 | Decidir vehículo legal; 5 conversaciones (colegio o sostenedor, vinculación con el medio de una institución, una fundación); medición de base |
| Ene a mar 2027 | Carta de intención o convenio; kit del piloto |
| Mar a oct 2027 | Piloto con 60 a 100 estudiantes de 4.º medio y un grupo de 3.º medio, 1 o 2 liceos, con jornada de postulación asistida en temporada |
| Dic 2027 a 2028 | Seguimiento de renovación y continuidad con consentimiento; informe de resultados |

**Las fechas del proceso de admisión y del FUAS 2027 no se verificaron.** Hay que confirmarlas en la fuente oficial.

---

## 14. Cómo se mide

### 14.1 Indicadores del MVP (2 de diciembre)

| Indicador | Cómo se calcula | Meta |
|---|---|---|
| I-OG: tareas centrales completadas sin ayuda | tareas completadas sin ayuda ÷ 20 (5 usuarios × 4 tareas) | ≥ 80 % (16 de 20) |
| I-OG-t: tiempo | Tiempo total de T1 a T4 por usuario | < 10 minutos |
| I-OE1b: trazabilidad | Carreras publicadas con fuente, URL y fecha ÷ publicadas | 100 % |
| I-OE1c: indicadores con "qué mide y qué no" | Indicadores mostrados con definición y límite ÷ indicadores mostrados | 100 % |
| I-OE2a: simulaciones completadas | Usuarios que terminan ÷ 5 | ≥ 80 % |
| I-OE2b: hitos con respaldo | Hitos del calendario con fuente y vigencia ÷ publicados | 100 % |
| I-OE3: hoja de decisión | Usuarios que arman su hoja ÷ 5 | ≥ 80 % |
| Calidad | Lint, pruebas, `python3 scripts/tokens.py --check`, 360 px y teclado | Todos pasan |
| I-OE3b (solo si entra el asistente) | Frases de crisis que entregan *4141 y 600 360 7777 y generan alerta ÷ conjunto de prueba | 100 % |

### 14.2 Indicadores del piloto 2027
- **Conocimiento:** cuestionario breve antes y después, con preguntas propias similares a las de la encuesta de Formando Chile.
- **Avance en el trámite:** el estudiante confirma "inició", "envió" y "obtuvo"; **no se guardan los formularios**.
- **Renovación y segundo año:** solo si la persona vuelve a responder y consiente; se reporta la pérdida de seguimiento.
- **Matrícula, retención y titulación:** se describen como contexto, no como efecto causado.
- **Señal de compra:** carta de intención recibida, o condición concreta que impide comprar escrita por el comprador.
- **Éxito del piloto:** al menos X % completa el FUAS (**X lo fija el líder antes del piloto**), mejora en conocimiento, una carta de intención, una institución que acepta aportar o recibir.

### 14.3 Protocolo de la prueba con 5 usuarios (24 al 30 de noviembre)
- **Perfil:** personas de 16 a 24 años del segmento. Preferir mayores de 18; si hay menores, con autorización del tutor.
- **Reclutamiento:** contactos del equipo y, si es posible, un colegio.
- **Consentimiento:** informado y simple, por escrito, sin recolectar datos personales.
- **Tareas:** T1 a T4 con guion fijo, sin ayuda. **No se usan datos reales del FUAS.**
- **Observación:** ficha por persona con tiempo por tarea, si necesitó ayuda (sí o no) y errores.
- **Criterio por persona y tarea:** completada sin ayuda y dentro del tiempo. Resultado: tabla de 20 tareas.
- **Datos:** registros anónimos, borrados al cerrar la prueba.

### 14.4 Cobertura y mantención de datos al 2 de diciembre
- **Cobertura:** cuántas carreras se publicarán se confirma el 16 de noviembre con datos reales (I-OE1a). Un dato faltante se muestra como "sin dato" con su motivo, nunca como cero.
- **Dueño de las vigencias** (FUAS, beneficios, plazos, fuentes): Cristóbal los carga y mantiene; el líder los verifica antes de publicar.

---

## 15. Qué debe cambiar en el entregable (`docs/entregable/Entregable_Parte_I.md`)

La sección 3.2 hoy mide "16 de 20 tareas completadas sin ayuda (5 usuarios × 4 tareas)" **sin nombrar las 4 tareas** [Repo]. Se proponen estos cambios, **que no se aplican sin la aprobación del líder**:

1. **OG:** nombrar T1 a T4 y agregar el criterio de menos de 10 minutos sin cuenta ni datos personales (borrador en la sección 1 de este documento).
2. **OE1:** agregar la definición de cada indicador y lo que no mide (I-OE1c).
3. **OE2:** cambiar "simulador de beneficios" por "simulador de puntaje y guía del FUAS paso a paso con calendario".
4. **OE3:** pasar de "Ficha, consentimientos y pulso" a "hoja de decisión y Mi ruta guardada en el teléfono, con derivación visible a *4141 y 600 360 7777".
5. Mover los indicadores I-OE3a (consentimiento y RLS) a trabajo futuro; mantener I-OE3b solo si entra el asistente.
6. Actualizar las filas F3 y F4 del calendario, que hoy incluyen Ficha y paneles.
7. Abrir 3.2 con el problema y su evidencia (sección 2.1), citando el límite de cada cifra.

---

## 16. Riesgos y mitigaciones

| Riesgo | Probabilidad e impacto | Mitigación |
|---|---|---|
| No hay comprador demostrado | Alta; define la sostenibilidad | Filantropía primero; piloto como evidencia; entrevistas que preguntan qué condición impediría comprar |
| Las compras de colegios son de preuniversitario y no de orientación | Alta | Presentar el programa como complemento, no sustituto; verificar con el buscador oficial de Mercado Público |
| Vehículo legal inexistente | Alta; bloquea fondos y facturación | Decisión A, B o C con asesoría legal; iniciar contactos esta semana |
| Ley 21.719 puede regir el 1 de diciembre | Media | MVP sin cuentas ni datos personales en servidor |
| El equipo no cierra todo en 21 días | Media | Capas, go/no-go, congelamiento el 27 de noviembre, semana final solo para pruebas |
| Un plazo o regla desactualizada perjudica a un estudiante | Media; daña la confianza | Datos con vigencia, fuente y fecha; revisión de textos; no escribir reglas en el código |
| Mala lectura de un indicador | Media | "Qué mide y qué no" en cada cifra; verificar la definición en la fuente oficial |
| Ayuda humana no escala | Alta en el piloto | Jornadas grupales con adulto del liceo; sin atención individual; medir horas reales |
| Voluntarios con menores | Alta si se activa | No en el primer piloto; convenio y protocolos previos |
| Neutralidad erosionada por pagadores institucionales | Media | Nadie paga por posición ni por traspaso; declaración pública de relaciones |
| PACE ya opera en liceos focalizados | Media | Complementar y no duplicar; hablar con sus coordinadores |
| Dato de prensa o de buscador se cuela como hecho | Media | Etiquetas de esta propuesta; verificación obligatoria antes de publicar |

### 16.1 Planes de contingencia

| Si falla | Entonces |
|---|---|
| El PR 132 (simulador) no se puede fusionar a tiempo | Simulador mínimo solo con el ponderado de `lib/calculos`, sin tocar la capa de datos |
| El calendario (C14) no llega | Publicar solo los hitos verificados en fuente oficial y marcar el resto "por confirmar" |
| La carga DEMRE no está verificada en producción | Mostrar las carreras con datos verificados y "sin dato" en el resto; no publicar ponderaciones sin verificar |
| Falta tiempo de revisión | Orden de revisión: PR 132, luego PR 96, luego el resto |
| El equipo no alcanza | Se cortan primero A4, luego A3, A2 y A1, en ese orden |

---

## 17. Lo que no se sabe (a verificar antes de afirmar)

1. Texto oficial de la Ley 21.719 y estado de la prórroga (Boletín 18.623-07).
2. Quién es el responsable de datos de un equipo sin personalidad jurídica, y si califica como "empresa de menor tamaño".
3. Si el pulso de check-in sería dato de salud (art. 16 bis) o perfilado (art. 8 bis).
4. Si el alojamiento en Brasil y el proveedor de IA cuentan como transferencia internacional, y si hay país con nivel adecuado.
5. Cómo se acredita el consentimiento del tutor.
6. Tamaño mínimo de grupo para informes agregados.
7. Requisito del Registro ATE y su forma jurídica.
8. Monto en pesos del tope de Compra Ágil y reglas vigentes.
9. Si la vinculación con el medio es obligatoria en la acreditación CNA desde mayo de 2025 y cómo se mide.
10. Si hay compras de instituciones de educación superior de captación o seguimiento (buscar manualmente en el buscador oficial de Mercado Público).
11. Fondos filantrópicos con convocatoria abierta y sus bases.
12. Si DEMRE tiene simulador oficial abierto y dónde están hoy las PAES anteriores.
13. Si Casen o la encuesta de empleo del INE traen variable de carrera o área de estudio.
14. Cifras de H&R Block en el PDF original (corregir ADR 0012).
15. Fechas del proceso de admisión y del FUAS 2027.
16. Si los puntajes de corte y los datos de ponderaciones están cargados en la base de producción.
17. Cifra de 40,2 %, cifra de 2.263 orientadores y evidencia de pares: verificar en originales.

---

## 18. Decisiones pendientes del líder

1. **Vehículo legal:** A, B, o C con A o B en paralelo.
2. **Capa 2:** confirmar A1, A2 y A3, y si el asistente (A4) se intenta con corte el 20 de noviembre.
3. **Entregable:** aprobar los cambios de la sección 15.
4. **Clases de contenido PAES:** confirmar que quedan fuera.
5. **Umbral de éxito del piloto (X %).**
6. **Qué hacer con el ADR 0027 y la entrada del 2026-11-11 de la bitácora:** quedan como propuesta sin fusionar y este documento las supera.
7. **Panel de agencia e institucional:** retirarlo del calendario hasta después del 2 de diciembre.
8. **Con quién conversar primero:** colegio o sostenedor, institución y fundación.

---

## 19. Documentos del repositorio que esta propuesta afecta

| Documento | Efecto |
|---|---|
| `docs/entregable/Entregable_Parte_I.md` | Cambios de la sección 15 |
| `docs/decisiones/0027-enfoque-de-transicion-y-plan-colegio.md` (propuesta, sin fusionar) | Superado por este documento; decidir si se elimina o se enmienda |
| `docs/decisiones/0012-cadena-causal-y-promesa.md` | Corregir la cifra de H&R Block ("+8 puntos de permanencia") |
| `docs/decisiones/0010-modulo-de-permanencia.md` | Sin cambios inmediatos; el módulo queda fuera hasta después del 2 de diciembre |
| `docs/equipo/README.md` (calendario) | Retirar paneles de la semana 4 |
| `docs/equipo/guia-*.md` | Agregar las tareas de la capa 2 |
| `AGENTS.md` | Sin cambios hasta aprobar este documento |

---

## 20. Cómo se elaboró y cómo se revisó

- Cuatro investigaciones web en paralelo el 2026-11-11 (compras de colegios, compras de instituciones y fondos, necesidades de colegios vulnerables e instituciones, y mapa de sitios del Estado), más investigaciones previas sobre la Ley 21.719, productos similares y fuentes de empleo.
- Lectura del repositorio y de GitHub: AGENTS.md, ADR 0010, 0012, 0013, 0017, 0018 y 0027, análisis de mercado, glosario, entregable y calendario del equipo.
- Dos revisiones independientes de propuestas anteriores (Codex y Antigravity), cuyas críticas se incorporaron en las decisiones D2, D4, D5, D6, D7 y D10.
- **Revisión de este documento por Codex y Antigravity:** ver la sección 21 (se completa tras la revisión).

## 21. Resultado de la revisión externa

**Codex** (revisión independiente, solo con acceso al repositorio). Veredicto: *no aprobar tal cual*. Confirmó 8 afirmaciones [Repo] y señaló 8 puntos débiles. Qué se hizo con cada uno:

| Punto de Codex | Resultado |
|---|---|
| Vigencia legal "imposible" (15 de octubre de 2027) | Era una **redacción ambigua**: esa es la nueva fecha de entrada en vigencia propuesta, no una fecha de aprobación. Se reescribió y se marcó por verificar |
| T2 prometía simular el Ranking | **Correcto.** El ADR 0024 y `puntaje-ranking.ts` dicen que la plataforma no lo calcula. Corregido |
| Alcance irreal en 21 días | **Aceptado en parte.** Solo la base es compromiso; la capa 2 es intención con go/no-go y orden de corte (5.2, 16.1, D14). El líder había pedido ir más allá del mínimo, por eso no se eliminó |
| Comprensión antes y después sin instrumento | **Aceptado.** Pasa al piloto 2027 |
| Fin mayor contradictorio con "no se promete" | **Aceptado.** Se redactó como aspiración de largo plazo |
| Venta sin ruta operativa | **Aceptado.** Nueva sección 7.9 con hipótesis única, cinco conversaciones, guion y decisión |
| Reportes a colegios sin salvaguarda | **Aceptado.** Fuera del MVP, no antes de revisión legal (D15) |
| Asistente de alto riesgo | **Aceptado.** Excluido por defecto, con condiciones |
| Contradicciones: DEMRE "corregida y verificada" frente al PR 62 | **Correcto.** Verificado con GitHub: el PR 62 está cerrado sin fusionar. Corregido en 5.1 y 9 |
| ADR 0018 con estados legales inconsistentes | **Correcto.** Se agregó una cautela en 5.5 |
| Falta protocolo de prueba, dueño de datos, cobertura y contingencias | **Aceptado.** Secciones 14.3, 14.4 y 16.1 |

**No adoptado:** cortar A1 a A4 de plano. La recomendación de Codex es razonable, pero el líder pidió un producto más avanzado; queda como intención condicionada y **la decisión es del líder**.

**Antigravity.** **No entregó revisión.** La primera ejecución fue bloqueada porque necesitó un permiso de comandos que el modo sin interfaz no puede pedir; la segunda, pidiéndole solo lectura de archivos, agotó 500 segundos sin respuesta. No se reintentó en bucle ni se saltó el control de permisos. **Este documento tiene, por tanto, una sola revisión externa.**
