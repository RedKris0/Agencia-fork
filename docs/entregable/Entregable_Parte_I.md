# ENTREGABLE: PARTE I

| ESCUELA: | [Escuela de Ingenería] |
|---|---|
| CARRERA: | Ingeniería de Ejecución en Informática, mención Desarrollo de Sistemas |
| SECCIÓN: | [1] |
| NOMBRES INTEGRANTES DEL EQUIPO: | 1. Rafael Jaque · 2. Alejandro Tapia · 3. Cristóbal Rojas|
| PROYECTO: | Agencia de Enlace & Seguimiento Estudiantil (AE-SE) |
| REPOSITORIO: | https://github.com/AE-SE/Agencia-de-Enlaces-y-Seguimiento-Estudiantil.git |

# AVANCE 1

## 1. Bases del proyecto

El problema de partida es la exclusión de la educación superior causada por desinformación sobre beneficios estudiantiles, y el abandono posterior de quienes ingresan. Del egreso de enseñanza media de 2020 (258.418 personas), 143.191 (55,4 %) no estaban matriculadas en educación superior en 2021; esta cifra mide ingreso inmediato, no «nunca» (Centro de Estudios Mineduc, 2022, Tabla 10, p. 80). Entre quienes ingresan, la retención de primer año de la cohorte 2023 fue de 76,5 % (Servicio de Información de Educación Superior [SIES], s. f.). El proyecto construye la **Agencia de Enlace & Seguimiento Estudiantil (AE-SE)**, una plataforma gratuita para el estudiante que lo acompaña antes, durante y después de entrar a la educación superior. Este punto define para quién se trabaja, qué se innova y bajo qué condiciones; los objetivos medibles se formulan en el Punto 3.

**Segmento objetivo: edad y sector social.** El proyecto no se dirige a «todos los jóvenes». Se acota a quienes muestran el problema en los datos oficiales:

- **Sector social:** estudiantes de establecimientos con financiamiento público, es decir, municipales, Servicios Locales de Educación Pública (SLEP), particulares subvencionados y de administración delegada. Los **particulares pagados quedan fuera del objetivo**.
- **Edad y etapa:** estudiantes de 3.º y 4.º medio y egresados de hasta cinco años de esos establecimientos, de **16 a 24 años**, más quienes cursan su primer año de educación superior viniendo de ellos. El rango de edad es una decisión del equipo, no un dato: el límite inferior corresponde a 3.º medio y el superior coincide con el indicador de jóvenes de 18 a 24 años que no estudian ni trabajan del Punto 2 y con la ventana de cinco años de acceso acumulado del SIES. Quienes tienen menos de 18 años requieren autorización de su madre, padre o tutor (`AGENTS.md`, 2.2).

**Tabla 1.0.** Acceso a la educación superior según dependencia del establecimiento de origen.

| Dependencia | Acceso inmediato (egreso 2021, matrícula 2022) | Acceso acumulado al 5.º año (egreso 2017) |
|---|---|---|
| Municipal | 37,8 % | 68,3 % |
| Servicio Local de Educación Pública | 36,3 % | sin dato (primera cohorte de egreso en 2018) |
| Particular subvencionado | 41,9 % | 79,2 % |
| Administración delegada | 40,1 % | 73,9 % |
| **Particular pagado** | **68,7 %** | **94,0 %** |
| Total | 42,5 % | 76,4 % |

Fuente: Servicio de Información de Educación Superior [SIES] (2023), Tabla 3, p. 8, y Tabla 12, p. 16 (en el total, Tabla 1, p. 5, y Tabla 9, p. 14). Es el informe oficial más reciente de esta serie que el equipo pudo descargar y leer (10 de noviembre de 2026); las ediciones posteriores quedan por buscar.

**Por qué se excluyen los particulares pagados.** (1) La brecha es de 30,9 puntos porcentuales en el acceso inmediato (68,7 − 37,8, frente a los municipales) y de 25,7 puntos a los cinco años (94,0 − 68,3). En ese grupo el problema de exclusión que el proyecto ataca es mucho menor. (2) Los beneficios del Estado se asignan según la situación socioeconómica que se acredita en el FUAS, y el proyecto se justifica por la desinformación sobre esos beneficios. (3) El equipo no tiene evidencia de que la falta de información sea una causa de no ingreso en colegios de altos recursos, y no puede afirmar que la solución sea factible allí. **Límite:** la dependencia es una aproximación al sector social, no una medida de ingreso familiar, porque hay familias de ingresos altos en colegios subvencionados y de ingresos bajos en colegios pagados. Para elegir los liceos del piloto puede sumarse un índice de vulnerabilidad oficial `[CONFIRMAR fuente y año]`.

**El segmento no limita el acceso.** El portal sigue siendo gratuito y abierto a cualquier persona, sin pedir el tipo de colegio. El segmento define para quién se diseña, a quién se encuesta y entrevista, y sobre quién se miden las metas del Punto 3.

### 1.1 Necesidades de los grupos de interés

Los grupos de interés son quienes afectan o son afectados por el logro del proyecto (Freeman, 1984). Las necesidades de la tabla se formulan como verbo más objeto, sin nombrar una solución, y se tipifican como funcionales, emocionales o sociales (Osterwalder et al., 2014). Por ahora son **hipótesis derivadas de datos secundarios y del diseño del proyecto**. Se confirmarán con la encuesta escolar (un instrumento estandarizado, en `docs/encuestas/`; muestra por conveniencia; aún no aplicada) y con entrevistas a actores clave `[COMPLETAR con resultados reales tras aplicar el instrumento]`. Los puntajes de poder e interés (1 a 5) son una estimación del equipo; se considera «alto» un valor igual o superior a 4.

**Tabla 1.1.** Actores, necesidades y puntajes.

| N.º | Actor (quién, dónde) | Clasificación | Necesidad (verbo + objeto) | Tipo | Evidencia inicial | Poder | Interés |
|---|---|---|---|---|---|---|---|
| 1 | Estudiantes de 3.º y 4.º medio y egresados de hasta cinco años (16 a 24 años) de establecimientos municipales, SLEP, particulares subvencionados y de administración delegada del territorio de prueba `[CONFIRMAR: territorio; se propone la Región de O'Higgins]` | Grupo objetivo | Identificar qué carreras y beneficios les corresponden y en qué plazo postular | Funcional | 55,4 % sin matrícula inmediata (Centro de Estudios Mineduc, 2022). Acceso inmediato de 36,3 % a 41,9 % en el segmento, frente a 68,7 % en particulares pagados (SIES, 2023; Tabla 1.0). No existe cifra oficial de cuántos no postulan por no saber cómo; se declara como brecha de información | 2 | 5 |
| 2 | Los mismos estudiantes, al decidir y postular | Grupo objetivo | Sentir seguridad de no cometer un error irreparable al postular | Emocional | A confirmar con encuesta escolar (pendiente) | 2 | 5 |
| 3 | Estudiantes de primer año de educación superior que egresaron de los establecimientos del segmento | Grupo objetivo | Conocer qué requisitos de avance deben cumplir para mantener sus beneficios | Funcional | Persistencia al 2.º año de 88,2 % con beneficios y 74,4 % sin ellos, cohorte 2022; diferencia observada, no causal (SIES, s. f.) | 2 | 5 |
| 4 | Madres, padres o tutores de estudiantes menores de 18 años | Grupo de interés directo | Decidir con información clara sobre el uso de los datos de su hijo o hija | Funcional | Requisito de diseño por la Ley 21.719; a confirmar con entrevistas (Tabla 2.D.2) | 3 | 4 |
| 5 | Orientadores y profesores jefes de liceos del segmento en el territorio de prueba | Grupo de interés directo | Disponer de datos oficiales actualizados para orientar a sus estudiantes | Funcional | A confirmar con entrevistas (pendientes) | 3 | 4 |
| 6 | Direcciones de liceos y Servicios Locales de Educación Pública | Grupo de interés indirecto | Mostrar a su comunidad que sus egresados continúan estudios | Social | 55,4 % sin matrícula inmediata (contexto); a confirmar con entrevistas | 4 | 3 |
| 7 | Direcciones de Asuntos Estudiantiles (DAE) de instituciones de educación superior | Cliente potencial | Saber a tiempo, y solo con autorización del estudiante, quién se desconecta de su carrera | Funcional | Retención de primer año 76,5 %, cohorte 2023 (SIES); a confirmar con entrevistas | 4 | 4 |
| 8 | Vicerrectorías académicas y unidades de acreditación de esas instituciones | Cliente pagador potencial | Demostrar acciones e indicadores de progresión estudiantil ante la Comisión Nacional de Acreditación (CNA) | Funcional y social | El Criterio 2 de la Dimensión I exige apoyo a la progresión con indicadores (`docs/informe-fundamentacion.md`, sección 5) | 5 | 3 |
| 9 | Ministerio de Educación (Mineduc) y Subsecretaría de Educación Superior | Regulador y proveedor de datos | Ver sus datos abiertos reutilizados con fuente y sin sobrecargar sus servicios | Funcional | Términos de uso en `docs/fuentes.md` | 5 | 2 |
| 10 | Proveedores de infraestructura (Cloudflare, Supabase, Google) | Externo indirecto | Que el uso del servicio respete sus condiciones | Funcional | Condiciones de los planes gratuitos y de pago, `docs/decisiones/0003-hosting-cloudflare.md` | 3 | 1 |

**Roles del cliente en este proyecto.** Quien usa el sistema no es quien paga ni quien decide.

| Rol | Quién es | Observación |
|---|---|---|
| Usuario | Estudiantes (actores 1 a 3); tutores que autorizan (4); orientadores (5); equipos DAE en el panel institucional (7) | El estudiante nunca paga: la plataforma es gratuita para él |
| Beneficiario | Estudiantes y sus familias; liceos (6) por la continuidad de sus egresados | El beneficio es acceder a beneficios y permanecer |
| Cliente o pagador | Instituciones de educación superior que arrienden acceso al panel institucional (7 y 8) | Hipótesis comercial aún no validada; ninguna institución es cliente hoy |
| Decisor | Vicerrectorías y DAE para adoptar el panel (7 y 8); el estudiante, o su tutor si es menor, para compartir su Ficha de Trayectoria; direcciones de liceo (6) para autorizar encuestas | La Ficha pertenece al estudiante, con consentimiento granular y revocable |

**Mapa de actores (matriz de Mendelow, 1991).** Los números remiten a la Tabla 1.1.

| | Interés bajo (1 a 3) | Interés alto (4 a 5) |
|---|---|---|
| **Poder alto (4 a 5)** | **Mantener satisfechos:** 6 Direcciones de liceos y SLEP; 8 Vicerrectorías y acreditación; 9 Mineduc y Subsecretaría | **Gestionar de cerca:** 7 DAE |
| **Poder bajo (1 a 3)** | **Monitorear:** 10 Proveedores de infraestructura | **Mantener informados:** 1 y 2 Estudiantes de 3.º y 4.º medio y egresados recientes del segmento; 3 Estudiantes de primer año; 4 Tutores; 5 Orientadores |

La estrategia de relación y el responsable de cada actor están en la Tabla 1.2 (Anexo 1.B).

### 1.2 Bases de la innovación

**Tabla 1.3.** Clasificación de la innovación (OECD/Eurostat, 2018).

| Criterio | Respuesta |
|---|---|
| Objeto | De proceso: cambia la forma de entregar la orientación y el seguimiento, hoy dispersos en archivos y sitios distintos; se materializa como un servicio digital |
| Grado | Incremental: reúne y personaliza información oficial que ya existe; no cambia las reglas del sistema |
| Alcance de la novedad | Nueva para el segmento (establecimientos con financiamiento público, 16 a 24 años) del territorio de prueba y para las instituciones donde se pilotee; no se afirma novedad para el mercado |
| Qué cambia respecto de hoy | El estudiante consulta datos oficiales con su fuente y fecha, planifica sus postulaciones y renovaciones, y es dueño de una ficha que comparte solo con consentimiento |
| Competencias que la sustentan `[CONFIRMAR con el perfil oficial de la carrera]` | Desarrollo de software web; bases de datos y seguridad de la información; análisis de datos e inteligencia de negocios |

El proyecto propone una innovación de proceso, de carácter incremental, nueva para el territorio de prueba y para las instituciones donde se pilotee, que consiste en reunir en un solo servicio gratuito la información oficial sobre carreras y beneficios y el acompañamiento posterior a la matrícula, bajo control del estudiante. Se sustenta en las competencias de desarrollo de software web, bases de datos y seguridad, y análisis de datos de la carrera, que permiten construir el servicio, aislar los datos de cada institución y transformar archivos oficiales dispersos en información comparable.

### 1.3 Los siete ejes del proyecto

**Calidad.** Para este proyecto, calidad es que cada dato tenga fuente, URL y fecha, que los cálculos se contrasten con la fuente oficial y que la interfaz cumpla las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 nivel AA (World Wide Web Consortium [W3C], 2023). Hoy es una meta: aún no se miden el rendimiento en conexión lenta ni la compatibilidad con lector de pantalla. Decisión: un dato que no se pueda verificar en una fuente oficial no se publica, y los colores y medidas salen solo de `diseno/tokens.json`.

**Tiempo.** La entrega es el 2 de diciembre de 2026 y el plan tiene cuatro semanas: cimientos (3 al 9 de noviembre), explorar (10 al 16), acompañar (17 al 23) y seguir y vender (24 al 30, con pruebas de 5 usuarios), más el cierre del 1 y 2 de diciembre. Decisión: el alcance se limita al explorador, los beneficios y el acompañamiento mínimos; quedan fuera la aplicación nativa, el modelo predictivo y los foros.

**Factibilidad.** La viabilidad técnica tiene respaldo parcial: existe un sitio desplegado con 10 carreras de ejemplo verificadas y programas de carga que procesaron 11.364 carreras de pregrado, aún no cargadas a la base. Las dimensiones legal y ética condicionan más: el proyecto exige autorización del tutor para menores de 18 años (`AGENTS.md` 2.2, diseñado para cumplir la Ley 21.719), y la inteligencia artificial no puede diagnosticar ni reemplazar a un profesional. Decisión: recolectar solo datos mínimos, aplicar el protocolo de crisis con pruebas automatizadas y no condicionar el simulador a la respuesta pendiente de Mineduc sobre la serie FUAS (vence cerca del 2 de diciembre). El análisis completo queda para el Avance 2.

**Cadena de valor.** Las actividades que crean valor son: descargar datos oficiales, cargarlos con fuente y fecha, mostrarlos en el explorador, orientar sobre beneficios y plazos, guardar la ficha con consentimiento y derivar a la red de apoyo cuando corresponde (Porter, 1985). Participan Cristóbal (datos y contenido), Alejandro (interfaz) y Rafael (arquitectura y privacidad). Decisión: los datos públicos y los datos de personas viven separados, y la institución solo ve a los estudiantes que autorizaron.

**Incertidumbre de mercado.** Hay tres supuestos sin validar: que los estudiantes usen la plataforma y respondan el pulso de check-in, que las instituciones paguen por el panel y qué fracción del abandono se puede evitar con información (no existe estimación; el costo total del abandono es solo un techo, ADR 0013). Decisión: validar con 5 usuarios y las encuestas antes de afirmar utilidad, y no publicar cifras de impacto ni prometer reducir la deserción.

**Marco estratégico.** La oportunidad es que la acreditación institucional exige apoyo a la progresión estudiantil con indicadores, mientras que la Ley 21.091 no obliga a las instituciones a acompañar: el servicio se ofrece como ventaja en acreditación, no como cumplimiento legal. La promesa autorizada es reducir la exclusión causada por desinformación sobre beneficios y acompañar la permanencia (`docs/decisiones/0012-cadena-causal-y-promesa.md`). Decisión: nunca ordenar ni destacar instituciones por ser clientes, y no prometer mejorar la salud mental ni predecir deserción. Misión, visión y valores se formulan en el Avance 2.

**Presupuesto y recursos.** Se comparan dos alternativas. La alternativa A, elegida, es una aplicación web instalable con planes gratuitos de Cloudflare y Supabase: sin desembolso directo, con el riesgo de que Cloudflare termine el servicio gratuito sin aviso y de que no permita procesar tarjetas (`docs/decisiones/0003-hosting-cloudflare.md`). La alternativa B son aplicaciones nativas para dos sistemas operativos, con más costo y plazo `[COMPLETAR con precios con fuente y fecha de consulta]`. Los recursos humanos son los tres integrantes del equipo. Decisión: alternativa A, con la infraestructura aislada tras interfaces que permiten cambiar de proveedor.

### 1.4 Bases de desarrollo

Cada decisión nace de una necesidad de la Tabla 1.1 y de un eje.

**Tabla 1.4.** Bases de desarrollo.

| Necesidad (actor) | Eje | Base de desarrollo (decisión) |
|---|---|---|
| Identificar carreras y beneficios y su plazo (1) | Calidad | Todo dato mostrado lleva fuente, URL y fecha de actualización; beneficios y plazos viven en datos versionados con fecha de vigencia, no en el código |
| Sentir seguridad al postular (2) | Tiempo | Se prioriza un explorador y un simulador de beneficios con calendario FUAS antes del acompañamiento, con textos en lenguaje claro y siglas explicadas |
| Identificar carreras y beneficios (1), en el segmento con menor acceso | Incertidumbre de mercado | Se diseña, se encuesta y se mide en establecimientos con financiamiento público y personas de 16 a 24 años; no se afirma utilidad para colegios particulares pagados (Tabla 1.0). El portal sigue abierto a todos |
| Decidir sobre los datos de un menor (4) | Factibilidad | Un menor de 18 años no otorga consentimientos sin autorización de su tutor; el registro no pide RUT ni teléfono |
| Mantener beneficios y no sentirse etiquetado (3) | Factibilidad | El pulso de check-in es un sensor por autorreporte y silencio, no un predictor; la interfaz no usa etiquetas como «en riesgo» y deriva a *4141 y Salud Responde 600 360 7777 |
| Saber quién se desconecta, solo con autorización (7) | Cadena de valor | El panel institucional se construye como demostración con datos de ejemplo, aislado por institución en la base de datos, y muestra solo estudiantes con consentimiento vigente |
| Demostrar progresión ante la CNA (8) | Marco estratégico | Se usa el término «progresión» y no se prometen cifras de deserción evitada; la institución podrá calcular su costo con sus propios datos (ADR 0013) |

### Anexo 1.A Referencias a documentos del repositorio

Fuentes de datos y condiciones de uso: `docs/fuentes.md`. Verificación de cifras: `docs/verificacion-de-cifras.md`. Plan de trabajo: `docs/plan.md`. Decisiones: `docs/decisiones/0003-hosting-cloudflare.md`, `0010-modulo-de-permanencia.md`, `0012-cadena-causal-y-promesa.md`, `0013-desercion-evitable.md`.

### Anexo 1.B Estrategia y responsable por actor

**Tabla 1.2.** Estrategia y responsable por actor. El reparto es una propuesta según los roles del equipo.

| Actor | Estrategia | Responsable |
|---|---|---|
| 1, 2, 3 Estudiantes | Pruebas de uso con 5 usuarios reales y recogida de opinión durante el desarrollo | Alejandro |
| 4 Tutores | Explicar en lenguaje claro qué datos se piden y por qué; autorización antes de cualquier consentimiento | Alejandro |
| 5 Orientadores | Compartir el explorador y recoger observaciones sobre los datos mostrados | Cristóbal |
| 6 Liceos y SLEP | Carta formal para autorizar la aplicación de encuestas; informar resultados sin saturar | Cristóbal |
| 7 DAE | Entrevistas y demostración del panel con datos de ejemplo; involucrar en las decisiones del panel | Rafael |
| 8 Vicerrectorías | Informes periódicos con el vocabulario de «progresión»; sin prometer resultados | Rafael |
| 9 Mineduc | Cumplir términos de uso, citar fuente y fecha, seguir la solicitud de transparencia por la serie FUAS (folio AJ025T0003786) | Cristóbal |
| 10 Proveedores | Revisar condiciones de servicio antes de cada despliegue | Rafael |

## 2. Diagnóstico

Este punto mide y explica el problema antes de proponer cómo se aborda. Contrasta tres fuentes (Hernández-Sampieri y Mendoza, 2018): datos secundarios oficiales verificados, una encuesta y entrevistas. **Estado de la investigación primaria:** los instrumentos están diseñados, pero **todavía no se aplican**; las tablas de resultados llevan la marca `[COMPLETAR con resultados reales tras aplicar el instrumento]` y se llenan antes del 2 de diciembre de 2026. Es una limitación declarada, no un resultado. Los apartados 2.1 a 2.4 describen el problema sin la solución, 2.5 evalúa el proyecto con un FODA y la respuesta se explica desde 2.6.

### 2.1 Contexto y descripción del desafío

