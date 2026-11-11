# Plan de análisis: pronóstico generacional e individual

Fecha: 2026-11-07 · Estado: aceptada (2026-11-09, por el líder, tras [revisión legal](../revision-legal-adr-pendientes.md)). **Bloqueados:** A5 (lectura automática semanal de sitios) hasta que `docs/fuentes.md` registre la revisión de términos de cada fuente, y la parte B hasta cumplir el ADR 0016 · Decisiones de respaldo: [ADR 0014](../decisiones/0014-esquema-de-los-datos-oficiales.md), [0015](../decisiones/0015-cuenta-del-estudiante-y-vinculo-institucional.md), [0016](../decisiones/0016-prediccion-condicionada-de-riesgo.md), [0017](../decisiones/0017-pronostico-agregado-piloto-sede-privada.md)

## Principio de trabajo

La IA ejecuta: descarga inventariada, código, pruebas, modelos, tablas y borradores. Las personas aprueban lo que compromete a la institución, lo legal y lo que no se puede deshacer, y verifican los detalles que una máquina no puede confirmar sola. Cada paso indica quién decide.

**Regla fija:** ningún dato personal se envía a una IA externa (AGENTS.md 2.2). Todo el análisis individual corre en un entorno local o en la infraestructura del proyecto, con datos pseudonimizados.

---

## Parte A: pronóstico generacional (datos públicos y agregados)

**Objetivo:** estimar cuántos jóvenes de cada comuna llegarán a educación superior, a qué carreras y con qué permanencia, con intervalos de incertidumbre.

### A0. Gobernanza (humano)
- Aprobar el ADR 0017 y el umbral mínimo de casos por cifra publicada.
- Aprobar cada fuente antes de descargarla: nombre, URL, tamaño estimado y motivo.

### A1. Inventario de fuentes (IA)
1. Para cada fuente (INE proyecciones por comuna, Mineduc matrícula por establecimiento, DEMRE bases públicas, SIES matrícula 2007-2026, SIES retención con su Excel, SIES titulación), registrar en `docs/fuentes.md`: organismo, URL, fecha de consulta, cobertura de años, nivel geográfico, columnas clave y términos de uso.
2. Marcar en el inventario lo que no se pudo verificar, sin rellenarlo.
- **Verificación humana:** revisar que el inventario coincida con las páginas oficiales antes de descargar.

### A2. Ingesta reproducible (IA)
1. Scripts en `datos/` que descargan, calculan un hash SHA-256 y guardan el archivo en `datos/crudos/` (no versionado).
2. Tabla de códigos de comuna vigente, con cambios históricos de comunas.
3. Alineación de años de referencia: corte de matrícula al 30 de abril, calendario de PAES.
4. Pruebas automáticas: tipos, rangos, nulos con motivo, y que las sumas nacionales coincidan con las publicadas.
- **Verificación humana:** solo si una prueba falla y la causa no es evidente.

### A3. Modelo de embudo (IA)
Flujo por comuna y año:

`población 17-18 años (INE) → egresados de media → rinden PAES → entrantes a educación superior → permanencia de 1er año → titulación`

1. Cada tasa de transición se estima con cifras públicas, en una tabla de supuestos versionada con fuente y período.
2. Las tasas por comuna se estiman con agrupación entre comunas cercanas cuando la celda es pequeña.
3. Validación hacia atrás: el modelo se entrena con datos hasta 2019 (o hasta 2018, separando el efecto de 2020) y se compara con lo ocurrido después. Se publica el error medio.
4. Cada cifra que no alcance el umbral mínimo se suprime y se anota el motivo.
- **Verificación humana:** revisar los supuestos con una persona del área de educación superior, no solo el código.

### A4. Publicación (IA prepara, humano aprueba)
1. Informe con fuente, URL y fecha por cifra, e intervalos visibles en cada gráfico.
2. Revisión de lenguaje con la skill `lenguaje-claro` y de datos con `revisar-pr`.
3. **Aprobación del líder** antes de cualquier publicación.

---

### A5. Pronóstico vivo: actualización automática (IA, con aprobación humana para publicar)

El pronóstico no se calcula una vez. Se actualiza cuando la fuente publica datos nuevos.

**Qué significa "a futuro":** cada pronóstico se hace **antes** de que ocurra lo que predice. Por ejemplo, en 2026 se pronostican los entrantes de 2027, y se comparan con las cifras que el SIES publique en 2027 y 2028. Eso es la validación real. El backtesting del A3 es solo una prueba previa.

