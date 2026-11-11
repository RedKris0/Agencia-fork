# Guía de Cristóbal · Datos y contenido

> **Para la IA que acompaña a Cristóbal:** este documento es tu hoja de ruta. Antes de proponer cualquier cosa, lee `AGENTS.md`, `docs/equipo/README.md`, `docs/fuentes.md` y la skill indicada en cada tarea. **Nunca inventes un dato, una fecha, un monto ni una fórmula**: si no tienes la fuente oficial delante, escribe `TODO(fuente)` y avisa. Si algo de aquí contradice `AGENTS.md`, gana `AGENTS.md`.

---

## Estado al 7 de noviembre de 2026

Según los PR del repositorio en esa fecha. Lo que no aparece en esta tabla está pendiente.

| Tarea | Estado | Referencia |
|---|---|---|
| C1 · Términos de uso | Fusionada | PR 16 |
| C2 · Descargas | Registro de descargas abierto y aprobable | PR 59 |
| C3 · Diccionario de datos | Abierto y aprobable | PR 60 |
| C4 · Datos de ejemplo | Fusionada | PR 22 |
| C5 · Carga de oferta | Fusionada | PR 39 y PR 45 |
| C6 · Empleabilidad e ingresos (SIES) | Fusionada | PR 40 |
| C7 · Cálculos de puntaje y ranking | Abierto. Falta citar la ecuación exacta del Puntaje Ranking con su página o sección del documento oficial, y agregar a las pruebas un caso con ejemplo publicado por DEMRE | PR 61 |
| C8 · Ponderaciones y puntajes de corte | Carga fusionada (PR 43). La corrección 2027 está en el PR 62, abierto. Faltan: que otra persona revise 5 filas al azar contra el PDF, y la decisión del líder sobre el respaldo de 17074 y 32012 | PR 62 |
| C9 · Beneficios y plazos | Abierto y aprobable: montos verificados a mano, incluida BJGME, y casilla de lectura desmarcada | PR 48 |
| C9b · Corpus del asistente | Abierto y aprobable: comprobación humana registrada | PR 50 |
| C10 · Revisión de textos | Abierto y aprobable. El glosario ya coincide con el comparador | PR 56 |
| C11 · Pruebas con usuarios | Borrador aprobable. Faltan las sesiones con 5 personas | PR 58 |
| C12 y C13 | Pendientes | — |

**Pendiente de una persona (no de IA):** que otra persona revise 5 filas al azar del PR 62 contra el PDF oficial. Tú no debes verificar tus propias filas.

**Decisión pendiente del líder:** si UACh y la Universidad de Los Lagos bastan como respaldo de 17074 y 32012 (PR 62).

**Próximos pasos:**
1. Completar el PR 61: citar la ecuación oficial y agregar el caso de ejemplo. Sin eso no se puede construir el simulador.
2. Quitar de la descripción del PR 62 cualquier afirmación de verificación que no haya hecho otra persona.
3. Mantener las correcciones pedidas en los PR 48, 50, 56, 58, 59 y 60, si quedó algo.

---

## ⚠️ Urgente (esta semana)

1. **PR 61 (cálculos de puntaje): es lo que más bloquea el simulador.** Cita la ecuación exacta del Puntaje Ranking con página o sección del documento oficial de DEMRE, y agrega un caso de ejemplo publicado por DEMRE a las pruebas. Si no puedes leer el documento, deja un `TODO(fuente)` y dilo en el PR; no lo escribas de memoria.
2. **PR 62 (carga DEMRE):** pide a otra persona que revise cinco filas al azar contra el PDF oficial. No verifiques tus propias filas. El líder decide sobre el respaldo de 17074 y 32012.
   - [ ] Pedí a otra persona que revise cinco filas al azar contra el PDF oficial (tú no revisas tus propias filas). Marca esta casilla cuando lo hayas hecho.
3. **PR 48, 50 y 56:** ya tienen su rama actualizada con `main`. Espera el CI y la fusión del líder; si el CI falla, corrígelo en la misma rama.
4. **PR 58 (pruebas con usuarios):** sigue como borrador en GitHub. Decide con el líder cuándo lo marcas como listo.

---

## 🎯 Encargo del líder (10 de noviembre): llevar la página publicada al máximo nivel de calidad

**Rama:** `fix/pulido-contenido-portal` (o una rama por página si el cambio crece) · **Skills:** `datos-oficiales`, `lenguaje-claro`

**Objetivo:** que cada página publicada del portal quede impecable en lo que es tuyo: **cada dato correcto y trazable, y cada texto claro**. La meta es que un estudiante, una familia o un evaluador externo no encuentre ningún error, ninguna cifra sin fuente y ninguna frase confusa.