**Territorio y grupo afectado.** Personas de 16 a 24 años que cursan 3.º o 4.º medio o egresaron hace cinco años o menos de establecimientos municipales, SLEP, particulares subvencionados o de administración delegada, y quieren acceder a la educación superior, más quienes ingresan desde esos establecimientos y deben mantenerse en ella (segmento definido en el Punto 1, Tabla 1.0). Como territorio de referencia se propone la Región de O'Higgins `[CONFIRMAR: coincide con el territorio de prueba del Punto 1]`. Los actores se numeran como en la Tabla 1.1 del Punto 1.

**Problema central.** Una parte importante de las personas que egresan de la enseñanza media no ingresa de inmediato a la educación superior, y una parte de quienes ingresan no continúa, aun cuando existen beneficios estudiantiles cuyo acceso depende de un trámite (el Formulario Único de Acreditación Socioeconómica, FUAS) y de requisitos que cambian cada año.

**Por qué importa.**

- De 258.418 personas que egresaron de enseñanza media en 2020, 143.191 (55,4 %) no estaban matriculadas en educación superior en 2021. Mide ingreso **inmediato**, no «nunca» (Centro de Estudios Mineduc, 2022, Tabla 10, p. 80).
- Entre quienes ingresan, la retención de primer año de la cohorte 2023 fue de 76,5 % y la persistencia en educación superior de 83,6 % (Servicio de Información de Educación Superior [SIES], s. f.).
- Los estudiantes con beneficios persisten más: 88,2 % frente a 74,4 % sin ellos en la cohorte 2022 (13,8 puntos porcentuales; SIES, 2023). Es una diferencia observada, **no causal**: quienes obtienen beneficios difieren de quienes no.
- El 19 % de las personas de 18 a 24 años no estudia ni trabaja (NEET, por la sigla inglesa), frente a un promedio de la Organización para la Cooperación y el Desarrollo Económicos (OCDE) de 14 %, cifra en revisión (OCDE, 2026).
- El abandono de la educación superior se estima en $546.000 millones al año (US$ 780 millones; Cátedra UNESCO de Inclusión, 2016, Tabla 6, p. 44). Es un **techo** del problema, no la fracción evitable por información.

**Necesidad de concretar la propuesta.**

1. *El problema se repite cada año.* Si 143.191 egresos de una cohorte no ingresan de inmediato, si una cifra similar se repitiera en tres cohortes serían unos 430.000 (143.191 × 3 = 429.573). Es un orden de magnitud ilustrativo, no un dato observado: cada cohorte tiene tamaño distinto y parte ingresa más tarde.
2. *Lo central no se puede medir hoy con datos oficiales.* No hay cifra publicable de cuántas personas no postulan por no saber cómo, ni serie pública de postulaciones al FUAS. Por eso el equipo presentó una solicitud de acceso a la información pública a la Subsecretaría de Educación Superior (4 de noviembre de 2026, folio AJ025T0003786; respuesta en torno al 2 de diciembre, prorrogable) y diseñó una encuesta con un instrumento estandarizado y entrevistas (Ley 20.285, 2008).
3. *El acceso mejora, el acompañamiento no necesariamente.* La matrícula de pregrado creció 13,0 % entre 2022 y 2026 y la retención de primer año subió de 75,6 % a 77,3 % entre las cohortes 2020 y 2024 (Subsecretaría de Educación Superior, 2026; SIES, 2026), pero 16,4 % de la cohorte 2023 (100 − 83,6) no tenía matrícula en educación superior al año siguiente.
4. *No hay obligación legal de acompañar.* La Ley 21.091 no la impone a las instituciones (el artículo 8, letra c, encarga promover la permanencia a la Subsecretaría), aunque el estándar de la Comisión Nacional de Acreditación (CNA) pide apoyo a la progresión con indicadores (Ley 21.091, 2018; CNA, s. f.).

### 2.2 Magnitud del problema

Fórmulas: Porcentaje = (parte ÷ total) × 100; Tasa = (casos ÷ población) × 1.000; Variación % = ((final − inicial) ÷ inicial) × 100; Brecha = valor local − valor de referencia.

**Tabla 2.1.** Matriz de datos secundarios. Solo cifras verificadas en `docs/verificacion-de-cifras.md`.

