# Manual del tablero del pronóstico 2027-2028

> **Uso interno. No publicar.** Este manual explica el tablero, cómo se hizo y qué significan sus números. No se muestra en el portal ni se cita fuera del equipo (ADR 0017 y ADR 0018).

Fecha de esta versión: 2026-11-10.

---

## Cómo leer este manual

Está escrito para cualquier persona del equipo, sin necesidad de saber estadística ni programación. Cuando aparece una palabra técnica, se explica la primera vez y también está en el [glosario](#15-glosario). Los números vienen de fuentes oficiales y cada uno lleva su fuente en el texto o en la sección 3.

Las secciones se pueden leer en orden o por partes:

1. [Qué es el tablero](#1-qué-es-el-tablero)
2. [Para qué sirve y para quién](#2-para-qué-sirve-y-para-quién)
3. [Con qué datos se hizo](#3-con-qué-datos-se-hizo)
4. [Cómo se hizo, paso a paso](#4-cómo-se-hizo-paso-a-paso)
5. [Qué métodos se usaron y por qué](#5-qué-métodos-se-usaron-y-por-qué)
6. [Qué son las predicciones y cómo leerlas](#6-qué-son-las-predicciones-y-cómo-leerlas)
7. [Qué tan bien funcionó (la prueba hacia atrás)](#7-qué-tan-bien-funcionó-la-prueba-hacia-atrás)
8. [Cómo usar el tablero](#8-cómo-usar-el-tablero)
9. [Usos posibles y usos que no están permitidos](#9-usos-posibles-y-usos-que-no-están-permitidos)
10. [Valor: para quién y qué problema resuelve](#10-valor-para-quién-y-qué-problema-resuelve)
11. [Originalidad: qué es propio y qué no sabemos todavía](#11-originalidad-qué-es-propio-y-qué-no-sabemos-todavía)
12. [Límites y riesgos](#12-límites-y-riesgos)
13. [Preguntas frecuentes](#13-preguntas-frecuentes)
14. [Dónde están los archivos y cómo se regenera todo](#14-dónde-están-los-archivos-y-cómo-se-regenera-todo)
15. [Glosario](#15-glosario)
16. [Historial de decisiones](#16-historial-de-decisiones)

---

## 1. Qué es el tablero

Es una página web, de uso interno, que muestra **cuántos estudiantes podrían entrar a primer año en 2027**, en cada carrera y sede de Chile, y cuántos seguirían en 2028.

Tiene tres partes:
- **Un resumen del país:** un número para todo el sistema, con su rango.
- **Un explorador:** una tabla para buscar y filtrar carreras por región, comuna, institución, jornada y tipo de institución.
- **Un planificador de secciones:** para estimar cuántos grupos de clase necesita una carrera, según cuántos estudiantes por grupo se decida.

El tablero **no predice la vida de ninguna persona**. Predice cantidades agregadas: cuántos entran a una carrera en una sede.

---

## 2. Para qué sirve y para quién

**Sirve para:**
- Planificar la oferta de una institución: cuántas secciones abrir, cuántos docentes y salas necesita.
- Ver en qué región o comuna se concentra la demanda de primer año.
- Comparar, de forma agregada, sedes y carreras, sin ranking de calidad.
- Preparar conversaciones con instituciones sobre planificación. Ver la sección 10.

**No sirve para:**
- Decidir si una persona entra o no a una carrera. Ver la sección 9.
- Saber cuántos postulantes tendrá una carrera concreta en un año específico con exactitud.
- Comparar instituciones por calidad. El tablero ordena por número de estudiantes, nunca por ser cliente.

**Para quién:** el equipo del proyecto. Cualquier uso fuera del equipo necesita primero la revisión legal pendiente (sección 12).

---

## 3. Con qué datos se hizo

Todos los datos son públicos y oficiales. Ninguno trae datos personales de estudiantes.

| Dato | Quién lo publica | Qué contiene | Cómo lo usamos |
|---|---|---|---|
| **Base de matrícula histórica 2007-2026** | Mi Futuro (SIES, Mineduc), mifuturo.cl | Cuántos estudiantes de primer año tuvo cada carrera, por sede, cada año. Está agregado: no trae datos por estudiante. | Es la base del pronóstico. Calcula la participación de cada carrera y sede en el total del año. |
| **Matrícula 2026 por estudiante** | Datos Abiertos Mineduc | Un registro por estudiante, con su carrera, sede y comuna. | Sirve para la oferta 2026 (11.364 carreras) y para la comuna de residencia. Los datos personales no se leen. |
| **Oferta definitiva de admisión 2027** | DEMRE / Acceso Mineduc (PDF del 24 de septiembre de 2026) | Las 2.157 carreras que postulan por el sistema de admisión, con su lugar y sus vacantes. | Sirve para encontrar qué carreras nuevas no tienen historia y para cruzar nombres. |
| **Cohorte de cuarto medio por residencia** | Mineduc (matrícula por estudiante 2026) y INE (población de 17 y 18 años, base 2024) | Cuántos egresados de cuarto medio viven en cada comuna. | Es la base para proyectar el primer año por comuna. |
| **Retención de primer año** | SIES, informe de retención de la cohorte 2025 | Qué porcentaje de los estudiantes de primer año sigue al segundo año, por tipo de institución: universidades 84,7 %, institutos profesionales 72,5 %, centros de formación técnica (CFT) 69,9 %. | Se usa para el pronóstico de permanencia 2028. |
| **Resultados PAES** | DEMRE | Cuántos estudiantes rindieron la prueba regular cada año. | Se usa para la línea base de rendidores 2027. |

**Qué no usamos, y por qué:**
- **Sexo, edad, nivel socioeconómico y origen escolar** no se usan para decidir nada. La ley de no discriminación (Ley 20.609) y la nueva ley de datos personales (Ley 21.719) lo prohíben en decisiones como admitir o seleccionar. El pronóstico calcula la proporción de mujeres solo como dato de planificación, y el tablero no la muestra (ver sección 5).
- **Datos personales de estudiantes.** El tablero trabaja con cifras agregadas. Los archivos que tienen datos por estudiante se leen en flujo y no se guardan.

**Las fuentes con sus fechas de descarga** están en `docs/fuentes.md` y `datos/registro_descargas.md`.

---

## 4. Cómo se hizo, paso a paso

El proceso tiene seis pasos. Cada uno se puede repetir y da el mismo resultado si los datos son los mismos.

**Paso 1. Bajar los datos oficiales.** Se descargan los archivos de la sección 3 desde la fuente y se anota la fecha y la dirección exacta en el registro de descargas.

**Paso 2. Ordenar los datos.** Algunos archivos vienen en códigos distintos, con tildes mal escritas o con los mismos datos repetidos. Se corrige eso con scripts. Por ejemplo, el archivo de matrícula histórica está en *latin-1* (un código de letras antiguo), y leerlo como UTF-8 cambia las tildes y las eñes. Eso dejaba sedes mal escritas, y se corrigió en el PR #126.

**Paso 3. Calcular el pronóstico por carrera y sede.** Para cada carrera en cada sede:
- Se toma cuántos estudiantes de primer año tuvo en 2026, y qué parte fue del total nacional.
- Se multiplica esa parte por el total nacional estimado para 2027 (382.725).

Así, una carrera que en 2026 tuvo el 1 % del primer año nacional, en 2027 se estima en el 1 % del total previsto.

**Paso 4. Calcular el intervalo.** Se usa el error de años anteriores para saber qué tan lejos suele estar el pronóstico. Ver la sección 5.

**Paso 5. Validar hacia atrás.** Antes de confiar en el pronóstico, se aplicó el mismo método a 2022, 2023, 2024, 2025 y 2026, como si se estuviera en esos años. Se midió qué tan cerca quedó. Ver la sección 7.

**Paso 6. Publicar en el tablero y registrar.** El generador (`generar_datos.py`) junta todo en un archivo de datos y el tablero lo muestra. Cada cifra publicada queda registrada en el registro append-only del proyecto, que no permite editar filas: si hay un error, se agrega una fila nueva con el motivo.

**Paso 7. Carreras que no tienen historia.** Las carreras de la admisión 2027 que no tuvieron matrícula en 2026 no tienen pronóstico. Se muestran aparte, con su nombre y su lugar, sin cifra (49 carreras). Eso permite ver el mapa completo sin inventar un número.

---

## 5. Qué métodos se usaron y por qué

Cada método tiene una razón. Si cambia la razón, cambia el método.

**5.1. Se usa el último año observado, no un promedio.** Para estimar la parte de cada carrera, se usa 2026 y no el promedio de tres años. Razón: en la prueba hacia atrás, el último año tuvo menos error (11,9 % frente a 15,8 %). Los cambios de un año a otro no siguen una tendencia estable, así que la tendencia no ayudó (ver sección 7).

**5.2. Se cuenta por la comuna de residencia, no por la del colegio.** Para proyectar el primer año por comuna se usa dónde vive el estudiante, no dónde estudió la enseñanza media. Razón: la comuna del colegio sobreestimaba la cohorte local. En San Fernando, por ejemplo, la diferencia fue de 27 %.

**5.3. Intervalos sacados del error real, no de una fórmula.** En vez de usar una fórmula teórica (la de Poisson), el intervalo sale de los errores que tuvo el pronóstico en la prueba. Razón: la fórmula teórica cubría solo entre 62 % y 72 % de los casos cuando decía 95 %. El intervalo real cubre lo que dice.

**5.4. Se suprimen las celdas con menos de 10 estudiantes.** Una carrera con 4 estudiantes estimados no tiene cifra publicada. Razón: protege la privacidad de grupos pequeños y evita cifras inestables.

Desde el PR #121 (ADR 0025), esas celdas aparecen en una lista con su nombre, sede y comuna, pero **sin número, sin intervalo y sin suma**. Razón: el equipo pidió ver el 100 % de las carreras del país. La regla exacta está en el ADR 0025, que el líder aprobó con la opción B.

**5.5. No se usan variables protegidas para decidir.** No se cruza por sexo, edad, nivel socioeconómico ni origen escolar como herramienta para decidir. Razón: la Ley 20.609 y la Ley 21.719 lo restringen (ver sección 3).

**5.6. La retención se calcula por tipo de institución.** Las universidades retienen más que los CFT (84,7 % frente a 69,9 %). Por eso el pronóstico de 2028 pondera la retención según la mezcla de instituciones de 2026: el resultado es 77,5 %. Razón: promediar sin considerar el tipo daría un número distinto y engañoso.

**5.7. Sin predicción individual.** El tablero no predice si una persona en particular va a entrar, desertar o terminar. Razón: no hay datos individuales que lo respalden de forma válida, y la Ley 21.719 regula las decisiones automatizadas sobre personas (artículo 8° bis; su texto completo está pendiente de revisión legal).

**5.8. Registro append-only con cadena de hash.** Cada cifra publicada queda con una huella digital (hash) que encadena con la anterior. Si alguien cambia una cifra vieja, la cadena lo muestra. Razón: que cualquiera pueda comprobar que no se retocaron las cifras.

---

## 6. Qué son las predicciones y cómo leerlas

Una **predicción** aquí es una **estimación con un rango**. No es una certeza. Cada cifra tiene tres partes:

- **La cifra central:** la mejor estimación. Por ejemplo, 34 entrantes en Técnico Deportivo de la sede San Fernando.
- **El intervalo:** el rango donde el valor real debería caer, según el error de la prueba hacia atrás. En el ejemplo, 21 a 67.
- **El estado:** «con cifra» (si tiene 10 o más estudiantes estimados) o «suprimida» (si tiene menos de 10).

**Cómo se lee el intervalo.** Para el ejemplo: el 34 se multiplica por 0,62 y por 1,97. Eso da 21 y 67. Significa que en la mayoría de los casos del pasado el número real quedó dentro de ese rango. No es una garantía.

**Por qué el intervalo es tan ancho.** Las carreras de una sede son pequeñas, y en pocos años cambian mucho de un año a otro. El ancho típico es de tres veces: el límite alto es casi tres veces el bajo. Eso no es un error de cálculo: es lo que muestra la historia de los datos.

**Qué no significa una cifra.**
- No es un número de postulantes ni de matriculados. Es una estimación de primer año.
- No dice si la carrera es buena o mala.
- No se puede sumar un intervalo de una carrera con el de otra y decir que la suma tiene ese mismo rango. La suma del tablero se calcula sumando los límites, y eso da un rango más amplio que el real. El tablero lo dice.

**Cómo se usa una cifra para planificar.** Usa la cifra central como punto de partida y el intervalo para ver el margen. Si la cifra central da 2 secciones pero el intervalo permite 1 a 3, el planificador muestra que hay margen. Ver sección 8.

---

## 7. Qué tan bien funcionó (la prueba hacia atrás)

Se aplicó el mismo método a los años 2022 a 2026, como si se estuviera en cada año. Se compararon las estimaciones con lo que pasó.

| Qué se midió | Resultado | Qué significa |
|---|---|---|
| Primer año nacional | Error entre −7 % y +1,4 % | El total del país se estima bien. |
| Carrera y sede (18.178 casos con 30 o más estudiantes) | Error mediano de **11,9 %** | La mitad de las estimaciones se equivoca menos de 11,9 %. |
| Cobertura del intervalo por carrera y sede | **94,8 %** | Casi siempre el intervalo contiene el valor real. Pero la prueba supone que el total del año ya se conoce, así que en la vida real será algo menor. |
| Ancho del intervalo por carrera y sede | Unas **×3,2** | Es un orden de magnitud, no una cifra para decidir una sección con precisión. |
| Permanencia 2028 | No verificada todavía | Se compara cuando salga el informe de retención de la cohorte 2027 (agosto de 2028). |
| PAES (rendidores) | Error de 13,3 % entre 2022 y 2023 | Es el punto más débil y su causa no está confirmada. Se informa y no se oculta. |

**Limitaciones de la prueba:**
- Son cinco años. Es poca evidencia.
- Se usó el total conocido del año, lo que hace que la prueba sea optimista.
- La prueba de 2022 a 2023 tiene un quiebre no explicado.

**Lo que se probó y se descartó:**
- **Promedio de tres años:** error de 15,5 %. Peor que el último año.
- **Tendencia amortiguada:** error de 14,1 %. También peor.
- **Intervalo según la volatilidad de cada celda:** no angosta el intervalo, así que no se adoptó.

---

## 8. Cómo usar el tablero

**Cómo abrirlo.** Sigue las instrucciones de `datos/pronosticos/dashboard/README.md`. Se abre en el navegador, en la dirección local que indica el README. No se sube a internet.

### 8.1. El resumen del país
Muestra el total estimado (382.725 primer año 2027 y 296.601 permanencia 2028), con su rango y su fuente.

### 8.2. El explorador (sección 7 de la página)
Sirve para buscar y filtrar.

**Ejemplo 1: ¿cuántos entrantes estimados hay en AIEP San Fernando?**
1. En «Institución», elige «IP AIEP». En «Comuna», elige «SAN FERNANDO».
2. La tabla muestra las celdas con cifra de esa sede. La suma aparece arriba.

**Ejemplo 2: ¿cuántos entrarán a Ingeniería en Informática en AIEP San Fernando?**
1. En «Buscar carrera, sede o institución», escribe «aiep san fernando informatica» (puedes escribir las palabras en cualquier orden).
2. En la tabla aparecen las jornadas de esa carrera. En el ejemplo: 19 diurna y 10 vespertina, en total 29.

**Ejemplo 3: ¿qué carreras no tienen cifra en una región?**
1. Elige la región.
2. Baja a «Celdas suprimidas» para ver las que tienen menos de 10 estudiantes. No tienen número, pero sí su nombre.

**Ejemplo 4: ¿qué carreras son nuevas en 2027?**
Baja a «Carreras nuevas de 2027». Son 49 carreras con su institución y su lugar del PDF de DEMRE. No tienen cifra.

### 8.3. La consulta
Es un formulario que elige, en orden: región, comuna, institución, sede, carrera y jornada. Cada lista muestra solo lo que existe con las elecciones anteriores. El resultado es la suma de las celdas con cifra, con el rango aproximado.

### 8.4. El planificador de secciones
Sirve para saber cuántos grupos de clase necesita una carrera.
1. Elige institución y sede.
2. Escribe cuántos estudiantes caben en cada sección (por defecto 30).
3. El tablero muestra las secciones con la cifra central y las secciones con el rango. Ver la sección 6.

**Ejemplo:** con 30 estudiantes por sección, 34 entrantes estimados dan 2 secciones (34 ÷ 30 = 1,13, que se redondea hacia arriba). Con el rango de 21 a 67 estudiantes, el número de secciones va de 1 a 3.

### 8.5. Descargar
Cualquier selección del explorador se puede descargar como archivo CSV (una tabla para abrir en una hoja de cálculo). Cada archivo trae la fuente y la fecha de consulta.

---

## 9. Usos posibles y usos que no están permitidos

**Usos posibles (uso interno o con revisión legal):**
- Planificar secciones, docentes y salas de una institución.
- Ver la demanda por región, comuna y tipo de institución.
- Preparar una conversación sobre planificación con una institución que lo pida.
- Comparar tendencias agregadas entre años, cuando se publique la comparación con lo observado.

**Usos que no están permitidos (ADR 0018, límites 2 y 3):**
- **Admitir, seleccionar o priorizar personas.** Está prohibido en el contrato y en el producto.
- **Decidir sobre una persona concreta** a partir de su sexo, edad, comuna de origen o nivel socioeconómico.
- **Presentar una cifra como exacta.** Es una estimación con intervalo.
- **Ordenar instituciones como ranking de calidad.** El tablero ordena por número de estudiantes y lo dice.
- **Mostrar nombres de instituciones que no han autorizado su uso por escrito.** Ver la sección 12.

---

## 10. Valor: para quién y qué problema resuelve

**El problema.** Las instituciones de educación superior tienen que decidir cuántas secciones abrir, cuántos docentes contratar y cuántas salas preparar, casi siempre antes de conocer cuántos estudiantes van a entrar. Hoy eso se decide con planillas propias, con la experiencia de cada área, o con datos que llegan tarde.

**La propuesta.** Un pronóstico público, con método documentado, intervalos reales y una comparación posterior con lo observado, aunque el resultado sea malo.

**Para quién.** Institutos profesionales, CFT y universidades que planifican su oferta de primer año, en particular las sedes que tienen que decidir secciones con poca anticipación. También el propio equipo, para tener una base de conversación.

**Qué valor tiene, con honestidad:**
- **Lo que sí tenemos:** un método documentado, una prueba hacia atrás con error de 11,9 % en las celdas con cifra, y un registro que permite auditar cada cifra.
- **Lo que no tenemos todavía:** ningún resultado observado (los primeros resultados llegan en 2027). Ninguna institución ha probado el tablero ni ha dicho cuánto le ahorraría. No hay un estudio de costos.

**Precio y vía de compra.** No están decididos. La decisión es del líder y depende de la revisión legal. El documento `docs/mercado/propuesta-institucional.md` tiene un rango propuesto, sin decidir.

**Lo que se debe decir siempre al ofrecerlo:**
- Es una estimación con rango, no una certeza.
- Las cifras por carrera y sede son de orden de magnitud.
- Se publica la comparación con lo observado aunque salga mal.

---

## 11. Originalidad: qué es propio y qué no sabemos todavía

**Lo que sí es propio del proyecto, según el repositorio:**
- **Solo datos públicos y agregados.** No se usan datos personales ni se compran bases privadas.
- **Intervalos sacados del error real** de la prueba, en vez de fórmulas teóricas (ver sección 5.3).
- **Supresión visible sin cifra:** las carreras con menos de 10 estudiantes aparecen con su nombre, pero sin número (ADR 0025).
- **Registro con cadena de hash:** cada cifra publicada queda con su huella, para auditarla.
- **Reglas explícitas contra la discriminación:** no se decide con variables protegidas.

**Lo que no sabemos todavía (y no debemos afirmar):**
- **No hay un estudio de competidores verificado** en el repositorio. Antes de decir que el tablero es original frente a otros productos, hay que revisar `docs/mercado/analisis-mercado.md` y hacer una búsqueda de lo que ya existe.
- **No hay una comparación con otros pronósticos** publicados en Chile usando los mismos datos.
- **No se sabe si una institución ya tiene algo parecido** internamente.

**Cómo decirlo sin exagerar:** «El método usa datos oficiales públicos, publica sus intervalos y compara sus resultados con lo observado. Aún no hemos verificado que otros productos hagan lo mismo.»

---

## 12. Límites y riesgos

**Límites del método:**
- Es una estimación. La prueba hacia atrás cubre cinco años.
- El intervalo por carrera y sede es ancho (unas ×3,2). Esa es la realidad de los datos disponibles, no un fallo que se pueda corregir con el mismo método.
- Las carreras nuevas de 2027 no tienen historia, así que no tienen cifra.
- La jornada y la región de las carreras nuevas no vienen en la tabla de admisión.
- La mezcla de tipos de institución se mantiene constante en 2028.

**Riesgos legales y de uso:**
- **Revisión legal pendiente.** El ADR 0018 sigue como propuesta. La revisión legal del 2026-11-10 se confirmó para el ADR 0025 y los términos de la base histórica, pero el uso del producto con una institución necesita la revisión final.
- **Ley 21.719 de protección de datos personales** entra en vigencia el 1 de diciembre de 2026. Define la elaboración de perfiles y considera dato sensible la situación socioeconómica.
- **Artículo 8° bis** de la Ley 21.719, sobre decisiones automatizadas: su texto completo no se pudo leer y está pendiente de revisión legal.
- **Nombres de instituciones.** No se usa el nombre de una institución para venderle nada sin su autorización por escrito.
- **Términos de uso de la base histórica de mifuturo.cl.** Se revisaron el 2026-11-10. Si el archivo cambia, hay que revisarlos de nuevo.

**Riesgos de uso:**
- Leer una cifra como exacta y tomar una decisión grande con ella.
- Usar la cifra por carrera para decidir una sola sección.
- Sumar intervalos y creer que el rango de la suma es el real.

---

## 13. Preguntas frecuentes

**¿El tablero dice cuántos estudiantes van a entrar a una carrera?**
Dice cuántos se estiman, con un rango. No es un número de matriculados.

**¿Por qué algunas carreras no tienen cifra?**
Porque tienen menos de 10 estudiantes estimados. Por privacidad y porque las cifras tan chicas son inestables. Aparecen con su nombre en la lista de suprimidas.

**¿Por qué hay carreras sin nombre de jornada?**
Las carreras nuevas de 2027 no traen jornada en la tabla de admisión. Se muestran sin ese dato.

**¿Por qué el total del país no es igual a la suma de las carreras?**
Porque las carreras suprimidas no suman, y porque la suma de los números centrales no es igual al total nacional estimado. El tablero lo dice en cada tabla.

**¿Qué pasa si el pronóstico sale mal?**
Se publica la comparación con lo observado, con el error y la cobertura, aunque sea malo. Eso está en el compromiso del proyecto.

**¿Puedo usar el tablero para decidir si abro una carrera?**
Puedes usarlo como un insumo para planificar, con el intervalo a la vista. No es una decisión de inversión ni de admisión.

**¿Por qué se usa la comuna de residencia y no la del colegio?**
Porque la comuna del colegio sobreestimaba la cohorte local (sección 5.2).

**¿Por qué no hay predicción de cada estudiante?**
No hay datos individuales que lo respalden de forma válida, y la ley regula las decisiones automatizadas sobre personas (sección 5.7).

**¿De dónde sale la cifra 382.725?**
Es el total nacional estimado de primer año 2027. Se registró el 2026-11-07 (ver el informe, sección 1).

---

## 14. Dónde están los archivos y cómo se regenera todo

| Qué | Dónde |
|---|---|
| Informe del pronóstico | `docs/analisis/informe-pronostico-2027.md` |
| Decisiones (ADR) | `docs/decisiones/` (0017, 0018, 0025) |
| Fuentes y términos | `docs/fuentes.md` y `datos/registro_descargas.md` |
| Tablero y su README | `datos/pronosticos/dashboard/` |
| Pasos para regenerar | `datos/pronosticos/REPRODUCIR.md` |
| Decisiones de las carreras nuevas | `datos/pronosticos/decisiones_carreras_2027.csv` |
| Pruebas | `tests/datos/` (Python) y `datos/pronosticos/dashboard/filtros.test.cjs` (JavaScript) |

**Para regenerar el tablero desde cero**, con los archivos oficiales descargados y ordenados en `datos/procesados/`:
1. Generar los entrantes por carrera y sede con `entrada_carrera_sede.py`.
2. Generar los nombres de las celdas con `nombres_celdas.py`.
3. Generar los datos del tablero con `generar_datos.py`.
4. Abrir el tablero en el navegador con un servidor local.

El detalle, con los comandos, está en `datos/pronosticos/REPRODUCIR.md` y en el README del tablero.

---

## 15. Glosario

- **Celda:** una carrera en una sede y una jornada. Es la unidad mínima del pronóstico.
- **Cifra central:** la mejor estimación de la cantidad de estudiantes.
- **Cohorte:** el grupo de estudiantes que entra al mismo tiempo. La cohorte de cuarto medio es el grupo que egresa del colegio en un año.
- **CFT:** centro de formación técnica.
- **Error mediano:** el error que tiene la mitad de las estimaciones. Si es 11,9 %, la mitad de los casos se equivoca menos de ese porcentaje.
- **Hash:** una huella digital de un archivo o de un texto. Si cambia una letra, la huella cambia.
- **Intervalo:** el rango donde el valor real debería caer, según el error del pasado.
- **IP:** instituto profesional.
- **Jornada:** diurna, vespertina, a distancia o semipresencial.
- **Latin-1:** una forma antigua de escribir tildes y eñes en un archivo. Si se lee como UTF-8, las tildes se rompen.
- **Primer año:** los estudiantes que entran por primera vez a una carrera.
- **Retención:** el porcentaje de estudiantes de primer año que sigue en el segundo año.
- **Supresión:** ocultar la cifra de una celda por tener menos de 10 estudiantes.
- **Suma de intervalos:** sumar los límites de cada celda. Da un rango más amplio que el real del total.

---

## 16. Historial de decisiones

- **Pronóstico con el último año observado** (informe, sección 5 bis): es el método que usa el pronóstico, porque tuvo menos error en la prueba hacia atrás.
- **ADR 0017:** pronóstico agregado como piloto.
- **ADR 0018:** finalidad, método y límites. Sigue como propuesta.
- **ADR 0025:** celdas suprimidas visibles sin cifra. Aceptado por el líder (opción B), con revisión legal confirmada.
- **PR #118 y #128:** corrección del explorador por región, comuna e institución.
- **PR #121 y #122:** celdas suprimidas con nombre, sin cifra.
- **PR #126:** nombres de sede por código y sede, y lectura correcta del archivo SIES.
- **PR #127:** carreras nuevas de 2027 sin historia, sin cifra.

Cada decisión tiene su PR o ADR en el repositorio con su razón.