**Alcance:** las páginas que hoy están publicadas: portada, explorador de carreras (`/carreras`), fichas de carrera, comparador (`/comparador`) y beneficios (`/beneficios`). La página `/componentes` es interna y queda fuera.

**Pasos:**
1. **Recorre cada página en el sitio publicado**, desde el teléfono (o a 360 px de ancho) y con teclado, como lo haría un estudiante de 4.º medio.
2. **Datos:** en cada página revisa que toda cifra muestre fuente, URL, período y fecha. Compara al menos 10 cifras al azar con su fuente oficial (distintas de las que cargaste tú, si es posible) y anota el resultado. Confirma que las celdas sin dato o suprimidas dicen por qué ([ADR 0025](../decisiones/0025-celdas-suprimidas-visibles-sin-cifra.md)) y que nunca aparece un 0 falso.
3. **Textos:** pasa todos los textos visibles por la skill `lenguaje-claro`: siglas explicadas la primera vez, tuteo, frases cortas, sin términos que estigmaticen. Actualiza `docs/datos/glosario.md` con cada término nuevo.
4. **Mediciones:** indica siempre qué mide cada indicador (por ejemplo, "empleabilidad al 1.er año") y el año. Revisa que ninguna comparación mezcle indicadores o períodos distintos.
5. **Registra los hallazgos** en el PR con una tabla: página, problema, gravedad (alta, media o baja), corrección propuesta.
6. **Corrige tú** lo que sea dato o texto. Lo que sea visual o de interacción (colores, espaciado, orden de elementos, botones) **no lo cambies**: entrégaselo a Alejandro como lista en su PR o en un issue.

**Criterios de aceptación:**
- [ ] Las cinco páginas recorridas a 360 px y con teclado.
- [ ] Ninguna cifra sin fuente, URL, período y fecha.
- [ ] Al menos 10 cifras comparadas con la fuente oficial, con el resultado anotado.
- [ ] Todos los textos revisados con `lenguaje-claro` y el glosario al día.
- [ ] Tabla de hallazgos en el PR, con lo visual derivado a Alejandro.
- [ ] Ningún dato nuevo inventado: lo que no se pueda verificar queda como `TODO(fuente)`.

**Texto para tu IA:**
> Lee AGENTS.md, la skill lenguaje-claro, la skill datos-oficiales y el encargo del 10 de noviembre en docs/equipo/guia-cristobal.md. Te voy a pegar los textos y las cifras de cada página del portal. Para los textos, propón una versión más clara solo donde haga falta y explica por qué. Para las cifras, dime cuáles no muestran fuente, URL, período o fecha. No cambies ningún dato ni completes valores por tu cuenta, y no propongas cambios de diseño visual: anótalos aparte para Alejandro.

---

### C14 · Etapas del proceso de admisión ("¿en qué etapa estamos?")
**Rama:** `datos/calendario-admision-2027` · **Skills:** `datos-oficiales`, `lenguaje-claro`

**Objetivo:** que el portal pueda mostrar en qué etapa del proceso va el año (inscripción a la Prueba de Acceso a la Educación Superior (PAES), rendición, resultados, postulación, selección, matrícula) y cuál es el próximo plazo. Tú entregas las fechas oficiales; Alejandro construye la parte visual con ellas. El movimiento solo puede mostrar el avance de la línea del trayecto, nunca decorar (`docs/diseno.md`, sección 7).

**Qué ya existe:** las etapas del Formulario Único de Acreditación Socioeconómica (FUAS) están en [`datos/beneficios/plazos_2027.json`](../../datos/beneficios/plazos_2027.json). No las dupliques.