| Indicador | Valor local (Chile; O'Higgins si existe) | Referencia o comparación | Año | Fuente |
|---|---|---|---|---|
| Egresados de media sin matrícula en educación superior al año siguiente | 143.191 de 258.418 = 55,4 %; tasa 554,1 por 1.000 | Con matrícula: 115.227 = 44,6 % | Egreso 2020, matrícula 2021 | Centro de Estudios Mineduc (2022) |
| Acceso inmediato según dependencia (segmento frente a particular pagado) | Municipal 37,8 %; SLEP 36,3 %; particular subvencionado 41,9 %; administración delegada 40,1 % | Particular pagado 68,7 %: brecha de 30,9 pp con el municipal | Egreso 2021, matrícula 2022 | SIES (2023), Tabla 3, p. 8 |
| Brecha de persistencia al 2.º año, con y sin beneficios | Cohorte 2022: 88,2 − 74,4 = 13,8 pp | Cohorte 2020: 86,3 − 74,2 = 12,1 pp; la brecha creció 1,7 pp | 2020 y 2022 | SIES (2021, 2023) |
| Retención de primer año | 77,3 % (cohorte 2024) | 75,6 % (cohorte 2020): +1,7 pp (+2,2 %) | 2020-2024 | SIES (2026) |
| Cohorte sin matrícula en educación superior al año siguiente | 16,4 % (100 − 83,6) | Retención 76,5 % | Cohorte 2023 | SIES (s. f.) |
| NEET 18-24 años | 19 % | OCDE 14 %: +5 pp (+35,7 %); si fuera 13 %: +6 pp (+46,2 %) | 2025 (referencia en revisión) | OCDE (2026) |
| Variación del NEET 18-24 años | 26,1 % a 19 %: −7,1 pp; ((19 − 26,1) ÷ 26,1) × 100 = −27,2 % | OCDE 2020: 14,7 % | 2020-2025 | OCDE (2023, 2026) |
| Síntomas ansiosos o depresivos moderados o severos (cuestionario de salud del paciente de cuatro ítems, PHQ-4, últimas dos semanas) | Jóvenes 26,9 %; O'Higgins 24,8 % | Adultos 13,0 %: jóvenes +13,9 pp (2,1 veces); O'Higgins −2,1 pp del total nacional (no significativa) | 2022 | Instituto Nacional de la Juventud [INJUV] (2022) |
| Pérdida anual por abandono | $546.000 millones | 26 % del gasto público universitario (US$ 96,2 millones) | 2016; estudio de 2005 | Cátedra UNESCO (2016); González et al. (2005) |
| O'Higgins: oferta de educación superior | Concentrada en 6 de 33 comunas (18,2 %) | — | **origen pendiente** | Por rastrear a Subsecretaría, Departamento de Evaluación, Medición y Registro Educacional (DEMRE) o SIES |
| O'Higgins: matrícula de primer año | −2,62 % (9.853 a 9.595; −258) | Nacional +2,6 % (SIES) o +2,5 % (CNED), universos distintos | 2026; **origen pendiente** | Columna del rector del IP-CFT Santo Tomás Rancagua (no oficial) |

**Tabla 2.2.** Datos de la Figura 1: persistencia al 2.º año con y sin beneficios (%). Fuente: elaboración propia con datos de SIES (2021, 2023). `[CONFIRMAR: generar el gráfico con Excel o Python]`

| Cohorte | Con beneficios | Sin beneficios | Brecha (pp) |
|---|---|---|---|
| 2020 | 86,3 | 74,2 | 12,1 |
| 2022 | 88,2 | 74,4 | 13,8 |

**Tabla 2.3.** Datos de la Figura 2: jóvenes de 18 a 24 años que no estudian ni trabajan (%). Fuente: elaboración propia con datos de OCDE (2023, 2026). `[CONFIRMAR: generar el gráfico]`

| Año de referencia | Chile | Promedio OCDE |
|---|---|---|
| 2015 | 21 | sin dato |
| 2020 | 26,1 | 14,7 |
| 2025 | 19 | 14 (13 en revisión) |

**Lectura.** (a) Más de la mitad de una cohorte no ingresa de inmediato. (b) Quienes tienen beneficios persisten 12 a 14 puntos más: sugiere que el trámite importa, sin probar causa. (c) El NEET baja desde 2020 pero sigue 5 o 6 puntos sobre la OCDE. (d) Acceso y retención mejoran mientras el indicador general de salud mental del Termómetro Achs–UC empeora (12,7 % en abril de 2025; 18,5 % en junio-agosto de 2026), dato de una ronda sin informe público que se cita solo con cautela (Achs, s. f.; Universidad Católica, 2026).

**Localización.** No se encontró dato comunal publicado sobre ingreso a educación superior ni sobre postulación a beneficios; el dato verificado más desagregado es regional (INJUV, 24,8 % en O'Higgins). Las discrepancias y limitaciones de los datos están en el Anexo 2.D (Tabla 2.D.1). Los dos datos regionales de acceso tienen origen pendiente y no se usan como evidencia hasta rastrearlos a un informe oficial. La encuesta recoge la región (C2) y aportará datos primarios de localización.

### 2.3 Levantamiento primario

#### 2.3.1 Plan

**Tabla 2.4.** Plan de levantamiento primario. Las fechas son una propuesta `[CONFIRMAR fechas exactas]`; todas quedan antes del 2 de diciembre de 2026. Las cifras de personas son metas, no logros.

| Instrumento | Objetivo | A quién / cuántos (meta) | Fechas previstas | Responsable |
|---|---|---|---|---|
| Permiso, juicio de expertos y piloto | Pedir a los autores permiso para usar la escala; revisar la adaptación de vocabulario y medir el tiempo de respuesta (controles adicionales, no el respaldo) | Autores de la EAEC; 3 a 5 expertos; 10 a 15 estudiantes | 9 al 15 de noviembre | `[CONFIRMAR]` |
| Encuesta escolar (EAEC, instrumento estandarizado) | Autoeficacia para la elección de carrera, con énfasis en la confianza para obtener información de carreras | Estudiantes de 3.º y 4.º medio de establecimientos del segmento (municipales, SLEP, particulares subvencionados o de administración delegada); al menos 100, en al menos dos establecimientos | 16 al 27 de noviembre | `[CONFIRMAR]` |
| Entrevistas semiestructuradas | Entender cómo se vive el problema y por qué ocurre | 6 a 8 personas de los actores del Punto 1 (Tabla 2.D.2) | 12 al 27 de noviembre | `[CONFIRMAR]` |

Se elige entrevistas y no *focus group* porque el tema toca ingresos familiares y pérdida de beneficios, que son sensibles (Krueger y Casey, 2015).

#### 2.3.2 Encuesta

Se aplica **un solo instrumento de medición estandarizado, completo y en español**: la **Escala de Autoeficacia para la Elección de Carrera (EAEC)** (Ramírez Dorantes y Canto, 2007). Tiene 55 ítems con respuesta de 0 (ninguna confianza) a 9 (confianza absoluta), en cinco subescalas: Autoconocimiento, Información ocupacional, Establecimiento de metas, Solución de problemas y Planeación. Se desarrolló a partir de la versión en español del *Career Decision-Making Self-Efficacy Scale* (Taylor y Betz, 1983) con 343 estudiantes de bachillerato de México. Su confiabilidad es α = 0,95 en la escala total y de 0,79 a 0,88 en las subescalas (Tabla 1, p. 47). Se agregan solo tres preguntas de clasificación (curso, región y tipo de colegio). No hay preguntas de elaboración propia ni ítems de otras fuentes. El instrumento, el formulario y la ficha metodológica están en `docs/encuestas/`; los ítems, en el Anexo 2.A.

- **Por qué este instrumento.** Mide la confianza para realizar las tareas que exige elegir una carrera. Su subescala de Información ocupacional (ítems 12 a 21) corresponde a la causa directa 1 del árbol de problemas: la asimetría de información. Está en español, sus ítems están publicados textualmente y tiene evidencia de confiabilidad y estructura factorial. Se descartaron otras opciones: la versión corta del CDMSE en español (no se obtuvieron sus ítems), la EPEV (su licencia prohíbe el uso comercial) y la E-DTDC (ítems no publicados). No se encontró una escala validada en Chile sobre información de educación superior o beneficios.
- **Objetivo.** Describir la autoeficacia para la elección de carrera de estudiantes de 3.º y 4.º medio del segmento, con énfasis en la confianza para obtener información de carreras, y compararla entre cursos y tipos de colegio.
- **Diseño y adaptación.** La escala se aplica completa, con los 55 ítems en su orden original. Solo se adapta el vocabulario de México a Chile («licenciatura» pasa a «carrera», «maestro» a «profesor», «pláticas» a «charlas», entre otros) y se corrigen tres erratas de la fuente; cada cambio está declarado en la ficha metodológica. Se puntúa como en la fuente, con el promedio de 0 a 9 por subescala y total, sin puntos de corte. Por decisión del equipo **no se miden conocimiento de beneficios (FUAS, gratuidad, becas, CAE), preocupaciones ni fuentes de información**, porque no existe una escala validada para medirlos. Esos temas se exploran en las entrevistas y con datos administrativos.
- **Control adicional (no es el respaldo).** Se pide permiso a los autores. Hay juicio de expertos sobre la adaptación de vocabulario (Escobar-Pérez y Cuervo-Martínez, 2008), un piloto de 10 a 15 estudiantes que no entra al análisis y cálculo del α de Cronbach con los datos propios.
- **Tamaño de muestra.** Con Z = 1,96, p = q = 0,5 y e = 10 %: n₀ = Z² · p · q ÷ e² = (1,96² × 0,25) ÷ 0,10² = 96,04, es decir 96 personas. Con poblaciones de miles, la corrección por población finita es despreciable (95 con N = 5.000). La **meta** es 100 estudiantes, con 64 por grupo para comparar 3.º con 4.º medio (Cohen, 1988). No se ha obtenido ninguna respuesta. Si no se alcanza, los resultados se presentan como exploratorios y sin comparaciones por subgrupo.
- **Muestreo y limitaciones.** El muestreo es por conveniencia, en colegios del segmento que autoricen: describe a quienes respondieron y **no es representativo** del país ni de la región. La EAEC no tiene validación ni normas en Chile, y mide la confianza por autoinforme, no la conducta. Es una medición única: muestra asociaciones, no causas.
- **Ética.** Hay tres autorizaciones: carta del colegio, consentimiento del apoderado y asentimiento del estudiante. La encuesta es anónima (sin nombre, RUT, correo, teléfono ni IP) y no pregunta por salud ni situación económica. Solo se publican resultados agregados, sin grupos de menos de 5 respuestas (Ley 19.628, 1999; Ley 21.719, 2024). El profesor guía revisa el instrumento. **Plan alternativo:** si las autorizaciones o el permiso de los autores no llegan a tiempo, la encuesta no se aplica antes del 2 de diciembre y se declara.

#### 2.3.3 Entrevistas

Se prevén 6 a 8 entrevistas semiestructuradas de 30 a 40 minutos, con consentimiento y, si la persona lo autoriza, grabación de audio. Se prefieren personas de 18 años o más; entrevistar a un menor exige autorización de su tutor. El guion está en el Anexo 2.B y los actores a entrevistar, en la Tabla 2.D.2 del Anexo 2.D.

#### 2.3.4 Resultados y triangulación

**Encuesta.** `[COMPLETAR con resultados reales tras aplicar el instrumento]` (n = `[COMPLETAR]`; establecimientos = `[COMPLETAR]`; fechas = `[COMPLETAR]`). Promedios con intervalo de confianza de 95 % y α de Cronbach de esta muestra.

**Tabla 2.5.** Resultados de la EAEC (por completar). Promedio de 0 a 9; más alto, más confianza.

| Subescala (ítems) | Total | 3.º medio | 4.º medio | Diferencia y tamaño del efecto | α de la muestra (fuente) |
|---|---|---|---|---|---|
| Información ocupacional (12 a 21) | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` (0,86) |
| Autoconocimiento (1 a 11) | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` (0,79) |
| Establecimiento de metas (22 a 34) | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` (0,87) |
| Solución de problemas (35 a 46) | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` (0,87) |
| Planeación (47 a 55) | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` (0,88) |
| Escala total (1 a 55) | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` (0,95) |

**Entrevistas.** `[COMPLETAR con resultados reales tras aplicar el instrumento]` (entrevistas realizadas = `[COMPLETAR]`). La matriz de hallazgos está en el Anexo 2.C.

**Tabla 2.6.** Triangulación. La columna de datos secundarios ya está disponible; las otras se completan al ingresar los resultados. Si una fuente primaria contradice a la oficial, se explica como hallazgo.

| Dimensión | Dato secundario (verificado) | Encuesta | Entrevistas |
|---|---|---|---|
| Ingreso a la educación superior | 55,4 % de la cohorte 2020 sin matrícula inmediata | `[COMPLETAR]` | `[COMPLETAR]` |
| Trámite y requisitos de beneficios | Brecha de persistencia de 13,8 pp (no causal) | `[COMPLETAR]` | `[COMPLETAR]` |
| Permanencia y acompañamiento | 16,4 % de la cohorte 2023 sin matrícula al año siguiente | `[COMPLETAR]` | `[COMPLETAR]` |

### 2.4 Causas y efectos: árbol de problemas

Sigue la Metodología de Marco Lógico (Ortegón et al., 2005). El problema central es una situación negativa. Las causas salen de preguntar «¿por qué?» dos o tres veces; cada una se marca **verificada** (tiene fuente) o **hipótesis** (se confirma con el trabajo primario de 2.3) y las hipótesis no se afirman como hechos.

**Tabla 2.7.** Árbol de problemas.

| Nivel | Contenido | Estado de la evidencia |
|---|---|---|
| **Efectos (copa)** | E1. Personas jóvenes fuera del estudio y del trabajo: NEET 19 %, 5 o 6 puntos sobre la OCDE | Verificado (OCDE, 2026) |
| | E2. Pérdida económica por abandono: $546.000 millones al año (techo) | Verificado; lectura de Codex, agente de IA (sección 2.8), sin abrir (Cátedra UNESCO, 2016) |
| | E3. Menor persistencia de quienes no tienen beneficios: 74,4 % frente a 88,2 % | Diferencia observada, no causal (SIES, 2023) |
| | E4. Mayor exposición a malestar psicológico asociado a la exclusión | Por analogía con el desempleo, d = 0,51 (Paul y Moser, 2009); no es medición directa |
| **Problema central (tronco)** | **Exclusión de la educación superior y abandono temprano de personas que egresan de la enseñanza media: 55,4 % no ingresó de inmediato (cohorte 2020) y 16,4 % de la cohorte 2023 no tenía matrícula al año siguiente** | Verificado (Centro de Estudios Mineduc, 2022; SIES, s. f.) |
| **Causa directa 1** | **Asimetría de información sobre oferta, requisitos y beneficios** | Sin cifra oficial; la encuesta mide la confianza para obtener información de carreras (EAEC, Información ocupacional, ítems 12 a 21); el conocimiento de beneficios se explora en entrevistas |
| 1.1 | La información oficial está repartida entre organismos con formatos y períodos distintos | Verificada: hubo que integrar tres fuentes y leer el PDF del DEMRE por posición (`BITACORA.md`) |
| 1.2 | Las personas creen conocer los beneficios más de lo que los conocen | Hipótesis: se explora en entrevistas (la encuesta no mide conocimiento de beneficios: no hay escala validada) |
| 1.3 | La orientación escolar tiene poca capacidad para atender a cada estudiante | Hipótesis: sin cifra oficial verificada; se explora en entrevistas |
| 1.4 | Se recurre a fuentes informales | Hipótesis: entrevistas; la EAEC mide la confianza para usar fuentes como charlas, ferias, profesores e instituciones (ítems 12 a 21), no cuál se usa |
| **Causa directa 2** | **Fricción en el trámite de beneficios (FUAS)** | Hipótesis central. La encuesta no la mide (no hay instrumento publicado sobre el trámite del FUAS); se explora en entrevistas y con la solicitud de transparencia |
| 2.1 | Requisitos, montos y plazos cambian cada año y están en varios sitios | Verificada en parte (FUAS 2027 abrió el 1 de octubre de 2026; Ministerio de Educación, 2026) |
| 2.2 | Creencias erróneas: que se necesita el puntaje de la Prueba de Acceso a la Educación Superior (PAES) para postular, o que la gratuidad sirve en cualquier institución | Ambas son falsas según fuentes oficiales; cuánta gente las cree es hipótesis que se explora en entrevistas |
| 2.3 | Temor a equivocarse en el formulario o desconocimiento de plazos | Hipótesis: entrevistas; la encuesta no lo mide |
| 2.4 | No hay serie pública de postulaciones al FUAS | Verificada: solicitud de transparencia en trámite |
| **Causa directa 3** | **Acompañamiento desarticulado y reactivo después del ingreso** | Hipótesis central: entrevistas; la encuesta es solo para escolares y no lo mide |
| 3.1 | La Ley 21.091 no obliga a las instituciones a acompañar | Verificada (Ley 21.091, 2018) |
| 3.2 | El estándar de acreditación pide indicadores de progresión, pero cada institución define los suyos | Primera parte verificada (CNA, s. f.); segunda, hipótesis |
| 3.3 | Se pierden beneficios por incumplir el avance mínimo o no renovar a tiempo | Hipótesis (registro de decisión de arquitectura, ADR, 0010): entrevistas 3 y 4; la encuesta ya no mide la pérdida de beneficios |
| 3.4 | Los datos de la trayectoria quedan en sistemas distintos y la persona no los controla | Hipótesis: DAE y estudiantes |
| **Fuera del alcance (suposiciones críticas del Punto 3)** | Situación socioeconómica de las familias; motivos académicos, vocacionales o de salud; concentración territorial de la oferta | No se conoce la repartición oficial de las causas de abandono (`docs/decisiones/0013-desercion-evitable.md`): la fracción evitable por información está sin estimar |

### 2.5 Análisis FODA

Lo interno lo controla el equipo; lo externo es del entorno. Cada factor remite a evidencia del repositorio, de la ley o de un organismo.

**Tabla 2.8.** Matriz FODA.

| | Positivos | Negativos |
|---|---|---|
| **Internos** | **Fortalezas.** F1. Aislamiento por institución en la base de datos (seguridad por filas, RLS) probado, con migraciones versionadas (`supabase/migrations/`). F2. Procesos de datos con pruebas: 11.364 carreras de pregrado procesadas, 7.299 con indicadores SIES y 2.086 con ponderaciones y vacantes del DEMRE (`BITACORA.md`). F3. Toda cifra con fuente, URL y fecha; cifras sin origen retiradas (`docs/verificacion-de-cifras.md`). F4. Protocolo de crisis con pruebas automatizadas que deriva a *4141 y Salud Responde 600 360 7777 (`tests/ia/crisis.test.ts`). F5. Portal desplegado con explorador de 10 carreras verificadas contra archivos oficiales y verificación automática de cada cambio | **Debilidades.** D1. Tres integrantes y cuatro semanas hasta la entrega del 2 de diciembre (`docs/plan.md`). D2. Sin profesional de psicología o psicopedagogía que valide contenidos ni el protocolo de crisis (revisión pendiente). D3. Investigación primaria sin aplicar y con muestra por conveniencia. D4. Datos procesados aún no cargados a la base ni al portal; simulador, asistente, ficha y módulo de permanencia no existen. D5. Rendimiento en conexión lenta, accesibilidad con lector de pantalla y puntaje Lighthouse sin medir |
| **Externos** | **Oportunidades.** O1. El estándar de acreditación (CNA, Criterio 2, Dimensión I obligatoria) pide apoyo a la progresión con indicadores (`docs/revision-final.md`). O2. Datos abiertos oficiales descargables de Mineduc, SIES y DEMRE. O3. Evidencia experimental de que la información personalizada y la ayuda en el trámite cambian decisiones: Chile (J-PAL, s. f.-a) y Estados Unidos, +8 puntos de permanencia (Bettinger et al., 2012). O4. Proceso FUAS 2027 abierto desde el 1 de octubre de 2026 (Ministerio de Educación, 2026). O5. Infraestructura en planes gratuitos que permiten uso comercial (Cloudflare, ADR 0003) | **Amenazas.** A1. Vigencia incierta de la Ley 21.719: fijada para el 1 de diciembre de 2026, con un proyecto para postergarla a 2027 `[CONFIRMAR estado al entregar]`. A2. Reglas, montos y plazos de beneficios que cambian cada año. A3. Proveedores cuyo plan gratuito puede cambiar sin aviso y no permite procesar tarjetas (ADR 0003). A4. Sin obligación legal de acompañar (Ley 21.091), lo que debilita la urgencia de las instituciones. A5. Plazos de terceros: autorización de colegios y apoderados para encuestar a menores, respuesta de transparencia FUAS (2 de diciembre, prorrogable) y autorización del Consejo Nacional de Educación (CNED) pendiente (ADR 0009) |

**Tabla 2.9.** FODA cruzado (Weihrich, 1982).

| Cruce | Estrategia formulada |
|---|---|
| F + O (ofensiva) | FO-1. Usar datos trazables y procesos con pruebas (F2, F3) sobre datos abiertos (O2) para producir indicadores de progresión que las instituciones necesitan para el Criterio 2 (O1). FO-2. Probar con usuarios reales mientras el proceso FUAS 2027 está abierto (O4), con el portal ya desplegado (F5) |
| D + O (reorientación) | DO-1. Buscar en las unidades de acompañamiento de las instituciones (que el estándar de acreditación empuja a existir, O1) profesionales que validen contenidos y derivación (D2). DO-2. Cargar primero los datos ya procesados (D4) y publicarlos en infraestructura gratuita (O5), sin presupuesto propio |
| F + A (defensiva) | FA-1. Diseñar la privacidad desde el inicio (RLS, minimización, consentimiento; F1) para que la vigencia de la Ley 21.719 en 2026 o en 2027 (A1) no obligue a rehacer el sistema. FA-2. Mantener datos con fecha de vigencia y revisar las claves y reglas antes de cada proceso (F3) frente a los cambios anuales (A2) |
| D + A (supervivencia) | DA-1. Limitar el alcance al mínimo (D1) y mantener la infraestructura tras interfaces que permitan cambiar de proveedor (A3). DA-2. Sin profesional clínico (D2) y sin mandato legal (A4), delimitar la plataforma como puente que deriva y no aconseja (ADR 0010 y 0012). DA-3. Si las autorizaciones llegan tarde (A5), priorizar las entrevistas a personas de 18 años o más y declarar la limitación (D3) |

**Nota.** Las debilidades (D1 a D5) y las amenazas (A1 a A5) pasan como factores de riesgo al Entregable II.

### 2.6 Abordaje desde la especialidad

El desafío se aborda con herramientas de la mención Desarrollo de Sistemas `[CONFIRMAR: alinear los nombres con la actividad «Competencias del perfil de egreso» y la Tabla 1.3 del Punto 1]`. Cada una se conecta con una causa del árbol y con su estado real.

**Tabla 2.10.** Causa, herramienta y estado.

| Causa (Tabla 2.7) y objetivo del Punto 3 | Herramienta de la especialidad | Cómo la aborda | Estado hoy |
|---|---|---|---|
| 1. Asimetría de información (OE1) | Procesamiento de datos (Python, extracción, transformación y carga de datos, ETL); bases de datos; desarrollo web | Integrar oferta, indicadores y ponderaciones oficiales en una ficha de carrera con fuente, URL y fecha | Programas de carga ejecutados con datos reales; portal con 10 carreras de ejemplo; oferta completa aún no en el portal |
| 2. Fricción en el trámite (OE2) | Análisis y diseño de sistemas; desarrollo web; pruebas de software | Calendario y lista de pasos de beneficios con datos vigentes y simulador de puntaje con cálculos probados contra la fuente oficial | Por construir; reglas en datos versionados, no en el código |
| 3. Acompañamiento desarticulado (OE3) | Bases de datos con seguridad por filas; seguridad y privacidad (Ley 21.719) | Ficha de Trayectoria del estudiante, con consentimiento granular y revocable; panel institucional aislado por institución; pulso de check-in como sensor (autorreporte y silencio) y derivación a la red de apoyo | Esquema y RLS probados; protocolo de crisis con pruebas; ficha, pulso y panel por construir |
| 1 a 3 (OG) | Inteligencia artificial aplicada; accesibilidad | Asistente que responde solo con fuentes oficiales y las cita; interfaz móvil con contraste y teclado (Pautas de Accesibilidad para el Contenido Web, WCAG, 2.2 nivel AA) | Capa de proveedor y protocolo de crisis existen; sin interfaz del asistente; accesibilidad sin medir |

### 2.7 Abordaje sostenible, innovador y tecnológico

**Sostenible.** *Económica:* gratuita para el estudiante, sin anuncios ni venta de datos; el financiamiento previsto es el arriendo de acceso a un panel institucional (software como servicio, SaaS), hipótesis comercial sin validar; en desarrollo se usan planes gratuitos, con el riesgo A3; costos y precios se desarrollan en el Avance 2. *Social:* busca cerrar una brecha de acceso y permanencia, en coherencia con los Objetivos de Desarrollo Sostenible (ODS) 4 y 10 (Naciones Unidas, 2015); el estudiante decide qué comparte y no se ordenan ni destacan instituciones por ser clientes. *Ambiental:* páginas livianas y pre-generadas que consumen pocos datos; no se afirma una huella de carbono, y el peso de página es una meta a medir (D5).

**Innovador.** Innovación de proceso, incremental (Punto 1, Tabla 1.3): reúne datos oficiales dispersos y los personaliza con fuente y fecha visibles. Se apoya en que la información **personalizada** y la ayuda con el trámite cambian decisiones, mientras el material genérico muestra efectos nulos: informar sobre costos y retornos cambió la elección de programa en un ensayo aleatorizado con el Ministerio de Educación (Mineduc) (J-PAL, s. f.-a) y asistir el llenado del formulario elevó la permanencia 8 puntos en Estados Unidos (Bettinger et al., 2012; J-PAL, s. f.-b). No hay evidencia chilena de que informar aumente el ingreso: es un supuesto crítico. La promesa autorizada es reducir la exclusión causada por desinformación sobre beneficios y acompañar la permanencia; **no** promete mejorar la salud mental, predecir la deserción, garantizar la acreditación ni cumplir una obligación legal (`docs/decisiones/0012-cadena-causal-y-promesa.md`).

**Tecnológico.** Aplicación web instalable (PWA) en Next.js con TypeScript; Supabase (PostgreSQL) con seguridad por filas en São Paulo; Python para datos oficiales; asistente con Gemini en nivel pagado a través de una capa de proveedor intercambiable y sin datos personales; Cloudflare; estilos con Tailwind desde `diseno/tokens.json` (ADR 0001 a 0005). La meta de accesibilidad es WCAG 2.2 AA, aún sin medir.

### 2.8 Declaración de uso de inteligencia artificial

La IA acelera el trabajo y ayuda a llegar a los documentos originales; **no es fuente de datos**. Los datos se citan desde el organismo que los publica (American Psychological Association [APA], 2023).

**Tabla 2.11.** Uso de herramientas de IA en el diagnóstico.

| Herramienta | Para qué se usó | Cómo se verificó |
|---|---|---|
| Claude (Anthropic, 2026) | Revisar y verificar fuentes (abrió los PDF originales que pudo descargar: INJUV, Termómetro, informe de retención del SIES) y redactar este borrador a partir de los documentos del repositorio | Cada cifra remite a `docs/verificacion-de-cifras.md`; el líder revisa y confirma |
| Codex (OpenAI, 2026) | Rastrear el origen de cifras con búsqueda web, en tres ejecuciones de solo lectura | Sus lecturas se marcan «leída por Codex» hasta abrir el original (Tabla 2.D.1); dos ejecuciones independientes coinciden en los $546.000 millones |
| Antigravity (Google, 2026) | Intento de rastrear orígenes de cifras | No devolvió resultados (pedía un permiso que el modo sin interfaz no puede otorgar) y no se usó |
| Claude, uso previsto | Revisar sesgos de las preguntas y codificar por temas transcripciones **anonimizadas** | Dos integrantes comprueban que cada tema esté en las transcripciones; sin datos personales |

**Ejemplo de control.** La verificación retiró cifras sin origen verificable: «48 % no sabe cómo postular», «80.000 que no postulan» y «120.000» (atribuidas a una fundación sin informe público); 27,9 % de deserción (no está en el informe del SIES); US$ 2.660 millones de costo de oportunidad (solo una nota de prensa); «más del 20 %» del gasto público; 22 % frente a 11 % por quintil y 23 % en menores de 30 (la ronda 12 no tiene informe público); y la cita atribuida a la Comisión Nacional de Productividad. Corrigió además el 18,7 % de depresión de la ronda 10 (es 13,7 %) y los $565.000 millones (son $546.000 millones).

**Salvaguardas.** No se subieron datos personales a herramientas de IA; no se usaron cifras de IA sin verificar; no se simularon respuestas de encuestados ni entrevistados.

### Anexo 2.A Encuesta: instrumento estandarizado

Fuente: `docs/encuestas/encuesta-escolar.md`, `ficha-metodologica-escolar.md` y `crear_encuestas.gs` (actualizados el 10 de noviembre de 2026). Si un ítem cambia, se cambia en los tres a la vez.

**Instrumento.** Escala de Autoeficacia para la Elección de Carrera (EAEC), de Ramírez Dorantes y Canto (2007), aplicada completa: 55 ítems, en su orden original, con respuesta de 0 (ninguna confianza) a 9 (confianza absoluta). La instrucción es «¿Cuánta confianza tienes de que podrías…?». Está en acceso abierto en Redalyc; antes de aplicarla se pide permiso a los autores para la adaptación de vocabulario.

**Tabla 2.A.1.** Ficha técnica de la EAEC (datos de la fuente).

| Atributo | Valor |
|---|---|
| Base | Versión en español del *Career Decision-Making Self-Efficacy Scale* (Taylor y Betz, 1983): 28 ítems de ese instrumento y 27 nuevos, revisados por tres expertos en orientación (pp. 42-43) |
| Muestra de validación | 343 estudiantes de bachillerato de dos preparatorias de la Universidad Autónoma de Yucatán (México), edad promedio de 18,5 años, muestra aleatoria estratificada por curso (p. 42) |
| Validez | Análisis factorial con 5 factores que explican el 42,2 % de la varianza; KMO = 0,896; 49 de 55 ítems con carga ≥ 0,40 (pp. 44-46) |
| Confiabilidad (α) | Total 0,95; subescalas de 0,79 a 0,88 (Tabla 1, p. 47) |
| Puntuación | Promedio de 0 a 9 por subescala y total; sin puntos de corte |

**Tabla 2.A.2.** Subescalas e ítems.

| Subescala | Ítems | Qué tareas incluye (ejemplos textuales, versión aplicada) | α en la fuente |
|---|---|---|---|
| Autoconocimiento | 1 a 11 | «Evaluar con exactitud tus habilidades»; «Identificar algunas carreras que te interesan» | 0,79 |
| Información ocupacional | 12 a 21 | «Obtener información acerca de instituciones de educación superior (universidades, institutos profesionales o centros de formación técnica)»; «Asistir a charlas que proporcionen información acerca de las carreras que te interesan» | 0,86 |
| Establecimiento de metas | 22 a 34 | «Seleccionar una carrera entre varias en las que estás interesado o interesada»; «Determinar el nivel académico que te gustaría obtener» | 0,87 |
| Solución de problemas | 35 a 46 | «Encontrar alternativas de carrera si no pudieras ingresar a la que elegiste primero»; «Volver a postular a una institución de educación superior después de no quedar seleccionado o seleccionada la primera vez» | 0,87 |
| Planeación | 47 a 55 | «Hacer un plan de tus metas vocacionales para los próximos cinco años»; «Hablar con alguien de tus planes vocacionales futuros» | 0,88 |

Los 55 ítems textuales y la tabla de adaptación ítem por ítem (de México a Chile, con tres erratas corregidas) están en `docs/encuestas/`. La agrupación por subescala se deduce de los conteos de la Tabla 1 y de la descripción de los factores de la fuente; se confirma con los autores.

**Clasificación (no es parte de la escala).** C1 curso (3.º o 4.º medio), C2 región y C3 tipo de colegio, con las categorías del Ministerio de Educación (Ministerio de Educación, s. f.). Sirven para verificar el segmento y comparar grupos. Si alguien marca «Particular pagado», su respuesta no entra al análisis. Sin edad, género, comuna ni nombre del colegio (minimización).

**Consentimiento y asentimiento.** Carta del colegio, consentimiento del apoderado y asentimiento del estudiante: «¿Quieres responder esta encuesta? Es anónima, voluntaria y puedes dejarla cuando quieras». Al cierre se muestran acceso.mineduc.cl y el portal oficial de Beneficios Estudiantiles.

**Qué no mide, por decisión del 10 de noviembre de 2026.** Conocimiento de FUAS, gratuidad, becas y CAE; preocupaciones; fuentes de información usadas; razón para no seguir estudiando; y nada en adultos. Para el conocimiento de beneficios no existe una escala validada. La versión anterior (6 de noviembre) combinaba ítems de seis fuentes sin validación como conjunto y quedó reemplazada; está en el historial del repositorio. Esos temas se exploran en las entrevistas (Anexo 2.B) y con datos administrativos (folio AJ025T0003786).

**Limitaciones.** La EAEC no tiene validación ni normas en Chile y su estructura factorial no reproduce del todo las cinco subescalas. Mide confianza por autoinforme, no conducta (la fuente lo advierte, p. 49). No está validada en estudiantes técnico-profesionales chilenos.

**Control adicional (no es el respaldo).** Juicio de expertos sobre la adaptación de vocabulario (Escobar-Pérez y Cuervo-Martínez, 2008), piloto de 10 a 15 estudiantes y α de Cronbach con los datos propios. Análisis previsto: descriptivos con intervalo de confianza de 95 %; comparaciones con prueba t o U de Mann-Whitney, y ANOVA o Kruskal-Wallis, siempre con tamaño del efecto.

### Anexo 2.B Guion de entrevista semiestructurada

Duración: 30 a 40 minutos. Se pide hechos y ejemplos («cuénteme la última vez que…»), no opiniones generales; no se presenta la plataforma ni ninguna solución; se escucha más de lo que se habla y se repregunta con «¿por qué?» y «¿cómo así?». Registro: grabación con consentimiento o notas textuales.

**Tabla 2.B.1.** Guion general.

| Momento | Propósito | Preguntas |
|---|---|---|
| Apertura (5 min) | Presentarse, explicar el objetivo y pedir consentimiento | «Estamos haciendo un proyecto de título de Informática sobre cómo se decide qué hacer después del colegio y cómo se tramitan los beneficios. Su participación es voluntaria y anónima, puede terminar cuando quiera y las respuestas se usan solo de forma agregada. ¿Acepta participar? ¿Podemos grabar el audio?» |
| Contexto (5 min) | Conocer su relación con el problema | «¿Cuál es su relación con la educación superior? ¿Desde cuándo?» |
| Experiencia (15 min) | Relatos de situaciones concretas | «Cuénteme la última vez que tuvo que averiguar o decidir sobre una carrera o un beneficio. ¿Qué hizo primero? ¿Qué información usó y dónde la buscó? ¿Qué pasó después?» |
| Causas y efectos (10 min) | Explorar por qué ocurre y qué consecuencias tiene | «¿Qué fue lo más difícil de ese proceso? ¿Por qué cree que ocurrió? ¿Cómo le afectó a usted o a su familia?» |
| Cierre (5 min) | Abrir espacio y agradecer | «¿Hay algo que no le pregunté y que sea importante? ¿Conoce a otra persona que pueda contarnos su experiencia?» |

**Tabla 2.B.2.** Preguntas adicionales por actor (en el momento «Experiencia»).

| Actor (Tabla 2.D.2) | Pregunta adicional |
|---|---|
| 1 y 2 | «Cuénteme cómo fue el día en que supo si postularía al FUAS o no. ¿Qué lo decidió?» |
| 3 y 4 | «¿Cuándo supo qué debía cumplir para mantener su beneficio? ¿Cuándo supo que lo perdió o estuvo cerca de perderlo y cómo se enteró?» |
| 5 | «¿Qué ayuda tuvo su familia para completar los trámites y cuánto tiempo tomó?» |
| 6 | «Cuénteme un caso reciente de un estudiante al que orientó sobre beneficios. ¿De qué información dispuso?» |
| 7 | «¿Cómo se entera hoy de que un estudiante se desconectó? ¿En qué momento y por qué medio?» |
| 8 | «¿Qué razones de abandono ve con mayor frecuencia y cuáles se podrían haber evitado con información a tiempo?» |

**Ética.** Consentimiento informado; sin nombre, RUT, teléfono ni dirección en los registros; citas anónimas del tipo «Madre de postulante, sector rural»; grabaciones y transcripciones en carpeta de acceso restringido, eliminadas al terminar el módulo. Con una persona menor de edad, se requiere la autorización de su madre, padre o tutor.

### Anexo 2.C Matriz de hallazgos (por completar)

`[COMPLETAR con resultados reales tras aplicar el instrumento]`. Después de las entrevistas se agrupan las respuestas por tema (codificación temática; Hernández-Sampieri y Mendoza, 2018); se cuenta cuántas personas mencionan cada tema y se guarda una cita textual representativa, anónima.

**Tabla 2.C.1.** Hallazgos de las entrevistas.

| Tema | N.º de entrevistados que lo mencionan | Actores | Cita representativa (anónima) |
|---|---|---|---|
| `[COMPLETAR]` | `[COMPLETAR]` de `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` |
| `[COMPLETAR]` | `[COMPLETAR]` de `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` |
| `[COMPLETAR]` | `[COMPLETAR]` de `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` |

**Tabla 2.C.2.** Qué cambia en el árbol de problemas según los hallazgos.

| Causa del árbol (Tabla 2.7) | Resultado esperado de la encuesta | Hallazgo de entrevistas | Se confirma / se refuta / se matiza |
|---|---|---|---|
| 1 Asimetría de información (confianza para obtener información) | `[COMPLETAR]` (EAEC, ítems 12 a 21) | `[COMPLETAR]` | `[COMPLETAR]` |
| 1.2 Creen conocer más de lo que conocen | no se mide en la encuesta | `[COMPLETAR]` | `[COMPLETAR]` |
| 1.3 Orientación con poca capacidad | no se mide en la encuesta | `[COMPLETAR]` | `[COMPLETAR]` |
| 2.2 Creencias erróneas sobre requisitos | no se mide en la encuesta | `[COMPLETAR]` | `[COMPLETAR]` |
| 2.3 Temor o desconocimiento de plazos | no se mide en la encuesta | `[COMPLETAR]` | `[COMPLETAR]` |
| 3.3 Pérdida de beneficios | no se mide en la encuesta | `[COMPLETAR]` | `[COMPLETAR]` |

### Anexo 2.D Limitaciones de los datos y actores a entrevistar

**Tabla 2.D.1.** Discrepancias abiertas y limitaciones.

| Tema | Situación |
|---|---|
| OCDE: 13 % o 14 %; referencia 2024 o 2025 | Los documentos del proyecto decían 13 %; la lectura de la tabla indica 14 % con referencia 2024. La brecha es de 5 o 6 puntos hasta confirmarla |
| O'Higgins: −2,62 % o −4,9 % | Probablemente universos distintos, como a nivel nacional (371.067 frente a 397.381). No se usa el dato regional como evidencia |
| Cifras leídas por Codex y no abiertas por el equipo | Informe de la Cátedra UNESCO, estudio IESALC-UNESCO (año 2005 o 2006), Barómetro Laboral (CIES-UDD y Asociación de AFP, 2026) y minuta de selección: falta abrirlas con herramienta propia (`docs/verificacion-de-cifras.md`) |
| Alcance de los datos | Ingreso inmediato y no «nunca»; costos de abandono y no de no ingreso; falta confirmar qué mide exactamente la persistencia con y sin beneficios (`docs/decisiones/0013-desercion-evitable.md`); rezago del SIES de uno a dos años |

**Tabla 2.D.2.** Actores a entrevistar (meta; ninguna entrevista realizada). Los números remiten a la Tabla 1.1.

| N.º | Actor (Punto 1) | Perfil previsto |
|---|---|---|
| 1 y 2 | 1 y 2 | Dos personas de 18 años o más: una que postuló y otra que no ingresó a la educación superior |
| 3 y 4 | 3 | Un estudiante de primer año con beneficios y una persona que dejó de estudiar o perdió un beneficio |
| 5 | 4 | Madre, padre o tutor de un postulante |
| 6 | 5 | Orientador o profesor jefe |
| 7 | 7 | Profesional de una Dirección de Asuntos Estudiantiles (DAE) |
| 8 | Aliado o experto | Profesional de psicología, psicopedagogía o financiamiento estudiantil `[CONFIRMAR]` |

## 3. Fundamentación del proyecto

Este punto convierte el diagnóstico del punto 2 en objetivos, metas y una forma de trabajo. Las metas miden solo lo que la plataforma puede medir sobre sí misma antes de la entrega del 2 de diciembre de 2026; los efectos de largo plazo (matrícula, renovación de beneficios, continuidad en segundo año) quedan como fin del proyecto y como proyección, no como compromiso del periodo.

### 3.1 Del árbol de problemas al árbol de objetivos

Cada situación negativa del árbol de problemas se convierte en una situación positiva (Ortegón et al., 2005). De las causas directas se eligen las tres sobre las que el equipo puede actuar con las herramientas de la especialidad (desarrollo web, bases de datos, procesamiento de datos y seguridad) en las cuatro semanas de ejecución.

| Árbol de problemas (punto 2) | Árbol de objetivos |
|---|---|
| Efecto: personas que no entran a la educación superior o la abandonan de forma evitable; pérdida de beneficios por plazos o requisitos desconocidos | Fin: más personas acceden a la educación superior y permanecen en ella con los beneficios que les corresponden (aporte a las metas ODS 4.3, 10.2 y 16.6; proyección, no medición del periodo) |
| Problema central: alta exclusión formativa y abandono temprano evitables por desinformación y fricción en los beneficios, con acompañamiento desarticulado | Objetivo general: una plataforma gratuita, validada con usuarios reales, reduce la desinformación y la fricción en el acceso a la oferta y a los beneficios, y deja al estudiante a cargo de su propia trayectoria |
| Causa 1: asimetría informativa sobre oferta y requisitos | OE1: oferta oficial explorable y comparable, con fuente, URL y fecha |
| Causa 2: fricción en el trámite de beneficios | OE2: simulador de beneficios y calendario de hitos del Formulario Único de Acreditación Socioeconómica (FUAS) |
| Causa 3: acompañamiento desarticulado y reactivo | OE3: Ficha de Trayectoria bajo control del estudiante, pulso de check-in como sensor y derivación a la red de apoyo |
| Causas fuera del alcance: nivel de ingresos del hogar, monto y existencia de los beneficios, oferta de apoyo de cada institución, conectividad | Suposiciones críticas (sección 3.9) |

Se descartan como objetivos el modelo predictivo de deserción, los foros entre estudiantes y el contenido psicoeducativo extenso, por falta de evidencia o de capacidad del equipo (`docs/decisiones/0010-modulo-de-permanencia.md`). El pulso de check-in detecta por autorreporte y por ausencia de respuesta; no predice.

### 3.2 Objetivo general y objetivos específicos

Se redactan con el criterio SMART (Doran, 1981). Fórmula: verbo + qué + para quién y dónde + para qué + cuándo + cuánto.

**Objetivo general (OG).** Implementar una plataforma web gratuita e instalable (PWA) que reúna la oferta oficial de educación superior, simule los beneficios estudiantiles y entregue a cada estudiante el control de su Ficha de Trayectoria, dirigida a personas de 16 a 24 años de establecimientos municipales, SLEP, particulares subvencionados o de administración delegada, que cursan 3.º o 4.º medio, egresaron hace cinco años o menos o cursan su primer año de educación superior (segmento del Punto 1), para reducir la desinformación y la fricción que llevan a la exclusión formativa evitable, validada en pruebas con 5 usuarios reales del segmento al 2 de diciembre de 2026, de modo que al menos el 80 % de las tareas centrales (16 de 20) se complete sin ayuda.

**OE1.** Implementar un explorador y comparador de carreras con datos oficiales del Ministerio de Educación (Mineduc), del Servicio de Información de Educación Superior (SIES) y del Departamento de Evaluación, Medición y Registro Educacional (DEMRE), para postulantes en Chile, de modo que decidan con información comparable, al 23 de noviembre de 2026, con el 100 % de las carreras publicadas mostrando fuente, URL y fecha, y con la ficha de una carrera real desplegada el 16 de noviembre.

**OE2.** Desarrollar un simulador de beneficios estudiantiles y un calendario de hitos del FUAS (postulación, renovación y plazos), con reglas y fechas guardadas como datos con vigencia, para que postulantes y estudiantes de primer año no pierdan beneficios por desconocimiento de requisitos, desplegado al 23 de noviembre de 2026 con el 100 % de los hitos con fuente y fecha de vigencia, y validado hasta el 30 de noviembre con al menos 4 de 5 usuarios de prueba completando la simulación.

**OE3.** Construir la Ficha de Trayectoria con consentimiento granular y revocable, un pulso de check-in mínimo como sensor y la derivación del protocolo de crisis (Línea de Prevención del Suicidio *4141 y Salud Responde 600 360 7777), para que el estudiante decida qué comparte y con quién y sea derivado cuando corresponda, al 30 de noviembre de 2026, con el 100 % de las pruebas automáticas de consentimiento y de crisis aprobadas y al menos 4 de 5 usuarios de prueba gestionando un consentimiento.

#### Verificación SMART

| Objetivo | S (específico) | M (medible) | A (alcanzable) | R (relevante) | T (con plazo) |
|---|---|---|---|---|---|
| OG | Plataforma PWA para estudiantes de enseñanza media y primer año en Chile | 16 de 20 tareas completadas sin ayuda (5 usuarios × 4 tareas) | Prototipo ya desplegado en Cloudflare con explorador de 10 carreras; alcance recortado en `docs/equipo/reparto.md` | Ataca el problema central en sus tres causas | 2 dic 2026 |
| OE1 | Explorador y comparador con datos Mineduc, SIES y DEMRE | 100 % con fuente, URL y fecha; cobertura frente a las 11.364 carreras procesadas | Scripts de `datos/` ya procesaron las 11.364 carreras de pregrado | Responde a la causa 1 (asimetría informativa) | 23 nov (ficha real: 16 nov) |
| OE2 | Simulador y calendario con datos con vigencia | 100 % de hitos con fuente (23 nov); 4 de 5 usuarios completan (30 nov) | Reglas como datos, no como código; pantallas encargadas a herramientas de apoyo con la skill de diseño | Responde a la causa 2 (fricción en beneficios) | 23 nov (despliegue); 30 nov (validación) |
| OE3 | Ficha, consentimientos, pulso mínimo y derivación | 100 % de pruebas automáticas; 4 de 5 usuarios gestionan un consentimiento | Esquema con Row Level Security (RLS) y protocolo de crisis con pruebas ya existen | Responde a la causa 3 (acompañamiento desarticulado) | 30 nov |

Prueba lógica: si se cumplen OE1, OE2 y OE3, el estudiante puede informarse, tramitar sus beneficios y gobernar su ficha dentro de una sola plataforma, que es lo que el OG pide validar (la coherencia vertical se resume en el Anexo 3.B). Los efectos sobre acceso y permanencia reales no se afirman: se proyectan como fin.

### 3.3 Metas e indicadores de logro

Los indicadores son de producto y de resultado inmediato. Las fichas técnicas completas (fórmula, línea base, meta, plazo, medio de verificación, frecuencia y responsable) están en el Anexo 3.A. Donde no hay línea base publicable se declara, porque una cifra de partida no verificada no se usa (`docs/verificacion-de-cifras.md`).

| Código | Objetivo | Indicador y fórmula | Línea base | Meta y plazo | Medio de verificación | Meta ODS |
|---|---|---|---|---|---|---|
| I-OG | OG | Tareas centrales completadas sin ayuda = (tareas completadas sin ayuda ÷ 20) × 100 | 0 (la plataforma no tenía versión probada con usuarios) | 80 % (16 de 20): prueba aplicada del 24 al 30 nov e informada al 2 dic | Registro de la prueba de usabilidad con 5 usuarios | 4.3 |
| I-OE1a | OE1 | Cobertura = (carreras publicadas con los campos obligatorios ÷ 11.364 carreras procesadas por el ETL) × 100 | 10 de 11.364 (0,09 %) | `[CONFIRMAR: porcentaje de cobertura a comprometer; el equipo lo fija el 16 nov]` al 23 nov | Consulta a la base de datos; informe de carga | 4.3 |
| I-OE1b | OE1 | Trazabilidad = (carreras publicadas con fuente, URL y fecha ÷ carreras publicadas) × 100 | 10 carreras de ejemplo verificadas contra archivos oficiales | 100 % al 23 nov | Revisión automática y verificación por muestra | 16.6 |
| I-OE2a | OE2 | Simulaciones completadas = (usuarios de prueba que terminan la simulación ÷ 5) × 100 | 0 (el simulador no existe aún) | 80 % (4 de 5) al 30 nov | Prueba de usabilidad | 4.3 y 10.2 |
| I-OE2b | OE2 | Hitos con respaldo = (hitos del calendario con fuente y fecha de vigencia ÷ hitos publicados) × 100 | 0 (el calendario no existe aún) | 100 % al 23 nov | Revisión del archivo de datos versionado | 10.2 |
| I-OE3a | OE3 | Pruebas de consentimiento y aislamiento aprobadas = (aprobadas ÷ ejecutadas) × 100 | Pruebas de RLS del esquema base aprobadas; consentimiento de la ficha sin implementar | 100 % al 30 nov | Informe de la integración continua | 16.6 |
| I-OE3b | OE3 | Derivaciones de crisis correctas = (frases del conjunto de prueba que entregan *4141 y 600 360 7777 y generan alerta ÷ frases del conjunto) × 100 | Al 5 nov, al menos una frase («me voy a ahorcar») no se detectaba | 100 % al 30 nov; tamaño del conjunto `[CONFIRMAR]` | Pruebas automáticas de `tests/ia/` | 16.6 |

Indicadores de impacto (proyección, fuera del periodo): postulaciones FUAS completadas, beneficios obtenidos, matrícula efectiva, renovación de beneficios y continuidad en segundo año. Ningún indicador de salud mental es métrica de éxito. Referencias para el fin: persistencia de segundo año de 88,2 % con beneficios contra 74,4 % sin ellos en la cohorte 2022, diferencia observada y no causal (`docs/informe-fundamentacion.md`); retención de primer año de 76,5 % en la cohorte 2023 (Servicio de Información de Educación Superior [SIES], s. f.). La proporción de personas que no sabe postular al FUAS no tiene línea base publicable (ver `docs/verificacion-de-cifras.md`); la encuesta del punto 2 mide cuánto se cree y cuánto se sabe de los beneficios (resultados `[COMPLETAR con resultados reales tras aplicar el instrumento]`), no cuántos no saben postular.

### 3.4 Vínculo con los Objetivos de Desarrollo Sostenible (ODS)

Se vincula a nivel de meta, con un ODS principal y dos secundarios. Los textos son los de la Agenda 2030 (Naciones Unidas, 2015; consultados el 6 de noviembre de 2026).

| ODS | Meta oficial | Cómo aporta el proyecto | Indicador del proyecto |
|---|---|---|---|
| 4 Educación de calidad (principal) | 4.3: «De aquí a 2030, asegurar el acceso igualitario de todos los hombres y las mujeres a una formación técnica, profesional y superior de calidad, incluida la enseñanza universitaria». La versión en inglés agrega que sea asequible (Naciones Unidas, 2015, 2026a) | Reduce la barrera de información y de trámite para acceder a la formación superior: oferta comparable, requisitos y beneficios en un solo lugar | I-OG, I-OE1a, I-OE2a |
| 10 Reducción de las desigualdades (secundario) | 10.2: «De aquí a 2030, potenciar y promover la inclusión social, económica y política de todas las personas, independientemente de su edad, sexo, discapacidad, raza, etnia, origen, religión o situación económica u otra condición» (Naciones Unidas, 2026b) | La plataforma es gratuita, se diseña con accesibilidad (WCAG 2.2 AA) y orienta sobre beneficios a quienes dependen de ellos para estudiar | I-OE2a, I-OE2b |
| 16 Paz, justicia e instituciones sólidas (secundario) | 16.6: «Crear a todos los niveles instituciones eficaces y transparentes que rindan cuentas» (Naciones Unidas, 2026c) | Aporte indirecto: muestra los datos de las instituciones con su fuente y deja registro de quién accede a la ficha de cada estudiante | I-OE1b, I-OE3a, I-OE3b |

El indicador global de la ONU para 4.3 (4.3.1, participación en educación y formación en los últimos 12 meses) no puede medirse con un prototipo de cuatro semanas; por eso los indicadores del proyecto son de proceso y de resultado inmediato, y el aporte al ODS se declara como proyección.

### 3.5 Sustentabilidad: impactos y requerimientos

Se analiza el triple resultado (Elkington, 1997). No se incluyen cifras de emisiones ni afirmaciones sobre el origen de la energía de los proveedores, porque no hay fuente oficial verificada en el repositorio; el aspecto ambiental se trata como requerimiento de diseño.

| Dimensión | Impactos positivos | Impactos negativos y mitigación | Requerimientos para mantenerse |
|---|---|---|---|
| Económica | Para el estudiante, acceso gratuito a información que hoy está dispersa. Para el equipo, desembolso directo de $0 durante el desarrollo, por el uso de planes gratuitos de Cloudflare y Supabase | Dependencia de planes gratuitos: Cloudflare puede terminar el servicio gratuito sin aviso y no permite procesar tarjetas en ese plan (`docs/decisiones/0003-hosting-cloudflare.md`). Mitigación: código y migraciones versionados y portables, sin pagos en la plataforma | Fuente de financiamiento posterior al 2 de dic: arriendo del panel institucional a instituciones, con el portal público gratuito siempre `[CONFIRMAR: modelo y precios; se desarrollan en el Avance 2 con fuente]`. Cualquier costo de pago se registra con fuente y fecha |
| Social | Estudiantes mejor informados sobre oferta y beneficios; control del estudiante sobre sus datos; derivación oportuna a la red de apoyo | Exclusión de quien no tiene teléfono o datos móviles: se diseña para 360 px de ancho y páginas livianas, y la información clave es imprimible. Riesgo de que la simulación se tome como resultado oficial: cada resultado indica que es una estimación y remite a la fuente. Datos sensibles de menores: autorización del apoderado | Accesibilidad WCAG 2.2 AA, lenguaje claro, consentimiento granular y revocable, protocolo de crisis revisado por una persona profesional (pendiente), neutralidad frente a las instituciones |
| Ambiental | Menos consultas presenciales y papel para informarse, como hipótesis cualitativa que el proyecto no mide | Consumo de energía de servidores, almacenamiento y llamadas al asistente de IA. Mitigación: minimizar datos guardados y no almacenar lo innecesario | Páginas livianas (sin imágenes pesadas, tipografías alojadas en el proyecto), minimización de datos (Ley 21.719) y medición del peso de página como meta por medir, no como logro |

### 3.6 Estrategia de organización

#### 3.6.1 Instrumentos de gestión

| Instrumento | Para qué se usa | Herramienta |
|---|---|---|
| Carta Gantt | Planificar fases y semanas hasta la entrega | Tabla de esta sección |
| Tablero Kanban | Ver el estado de cada tarea (por hacer, en curso, en revisión, hecha) | GitHub Projects `[CONFIRMAR: tablero creado y enlazado al repositorio]` |
| Matriz RACI | Definir quién ejecuta, aprueba, es consultado e informado | Tabla de esta sección |
| Control de versiones, revisión y bitácora | Un cambio por rama y por solicitud de cambios (pull request, PR); revisión con la pauta `revisar-pr` y confirmación del líder; registro de acuerdos y decisiones | GitHub (`AGENTS.md` sección 4), `BITACORA.md` y `docs/decisiones/` |

**Carta Gantt** (semanas del plan en `docs/plan.md`).

| Fase | S1 (3-9 nov) | S2 (10-16 nov) | S3 (17-23 nov) | S4 (24-30 nov) | Cierre (1-2 dic) | Hito que se muestra |
|---|---|---|---|---|---|---|
| F1 Cimientos: esquema, RLS, primera carga oficial, despliegue | X | | | | | Página de una carrera real con datos oficiales |
| F2 Explorar: ficha, explorador, comparador, puntaje y ranking (OE1) | | X | | | | Portal navegable en el teléfono; ficha real el 16 nov |
| F3 Acompañar: beneficios, calendario, ficha, consentimientos, asistente con protocolo de crisis (OE2 y OE3) | | | X | | | Un estudiante de prueba recorre el flujo |
| F4 Seguir y validar: pulso mínimo, panel de agencia, demostración institucional, pruebas con 5 usuarios | | | | X | | Demostración grabada |
| F5 Cierre: publicación, presentación e informe | | | | | X | Entrega el 2 dic |

**Matriz RACI.** R: ejecuta; A: aprueba (uno por tarea); C: consultado; I: informado. Claude es una herramienta de IA de revisión y documentación, no integrante; la aprobación final es del líder. La contraparte es `[CONFIRMAR: profesor guía, profesional validador y personas usuarias de prueba]`.

| Tarea | Rafael (@rafajaque) | Alejandro | Cristóbal | Claude (IA) | Contraparte |
|---|---|---|---|---|---|
| Esquema de datos y RLS | A/R | I | C | C | I |
| Carga de datos oficiales (ETL) | A | I | R | C | I |
| Explorador y comparador (pantallas) | A | R | C | C | I |
| Cálculos de puntaje y simulador de beneficios | A | C | R | C | I |
| Calendario de hitos y pantallas de beneficios | A | R | C | C | I |
| Ficha de Trayectoria y consentimientos | A/R | R | I | C | I |
| Asistente, protocolo de crisis y sus pruebas | A/R | C | I | C | C |
| Pulso de check-in mínimo | A/R | C | C | C | C |
| Accesibilidad y rendimiento (mediciones) | A | R | I | C | I |
| Pruebas con 5 usuarios | A | R | R | I | C |
| Revisión y fusión de cambios | A | I | I | R | I |
| Informe de título y entrega | A/R | R | R | C | I |

#### 3.6.2 Sustentabilidad del proyecto y responsabilidad social (ISO 26000)

La norma ISO 26000 organiza la responsabilidad social en siete materias fundamentales (International Organization for Standardization [ISO], 2010). Se priorizan cuatro.

| Materia | Acción concreta del proyecto |
|---|---|
| Gobernanza de la organización | Decisiones en registros de decisión y bitácora; roles en la matriz RACI; ningún cambio llega a `main` sin revisión confirmada por el líder |
| Asuntos de consumidores | La Ficha de Trayectoria pertenece al estudiante; consentimiento granular y revocable; autorización de apoderado para menores de 18; sin anuncios, sin venta de datos y sin datos personales en servicios de IA gratuitos (`AGENTS.md` 2.2) |
| Derechos humanos | Accesibilidad WCAG 2.2 AA; lenguaje claro; neutralidad: el portal no ordena ni destaca instituciones por ser clientes; protocolo de crisis con derivación a *4141 |
| Participación y desarrollo de la comunidad | Pruebas con usuarios reales, con autorización de colegio y de apoderado cuando son menores; información abierta y gratuita sobre beneficios para quienes la necesitan |

### 3.7 Entregables

| Objetivo | Entregable | Criterio de aceptación | Fecha | Responsable |
|---|---|---|---|---|
| OE1 | Explorador y comparador desplegados en Cloudflare, con ficha de carrera | La ficha real se abre en un teléfono y muestra fuente, URL y fecha | 16 nov (ficha); 23 nov (explorador) | Rafael, Alejandro |
| OE1 | Oferta cargada a la base desde los scripts de `datos/` | Informe de carga con cobertura frente a las 11.364 carreras y filas rechazadas | 23 nov | Cristóbal |
| OE1 | Cálculos de puntaje ponderado y ranking con pruebas | Casos verificados contra la fuente oficial, todos aprobados | 16 nov | Cristóbal |
| OE2 | Simulador de beneficios | Reglas leídas de datos con vigencia; 4 de 5 usuarios lo completan | 23 nov | Cristóbal, Alejandro |
| OE2 | Calendario de hitos del FUAS | Cada hito con fuente y fecha de vigencia | 23 nov | Cristóbal, Alejandro |
| OE3 | Ficha de Trayectoria y gestión de consentimientos | Crear, compartir y revocar; la institución pierde el acceso al revocar (pruebas) | 30 nov | Rafael |
| OE3 | Protocolo de crisis con pruebas automáticas | 100 % del conjunto de prueba deriva y genera alerta; revisión profesional solicitada | 30 nov | Rafael |
| OE3 | Pulso de check-in mínimo | Registra respuesta o ausencia; preguntas validadas legalmente antes de activarse; si no, se entrega el diseño | 30 nov | Rafael |
| OG | Informe de las pruebas con 5 usuarios y demostración grabada | Tareas, resultados, hallazgos y limitaciones registrados | 30 nov a 2 dic | Alejandro, Cristóbal |
| OG | Informe de título y presentación | Entrega completa | 2 dic | Rafael |

### 3.8 Resultados esperados

Redactados como situación lograda al término del periodo; cada uno es la meta cumplida descrita en palabras.

| Objetivo | Resultado esperado |
|---|---|
| OE1 | Al 23 de noviembre de 2026, el portal publica carreras con datos oficiales, y todas muestran su fuente, URL y fecha; la tarea T1 (encontrar una carrera y leer su fuente) se mide en la prueba con usuarios (I-OG) |
| OE2 | Al 30 de noviembre de 2026, al menos 4 de 5 usuarios de prueba completan la simulación de beneficios, y el calendario del FUAS muestra solo hitos con fuente y vigencia |
| OE3 | Al 30 de noviembre de 2026, cada estudiante de prueba crea su ficha, decide qué comparte y lo revoca; las pruebas automáticas de consentimiento y de crisis pasan en su totalidad |
| OG | Al 2 de diciembre de 2026, 16 de 20 tareas centrales se completaron sin ayuda en la prueba con 5 usuarios, y los hallazgos quedaron registrados para el Entregable II |

Limitación declarada: con 5 usuarios y muestra por conveniencia, los resultados son una validación de usabilidad y no estiman efectos en la población.

### 3.9 Suposiciones críticas

Son condiciones del entorno; los riesgos internos del equipo se gestionan en el Entregable II. Las probabilidades son estimaciones del equipo.

| Suposición | Impacto si no se cumple | Probabilidad | Control | Plan B |
|---|---|---|---|---|
| Mineduc, SIES y DEMRE mantienen sus archivos abiertos con estructura similar | Alto: se detiene la carga de oferta | Media | Validación de esquema en el ETL y archivo versionado de cada descarga | Cargar a mano de 5 a 10 carreras reales con URL y fecha (`docs/equipo/reparto.md`) |
| Reglas y plazos de beneficios del próximo proceso se publican a tiempo | Alto: calendario desactualizado | Media | Datos con fecha de vigencia, nunca en el código | Mostrar el último proceso vigente rotulado como tal y «por confirmar» |
| Se consiguen 5 usuarios reales y, si son menores de 18, la autorización de su apoderado | Alto: no hay validación | Media | Invitar a más de 5; usar la carta a colegios y el consentimiento de apoderados ya redactados (`docs/encuestas/`) | Probar con 5 personas mayores de 18, declarando la muestra por conveniencia |
| Cloudflare y Supabase mantienen sus planes gratuitos hasta el 2 de dic | Medio: se interrumpe la demostración | Baja | Revisar los términos y mantener el despliegue reproducible | Demostración grabada como respaldo |
| La revisión profesional del protocolo de crisis y de las preguntas del pulso llega a tiempo | Medio: el pulso no se activa | Media | Solicitar la revisión en la semana 3 (`docs/equipo/reparto.md`) con los insumos de `docs/revision-profesional-crisis.md` | Entregar el protocolo con la nota «pendiente de revisión profesional» y el pulso solo como diseño |
| Mineduc responde la solicitud de transparencia sobre el FUAS (folio AJ025T0003786, vence cerca del 2 de dic) | Bajo: solo afecta la línea base | Media | Declarar la cifra como no disponible | Usar el conocimiento de beneficios de la encuesta del punto 2 como indicador indirecto |

### Anexo 3.A Fichas técnicas de los indicadores

Frecuencia: las pruebas automáticas corren en cada cambio; la cobertura se mide al cierre de cada carga; la prueba de usabilidad se aplica una vez entre el 24 y el 30 de noviembre.

| Campo | I-OG |
|---|---|
| Nombre | Tareas centrales completadas sin ayuda |
| Objetivo | OG |
| Fórmula | (tareas completadas sin ayuda ÷ 20) × 100, con 5 usuarios y 4 tareas |
| Unidad | Porcentaje |
| Línea base | 0: sin versión probada con usuarios |
| Meta y plazo | 80 % (16 de 20): prueba del 24 al 30 nov, informada al 2 dic 2026 |
| Medio de verificación | Registro de la prueba de usabilidad |
| Frecuencia | Una aplicación, 24 a 30 nov |
| Responsable | Alejandro (A: Rafael) |

Las cuatro tareas: (T1) encontrar una carrera y leer su fuente y fecha; (T2) simular beneficios; (T3) consultar el próximo hito del FUAS; (T4) crear la ficha y compartir o revocar un consentimiento.

| Campo | I-OE1a |
|---|---|
| Nombre | Cobertura de la oferta publicada |
| Fórmula | (carreras publicadas con campos obligatorios ÷ 11.364) × 100 |
| Línea base | 10 de 11.364 (0,09 %) |
| Meta y plazo | `[CONFIRMAR]` al 23 nov |
| Medio de verificación | Consulta a la base; informe de carga |
| Frecuencia | Al cierre de cada carga |
| Responsable | Cristóbal |

| Campo | I-OE1b |
|---|---|
| Nombre | Trazabilidad de la oferta publicada |
| Fórmula | (carreras publicadas con fuente, URL y fecha ÷ carreras publicadas) × 100 |
| Línea base | 10 carreras de ejemplo verificadas contra archivos oficiales |
| Meta y plazo | 100 % al 23 nov |
| Medio de verificación | Revisión automática y muestra verificada a mano |
| Frecuencia | En cada cambio |
| Responsable | Cristóbal |

| Campo | I-OE2a |
|---|---|
| Nombre | Simulaciones de beneficios completadas |
| Fórmula | (usuarios de prueba que terminan la simulación ÷ 5) × 100 |
| Línea base | 0: el simulador no existe aún |
| Meta y plazo | 80 % (4 de 5) al 30 nov |
| Medio de verificación | Prueba de usabilidad |
| Frecuencia | Una aplicación |
| Responsable | Alejandro |

| Campo | I-OE2b |
|---|---|
| Nombre | Hitos del calendario con respaldo |
| Fórmula | (hitos con fuente y fecha de vigencia ÷ hitos publicados) × 100 |
| Línea base | 0: el calendario no existe aún |
| Meta y plazo | 100 % al 23 nov |
| Medio de verificación | Archivo de datos versionado |
| Frecuencia | En cada actualización |
| Responsable | Cristóbal |

| Campo | I-OE3a |
|---|---|
| Nombre | Pruebas de consentimiento y aislamiento aprobadas |
| Fórmula | (pruebas aprobadas ÷ pruebas ejecutadas) × 100 |
| Línea base | Pruebas de RLS del esquema base aprobadas; consentimiento sin implementar |
| Meta y plazo | 100 % al 30 nov |
| Medio de verificación | Informe de la integración continua |
| Frecuencia | En cada cambio |
| Responsable | Rafael |

| Campo | I-OE3b |
|---|---|
| Nombre | Derivaciones de crisis correctas |
| Fórmula | (frases del conjunto de prueba que entregan *4141 y 600 360 7777 y generan alerta ÷ frases del conjunto) × 100 |
| Línea base | Al 5 nov, al menos una frase no se detectaba (`BITACORA.md`) |
| Meta y plazo | 100 % al 30 nov; tamaño del conjunto `[CONFIRMAR]` |
| Medio de verificación | Pruebas automáticas de `tests/ia/` |
| Frecuencia | En cada cambio |
| Responsable | Rafael |

### Anexo 3.B Matriz de marco lógico

| Nivel | Resumen narrativo | Indicador y meta | Medio de verificación | Supuestos |
|---|---|---|---|---|
| Fin | Más personas acceden a la educación superior y permanecen en ella con sus beneficios (metas ODS 4.3, 10.2 y 16.6) | Postulaciones FUAS completadas, matrícula efectiva, renovación y continuidad en segundo año (proyección) | Cifras oficiales de Mineduc y SIES | Beneficios estudiantiles vigentes; apertura de las instituciones |
| Propósito (OG) | Plataforma validada con 5 usuarios que reduce la desinformación y la fricción | I-OG: 80 % (prueba 24-30 nov; informe 2 dic) | Registro de la prueba de usabilidad | Se consiguen 5 usuarios; planes gratuitos vigentes |
| Componente OE1 | Oferta oficial explorable y trazable | I-OE1a (cobertura por fijar); I-OE1b 100 % | Base de datos; informe de carga | Archivos oficiales abiertos y estables |
| Componente OE2 | Simulador y calendario de beneficios | I-OE2a 80 %; I-OE2b 100 % | Prueba de usabilidad; archivo de datos | Reglas y plazos publicados a tiempo |
| Componente OE3 | Ficha, consentimiento, pulso y derivación | I-OE3a 100 %; I-OE3b 100 % | Integración continua; pruebas de `tests/ia/` | Revisión profesional disponible |
| Actividades | ETL, base de datos, pantallas, cálculos, pruebas, revisión de cambios | Avance en la Carta Gantt y en el tablero | Repositorio, tablero y bitácora | Dedicación del equipo hasta el 2 de dic |

# AVANCE 2

## 4. Oportunidades de transferencia tecnológica

La transferencia tecnológica es el camino por el cual el software desarrollado por el equipo llega a ser usado por otras organizaciones y por el mercado (Mankins, 1995, para la escala de madurez; Osterwalder y Pigneur, 2010, para el modelo de ingresos). En AE-SE conviven dos usuarios con lógicas distintas: el estudiante, que accede gratis y sin condiciones, y la institución cliente, que podría pagar por un panel de seguimiento. Por eso el mecanismo principal propuesto es **software como servicio (SaaS) bajo licencia propietaria**, y no la cesión del código ni su publicación abierta. El modelo de ingresos es una propuesta que se validará, no un hecho: aún no hay institución cliente ni precio definido.

### 4.1 Mecanismo elegido

| Campo | Respuesta |
|---|---|
| Mecanismo elegido y por qué | SaaS: el equipo mantiene el sistema y la institución accede al panel institucional por contrato, sin recibir el código. Se elige porque el mismo producto sirve a muchas instituciones (aisladas entre sí por la base de datos, `docs/decisiones/0002-supabase-con-rls.md`) y porque `AGENTS.md` (sección 1) establece que el software es del equipo y no se entrega a clientes. |
| Licencia propuesta (código y documentación) | Código: propietario del equipo, "todos los derechos reservados" (`LICENSE`). Documentación y contenidos educativos: licencia abierta de contenido (por ejemplo Creative Commons BY) `[CONFIRMAR: decisión del equipo; hoy el repositorio no la define]`. |
| Quién es dueño del resultado | `[CONFIRMAR con el reglamento de titulación de la institución]`. El `LICENSE` habla de "titulares" sin individualizarlos: falta un acuerdo escrito entre los tres integrantes `[CONFIRMAR: cotitularidad y porcentajes]`. |
| TRL esperado al terminar el módulo | TRL 4 (prototipo validado con usuarios en entorno controlado); ver 4.5. |
| Relación con el área de especialidad | Desarrollo de sistemas: requisitos, arquitectura web, bases de datos con seguridad por filas, procesamiento de datos y accesibilidad; ver 4.6. |

### 4.2 Mecanismos evaluados

| Mecanismo (guía, 3.1) | Aplicación a AE-SE | Decisión |
|---|---|---|
| SaaS | Panel institucional arrendado por contrato; el portal del estudiante sigue gratis. En el alcance del título el panel es una **demostración con datos de ejemplo**, sin cliente real. | Elegido como mecanismo principal (propuesta a validar) |
| Licenciamiento de uso | El contrato SaaS otorga a la institución un derecho de uso del servicio, no del código (`LICENSE`: "no reciben licencia sobre el código fuente"). | Elegido, como parte del SaaS |
| Servicios y consultoría | Implementación, capacitación y soporte a la unidad de acompañamiento de cada institución. | Complemento posible, a validar |
| Cesión o venta de derechos | Solo si una institución o el Estado exigiera ser dueño del código. Rompería el modelo de arriendo a varias instituciones y la regla de que el código es del equipo. | Descartado por ahora; se reevaluaría con una oferta concreta |
| Licencia de código abierto | Facilitaría la réplica, pero cualquiera podría ofrecer el servicio sin pagar y el modelo de ingresos que sostiene la gratuidad del estudiante se debilitaría. | Descartado para el código |
| Spin-off o empresa | Constituir una sociedad para operar el SaaS, tras el título y con mercado validado (constitución simplificada de sociedades, Ley 20.659; forma jurídica propuesta en el punto 8). | Proyección post-titulación, sin decisión del equipo |

La neutralidad es una condición de cualquier mecanismo: el portal público nunca ordena ni destaca instituciones por ser clientes (`AGENTS.md`, sección 1). Además, un cliente no recibe datos de la Ficha de Trayectoria sin consentimiento del estudiante (`docs/decisiones/0013-desercion-evitable.md`, salvaguarda de neutralidad; ADR en estado "propuesta").

### 4.3 Licencias de lo que usa el proyecto

| Componente | Licencia verificada | Consecuencia |
|---|---|---|
| Next.js 16.4.4, React 19.3.1, Tailwind CSS 4.3.4, OpenNext para Cloudflare 1.20.15, ESLint 10.14.0 | MIT (campo `license` de cada paquete instalado, revisado el 6-nov-2026) | Permiten uso en producto cerrado y comercial, con aviso de autoría |
| TypeScript 6.0.3 | Apache-2.0 (ídem) | Compatible; conserva avisos |
| Wrangler 4.157.0 | MIT o Apache-2.0 (ídem) | Compatible |
| Tipografías Atkinson Hyperlegible | Licencia de fuentes abierta SIL (OFL), según `public/fuentes/LICENCIA-OFL.txt` | Se pueden alojar en el proyecto |
| Supabase (PostgreSQL) y Gemini | Servicios contratados, no código incorporado. Supabase aún no figura en `package.json`: su licencia de cliente se verifica al agregarlo `[COMPLETAR]` | Se rigen por los términos de servicio de cada proveedor (`docs/decisiones/0002-supabase-con-rls.md`, `0004-ia-gemini-nivel-pagado.md`) |
| Cloudflare (hosting) | Términos revisados el 5-nov-2026 por un agente automático y pendientes de confirmación del líder: no se encontró prohibición de uso comercial en el plan gratuito, pero no permite procesar tarjetas y puede terminar el servicio gratuito (`docs/decisiones/0003-hosting-cloudflare.md`) | Un cobro futuro iría por contrato y factura, no por tarjeta en el sitio; la continuidad exige evaluar el plan de pago antes de atender estudiantes reales |
| Datos oficiales (Mineduc, SIES, DEMRE, Beneficios Estudiantiles) | Sin licencia de reutilización explícita en la mayoría; el CNED la prohíbe con fines comerciales y por eso no se usa (`docs/fuentes.md`, `docs/decisiones/0009-fuente-de-oferta-academica.md`) | Riesgo legal declarado para el panel pagado: se mitiga citando siempre la fuente y sin alterar valores |

### 4.4 Propiedad intelectual en Chile

| Instrumento | Qué protegería en AE-SE | Pasos y estado |
|---|---|---|
| Derecho de autor (Ley 17.336) | Código fuente y objeto, documentación preparatoria, descripción técnica y manuales (art. 3 n.° 16, según la Biblioteca del Congreso Nacional); bases de datos y diseños originales. Nace con la creación. | Inscripción opcional como prueba, en el Departamento de Derechos Intelectuales (DDI) del Servicio Nacional del Patrimonio Cultural, por la plataforma CRIN, presencial o por correo. El DDI pide copia del código fuente, manual de funcionamiento, copia de las licencias del software de terceros y, si autor y titular difieren, una declaración que individualice a los autores. **No inscrito.** Costo: se indica un porcentaje de la UTM sin monto publicado en la página consultada `[CONFIRMAR con el DDI]`. También `[CONFIRMAR con el DDI]` si el depósito del código puede mantenerse reservado, pues el código es el activo que se quiere resguardar. |
| Marca (Ley 19.039) | El nombre y el logo del producto, ante el Instituto Nacional de Propiedad Industrial (INAPI). | Solicitud en línea en tramites.inapi.cl con ClaveÚnica, previa búsqueda de marcas similares y clasificación de Niza; examen formal; publicación del extracto en el Diario Oficial; resolución y pago de derechos definitivos; vigencia de 10 años renovables; análisis de unos 6 meses (ficha ChileAtiende, consultada el 6-nov-2026, sin fecha de actualización). Montos: en un anexo de tasas del INAPI `[COMPLETAR]`. **No presentada.** Advertencia: la ficha indica que no puede registrarse un signo compuesto solo por palabras de uso común o genéricas; "Agencia de Enlace y Seguimiento Estudiantil" es descriptivo y su registro podría rechazarse, por lo que conviene evaluar un nombre distintivo `[CONFIRMAR]`. |
| Patente (Ley 19.039) | Un programa computacional por sí solo, en general, no se protege por patente (guía del capítulo 4). | No se persigue. |
| Secreto empresarial y contratos | Código privado, reglas de procesamiento de datos y configuración del servicio. | Acuerdos de confidencialidad con quien acceda al código y contrato SaaS con cada institución; sin firmar. |

**Titularidad frente a la institución.** El DDI informa que, bajo el art. 8 de la Ley 17.336, el empleador es titular del software producido por sus dependientes salvo pacto escrito, y que en los programas hechos por encargo los derechos se entienden cedidos a quien encargó la obra salvo pacto distinto. Un trabajo de título no es necesariamente ninguno de los dos casos. Por eso no se afirma quién es titular: `[CONFIRMAR con el reglamento de titulación]` y, si hubiera contraparte, con un acuerdo escrito. Esta lectura no reemplaza una asesoría legal.

### 4.5 Madurez tecnológica (TRL)

| TRL (guía, 3.3) | Estado | Situación de AE-SE | Condición |
|---|---|---|---|
| 1 a 3: idea, concepto y prueba de concepto | Logrado | Diagnóstico y decisiones de arquitectura documentadas; scripts de datos que procesaron 11.364 carreras de pregrado (Mineduc), 7.299 con indicadores SIES y 2.086 con datos DEMRE; aislamiento por institución probado en la base | Hecho (6-nov-2026) |
| 4: prototipo validado en entorno controlado | Parcial hoy | Sitio desplegado con portada, ficha de carrera y explorador sobre 10 carreras de ejemplo verificadas contra archivos oficiales; protocolo de crisis con pruebas automatizadas (revisión profesional pendiente) | Meta al 2-dic-2026: flujo recorrido con 5 usuarios reales |
| 5: validación en entorno relevante | No comprometido | Requeriría el flujo completo (simulador, asistente, Ficha de Trayectoria) probado con usuarios | Posible techo al 2-dic-2026, no prometido |
| 6 y 7: piloto en entorno real | Proyección | Piloto con una institución o establecimiento reales, con medición de las métricas de éxito | Proyección post-titulación, sin fecha ni cliente |
| 8 y 9: sistema operando y adoptado | Proyección | SaaS en operación con instituciones clientes | Proyección; mecanismo: contrato SaaS y servicios (4.2) |

Hoy no existen el simulador de puntaje y beneficios, el asistente con interfaz, la Ficha de Trayectoria funcional, el módulo de permanencia ni el panel institucional. La meta de TRL 4 es menor que el rango de 5 a 7 que sugiere la guía, porque el prototipo es parcial y las pruebas serán con 5 usuarios, no con un piloto institucional.

### 4.6 Relación con el área de especialidad

El proyecto aplica las competencias de la mención en Desarrollo de Sistemas en cuatro frentes comprobables en el repositorio:

| Competencia | Evidencia en el proyecto |
|---|---|
| Análisis de requisitos y diseño de arquitectura | Una aplicación web instalable sobre una base de datos, con registros de decisión (`docs/decisiones/`) y descripción en `docs/arquitectura.md` |
| Bases de datos y seguridad | PostgreSQL con seguridad por filas (RLS) para aislar instituciones, 31 pruebas automatizadas de políticas (`docs/arquitectura.md`, sección 4) |
| Ingeniería de datos | Scripts en Python en `datos/` que limpian, validan y cruzan archivos oficiales con fuente y fecha |
| Interacción persona-computador y accesibilidad | Sistema visual con contraste verificado por script (`scripts/tokens.py`), diseño para pantallas de 360 px y teclado como criterio de término (`AGENTS.md`, sección 5). Lighthouse, red lenta y lector de pantalla **aún sin medir** (`BITACORA.md`). |

### 4.7 Soluciones y emprendimientos existentes

Se revisaron los sitios oficiales de cada referente el 6 de noviembre de 2026. Solo se atribuye lo que aparece en la página consultada; "no se observó" indica ausencia en esa página, no que el referente no lo tenga.

| Referente | Qué hace | Modelo | Fortaleza | Debilidad o vacío (observado) | Fuente |
|---|---|---|---|---|---|
| Alternativa actual: orientación en el establecimiento, folletos, redes sociales y navegar varios portales por separado | Cada estudiante junta información de fuentes distintas | Gratuito | Cercanía y costo cero | Sin registro ni seguimiento personal; su alcance real `[COMPLETAR con resultados del punto 2 tras aplicar las encuestas]` | Diagnóstico (punto 2); guía del capítulo 4, sección 5 |
| Portales del Mineduc: Mi Futuro, Acceso y Beneficios Estudiantiles | Mi Futuro: buscadores de carreras, instituciones, empleabilidad e ingresos, estadísticas, información de beneficios y enlace al FUAS. Acceso: portales de postulación, comparador de instituciones técnico-profesionales, calendario y simulador de postulaciones. Beneficios Estudiantiles: guía de postulación, beneficios, renovación, calendario y aranceles de referencia | Público y gratuito | Datos oficiales y cobertura nacional | Repartido en tres sitios; no se observó seguimiento posterior a la matrícula ni recordatorios personalizados | https://www.mifuturo.cl/ ; https://acceso.mineduc.cl/ ; https://portal.beneficiosestudiantiles.cl/ |
| Elige Carrera (Consejo Nacional de Educación, versión beta) | Buscador de alternativas académicas y de ocupaciones, simulador de puntajes, fechas relevantes y documentos para orientadores | Sitio institucional; la página no indica cobro | Simulador de puntajes y material para orientadores | No se observó información de beneficios ni seguimiento | https://www.eligecarrera.cl/ |
| Fundación Por Una Carrera | Orientación vocacional y apoyo a becas: "Acompañamiento 360°", talleres FUAS en establecimientos, enlace a un portal de becas | Fundación; la página no declara su situación legal ni el costo para estudiantes, e invita a donar | Acompañamiento presencial | Cobertura y alcance no verificados `[COMPLETAR]`; no se observó plataforma de seguimiento por estudiante | https://www.porunacarrera.cl/ |
| uPlanner | Software para instituciones; en su línea "Student Success" ofrece alertas tempranas de deserción construidas con los datos de la institución | Venta a instituciones; no publica precios | Integración con los datos de la propia institución | Dirigido a instituciones; no se observó una oferta pública para el estudiante. Su enfoque es predictivo, que AE-SE no promete | https://www.uplanner.com/ |

Quedaron fuera de la tabla otras plataformas nombradas en borradores previos del equipo (por ejemplo Filadd, TuCarrera y plataformas de analítica de grandes proveedores) porque no se pudieron verificar sus características en fuentes oficiales.

**Conclusión: el vacío que llena la propuesta.** Existe oferta pública gratuita de información, y por eso AE-SE no compite en volumen de datos sino en personalización y continuidad. Entre los referentes revisados no se observó un servicio que reúna en un solo recorrido la exploración con datos oficiales, la ayuda para tramitar beneficios y, después de la matrícula, el aviso de renovación, con una ficha que pertenece al estudiante y que una institución solo ve con su autorización. Es una observación sobre sitios públicos a la fecha de consulta, no un estudio exhaustivo del mercado. La razón para insistir en lo personalizado es que la información genérica ha mostrado efecto nulo en ensayos y la personalizada con reducción de trámite sí funciona (`docs/informe-fundamentacion.md`, sección 2A; evidencia mayormente de Estados Unidos).

---

## 5. Propuesta de valor aplicable al producto y/o servicio

La segmentación sigue los factores de Kotler y Keller (2016) y el perfil, el mapa de valor y el encaje siguen el lienzo de Osterwalder et al. (2014). Hay dos perfiles porque quien se beneficia no es quien pagaría: el **estudiante** (usuario, gratis) y la **institución de educación superior** (cliente potencial). Las frustraciones se toman del diagnóstico solo cuando tienen un dato verificado detrás. Las que dependen de las encuestas, que están diseñadas pero **aún no aplicadas** (`docs/encuestas/README.md`), se marcan como hipótesis a validar con el punto 2. Por la misma razón no se priorizan por número de menciones, como sugiere la guía, sino por solidez de la evidencia; esa prioridad se reordenará con los resultados `[COMPLETAR con resultados reales tras aplicar el instrumento]`.

### 5.1 Perfil del estudiante

| Factor | Descripción | Fuente o estado |
|---|---|---|
| Demográfico | Personas de 16 a 24 años de establecimientos municipales, SLEP, particulares subvencionados o de administración delegada: estudiantes de 3.º y 4.º medio, egresados de hasta cinco años y estudiantes de primer año (segmento del punto 1, Tabla 1.0). En esos establecimientos el acceso inmediato va de 36,3 % a 41,9 %, frente a 68,7 % en los particulares pagados (SIES, 2023, Tabla 3). De 258.418 egresados de enseñanza media en 2020, 143.191 (55,4 %) no estaban matriculados en educación superior en 2021 (mide ingreso inmediato, no "nunca"). Muchos son menores de 18: sus datos requieren autorización de padre, madre o tutor. | Centro de Estudios Mineduc (2022), Tabla 10, p. 80; SIES (2023), Tabla 3, p. 8; `AGENTS.md`, sección 2.2 |
| Geográfico | Alcance nacional, porque los datos oficiales y los beneficios lo son. Territorio de prueba con 5 usuarios: se propone la Región de O'Higgins `[CONFIRMAR: territorio y comuna, como en el punto 1]`. | Decisión de alcance; pruebas por definir |
| Psicográfico | Hipótesis: incertidumbre al elegir, temor a equivocarse en el trámite o a endeudarse, desconfianza hacia información de origen comercial. | Hipótesis a validar con el punto 2 |
| Conductual | Hipótesis: buscan información tarde y en canales informales (redes, conocidos) y no siempre saben qué beneficio les corresponde ni qué exige renovarlo. No hay cifra publicable de quienes no saben postular ni de quienes no postulan al FUAS; la solicitud de transparencia (folio AJ025T0003786, respuesta hasta el 2-dic-2026) busca cerrar esa brecha. | Hipótesis a validar con el punto 2; `docs/verificacion-de-cifras.md` |
| Otro: tecnográfico | Supuesto de diseño: acceso mayoritario desde teléfono, a veces con datos limitados; por eso la aplicación es web instalable opcional y liviana. Uso real de dispositivos y conectividad `[COMPLETAR con una fuente oficial; las encuestas no lo miden]`. | `AGENTS.md`, sección 2.6 (supuesto, no medido) |

### 5.2 Perfil de la institución cliente

| Factor | Descripción | Fuente o estado |
|---|---|---|
| Demográfico (organización) | Universidades, institutos profesionales y centros de formación técnica con estudiantes de primer año que reciben beneficios; la oferta cargada cubre 11.364 carreras de pregrado. Contraparte: unidad de asuntos estudiantiles o de acompañamiento. | Mineduc (datos procesados, `BITACORA.md`) |
| Geográfico | Instituciones con sedes en las regiones donde se pruebe la demo `[COMPLETAR]`; alcance nacional posible. | Por definir |
| Psicográfico | Interés en demostrar apoyo a la progresión estudiantil. La acreditación lo exige como estándar en una dimensión obligatoria (Criterio 2, Dimensión I, de la CNA) y, en su nivel más alto, pide evidencia de eficacia. La Ley 21.091 no impone una obligación de acompañamiento. | `docs/informe-fundamentacion.md`, sección 5; `docs/decisiones/0012-cadena-causal-y-promesa.md` |
| Conductual | Hipótesis: ya tienen sistemas propios con notas y asistencia; les falta el dato sobre beneficios y contacto con el estudiante, y evidencia de lo que hacen. | Hipótesis; `docs/decisiones/0010-modulo-de-permanencia.md` |
| Otro: tecnográfico | Sistemas de información propios; el panel del título es una demostración sin integración con ellos (la integración es fase 2). | `docs/plan.md` |

Línea base del problema para este cliente: la retención de primer año de la cohorte 2023 fue 76,5 % (Servicio de Información de Educación Superior [SIES], s. f.). El costo total de abandono es techo del problema y no lo que la plataforma recuperaría: la Cátedra UNESCO de Inclusión (USACH, 2016) lo estima en $546.000 millones al año (cifra leída en el informe; falta abrirla con herramienta propia, ver `docs/verificacion-de-cifras.md`).

### 5.3 Trabajos del cliente

| Trabajo | Estudiante | Institución |
|---|---|---|
| Funcional | Encontrar carreras que calcen con sus intereses y puntaje; saber a qué beneficios podría acceder; completar el formulario FUAS; mantener los beneficios una vez matriculado | Apoyar la progresión de sus estudiantes; conocer cuáles pueden perder un beneficio; reunir evidencia de lo que hace |
| Social | Mostrar a su familia que decide con información | Mostrar a la comunidad y a la CNA una política de acompañamiento |
| Emocional | Tener certeza sobre los pasos y plazos | Decidir con datos y no solo con intuición |

### 5.4 Frustraciones (ordenadas por solidez de la evidencia)

| N.° | Frustración | Respaldo | Estado |
|---|---|---|---|
| F1 | "Me pierdo entre varios sitios y no sé por dónde partir" | Observación del punto 4.7: carreras, postulación y beneficios están en sitios oficiales distintos | Verificada (observación a la fecha de consulta) |
| F2 | "No sé si tengo derecho a un beneficio ni qué debo hacer para conservarlo" | La persistencia al 2.º año con beneficios fue 88,2 % y sin ellos 74,4 % (cohorte 2022; 13,8 puntos; cohorte 2020: 86,3 % y 74,2 %; SIES, 2021, 2023). Es diferencia observada, no efecto causal. | Brecha verificada; el mecanismo "no sabía/no renové" es hipótesis a validar con el punto 2 |
| F3 | "Postular me parece un trámite difícil" | No hay cifra publicable de quienes no saben o no postulan al FUAS | Hipótesis a validar con el punto 2 |
| F4 | "No sé si puedo confiar en quien me informa" | Sin dato propio | Hipótesis a validar con el punto 2 |
| F5 | "Entré, pero nadie me avisa lo que viene" | Retención de primer año 76,5 % (cohorte 2023): hay quienes no continúan | Cifra verificada; la causa "falta de aviso" es hipótesis |
| I1 | (Institución) "No tengo cómo mostrar que mis acciones de apoyo funcionan" | El Criterio 2 de la CNA pide indicadores y, en el nivel más alto, evidencia de eficacia | Verificada como exigencia del estándar; que sea una frustración real del cliente es hipótesis a validar con entrevistas `[COMPLETAR]` |
| I2 | (Institución) "Me entero tarde de que un estudiante perdió su beneficio o dejó de responder" | Razonamiento del ADR 0010 (el estudiante que deserta deja de responder) | Hipótesis a validar |

### 5.5 Alegrías

| N.° | Alegría esperada | Perfil |
|---|---|---|
| A1 | Saber con claridad qué opciones y beneficios tiene, con la fuente a la vista | Estudiante |
| A2 | Llegar a los plazos con los pasos hechos | Estudiante |
| A3 | Controlar quién ve su información y poder retirarla | Estudiante |
| A4 | Sentirse acompañado después de entrar, y saber a quién acudir si algo se complica | Estudiante |
| A5 | Tener evidencia ordenada de sus acciones de apoyo para su proceso de acreditación | Institución |
| A6 | Estimar con sus propios números cuánto le cuesta el abandono | Institución |

### 5.6 Mapa de valor

| Producto o servicio | Estado al 6-nov-2026 | Plan |
|---|---|---|
| Explorador y ficha de carrera con datos oficiales y su fuente | Existe con 10 carreras de ejemplo; 11.364 procesadas, aún sin cargar al portal | Cargar a la base y mostrar en el portal |
| Simulador de puntaje ponderado y ranking | No existe | Semana 2 de `docs/plan.md` |
| Beneficios de postulación y de mantención, con plazos | No existe | Semana 3 |
| Asistente con respuestas citadas y protocolo de crisis | Protocolo con pruebas; asistente sin interfaz | Semana 3 |
| Ficha de Trayectoria con consentimiento granular | Esquema y políticas probadas; sin interfaz | Semana 3 |
| Escalera de derivación y pulso de check-in (sensor) | No existe | Semana 4, sujeto a revisión profesional y legal (ADR 0010) |
| Panel institucional y calculadora de costo de abandono | No existe | Semana 4, demostración con datos de ejemplo |

| Aliviador de frustración | Alivia | Producto que lo hace posible |
|---|---|---|
| Un solo lugar con datos oficiales de carreras y beneficios, cada uno con fuente y fecha | F1 | Explorador y ficha de carrera |
| Qué beneficios podrían corresponder y cuáles son los pasos y plazos, en lenguaje claro | F2, F3 | Módulo de beneficios |
| Aviso de renovación y de qué exige conservar el beneficio | F2, F5 | Beneficios de mantención |
| Cada respuesta muestra de dónde sale; si no hay fuente, no se afirma | F4 | Asistente con citas |
| Derivación a la red de apoyo de la institución y a la línea pública *4141 y Salud Responde 600 360 7777 ante una señal de crisis | F5 | Escalera de derivación y protocolo de crisis |
| Panel con indicadores de uso de beneficios, solo de estudiantes que autorizaron | I1, I2 | Panel institucional |

| Creador de alegría | Crea | Producto que lo hace posible |
|---|---|---|
| Comparar carreras con empleabilidad e ingresos del SIES, indicando qué mide cada cifra y su año | A1 | Ficha de carrera |
| Calendario con recordatorios de plazos | A2 | Módulo de beneficios |
| Consentimiento por institución y finalidad, revocable | A3 | Ficha de Trayectoria |
| Relatos curados de otros estudiantes y ruta de derivación | A4 | Pertenencia y escalera de derivación (ADR 0010) |
| Informe de cohorte con evidencia ordenada | A5 | Panel institucional |
| Calculadora: cohorte × tasa de abandono de primer año × arancel, con datos de la institución | A6 | Calculadora (ADR 0013, propuesta) |

### 5.7 Encaje

| Frustración o alegría (perfil) | Aliviador o creador (mapa) | Evidencia del encaje |
|---|---|---|
| F2 y F5: no saber qué exige un beneficio ni cuándo | Aviso de renovación con requisitos y plazos vigentes | Brecha observada de persistencia (13,8 puntos); efecto no causal. La información personalizada y que reduce el trámite tiene respaldo experimental, en su mayoría de EE. UU. |
| F1: dispersión | Ficha única con fuentes | Observación de portales (4.7); por validar con usuarios |
| I1 y A5: evidencia de apoyo | Panel con indicadores | Exigencia de la CNA; por validar con una institución |
| A3: controlar sus datos | Consentimiento granular | Ley 21.719 y `AGENTS.md`, sección 2.2; probado a nivel de base de datos |

No se atienden todas las frustraciones: el pulso de check-in solo registra autorreporte y silencio, no predice deserción ni evalúa salud mental.

### 5.8 Declaración de propuesta de valor

La redacción adapta la plantilla de Moore (1991).

**Para estudiantes** que buscan ingresar a la educación superior y no saben qué beneficios les corresponden ni cómo mantenerlos, AE-SE es un portal web gratuito que reúne datos oficiales con su fuente, orienta en el trámite de beneficios y avisa de renovaciones, con una ficha que pertenece al estudiante. A diferencia de navegar varios portales por separado, nuestra propuesta es personalizada y continúa después de la matrícula.

**Para instituciones de educación superior** que necesitan evidencia de sus acciones de apoyo a la progresión, el panel institucional de AE-SE es un servicio por contrato que muestra, solo de estudiantes que lo autorizaron, el uso y la renovación de beneficios. A diferencia de los sistemas que estiman riesgo de deserción con datos internos, no predice: ordena información que el estudiante comparte con su consentimiento. En el alcance del título es una demostración con datos de ejemplo.

Promesa del proyecto: reducir la exclusión de la educación superior causada por desinformación sobre beneficios estudiantiles y acompañar la permanencia de quienes ingresan (`docs/decisiones/0012-cadena-causal-y-promesa.md`). No se promete mejorar la salud mental, predecir la deserción ni garantizar acreditación.

---

## 6. Lienzo de propuesta de valor

### 6.1 Elección del lienzo

Se usa el **Canvas Social** y no el Lean Canvas (Maurya, 2012), por tres razones: el beneficiario (estudiante) no es quien pagaría (institución); el servicio al estudiante es gratuito siempre; y el objetivo central es un resultado social (que no se pierdan beneficios ni oportunidades), no la rentabilidad. El Canvas Social adapta el modelo de negocios de Osterwalder y Pigneur (2010) con los bloques que propone la guía del capítulo 4, sección 9.2.

### 6.2 Canvas Social de AE-SE

| Bloque | Contenido |
|---|---|
| Segmentos: beneficiarios y clientes | Beneficiarios: personas de 16 a 24 años de establecimientos con financiamiento público que quieren ingresar o ya ingresaron a la educación superior (menores con autorización del apoderado; segmento del punto 1). Clientes potenciales: instituciones de educación superior (supuesto por validar). |
| Propuesta de valor social y de cliente | Social: información oficial clara, ayuda para tramitar y mantener beneficios, ficha propia. Cliente: evidencia ordenada de apoyo a la progresión, solo de estudiantes que autorizaron. |
| Medidas de impacto | Postulaciones FUAS completadas, beneficios obtenidos, matrícula efectiva, renovación de beneficios y continuidad en 2.º año. Ninguna de salud mental. Al 2-dic-2026 solo se medirá usabilidad con 5 usuarios `[COMPLETAR resultados]`; las demás requieren piloto. |
| Tipo de intervención | Portal web instalable (producto) con información, trámite guiado y avisos; panel para instituciones (servicio por contrato). |
| Canales | Portal público abierto; establecimientos y orientadores como puerta de entrada `[CONFIRMAR: acuerdos]`; venta directa a unidades de acompañamiento. |
| Actividades, recursos y socios clave | Actividades: actualizar datos oficiales, mantener el sistema, revisar contenido. Recursos: código propio, datos oficiales con fuente, infraestructura contratada. Socios: Mineduc, SIES y DEMRE como fuentes; profesional de psicología o psicopedagogía que revise el contenido (**pendiente de conseguir**); establecimientos e instituciones para el piloto (sin acuerdos hoy). |
| Estructura de costos | Desarrollo: horas del equipo. Operación: hosting, base de datos, API de IA y dominio, hoy en planes gratuitos o de prepago mínimo (Gemini, ADR 0004). Por cubrir: revisión profesional, asesoría legal, registro de marca y de obra, eventual plan de pago de hosting. Montos: capítulo de presupuesto `[COMPLETAR]`. |
| Ingresos y financiamiento | Propuesta a validar: contrato por acceso al panel institucional y servicios de implementación; fondos concursables y convenios, por explorar. Sin precios definidos `[COMPLETAR tras entrevistas con instituciones]`. Cobro por contrato y factura, no por tarjeta en el sitio (restricción del plan gratuito de Cloudflare). |
| Excedente | Si hubiera ganancia, reinvertirla en mantener gratuito el portal del estudiante y en revisión profesional `[CONFIRMAR: política de excedentes del equipo]`. |

### 6.3 Coherencia con los puntos anteriores

El segmento, las frustraciones F1 a F5 e I1 a I2 y la declaración de valor son los mismos del punto 5. Las medidas de impacto son las autorizadas por la promesa del proyecto. Están marcados como supuesto el cliente que pagaría, los precios, los canales con establecimientos y la política de excedentes, y se validarán con entrevistas a instituciones y con el piloto posterior al título. Los bloques de ingresos y costos se completarán con el capítulo de valorización y presupuesto.

## 7. Marco estratégico del proyecto

El marco estratégico parte de la propuesta de valor del proyecto (Punto 5) y de la promesa que el equipo autorizó públicamente (`docs/decisiones/0012-cadena-causal-y-promesa.md`): reducir la exclusión de la educación superior causada por desinformación sobre beneficios estudiantiles y acompañar la permanencia de quienes ingresan. Lo que sigue no agrega nada a esa promesa; la convierte en razón de ser, aspiración y principios de conducta.

### 7.1 Misión, visión y valores

| Elemento | Redacción |
|---|---|
| Misión (presente) | Ayudamos a quienes quieren entrar a la educación superior en Chile, de cualquier edad, y a quienes ya están dentro, a elegir con información oficial y a no perder sus beneficios, mediante una plataforma gratuita con datos citados a su fuente y una Ficha de Trayectoria que pertenece al estudiante, para reducir la exclusión causada por desinformación y acompañar su permanencia. |
| Visión (3 a 5 años) | Al 2030, ser una herramienta de referencia para informar y acompañar la progresión de estudiantes en la Región de O'Higgins, con instituciones de la región que usen el panel de seguimiento con consentimiento de sus estudiantes y con resultados publicados por la propia plataforma. |

Cómo se descompone la misión, para comprobar que dice lo que exige la fórmula:

| Parte | En la misión |
|---|---|
| Qué hacemos | Ayudar a elegir con información oficial y a mantener los beneficios |
| Para quién | Personas que quieren ingresar a la educación superior y estudiantes que ya ingresaron; las instituciones participan como clientes que pagan, no como destinatarias del servicio al estudiante |
| Cómo (lo distintivo) | Gratuidad, datos con fuente y fecha, y una ficha que el estudiante controla y comparte solo con su consentimiento |
| Para qué | Reducir la exclusión causada por desinformación y acompañar la permanencia |

El horizonte y la región son una propuesta del equipo; la visión no fija un número de instituciones o comunas porque no hay base para comprometerlo antes de un piloto, y esa meta se fijará con sus resultados. La visión se acota a una región porque el proyecto hoy es un prototipo parcial (portada, ficha de carrera y explorador con 10 carreras de ejemplo verificadas; la carga de las 11.364 carreras procesadas aún no llega al portal) y porque el panel institucional será una demostración con datos de ejemplo. Las únicas métricas que la plataforma puede medir sobre sí misma, y con las que se evaluaría la visión, son las del ADR 0012: postulaciones al Formulario Único de Acreditación Socioeconómica (FUAS) completadas, beneficios obtenidos, matrícula efectiva, renovación de beneficios y continuidad en segundo año. No se plantea ninguna meta de salud mental ni de predicción.

### 7.2 Valores

Cada valor está ligado a una decisión ya escrita en el repositorio; si la decisión desaparece, el valor deja de describir al proyecto.

| Valor | Definición para el proyecto | Cómo se ve en la práctica | Decisión que lo respalda |
|---|---|---|---|
| Gratuidad y neutralidad | El estudiante no paga ni ve publicidad; ninguna institución compra posición ni orden en los resultados | Los ingresos vienen solo de instituciones y de fondos públicos; el código que ordena resultados usa criterios explícitos y documentados, nunca la condición de cliente; la plataforma no recomienda quedarse ni irse por conveniencia de quien paga | `AGENTS.md` sección 1; ADR 0013 (salvaguarda de neutralidad) |
| Rigor y trazabilidad | Un dato que no se puede verificar en una fuente oficial no se publica | Todo dato mostrado lleva fuente, URL y fecha; las cifras sin origen verificable se retiran y se registran como retiradas; donde falta una cifra se declara la brecha | `AGENTS.md` 2.1; `docs/verificacion-de-cifras.md` |
| Control del estudiante sobre sus datos | La Ficha de Trayectoria es del estudiante y la institución solo ve lo que él autoriza | Consentimiento granular y revocable; autorización del apoderado en menores de 18 años; el aislamiento entre instituciones lo impone la base de datos con Row Level Security (RLS), con 31 pruebas automatizadas | `AGENTS.md` 2.2; ADR 0002; `docs/arquitectura.md` sección 4 |
| Cuidado con límites claros | La plataforma orienta, contiene y deriva; no diagnostica, no trata ni predice | El protocolo de crisis entrega la Línea de Prevención del Suicidio *4141 y Salud Responde 600 360 7777 y alerta a una persona, con pruebas automatizadas (la revisión profesional sigue pendiente); el pulso de check-in es un sensor y ningún texto lo describe como predicción | `AGENTS.md` 2.4; ADR 0010; ADR 0012 |
| Accesibilidad | Nadie queda fuera por el dispositivo, la conexión o la forma de leer | Diseño desde 360 px de ancho, tipografía Atkinson Hyperlegible alojada en el proyecto y colores solo desde `diseno/tokens.json`, con verificación de contraste; el cumplimiento de WCAG 2.2 AA y la carga en red 4G lenta son metas aún sin medir | `AGENTS.md` 2.5 y 2.6; ADR 0005 |

## 8. Estrategias de negocio

### 8.1 Estrategia competitiva

| Campo | Respuesta |
|---|---|
| Estrategia genérica (Porter, 1985) | Enfoque con diferenciación: un segmento acotado y un servicio que otros no combinan |
| Segmento | Personas de 16 a 24 años de establecimientos con financiamiento público que postulan a educación superior, y estudiantes de primer año que vienen de ellos, con foco inicial en la Región de O'Higgins, e instituciones de la región con una unidad de apoyo a la progresión (segmento institucional inicial propuesto, a validar con entrevistas) |
| Vacío que aprovecha | La información genérica sobre postulación y beneficios tiene efectos nulos en los ensayos revisados, y funciona la información personalizada y accionable que reduce la fricción del trámite (`docs/informe-fundamentacion.md`, sección 2A; ensayos mayormente de Estados Unidos, como Hastings et al. en Chile sobre la elección de programa). Además, una institución ya tiene en sus sistemas las notas y la asistencia de sus estudiantes, de modo que no necesita otra alerta construida con menos datos (ADR 0010) |
| Diferenciación | Datos oficiales citados a su fuente, simulación y calendario de beneficios, seguimiento que el estudiante controla y evidencia de progresión que la institución puede usar en su acreditación |
| Costos | No compite por precio bajo: el servicio al estudiante es gratuito y la infraestructura se opera hoy en planes gratuitos (Cloudflare y Supabase), con el riesgo documentado en el ADR 0003 de que el proveedor termine el servicio gratuito |

Cómo se vende a las instituciones: como ventaja en acreditación, no como cumplimiento de una obligación. La Ley 21.091 no obliga a las instituciones a acompañar a sus estudiantes; el Criterio 2 de los criterios de acreditación de la Comisión Nacional de Acreditación (CNA, s. f.) sí exige acciones de apoyo a la progresión, indicadores definidos y evaluados y, en su nivel más alto, evidencia de eficacia. El argumento comercial no promete que la plataforma garantice la acreditación ni cuánta deserción evita: usa el costo total de la deserción solo como techo del problema y ofrece a cada institución una calculadora con sus propios datos (cohorte, tasa de deserción de primer año, arancel perdido), todavía por construir (ADR 0013). El cobro ligado a resultados está descartado hasta tener datos de un piloto.

### 8.2 Operaciones societarias

#### 8.2.1 Formas jurídicas evaluadas

| Forma | Fines de lucro | Ventajas para este proyecto | Desventajas | Evaluación |
|---|---|---|---|---|
| Sin entidad nueva (proyecto académico más convenios) | No aplica | Sin costo ni trámite; adecuado mientras no haya ingresos | No puede facturar ni firmar contratos como organización; los derechos sobre el código dependen de la política de la institución formadora, cuyo reglamento de titulación está por revisar | Adecuada solo para el período del proyecto de título |
| Empresa Individual de Responsabilidad Limitada (EIRL) | Sí | Patrimonio separado | Un solo dueño, persona natural: el equipo es de tres personas | Descartada |
| Sociedad de Responsabilidad Limitada (Ltda.) | Sí | Dos o más socios; responsabilidad limitada al aporte | Cambiar socios exige modificar la escritura, lo que dificulta sumar un inversionista | Alternativa si el equipo no busca inversión |
| Sociedad por Acciones (SpA) | Sí | Uno o más accionistas; responsabilidad limitada al aporte; estatutos flexibles; facilita el ingreso de inversionistas y el reparto por clases de acciones | Obligaciones tributarias y de contabilidad desde el inicio de actividades | Recomendada para la etapa comercial |
| Corporación o fundación (Ley 20.500) | No | Calza con un objetivo de interés general; puede postular a fondos para organizaciones sin fines de lucro | No distribuye utilidades a sus fundadores ni admite inversionistas; los excedentes se reinvierten en su fin; sigue un procedimiento distinto al de las sociedades, que no se evaluó en detalle | Descartada para la operación; posible complemento futuro |
| Cooperativa | Sí, según participación | Propiedad democrática | Supone que la comunidad usuaria sea dueña; aquí el cliente es la institución | Descartada |

Las sociedades comerciales se pueden constituir en línea en el Registro de Empresas y Sociedades («Tu Empresa en un Día», creado por la Ley 20.659) con ClaveÚnica. Según ChileAtiende, la constitución no tiene costo para la empresa, aunque los socios sin firma electrónica avanzada pagan por la firma que usen; las formas disponibles incluyen EIRL, Ltda. y SpA (ChileAtiende, s. f.; consulta del 6 de noviembre de 2026). El Servicio de Impuestos Internos (SII) ofrece el régimen Pro Pyme a empresas cuyo promedio de ingresos del giro de los últimos tres años no supera las 75.000 UF (SII, s. f.); el régimen tributario que convenga a la sociedad se decidiría al iniciar actividades y no se evalúa aquí.

#### 8.2.2 Propuesta: forma jurídica por etapa

La elección es una propuesta del equipo que debe acordarse; el equipo no ha constituido ninguna entidad.

| Etapa | Forma propuesta | Por qué |
|---|---|---|
| Hasta el 2 de diciembre de 2026 (proyecto de título) | Sin entidad nueva; convenios de colaboración para las pruebas con usuarios | No hay ingresos y el producto es un prototipo parcial |
| Si el equipo decide continuar `[CONFIRMAR: decisión de continuar tras el título]` | SpA con tres socios fundadores | El modelo tiene ingresos futuros por suscripción de instituciones, requiere firmar contratos y facturar, y puede necesitar sumar un fondo o inversionista sin reformar la escritura. La gratuidad para el estudiante se resguarda en los estatutos o en el pacto de socios, y no en la forma jurídica |

La SpA es coherente con el modelo porque el proyecto sí tendrá ingresos; una forma con fines de lucro en un proyecto sin ingresos sería el error contrario. Los fondos concursables revisados en 8.4 aceptan a personas naturales o a personas jurídicas con fines de lucro, de modo que no es indispensable constituir la SpA para postular. Si el equipo postula a Semilla Inicia como persona jurídica, esta debe tener menos de 18 meses de inicio de actividades y ninguna venta (CORFO, s. f.-a), por lo que la SpA se constituiría antes de la primera venta.

#### 8.2.3 Estructura de propiedad y acuerdos: propuesta a acordar

| Tema | Propuesta | Estado |
|---|---|---|
| Socios | Rafael Jaque, Alejandro y Cristóbal; Claude es una herramienta de IA y no integrante | Propuesta: los tres integrantes del equipo |
| Participación | Criterio sugerido: proporcional al aporte comprobable (arquitectura y código, diseño, datos y contenido) y a la dedicación comprometida hacia adelante, no solo a lo ya hecho | `[CONFIRMAR: porcentaje de cada socio]` |
| Permanencia (vesting) | La participación se consolida gradualmente con el tiempo de trabajo, para proteger al proyecto si un socio se retira | `[CONFIRMAR: plazo y acantilado]` |
| Propiedad intelectual | Código, marca y documentación pertenecen a la sociedad (Ley 17.336 sobre propiedad intelectual); coherente con el modelo de software propietario arrendado como servicio (`AGENTS.md` sección 1) | Propuesta: cesión escrita de los derechos de cada integrante a la sociedad al constituirla; licencia de la documentación por definir (ver Punto 4) |
| Decisiones | Mayoría simple para lo ordinario y mayoría reforzada para lo que cambie la naturaleza del proyecto: dejar de ser gratuito para el estudiante, vender o ceder datos, ordenar resultados por condición de cliente, ingresar nuevos socios | `[CONFIRMAR: porcentaje de la mayoría reforzada]` |
| Desacuerdos | Mediación entre socios antes de cualquier venta de la sociedad | Propuesta a acordar en el pacto de socios |

#### 8.2.4 Alianzas

| Tipo | Con quién | Para qué | Estado |
|---|---|---|---|
| Convenio de colaboración | Liceos o instituciones de educación superior de O'Higgins | Pruebas con 5 usuarios reales y validación del contenido | `[COMPLETAR: instituciones y fecha; sin convenio firmado]` |
| Contrato de prestación de servicios (suscripción) | Instituciones de educación superior | Acceso al panel de seguimiento de cohortes, solo de estudiantes que autorizaron | Panel como demostración con datos de ejemplo; precio `[CONFIRMAR: precio de la suscripción]` |
| Contrato de honorarios | Profesional de psicología o psicopedagogía | Revisar el contenido psicoeducativo antes de publicarlo (`AGENTS.md` 2.4) | Pendiente de contratar |
| Proveedores tecnológicos | Cloudflare (hosting), Supabase (base de datos), Google (Gemini, nivel pagado según el ADR 0004) | Infraestructura del servicio | Cloudflare y Supabase en planes gratuitos; el costo de Gemini aún no está cuantificado |
| Consorcio | Una universidad u organización sin fines de lucro | Postulación conjunta a fondos que lo permitan | Solo como opción |

Si el cliente es un organismo público, compra mediante Mercado Público (Ley 19.886). ChileCompra informa que desde el 12 de diciembre de 2024 la Compra Ágil sube de 30 a 100 UTM, que en una primera instancia participan solo las empresas de menor tamaño y que el proveedor debe estar en el Registro de Proveedores en estado activo, con tarifa según el tamaño de la empresa (ChileCompra, 2024). Las instituciones privadas contratan directamente.

### 8.3 Cadena de valor del proyecto

Adaptación de Porter (1985) a un servicio digital. La columna de estado distingue lo que existe hoy de lo planificado.

| Actividad primaria | Qué hace el proyecto | Quién | Estado | Ventaja |
|---|---|---|---|---|
| Captura de datos y requisitos | Descarga y limpieza de archivos oficiales (Mineduc, SIES, DEMRE) con scripts en Python; cada dato se guarda con fuente, URL y fecha; solicitud de transparencia sobre la serie de postulaciones al FUAS | Cristóbal con revisión del líder | Procesadas 11.364 carreras de pregrado, aún no cargadas al portal; respuesta de la solicitud vence cerca del 2 de diciembre de 2026 | Sí: trazabilidad de cada dato |
| Operaciones | Portal con explorador, ficha y simulador de puntaje (por construir); Ficha de Trayectoria con consentimiento granular; aislamiento por institución en la base de datos; protocolo de crisis y asistente con citación obligatoria (asistente por construir) | Líder (arquitectura, base de datos, privacidad, IA) y Alejandro (interfaz) | Ficha y explorador con 10 carreras de ejemplo; RLS probado; asistente, simulador y Ficha sin construir | Sí: control del estudiante sobre sus datos y neutralidad verificable |
| Entrega del servicio | Aplicación web instalable (PWA) en Cloudflare, sin descarga obligatoria; panel de agencia y panel institucional | Equipo; Cloudflare como proveedor | Sitio desplegado; paneles sin construir (el institucional será demostración) | No |
| Marketing y ventas | Presentación a unidades de apoyo estudiantil y de acreditación de instituciones, con la calculadora de costo de deserción; difusión a estudiantes por orientadores | Líder y Cristóbal | Presentación comercial planificada para el cierre; calculadora por construir | No |
| Servicio posventa | Actualización periódica de plazos y beneficios, soporte a la institución y medición de indicadores de progresión de los estudiantes que autorizaron | Equipo | Planificado; sin clientes | Sí: evidencia de progresión que la institución puede usar en su acreditación |

| Actividad de apoyo | Qué hace el proyecto | Quién |
|---|---|---|
| Infraestructura de la organización | Gestión del repositorio en la organización AE-SE, revisión obligatoria de cada cambio, documentación de decisiones (ADR); a futuro, la sociedad | Líder |
| Gestión de recursos humanos | Reparto de tareas con fechas, guías por integrante y ventanas de revisión martes y viernes (`docs/equipo/reparto.md`) | Líder |
| Desarrollo de tecnología | Arquitectura, pruebas automatizadas de crisis y de RLS, verificación de contraste, uso de herramientas de IA declaradas en cada cambio | Líder, Alejandro, Cristóbal |
| Abastecimiento | Hosting, base de datos y API de IA; el costo de infraestructura es hoy de $0 de desembolso directo en planes gratuitos | Líder |

La ventaja descansa en tres actividades: la captura de datos con trazabilidad, las operaciones con control del estudiante y neutralidad, y la posventa que produce evidencia de progresión. Las tres son ventajas por diseño y todavía no por resultado: ninguna se ha medido con usuarios, y las pruebas con 5 usuarios reales están planificadas para la semana del 24 al 30 de noviembre de 2026.

### 8.4 Perfil de inversores y fuentes de financiamiento

Todos los datos de instrumentos públicos se consultaron en los sitios oficiales de CORFO y ChileAtiende el 6 de noviembre de 2026; las bases cambian cada convocatoria y deben releerse antes de postular.

| Etapa | Financista elegido | Coherencia con la forma jurídica y la etapa |
|---|---|---|
| Prototipo (hasta el 2 de diciembre de 2026) | Recursos propios y planes gratuitos | No requiere entidad |
| Validación y primeras ventas | Semilla Inicia (CORFO) | Persona natural o jurídica reciente y sin ventas |
| Operación | Contratos con instituciones | Requiere entidad que facture |

#### Ficha 1. Recursos propios del equipo

| Campo | Contenido |
|---|---|
| Tipo de financista | Recursos propios |
| Instrumento o actor | Trabajo del equipo y planes gratuitos de Cloudflare y Supabase |
| Qué financiaría | El desarrollo y las pruebas del prototipo; $0 de desembolso directo en infraestructura |
| Qué espera a cambio | Nada económico; el resultado académico |
| Por qué calza | El proyecto está en etapa de prototipo, sin ingresos |
| Requisito clave | Aceptar el riesgo de continuidad del ADR 0003: el proveedor puede terminar el servicio gratuito, y el plan gratuito no permite procesar tarjetas |

#### Ficha 2. Fondo público no reembolsable: Semilla Inicia

| Campo | Contenido |
|---|---|
| Tipo de financista | Subsidio público no reembolsable (CORFO) |
| Instrumento o actor | Semilla Inicia, CORFO. Fuente: CORFO (s. f.-a), consultada el 6 de noviembre de 2026 |
| Qué financiaría | Hasta el 75 % del costo total del proyecto, con tope de $15.000.000; para empresas lideradas por mujeres, un 10 % más de cofinanciamiento y tope de $17.000.000. Propuesta de uso: revisión profesional del contenido psicoeducativo, pruebas de accesibilidad y seguridad, y validación con instituciones; el monto a solicitar se calculará con el presupuesto (Punto 10) |
| Qué espera a cambio | Validación técnica del producto o servicio y, antes del término, primeras ventas o un contrato firmado; participación en servicios de mentoría; el equipo aporta el resto del costo, que hoy provendría de recursos propios (Ficha 1) |
| Por qué calza | Cubre «desde una idea a las primeras ventas»; el proyecto está en prototipo y su primer ingreso sería un contrato de suscripción con una institución |
| Requisito clave | Persona natural mayor de 18 años residente en Chile, o persona jurídica constituida en Chile con menos de 18 meses de inicio de actividades ante el SII y sin ventas. La convocatoria 2026 de O'Higgins se abrió el 13 de febrero y cerró el 16 de marzo de 2026, y la página no muestra convocatorias abiertas; se espera, sin garantía, una convocatoria en 2027 |

#### Ficha 3. Cliente institucional

| Campo | Contenido |
|---|---|
| Tipo de financista | Cliente institucional (contrato) |
| Instrumento o actor | Instituciones de educación superior de la región, mediante suscripción anual al panel de seguimiento de cohortes |
| Qué financiaría | La operación continua: soporte, mantención de la carga de datos oficiales e infraestructura de pago, de modo que el portal siga gratuito para el estudiante |
| Qué espera a cambio | Indicadores de progresión de los estudiantes que autorizaron compartir su ficha y evidencia utilizable en la acreditación (Criterio 2 de la CNA); no recibe datos sin consentimiento ni posición preferente en el portal |
| Por qué calza | Es el modelo de ingresos del proyecto y financia la gratuidad; el costo de la deserción se dimensiona con los datos de cada institución, sin prometer una cifra de reducción |
| Requisito clave | Un piloto que muestre resultados medidos; hoy no existe cliente ni precio; ambos se definirán con el piloto |

#### Instrumentos considerados y no incluidos

| Instrumento | Dato verificado | Decisión |
|---|---|---|
| Start-Up Chile, línea Build (CORFO) | Subsidio de hasta el 90 % del costo, tope de $15.000.000; personas naturales o jurídicas con fines de lucro con no más de 12 meses de inicio de actividades; convocatoria Build 13 abierta del 3 al 24 de noviembre de 2026, con resultados el 27 de enero de 2027. Fuente: CORFO (s. f.-b), consultada el 6 de noviembre de 2026 | No incluido en las fichas: exige un proyecto global de base tecnológica que use Chile como plataforma, y este es un servicio local para el sistema chileno de educación superior; el cierre es el 24 de noviembre, antes de contar con un prototipo validado |
| Fondo Regional para la Productividad y el Desarrollo y otros fondos del Gobierno Regional de O'Higgins | Existe un documento de bases 2026 en el sitio del gobierno regional, pero no se pudo verificar su objetivo, montos ni quiénes postulan | No incluido |
| Fondo de Innovación para la Competitividad regional (FIC-R) | No se encontró una convocatoria 2026 | No incluido |
| Sercotec, Agencia Nacional de Investigación y Desarrollo (ANID), inversionistas ángeles, capital de riesgo y créditos | No se verificaron instrumentos ni condiciones vigentes | No incluidos; no calzan con la etapa de prototipo sin ventas |

La coherencia entre forma jurídica, etapa y financista queda así: el prototipo se financia con recursos propios sin entidad; el subsidio público admite a una persona natural o a una SpA recién constituida y sin ventas; y el ingreso estable proviene de contratos con instituciones, que exigen una entidad que facture.

## 9. Valorización y factibilidad del proyecto

[PENDIENTE: se desarrolla con la guía del capítulo correspondiente.]

## 10. Presupuesto del proyecto

[PENDIENTE: se desarrolla con la guía del capítulo correspondiente.]

## Referencias

- Achs. (s. f.). *Termómetro de la salud mental en Chile Achs-UC* [Resultados de la ronda 11, abril de 2025]. Asociación Chilena de Seguridad. https://www.achs.cl/termometro-salud-mental
- American Psychological Association. (2023, 7 de abril). *How to cite ChatGPT*. APA Style Blog. https://apastyle.apa.org/blog/how-to-cite-chatgpt
- Anthropic. (2026). *Claude* (versión Sonnet 5.5) [Modelo de lenguaje de gran tamaño] `[CONFIRMAR versión y fechas de uso]`. https://claude.ai
- Bettinger, E. P., Long, B. T., Oreopoulos, P., y Sanbonmatsu, L. (2012). The role of application assistance and information in college decisions: Results from the H&R Block FAFSA experiment. *The Quarterly Journal of Economics, 127*(3), 1205-1242.
- Centro de Estudios del Mineduc (2022). *Evidencias 55*, Tabla 10, p. 80. https://centroestudios.mineduc.cl/wp-content/uploads/sites/100/2022/11/EVIDENCIAS-55_2022_fd01.pdf
- Centro de Estudios Mineduc. (2022). *Evidencias 55*. Ministerio de Educación. https://centroestudios.mineduc.cl/wp-content/uploads/sites/100/2022/11/EVIDENCIAS-55_2022_fd01.pdf
- Chandía Muñoz, E. del C., López Angulo, Y., y Muñoz Inostroza, K. B. (2025). Validation of scales to measure dropout and changing majors intentions of Chilean university students. *Journal of College Student Retention: Research, Theory & Practice*. https://doi.org/10.1177/15210251251360672 `[CONFIRMAR: solo se verificó el registro; ítems pendientes de los autores]`
- ChileAtiende (s. f.). *Registro de marca comercial* (consultado el 6 de noviembre de 2026). https://www.chileatiende.gob.cl/fichas/1633-registro-de-marca-comercial
- ChileAtiende. (s. f.). *Tu Empresa en un Día*. Gobierno de Chile. https://www.chileatiende.gob.cl/fichas/21409-tu-empresa (consultado el 6 de noviembre de 2026).
- ChileAtiende. (s. f.). *Sistema de acceso a la educación superior técnico-profesional* (ficha 101808; consultada el 6 de noviembre de 2026). https://www.chileatiende.gob.cl/fichas/101808
- ChileCompra. (2024, diciembre). *Conoce los 10 cambios clave a la Ley de Compras Públicas que impactan a los proveedores del Estado*. https://www.chilecompra.cl/2024/12/conoce-los-10-cambios-clave-a-la-ley-de-compras-publicas-que-impactan-a-los-proveedores-del-estado/ (consultado el 6 de noviembre de 2026).
- CIES-UDD y Asociación de AFP. (2026, agosto). *Barómetro laboral y previsional* [Informe con datos del Instituto Nacional de Estadísticas]. https://negocios.udd.cl/cies/files/2026/09/v1_030926_barometro-previsional-agosto-2026.pdf
- Cohen, J. (1988). *Statistical power analysis for the behavioral sciences* (2.ª ed.). Lawrence Erlbaum.
- Comisión Nacional de Acreditación (s. f.). Criterio 2 y Dimensión I de los criterios y estándares de acreditación, citados en `docs/informe-fundamentacion.md`, sección 5.
- Comisión Nacional de Acreditación. (s. f.). *Criterios y estándares de calidad para la acreditación institucional, subsistema universitario* [Criterio 2, Dimensión I]. https://upla.cl/vinculacion/wp-content/uploads/2026/03/CyE-INSTITUCIONAL-SUBSISTEMA-UNIVERSITARIO.pdf
- Consejo Nacional de Educación (2026). *Elige Carrera, versión beta* (consultado el 6 de noviembre de 2026). https://www.eligecarrera.cl/
- Corporación de Fomento de la Producción. (s. f.-a). *Semilla Inicia*. https://www.corfo.gob.cl/sites/cpp/inf/semilla-inicia (consultado el 6 de noviembre de 2026).
- Corporación de Fomento de la Producción. (s. f.-b). *Start-Up Chile*. https://www.corfo.gob.cl/sites/cpp/programa/startup-chile/ (consultado el 6 de noviembre de 2026).
- Cátedra UNESCO de Inclusión en la Educación Universitaria. (2016, noviembre). *Gratuidad responsable y universal en Chile*. Universidad de Santiago de Chile. https://www.paiep.usach.cl/sites/paiep/files/documentos/gratuidad_responsable_y_universal_camara_diputados_noviembre_2016.pdf
- Cátedra UNESCO de Inclusión en la Educación Universitaria, Universidad de Santiago de Chile (2016). *Gratuidad responsable y universal en Chile*, Tabla 6, p. 44. https://www.paiep.usach.cl/sites/paiep/files/documentos/gratuidad_responsable_y_universal_camara_diputados_noviembre_2016.pdf
- Departamento de Derechos Intelectuales, Servicio Nacional del Patrimonio Cultural (s. f.). *¿Cómo se inscribe un programa de computación / software?* (consultado el 6 de noviembre de 2026). https://www.propiedadintelectual.gob.cl/node/1234
- Doran, G. T. (1981). There's a S.M.A.R.T. way to write management's goals and objectives. *Management Review, 70*(11), 35-36.
- Elkington, J. (1997). *Cannibals with forks: The triple bottom line of 21st century business*. Capstone.
- Equipo AE-SE (2026). *Catálogo de fuentes oficiales* y *Verificación de cifras*. Repositorio del proyecto, `docs/fuentes.md` y `docs/verificacion-de-cifras.md`.
- Equipo AE-SE (2026). *Decisiones de arquitectura (ADR 0002, 0003, 0004, 0009, 0010, 0012 y 0013)*. Repositorio del proyecto, `docs/decisiones/`.
- Equipo AE-SE (2026). *Informe integral: fundamentación del problema, evidencia y promesa verificable*. Repositorio del proyecto, `docs/informe-fundamentacion.md`.
- Escobar-Pérez, J., y Cuervo-Martínez, Á. (2008). Validez de contenido y juicio de expertos: Una aproximación a su utilización. *Avances en Medición, 6*, 27-36. https://www.humanas.unal.edu.co/lab_psicometria/download_file/view/171/250
- Freeman, R. E. (1984). *Strategic management: A stakeholder approach*. Pitman.
- Fundación Por Una Carrera (2026). Sitio institucional (consultado el 6 de noviembre de 2026). https://www.porunacarrera.cl/
- González, L. E., Uribe, D., y González, S. (2005). *Estudio sobre la repitencia y deserción en la educación superior chilena* `[CONFIRMAR año: 2005 o 2006]`. IESALC-UNESCO. https://unesdoc.unesco.org/ark:/48223/pf0000140087
- Google. (2026). *Antigravity* [Entorno de desarrollo con agentes de IA] `[CONFIRMAR versión y fechas de uso]`. https://antigravity.google
- Hernández-Sampieri, R., y Mendoza, C. P. (2018). *Metodología de la investigación: Las rutas cuantitativa, cualitativa y mixta*. McGraw-Hill.
- Instituto Nacional de la Juventud. (2022). *10.ª Encuesta Nacional de Juventudes 2022*. https://www.injuv.gob.cl/sites/default/files/10ma_encuesta_nacional_de_juventudes_2022.pdf
- International Organization for Standardization. (2010). *ISO 26000:2010 Guidance on social responsibility*. ISO.
- Kotler, P., y Keller, K. L. (2016). *Dirección de marketing* (15.ª ed.). Pearson.
- Krueger, R. A., y Casey, M. A. (2015). *Focus groups: A practical guide for applied research* (5.ª ed.). SAGE.
- Laboratorio de Acción contra la Pobreza Abdul Latif Jameel [J-PAL]. (s. f.-a). *Informing students about degree costs and earnings improve educational choices in Chile*. https://www.povertyactionlab.org/evaluation/informing-students-about-degree-costs-and-earnings-improve-educational-choices-chile
- Ley 17.336. Propiedad intelectual. Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Ley 17.336. Sobre propiedad intelectual. 2 de octubre de 1970. Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Ley 19.039. Establece normas aplicables a los privilegios industriales y protección de los derechos de propiedad industrial. 25 de enero de 1991 (texto refundido por el DFL 4 de 2022, Ministerio de Economía, según ChileAtiende). Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Ley 19.628. Sobre protección de la vida privada. 28 de agosto de 1999. Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Ley 19.886. De bases sobre contratos administrativos de suministro y prestación de servicios (30 de julio de 2003). Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Ley 20.285. Sobre acceso a la información pública. 20 de agosto de 2008. Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Ley 20.500. Sobre asociaciones y participación ciudadana en la gestión pública (2011). Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Ley 20.659. Simplifica el régimen de constitución, modificación y disolución de las sociedades comerciales (8 de febrero de 2013). Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Ley 21.091. Sobre educación superior (2018). Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Ley 21.091. Sobre educación superior. 29 de mayo de 2018. Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile/navegar?idNorma=1118991
- Ley 21.719. Regula la protección y el tratamiento de los datos personales y crea la Agencia de Protección de Datos Personales. 13 de diciembre de 2024. Biblioteca del Congreso Nacional de Chile. https://www.bcn.cl/leychile
- Lozano Santiago, S. (2007). Validación de un modelo de medida de las dificultades en los procesos de toma de decisiones sobre la carrera profesional. *Revista de Educación, 343* `[CONFIRMAR páginas; ítems no obtenidos]`.
- Mankins, J. C. (1995). *Technology readiness levels: A white paper*. NASA, Office of Space Access and Technology.
- Maurya, A. (2012). *Running lean: Iterate from plan A to a plan that works* (2.ª ed.). O'Reilly Media.
- Mendelow, A. (1991). Stakeholder mapping. En *Proceedings of the 2nd International Conference on Information Systems*. Cambridge, MA.
- Ministerio de Educación. (2026, 1 de octubre). *FUAS 2027: Ya está abierta la postulación a becas, créditos y gratuidad para la educación superior*. https://www.mineduc.cl/fuas-2027-ya-esta-abierta-la-postulacion-a-becas-creditos-y-gratuidad-para-la-educacion-superior/
- Ministerio de Educación de Chile (2026). *Mi Futuro* (consultado el 6 de noviembre de 2026). https://www.mifuturo.cl/
- Ministerio de Educación de Chile (2026). *Portal Beneficios Estudiantiles* (consultado el 6 de noviembre de 2026). https://portal.beneficiosestudiantiles.cl/
- Ministerio de Educación de Chile, Subsecretaría de Educación Superior (2026). *Acceso a la Educación Superior* (consultado el 6 de noviembre de 2026). https://acceso.mineduc.cl/
- Ministerio de Educación. (s. f.). *Tipos de establecimiento según financiamiento*. Ayuda Mineduc (consultado el 6 de noviembre de 2026). https://ayudamineduc.cl/ficha/tipos-de-establecimiento-segun-financiamiento-4
- Moore, G. A. (1991). *Crossing the chasm: Marketing and selling technology products to mainstream customers*. HarperBusiness.
- Moreno, X., y Moreno, F. (2024). Factor structure and measurement invariance of the Patient Health Questionnaire-4 among the Chilean population. *PLoS ONE, 19*(5), e0304623. https://doi.org/10.1371/journal.pone.0304623
- Naciones Unidas. (2015). *Transformar nuestro mundo: La Agenda 2030 para el Desarrollo Sostenible* (A/RES/70/1). https://sdgs.un.org/es/2030agenda
- Naciones Unidas. (2026a). *SDG indicators: Metadata repository, target 4.3* [Base de datos]. División de Estadística. https://unstats.un.org/sdgs/metadata/ (consultado el 6 de noviembre de 2026)
- Naciones Unidas. (2026b). *Objetivo 10: Reducir la desigualdad en y entre los países*. https://www.un.org/sustainabledevelopment/es/inequality/ (consultado el 6 de noviembre de 2026)
- Naciones Unidas. (2026c). *Objetivo 16: Promover sociedades justas, pacíficas e inclusivas*. https://www.un.org/sustainabledevelopment/es/peace-justice/ (consultado el 6 de noviembre de 2026)
- OECD/Eurostat. (2018). *Oslo Manual 2018: Guidelines for collecting, reporting and using data on innovation* (4.ª ed.). OECD Publishing. https://doi.org/10.1787/9789264304604-en
- OpenAI. (2026). *Codex* [Agente de programación basado en un modelo de lenguaje de gran tamaño] `[CONFIRMAR versión y fechas de uso]`. https://openai.com/codex
- Organización para la Cooperación y el Desarrollo Económicos. (2023). *Education at a Glance 2023: Country note, Chile*. OECD Publishing. https://gpseducation.oecd.org/Content/EAGCountryNotes/EAG2023_CN_CHL_pdf.pdf
- Ortegón, E., Pacheco, J. F., y Prieto, A. (2005). *Metodología del marco lógico para la planificación, el seguimiento y la evaluación de proyectos y programas*. CEPAL.
- Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). *Value proposition design: How to create products and services customers want*. Wiley.
- Osterwalder, A., Pigneur, Y., Bernarda, G., y Smith, A. (2014). *Value proposition design: How to create products and services customers want*. Wiley.
- Osterwalder, A., y Pigneur, Y. (2010). *Business model generation*. Wiley.
- Paul, K. I., y Moser, K. (2009). Unemployment impairs mental health: Meta-analyses. *Journal of Vocational Behavior, 74*(3), 264-282. https://eric.ed.gov/?id=EJ836788
- Porter, M. E. (1985). *Competitive advantage: Creating and sustaining superior performance*. Free Press.
- Servicio de Impuestos Internos. (s. f.). *¿Cuáles son los requisitos para optar al Régimen Pro Pyme?* https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_7530.htm (consultado el 6 de noviembre de 2026).
- Ramírez Dorantes, M. C., y Canto y Rodríguez, J. E. (2007). Desarrollo y evaluación de una escala de autoeficacia en la elección de carrera en estudiantes mexicanos. *Revista Electrónica de Investigación Psicoeducativa, 5*(1), 37-56. https://www.redalyc.org/articulo.oa?id=293121941004
- Servicio de Información de Educación Superior. (2021). *Informe de retención de primer año de pregrado 2021* [Cohorte 2020]. Ministerio de Educación. https://www.mifuturo.cl/wp-content/uploads/2021/08/Informe_Retencion_SIES_2021.pdf
- Servicio de Información de Educación Superior. (2023). *Retención de primer año de pregrado 2023* [Cohortes 2018-2022]. Ministerio de Educación. https://www.mifuturo.cl/wp-content/uploads/2023/09/Retencion_de_Pregrado_2023_SIES.pdf
- Servicio de Información de Educación Superior. (2023, enero). *Acceso a la educación superior en Chile 2022* [Cohortes de egreso de enseñanza media 2017-2021]. Subsecretaría de Educación Superior, Ministerio de Educación. https://www.mifuturo.cl/wp-content/uploads/2023/01/Acceso_a_Educacion_Superior_2022_SIES.pdf
- Servicio de Información de Educación Superior. (2025). *Buscador de empleabilidad e ingresos 2025-2026* [Archivo de datos]. Mi Futuro, Ministerio de Educación. https://mifuturo.cl/wp-content/uploads/2025/12/Buscador_Empleabilidad_ingresos_2025_2026_SIES.xlsx
- Servicio de Información de Educación Superior. (2026, marzo). *Informe de brechas en educación superior 2025* [Serie de retención por cohorte]. Ministerio de Educación. https://mifuturo.cl/wp-content/uploads/2026/03/Informe-de-Brechas-en-Educacio%CC%81n-Superior-2025-marzo-2026.pdf
- Servicio de Información de Educación Superior (s. f.). *Informe de retención de primer año de pregrado 2019-2023*. Subsecretaría de Educación Superior. https://bibliotecadigital.mineduc.cl/bitstream/handle/20.500.12365/22088/SIES_Retencion_2019-2023.pdf
- Servicio de Información de Educación Superior. (s. f.). *Retención de primer año de pregrado, cohortes 2019-2023* [Informe] `[CONFIRMAR año de publicación]`. Ministerio de Educación. https://bibliotecadigital.mineduc.cl/bitstream/handle/20.500.12365/22088/SIES_Retencion_2019-2023.pdf
- Subsecretaría de Educación Superior. (2026, 30 de julio). *Matrícula en educación superior crece por quinto año consecutivo* [Matrícula de pregrado 2022-2026; pendiente archivar el PDF del informe SIES de matrícula 2026]. Ministerio de Educación. https://educacionsuperior.mineduc.cl/2026/07/30/matricula-en-educacion-superior-crece-por-quinto-ano-consecutivo/
- Taylor, K. M., y Betz, N. E. (1983). Applications of self-efficacy theory to the understanding and treatment of career indecision. *Journal of Vocational Behavior, 22*(1), 63-81.
- Universidad Católica. (2026, 6 de octubre). *Salud mental de chilenos decae a peores niveles desde la pandemia* [Nota institucional sobre la ronda 12 del Termómetro; sin informe público]. Visión Universitaria UC. https://visionuniversitaria.uc.cl/universidad-y-sociedad/salud-menta-chilenos-decae-peores-niveles-desde-pandemia/
- uPlanner (2026). Sitio institucional (consultado el 6 de noviembre de 2026). https://www.uplanner.com/
- Weihrich, H. (1982). The TOWS matrix: A tool for situational analysis. *Long Range Planning, 15*(2), 54-66.
- World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C. https://www.w3.org/TR/WCAG22/