**Ciclo anual:**
1. **Detección.** Un proceso programado revisa las páginas de las fuentes (INE, Mineduc, DEMRE, SIES) cada semana y registra cuando aparece una versión nueva. No descarga nada sin registrarlo.
2. **Verificación automática.** Al llegar un archivo nuevo, se revisa su hash, sus columnas y sus tipos. Si cambió el esquema (columnas, códigos de comuna, definiciones), el proceso **se detiene** y avisa. No intenta adivinar el cambio.
3. **Recálculo.** El embudo y los modelos de series se reentrenan con los datos nuevos, con los mismos supuestos versionados. Si un supuesto cambia, queda registrado con su motivo.
4. **Registro de predicciones.** Cada corrida guarda, con fecha, los valores pronosticados, los intervalos, la versión de datos y la de los supuestos. Ese registro no se modifica nunca.
5. **Borrador.** La corrida produce un informe de cambios: qué cifras se movieron, cuánto y por qué. Nada se publica solo.
6. **Aprobación humana.** El líder aprueba la publicación, como en A4.

**Dónde se implementa:** un proceso programado en el repositorio (por ejemplo, GitHub Actions) que ejecuta los scripts, con las credenciales fuera del código y sin datos personales. Los resultados se guardan en la base del proyecto, como datos públicos con fuente.

**Medición de precisión en el tiempo:** cuando el SIES publica la cifra real de una cohorte, el sistema compara la predicción registrada con ese valor y actualiza una tabla de errores por fuente, comuna y carrera. Esa tabla es el indicador de certeza que se muestra, y mejora con cada año.

**Límites que el proceso no resuelve:**
- La primera comparación real llegará en 2027 o 2028, según la publicación de cada fuente. Hasta entonces, la certeza es un supuesto.
- Si una fuente deja de publicar un dato, el pronóstico se marca como sin actualizar, no se mantiene en silencio.

### A6. Calendario oficial de DEMRE (proceso 2026-2027)

Fuente: calendario del proceso de admisión 2027 pegado por el líder el 2026-11-07. Confirmar contra DEMRE antes de cada corrida.

| Fecha | Hito | Relevancia |
|---|---|---|
| 15-17 jun 2026 | Rendición PAES de Invierno | Ya observada (Archivo C, proceso 2027) |
| 17 jul 2026 | Resultados PAES de Invierno | Ya observada |
| 27 jul 2026 | Cierre de inscripción PAES Regular | Inscritos regulares ya definidos; publicación pendiente |
| 30 nov - 2 dic 2026 | Rendición PAES Regular | **Ventana para registrar el pronóstico antes de los resultados** |
| 4 ene 2027 | Resultados PAES Regular | Primera observación de puntajes |
| 18 ene 2027 | Resultados del proceso de selección | Primera observación de asignación |
| 19-28 ene 2027 | Matrícula de primera y segunda etapa | Destino inicial |

**Consecuencia:** el pronóstico de rendidores de la PAES Regular debe registrarse **antes del 30 de noviembre de 2026**. Después de esa fecha, ya no es un pronóstico prospectivo.

### A7. Unidad del pronóstico (decisión propuesta, 2026-11-07)

Evidencia (pruebas retrospectivas 2021-2026, sin publicar):

| Variable | Unidad | Error mediano por comuna | Intervalo empírico (cobertura) | Ancho aproximado |
|---|---|---|---|---|
| Cuarto medio | Comuna de **residencia** | 5,6 % a 6,4 % | 93 % a 97 % | ±20 % a 35 % |
| Rendidores PAES Regular | Comuna del **colegio** de egreso | 6 % a 7 % en años normales; 25 % y 17 % en 2020-2021 y 2022-2023 | 90 % a 99,7 % (salvo 2020-2021) | ±40 % a 70 % |

**Decisión propuesta:**
1. **Cohorte de cuarto medio por comuna de residencia** es la unidad principal del pronóstico. Es la mejor validada y tiene el intervalo más estrecho.
2. **Rendidores PAES por comuna del colegio** solo se publica a nivel **regional o nacional**, hasta que exista una forma de vincular rendición y residencia. DEMRE no publica la residencia de quien rinde, así que no podemos validar un pronóstico PAES por residencia.
3. **Comuna del colegio** no se usa para proyectar cohortes: sobreestima la cohorte local por los alumnos que llegan de otras comunas (en San Fernando, 440 de 1.468 en 2026).

Esta decisión queda sujeta a revisión del líder. No autoriza publicar nada.