**Pasos:**
1. Busca el calendario oficial de la **Admisión 2027** en el DEMRE (https://demre.cl) y en Acceso Mineduc (https://acceso.mineduc.cl). Guarda la URL exacta de cada fecha.
2. Crea `datos/calendario/admision_2027.json` con **la misma forma** que `plazos_2027.json`: `codigo`, `proceso`, `descripcion` en lenguaje claro, `inicio`, `termino`, `estado`, `motivo_sin_fecha`, `fuente`, `url` y `fecha_consulta`.
3. Agrega a cada etapa (aquí y en `plazos_2027.json`) un campo `estacion` con una de las cuatro estaciones que ya usa el portal ([`IndicadorEstacion.tsx`](../../app/_componentes/IndicadorEstacion.tsx)): `explorar`, `postular`, `llegar` o `avanzar`. Así el portal ubica cada fecha en la línea del trayecto. Si una fila no calza en ninguna, pregúntale al líder.
4. Si una fecha no está publicada, déjala en `null` con su motivo. Nunca la estimes por la fecha del año anterior.
5. Anota la fuente en `docs/fuentes.md` y la descarga en `datos/registro_descargas.md` si es nueva.
6. Pide a otra persona que revise 3 fechas al azar contra la fuente y deja anotado en el PR quién lo hizo y cuándo.

**Criterios de aceptación:**
- [ ] Cada fecha tiene fuente, URL y fecha de consulta.
- [ ] Ninguna fecha estimada: lo que falta queda en `null` con motivo.
- [ ] El campo `estacion` está en todas las filas de ambos archivos.
- [ ] 3 fechas revisadas por otra persona.
- [ ] Las descripciones pasan la skill `lenguaje-claro`.

**Texto para tu IA:**
> Lee la skill datos-oficiales, datos/beneficios/plazos_2027.json y la tarea C14 de docs/equipo/guia-cristobal.md. Te voy a pegar el calendario oficial de la Admisión 2027 con sus URL. Arma datos/calendario/admision_2027.json con la misma forma que plazos_2027.json y agrega el campo estacion (explorar, postular, llegar o avanzar) en ambos archivos. Si una fecha no aparece en lo que te pego, déjala en null con el motivo. No completes ni estimes ninguna fecha.

---

## 1. Tu rol en una frase

Eres el responsable de que **todo lo que la plataforma afirma sea verdad**: cada arancel, puntaje, porcentaje, plazo y requisito sale de una fuente oficial, con su enlace y su fecha.

**Te toca:** fuentes oficiales y sus términos de uso, descarga y limpieza de datos, scripts de carga, fórmulas de puntaje ponderado y ranking, beneficios y plazos, documentos para el asistente IA, revisión de todos los textos, pruebas con usuarios.

**No te toca** (pídeselo a quien corresponde):
- Pantallas y estilos → Alejandro.
- Esquema de la base de datos, claves, asistente IA → el líder.

**Por qué este rol es crítico:** un dato equivocado sobre una carrera puede cambiar la decisión de vida de alguien. La plataforma solo vale si se puede confiar en ella.

---

## 2. Lo que debes dominar antes de la primera tarea

Lee completos, en este orden (unos 40 minutos):

1. [`AGENTS.md`](../../AGENTS.md), sobre todo la sección 2.1 (datos oficiales) y 2.2 (privacidad).
2. [`docs/fuentes.md`](../fuentes.md): el catálogo de fuentes que vas a mantener.
3. [`.claude/skills/datos-oficiales/SKILL.md`](../../.claude/skills/datos-oficiales/SKILL.md): tus reglas de trabajo.
4. [`.claude/skills/lenguaje-claro/SKILL.md`](../../.claude/skills/lenguaje-claro/SKILL.md): cómo se escribe para el estudiante.
5. [`docs/arquitectura.md`](../arquitectura.md), sección 3 (modelo de datos) y 6 (flujo de datos oficiales).

**Cuatro reglas que guían todo tu trabajo:**

1. **Sin fuente no hay dato.** Cada valor guarda: fuente, URL exacta del archivo, período que mide y fecha de descarga.
2. **Sin dato no es cero.** Si la fuente no publica un valor, se guarda vacío (`null`) con el motivo. Un 0 falso es peor que un hueco honesto.
3. **No mezclar peras con manzanas.** Empleabilidad al 1.er año y al 2.º año son indicadores distintos. Titulados 2022 y 2023 son períodos distintos. Nunca se comparan en la misma fila sin advertirlo.
4. **Repetible.** Todo script se puede correr dos veces y deja el mismo resultado.

---

## 3. Las fuentes con las que vas a trabajar

| Qué necesitamos | Fuente | Dónde buscar | Notas |
|---|---|---|---|
| Oferta de carreras: institución, sede, comuna, región, jornada, duración, arancel, matrícula, vacantes, código SIES | **SIES (mifuturo.cl)** si publica una base de oferta académica por carrera; si no, **Datos Abiertos Mineduc**, conjunto "Matrícula en educación superior" | https://www.mifuturo.cl/ y https://datosabiertos.mineduc.cl/ | Datos Abiertos Mineduc no tiene un conjunto de oferta: la base de matrícula trae arancel, pero no vacantes, y viene **con una fila por estudiante** (verificado por ti el 2026-11-04). Antes de usarla, revisa si el SIES publica una base de oferta ya agregada por carrera (paso 0 de C5). Las vacantes salen del DEMRE o quedan "sin datos suficientes". **No usar el CNED** hasta que autorice por escrito: sus condiciones prohíben el uso comercial ([ADR 0009](../decisiones/0009-fuente-de-oferta-academica.md)). |
| Empleabilidad e ingresos por carrera e institución | **Servicio de Información de Educación Superior (SIES), Mineduc**, publicado en mifuturo.cl | https://www.mifuturo.cl (buscador de empleabilidad e ingresos y sus bases) | El 2 de noviembre de 2026 el sitio mostraba un aviso de mantención. Si sigue así, busca las bases en el sitio del Mineduc o del SIES y anótalo en `docs/fuentes.md`. Usa siempre el código SIES para cruzar con la oferta de Mineduc. |
| Ponderaciones, vacantes y carreras del Sistema de Acceso | **DEMRE** (Universidad de Chile) | https://demre.cl/publicaciones | Para la Admisión 2026 publicó la oferta definitiva con ponderaciones el 25 de septiembre de 2025 ([publicación](https://demre.cl/publicaciones/2026/2026-25-09-25-oferta-carreras-vacantes-ponderaciones-p2026)). Busca la equivalente de la **Admisión 2027**, que es el proceso en curso. |
| Puntajes de corte (último matriculado) | **DEMRE** | https://demre.cl/publicaciones | Se publican después de los resultados de cada proceso. Usa los de la Admisión 2026 y muestra siempre "del año anterior". |
| Fórmula del puntaje ranking y del ponderado | **DEMRE** | Documentos oficiales del proceso de admisión | La fórmula exacta se copia desde el documento oficial y se cita en el código. Nunca desde blogs ni calculadoras de terceros. |
| Acreditación institucional | **Comisión Nacional de Acreditación (CNA)** | https://www.cnachile.cl | Años de acreditación y fecha de término. |
| Gratuidad, becas, créditos, FUAS y plazos | **Mineduc**, portal de Beneficios Estudiantiles | https://portal.beneficiosestudiantiles.cl | Carga a mano, con URL y fecha, hasta revisar sus términos de uso. |
| Calendario del proceso de admisión | **Subsecretaría de Educación Superior** | https://acceso.mineduc.cl | Fechas de PAES, resultados y postulación. |

**Cuidado con las fuentes secundarias:** diarios, blogs, calculadoras de puntaje de terceros y foros sirven para *encontrar* el documento oficial, nunca como fuente del dato.

---

## 4. Tus tareas

Cada tarea tiene: objetivo, pasos, archivos, criterios de aceptación (lo que se revisa) y un texto para copiar a tu IA. Hazlas en orden.

### Semana 1 · Cimientos (3 al 9 de noviembre)

#### C1 · Términos de uso de cada fuente
**Rama:** `docs/terminos-de-uso-fuentes` · **Skill:** `datos-oficiales`

**Objetivo:** saber, antes de descargar nada, qué podemos hacer legalmente con cada fuente.

**Pasos:**
1. Por cada fuente de la sección 3, busca sus términos de uso, licencia o aviso legal (pie de página, "Términos", "Aviso legal", "Datos abiertos"). Muchas fuentes del Estado usan licencias Creative Commons.
2. Anota en `docs/fuentes.md`, columna "Términos de uso": la licencia o condición, el enlace donde la leíste y la fecha. Si no encuentras nada, escribe "Sin términos publicados (revisado AAAA-MM-DD)".
3. Agrega el CNED (INDICES) como fuente nueva en la tabla.
4. Si una fuente prohíbe la reutilización, avísale al líder de inmediato.

**Criterios de aceptación:**
- [ ] Ninguna fuente queda en "Por verificar".
- [ ] Cada término tiene enlace y fecha de revisión.
- [ ] Registro de verificaciones de `docs/fuentes.md` actualizado.

**Texto para tu IA:**
> Lee docs/fuentes.md y la skill datos-oficiales. Te voy a pegar el texto de los términos de uso de cada sitio. Para cada uno, resume en una línea qué permite (reutilizar, citar, uso comercial, atribución obligatoria) y redacta la fila para la columna "Términos de uso". No supongas nada que no diga el texto.

---

#### C2 · Descargar las bases oficiales
**Rama:** ninguna (los archivos crudos **no** se suben al repositorio)

**Objetivo:** tener en tu computador los archivos originales de cada fuente.

**Pasos:**
1. Descarga a `datos/crudos/` (está en `.gitignore`):
   - Base de oferta 2026 del CNED.
   - Base de empleabilidad e ingresos del SIES (la más reciente).
   - Oferta definitiva con ponderaciones del DEMRE (Admisión 2027 si existe; si no, 2026).
   - Puntajes de corte de la Admisión 2026 del DEMRE.
2. Crea `datos/registro_descargas.md` (este archivo **sí** se sube): una fila por archivo con nombre, fuente, URL exacta, fecha de descarga y período que cubre.
3. Si algún archivo es solo PDF, anótalo: la extracción desde PDF requiere revisión manual extra.

**Criterios de aceptación:**
- [ ] `datos/registro_descargas.md` completo.
- [ ] Ningún archivo crudo en el repositorio.

---

#### C3 · Diccionario de datos
**Rama:** `docs/diccionario-de-datos` · **Skill:** `datos-oficiales`
**Depende de:** esquema de tablas del líder (miércoles 4 de noviembre)

**Objetivo:** un mapa de qué columna de qué archivo oficial termina en qué campo de nuestra base de datos.

**Crea `docs/datos/diccionario.md`** con, para cada campo de nuestras tablas (`institucion`, `programa`, `programa_variante`, `indicador`, `fuente`). Ojo: `programa` es carrera + institución; sede, jornada, duración y código SIES van en `programa_variante` ([ADR 0011](../decisiones/0011-comparacion-de-programas.md)). Confirma en la documentación oficial que el código SIES identifica una sede y jornada, y anótalo:

| Nuestro campo | Fuente | Columna original | Tipo | Unidad | Transformación | Ejemplo |
|---|---|---|---|---|---|---|

Ejemplos de transformaciones a documentar: arancel en UF o en pesos (si la fuente informa el arancel en UF, hay que convertir y documentar con qué valor de UF y de qué fecha); textos con mayúsculas inconsistentes; códigos con ceros a la izquierda que Excel borra.

**Criterios de aceptación:**
- [ ] Todos los campos del esquema mapeados o marcados "sin fuente aún".
- [ ] Revisado si una misma institución tiene dos carreras con el mismo nombre y códigos distintos (por ejemplo, otra versión del plan o un plan para trabajadores). El esquema guarda una sola carrera por nombre en cada institución: si pasa, repórtalo con ejemplos y no lo resuelvas por tu cuenta.
- [ ] Cada transformación explicada y justificada.

---

#### C4 · Datos de ejemplo para Alejandro (urgente: jueves 5 de noviembre)
**Rama:** `datos/ejemplos` · **Skill:** `datos-oficiales`

**Objetivo:** que Alejandro pueda construir pantallas con datos **reales y verificados** mientras la base de datos se termina.

**Pasos:**
1. Elige **10 carreras** variadas: al menos una universidad, un instituto profesional y un centro de formación técnica; al menos 3 regiones distintas; al menos una sin datos de ingreso (para probar "Sin datos suficientes"); incluye Enfermería y una carrera técnica del área de salud (es el caso de uso que inspira el proyecto).
2. Para cada una, busca a mano cada valor en la fuente oficial y escríbelo en `datos/ejemplos/carreras.json` con este formato:

```json
{
  "generado": "AAAA-MM-DD",
  "carreras": [
    {
      "codigo_sies": "texto, tal como aparece en la fuente",
      "carrera": "nombre del programa",
      "institucion": { "nombre": "…", "tipo": "universidad | instituto_profesional | centro_formacion_tecnica" },
      "sede": "…", "comuna": "…", "region": "…",
      "jornada": "diurna | vespertina | …",
      "duracion_semestres": "número entero",
      "indicadores": [
        {
          "tipo": "empleabilidad_1er_anio | ingreso_promedio_4to_anio | arancel_anual | matricula | vacantes | puntaje_corte | retencion_1er_anio | duracion_real_semestres",
          "valor": "número, o null si la fuente no lo publica",
          "unidad": "porcentaje | pesos | puntos | semestres | cupos",
          "periodo": "por ejemplo: titulados 2023, admisión 2026, año 2026",
          "fuente": "SIES | Mineduc | DEMRE | CNA",
          "url": "enlace exacto donde se ve o descarga el dato",
          "fecha_consulta": "AAAA-MM-DD",
          "motivo_sin_dato": "solo si valor es null"
        }
      ]
    }
  ]
}
```

3. Pide a otra persona del equipo (o al líder) que verifique 3 valores al azar contra la fuente. Anota quién y cuándo en el PR.

**Criterios de aceptación:**
- [ ] 10 carreras con la variedad pedida.
- [ ] Cada valor con fuente, URL, período y fecha.
- [ ] 3 valores verificados por otra persona.
- [ ] Ningún 0 donde falta el dato.

**Texto para tu IA:**
> Lee la skill datos-oficiales y la tarea C4 de docs/equipo/guia-cristobal.md. Ayúdame a armar datos/ejemplos/carreras.json con el formato indicado. Yo te voy a pegar los valores que copio de cada fuente oficial con su URL. Tú solo los ordenas en el formato y me avisas si falta fuente, período o fecha en alguno. No completes ningún valor por tu cuenta.

---

#### C5 · Primer script de carga: oferta académica (Mineduc)
**Rama:** `datos/carga-oferta` · **Skill:** `datos-oficiales`

**Objetivo:** convertir la mejor fuente oficial de oferta académica disponible ([ADR 0009](../decisiones/0009-fuente-de-oferta-academica.md)) en filas limpias para nuestras tablas `institucion` y `programa`, y para los indicadores de arancel, matrícula y vacantes.

**Pasos:**
0. **Elige la fuente antes de programar.** Busca en mifuturo.cl si el SIES publica una base de oferta académica con una fila por carrera (arancel, vacantes, jornada, sede). Anota en el PR qué encontraste, con URL y fecha.
   - **Si existe:** úsala. Es mejor fuente porque ya viene agregada: nunca tocamos datos de estudiantes (minimización, AGENTS.md sección 2.2).
   - **Si no existe:** usa "Matrícula en educación superior 2026" de Datos Abiertos Mineduc, y antes de programar propón en el PR la **regla de conteo** (por ejemplo, matrícula total o matrícula de primer año por `codigo_unico`). El líder la decide. Ojo: esa base solo muestra carreras que tienen estudiantes; una carrera nueva sin matriculados no aparece, y eso se documenta.
1. Script `datos/cargar_oferta.py` que:
   - Lee el archivo crudo desde `datos/crudos/` (ruta como argumento, no escrita en el código).
   - Valida: tipos (arancel entero), rangos (arancel mayor que 0, vacantes mayor o igual a 0), códigos SIES no vacíos y sin perder ceros a la izquierda.
   - Normaliza textos (espacios, mayúsculas) sin cambiar el significado.
   - Convierte UF a pesos si corresponde, con el valor de UF y la fecha usados escritos en la salida.
   - Escribe `datos/procesados/oferta.csv` (en `.gitignore` hasta que el líder conecte la base).
   - Imprime un resumen: filas leídas, válidas, descartadas y por qué.
   - **Si la fuente trae una fila por estudiante:** lee solo las columnas de la carrera y la institución, agrega en memoria y escribe **solo totales por carrera**. Nunca escribe, imprime ni registra en el resumen filas, identificadores ni atributos de estudiantes. Si el arancel de una misma carrera no es igual en todas sus filas, lo reporta en el resumen en vez de elegir uno.
2. Pruebas en `tests/datos/test_cargar_oferta.py`: al menos 3 valores verificados a mano contra la fuente, con su URL en un comentario. Si la fuente es por estudiante, las pruebas usan un archivo de ejemplo **inventado** en `tests/datos/`, nunca filas reales.
3. Documenta en el PR qué instituciones o carreras no aparecen en la base de Mineduc y cómo lo mostraremos.

**Criterios de aceptación:**
- [ ] Correr el script dos veces produce exactamente el mismo archivo.
- [ ] Ninguna fila con dato inválido pasa en silencio: queda en el resumen.
- [ ] Pruebas pasan.
- [ ] Si la fuente es por estudiante: la salida y el resumen contienen solo totales por carrera, y la regla de conteo está aprobada por el líder.

**Texto para tu IA:**
> Lee la skill datos-oficiales y docs/datos/diccionario.md. Escribe datos/cargar_oferta.py en Python que lea la base de oferta académica que elegí en el paso 0 (te digo cuál y sus columnas) desde una ruta que recibe como argumento, valide tipos, rangos y códigos según el diccionario, normalice textos sin cambiar su significado, y escriba datos/procesados/oferta.csv. Debe ser repetible e imprimir un resumen de filas válidas y descartadas con motivo. Si la base trae una fila por estudiante, agrega por carrera según la regla de conteo aprobada y no escribas ni imprimas nunca datos de estudiantes. Escribe pruebas con pytest para 3 valores que yo verifiqué a mano (te los paso), con datos de ejemplo inventados si la fuente es por estudiante. No pegues filas reales de la base en esta conversación. No uses librerías fuera de las de scripts/requirements.txt sin preguntarme.

---

### Semana 2 · Explorar (10 al 16 de noviembre)

#### C6 · Script de empleabilidad e ingresos (SIES)
**Rama:** `datos/carga-empleabilidad` · **Skill:** `datos-oficiales`

- Igual que C5, para la base del SIES: empleabilidad al 1.er (y 2.º) año, ingreso promedio al 4.º año, retención, duración real.
- **Cruce con la oferta de Mineduc por código SIES.** Reporta cuántos programas cruzaron y cuántos no, y por qué.
- Los valores que el SIES no publica por muestra pequeña quedan en `null` con motivo "Muestra insuficiente según SIES".
- Los ingresos se guardan en pesos con el año de referencia que indique la fuente (por ejemplo, "pesos de septiembre de 2025"): no se ajustan por inflación sin un ADR.

#### C7 · Cálculos de puntaje ponderado y ranking
**Rama:** `feat/calculos-puntaje` · **Skill:** `datos-oficiales`
**Fecha clave:** Alejandro los necesita el viernes 13 de noviembre.

**Objetivo:** funciones en TypeScript, en `lib/calculos/`, que calculen el puntaje ranking y el puntaje ponderado de una carrera, exactamente como el DEMRE.

**Pasos:**
1. Consigue el documento oficial del DEMRE que define cada fórmula para la **Admisión 2027**. Guarda el enlace.
2. Escribe las funciones **puras** (sin pantallas ni base de datos): reciben números, devuelven números.
3. Las ponderaciones de cada carrera **no van en el código**: vienen como parámetro (desde los datos del DEMRE).
4. En la cabecera de cada archivo: enlace al documento oficial, página o sección de la fórmula y año de admisión.
5. Pruebas con **casos tomados de ejemplos oficiales** del DEMRE (si los publica) y casos borde: puntajes mínimos y máximos, ponderaciones que suman 100 %, prueba electiva Ciencias o Historia, carreras con requisitos mínimos.
6. Si la fórmula cambia entre años, versiona por año: `lib/calculos/2027/…`.

**Criterios de aceptación:**
- [ ] Cada fórmula cita su documento oficial.
- [ ] Pruebas con casos oficiales pasan.
- [ ] Ningún número mágico sin explicación en el código.

**Texto para tu IA:**
> Lee la skill datos-oficiales y la tarea C7 de docs/equipo/guia-cristobal.md. Te voy a pegar el texto oficial del DEMRE con la fórmula del puntaje ranking y del puntaje ponderado para la Admisión 2027. Implementa funciones puras en TypeScript en lib/calculos/2027/, citando el documento en la cabecera, sin escribir ponderaciones de carreras en el código. Escribe pruebas con los ejemplos oficiales que te pego y con casos borde. Si el texto oficial es ambiguo en algo, no lo resuelvas por tu cuenta: dime qué parte y por qué.

#### C8 · Ponderaciones y puntajes de corte
**Rama:** `datos/carga-demre` · **Skill:** `datos-oficiales`

- Carga ponderaciones, vacantes del Sistema de Acceso y puntajes de corte del año anterior, cruzando con la oferta.
- Si la fuente es PDF: extrae, y luego **verifica a mano el 10% de las filas** (anota cuáles en el PR).

---

### Semana 3 · Acompañar (17 al 23 de noviembre)

#### C9 · Beneficios y plazos
**Rama:** `datos/beneficios-plazos` · **Skills:** `datos-oficiales`, `lenguaje-claro`

- Lista de beneficios vigentes (gratuidad, becas, créditos) con: nombre oficial, requisitos explicados en lenguaje claro **y** en su texto oficial, monto o cobertura si la fuente lo dice, fuente, URL y fecha.
- Plazos del proceso en curso (FUAS, postulación, resultados) con fecha de inicio y término.
- Formato acordado con el líder (archivo de datos o tabla). **Nada en el código.**
- Los requisitos que dependen de situaciones personales se redactan como "podrías", nunca como promesa.

#### C9b · Documentos oficiales para el asistente IA
**Rama:** `datos/corpus-asistente` · **Skill:** `asistente-seguro`

- El asistente solo responde con documentos que tú cargas. Arma `datos/asistente/documentos.json` con: título, organismo, URL, fecha de publicación, fecha de consulta y tema (admisión, beneficios, carreras, plazos).
- Solo documentos oficiales y vigentes. Marca con fecha de vencimiento los que tienen fecha (por ejemplo, calendarios de un proceso).
- **Formato exacto.** El asistente no recibe documentos completos, sino **trozos** de pocos párrafos, para poder citar justo lo que respalda cada respuesta. Cada trozo tiene la forma del tipo `Fragmento` de [`lib/ia/proveedor.ts`](../../lib/ia/proveedor.ts):

```json
{
  "id": "beneficios-gratuidad-requisitos-1",
  "texto": "El trozo copiado tal cual del documento oficial.",
  "fuente": "Nombre del documento y organismo",
  "url": "https://… (la página o el PDF exacto)",
  "actualizadoEl": "AAAA-MM-DD"
}
```

  - `id`: único y estable. Si lo cambias, las respuestas antiguas pierden su cita.
  - `texto`: copia literal, sin resumir ni corregir. Si el documento no lo dice, el trozo no lo dice.
  - `actualizadoEl`: la fecha de publicación o actualización del documento oficial, no la fecha en que lo bajaste.
  - Los demás campos (título, tema, fecha de consulta, vencimiento) van en el documento del que salen los trozos.
- Si un dato no calza en este formato, pregúntale al líder antes de inventar uno nuevo.

#### C10 · Revisión de textos de todas las pantallas
**Skill:** `lenguaje-claro` · **Durante todo el proyecto**

- Cada vez que Alejandro termina una pantalla, revisas sus textos con la skill y le entregas los cambios (comentario en su PR o rama `fix/textos-…`).
- Lleva una lista de términos en `docs/datos/glosario.md`: palabra oficial → explicación simple (ejemplo: "Puntaje de corte → el puntaje del último estudiante que entró el año pasado").

---

### Semana 4 · Seguir y vender (24 al 30 de noviembre)

#### C11 · Pruebas con usuarios
**Rama:** `docs/pruebas-usuarios`

**Objetivo:** ver a 5 personas reales usar la plataforma y corregir lo que no entienden.

**Pasos:**
1. **Guion** en `docs/pruebas-usuarios.md`: 3 tareas concretas ("Encuentra una carrera de Enfermería en tu región y compárala con otra", "Simula tu puntaje para esa carrera", "Encuentra hasta cuándo puedes postular a beneficios"). Sin ayudar durante la tarea.
2. **Participantes:** 5 personas, al menos una de zona rural y al menos una que nunca haya postulado a la educación superior. Si alguien es menor de 18, necesitas autorización escrita de su madre, padre o tutor.
3. **Consentimiento:** antes de empezar, explica para qué es la prueba y pide permiso para tomar notas. **No grabes pantalla ni voz sin consentimiento explícito.** No guardes nombres en el repositorio: usa "Participante 1, 2…".
4. **Registra:** si completó cada tarea, cuánto tardó, dónde dudó, qué dijo (sin datos que lo identifiquen).
5. **Informe:** problemas ordenados por gravedad y propuesta de arreglo. Con Alejandro, convierte cada problema en una rama `fix/…`.

#### C12 · Verificación cruzada final
**Rama:** `datos/verificacion-final`

- Elige 30 fichas de carrera al azar en la plataforma ya cargada.
- Compara cada cifra mostrada con su fuente oficial.
- Informe en `docs/datos/verificacion.md`: cuántas cifras revisadas, cuántas correctas, errores encontrados y su corrección.
- Meta: 100 % de coincidencia. Cualquier error se corrige antes de la entrega.

#### C13 · Informe de datos para el proyecto de título
**Rama:** `docs/informe-datos`

Un capítulo en `docs/datos/informe.md` con: fuentes usadas y sus términos, proceso de carga, validaciones, cobertura (cuántas carreras e instituciones, qué falta y por qué), resultados de la verificación cruzada y limitaciones conocidas.

---

## 5. Antes de abrir cada PR

- [ ] La tarea cumple **todos** sus criterios de aceptación.
- [ ] Cada dato nuevo tiene fuente, URL, período y fecha.
- [ ] Ningún archivo crudo ni dato personal en el PR.
- [ ] Ningún valor faltante convertido en 0.
- [ ] Los scripts son repetibles y tienen pruebas.
- [ ] `docs/fuentes.md` y `datos/registro_descargas.md` actualizados si usaste una fuente nueva.
- [ ] Plantilla del PR completa, incluida la IA que usaste.
- [ ] Leíste y entiendes todo el código, incluido el que escribió tu IA.

## 6. Errores comunes que hacen rechazar un PR

| Error | Por qué se rechaza | Cómo evitarlo |
|---|---|---|
| Dato copiado de un diario o calculadora de terceros | No es fuente oficial | Buscar el documento oficial y citarlo |
| Valor ausente guardado como 0 | Información falsa | `null` + motivo |
| Fórmula escrita "de memoria" o por la IA | Puede estar mal y nadie lo notaría | Copiar del documento oficial del DEMRE y citarlo |
| Ponderaciones escritas en el código | Cambian cada año | Vienen de los datos |
| Archivo de Excel abierto y guardado de nuevo | Excel borra ceros a la izquierda de los códigos | Leer siempre el archivo original con el script |
| Mezclar períodos en una comparación | Engaña al estudiante | Mostrar el período y advertir |
| Nombres reales en pruebas con usuarios | Privacidad | "Participante 1, 2…" |