**Criterio de cita (2026-11-07, decisión del líder: "lo más confiable siempre"):**
- **Citable:** cohorte de cuarto medio por residencia, a nivel comunal y regional (validada, cobertura 93 % a 97 %), y rendidores PAES Regular por región del colegio (validada, con los intervalos con y sin pandemia).
- **No citable:** rendidores PAES por residencia (`PAES-REGULAR-2027-RESIDENCIA-REGIONAL`). Depende de un supuesto que no se puede validar. Queda como estimación interna.
- **No citable por comuna:** rendidores PAES por comuna del colegio. Solo sirve para validar el método.

## Parte B: análisis individual (datos de la institución y de la plataforma)

**Objetivo:** identificar, con consentimiento y revisión humana, a quién conviene apoyar y cómo, sin predicción de cualquier persona fuera de la muestra.

### B0. Precondiciones (humano)
- Revisión legal de la Ley 21.719 sobre decisiones automatizadas.
- Acuerdo con la institución (vínculo del ADR 0015).
- Consentimiento por capa, implementado y probado.
- **Gate del ADR 0016:** las ocho precondiciones aprobadas por el líder. Sin esto no se entrena ningún modelo con datos reales.

### B1. Diseño de datos (IA propone, humano aprueba)
1. Diccionario de datos: cada campo, su capa de consentimiento, su finalidad y su período.
2. Lista de campos de la institución que se piden, justificando cada uno. Lo que no se justifique no se pide.
3. Pseudonimización: identificador interno sin RUT ni nombre; la tabla de equivalencias queda separada y restringida.
- **Aprobación humana:** el diccionario y la lista de campos.

### B2. Pipeline seguro (IA)
1. Carga de datos de la institución en el esquema con RLS y pruebas automáticas (`supabase/tests/pruebas_rls.sql`), incluido que una institución no ve datos de otra.
2. Registro de accesos a datos sensibles en `registro_acceso`.
3. Eliminación de datos cuando se revoca un consentimiento, con prueba que lo verifique.

### B3. Modelo individual (IA)
1. División temporal: entrenar con cohortes anteriores y validar con la siguiente. Nunca una división aleatoria, porque filtra información del futuro.
2. Métricas: sensibilidad, especificidad, calibración y área bajo la curva. Calibración porque una probabilidad mal calibrada engaña a quien la lee.
3. Evaluación de sesgo por subgrupos: región, tipo de institución, dependencia del establecimiento de origen, sexo. Si un subgrupo tiene un error sistemáticamente mayor, se informa y no se publica sin corrección.
4. Explicabilidad: para cada señal, los factores que más pesan, en lenguaje claro.
5. Los datos de la plataforma se usan como variable de contexto, nunca como fuente principal. Se documenta su sesgo de selección.

### B4. Efecto de las intervenciones (humano diseña, IA analiza)
Un modelo de riesgo no dice a quién ayudar. Para eso se necesita el efecto de la ayuda:
1. El diseño de la intervención lo aprueba el equipo, con el profesional validador, antes de aplicarla.
2. Si la asignación a la ayuda es aleatoria dentro de los estudiantes elegibles, la IA estima el efecto. Si no lo es, se usan diseños causales que se declaran en el informe (ver ADR 0012).
- **Aprobación humana:** cualquier diseño de intervención que afecte a estudiantes.

### B5. Operación (IA con revisión humana)
1. Monitoreo mensual: cambios en la distribución de datos (drift), cambios en el error y en el sesgo.
2. Reentrenamiento solo con aprobación humana.
3. Cada señal de alerta la revisa una persona de la institución antes de cualquier acción. El modelo no decide.

---

## Checkpoints humanos (resumen)

| Momento | Qué se aprueba | Quién |
|---|---|---|
| A0 | ADR 0017, umbral mínimo, cada descarga | Líder |
| A4 | Publicación de pronósticos | Líder |
| B0 | Revisión legal, acuerdo institucional, gate del ADR 0016 | Líder y asesoría legal |
| B1 | Diccionario de datos y campos pedidos | Líder |
| B4 | Diseño de cualquier intervención | Equipo y profesional validador |
| B5 | Reentrenamiento y cambios de uso | Líder |

## Lo que la IA no puede verificar sola

- Que una fuente oficial siga publicando lo que dice este plan.
- Que un acuerdo con una institución tenga validez legal.
- Que el consentimiento que se pide sea libre e informado en la práctica.
- Que una predicción sea útil para el estudiante y no solo estadísticamente correcta.

Estos puntos tienen que quedar en la lista de verificación humana de cada fase.
