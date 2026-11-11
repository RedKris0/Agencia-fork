# 0014 — Esquema de los datos oficiales y su carga

Fecha: 2026-11-05 · Estado: aceptada (2026-11-09, por el líder, tras [revisión legal](../revision-legal-adr-pendientes.md); nota: varias fuentes no publican licencia de reutilización, confirmarla por escrito antes de vender informes)

## Contexto

Ya existen las salidas limpias de Datos Abiertos Mineduc, Mi Futuro (SIES) y
DEMRE, y `datos/procesados/carga.csv` las reúne en una fila por código SIES.
No se han cargado a Supabase. El esquema actual separa `programa` y
`programa_variante`, pero no alcanza para conservar sin ambigüedad el nivel
del SIES, el valor original de un arancel en Unidad de Fomento (UF), los
tramos de ingreso ni las vacantes por vía.

La decisión debe respetar tres límites:

- Un dato público conserva fuente, URL exacta, fecha de descarga y período.
- SIES publica por institución y carrera genérica. No atribuye su cifra a un
  título, sede o jornada determinados.
- La carga debe poder hacerla el líder sin que el repositorio ni un script
  contengan credenciales. El editor SQL de Supabase limita el tamaño de cada
  consulta.

No se agregan datos personales ni se modifica el aislamiento de las tablas de
personas.

## Opciones evaluadas

| Opción | A favor | En contra |
|---|---|---|
| Extender `indicador` para todo | Reutiliza una tabla y una política existentes | Obliga a codificar en columnas genéricas datos compuestos: tramo abierto, valor UF, ponderaciones y vías de vacantes. El nivel SIES seguiría siendo ambiguo. |
| **Tablas por nivel y familia de datos, con fuente en cada fila** | Cada dato expresa dónde aplica, conserva sus partes y valida sus rangos en la base | Suma tablas y una migración más extensa. |
| Guardar el CSV completo en una columna JSON | Carga inicial corta y fiel al archivo | No permite validaciones relacionales ni consultas públicas claras; traslada el trabajo al portal. |

Para ejecutar la carga se consideran estas alternativas:

| Alternativa | A favor | En contra |
|---|---|---|
| Archivos SQL por lotes para el editor de Supabase | No requiere credenciales ni programas locales; cada lote puede respetar el límite del editor | El líder debe ejecutarlos en orden y registrar el resultado. |
| `psql` con `\copy` a tablas de staging y `upsert` | Es rápido y permite una carga transaccional grande | Requiere `psql`, una cadena de conexión y acceso local que este entorno no tiene. |
| Carga directa desde un script con API o clave de servicio | Automatiza la ejecución | Obliga a manejar una credencial y no mejora el límite de confianza de la carga inicial. |

## Decisión

Se crearán tablas por nivel del dato y por familia cuando el dato tenga más de
un valor. La idea central es simple: **cada cifra sabe a qué unidad pertenece
y de qué archivo salió**.

### Niveles de la oferta

1. `institucion` sigue identificada por su código oficial.
2. Se agrega `programa_generico` como carrera genérica por institución, con
   clave única `(institucion_id, nombre_normalizado)`. Es el nivel de SIES.
3. `programa` es el título oficial por institución, con clave única
   `(institucion_id, nombre_normalizado)`. Hay 3.971 programas. El código de
   carrera de Mineduc no es clave: 114 códigos tienen más de un nombre y 42
   nombres más de un código.
4. `programa_variante` sigue siendo sede y jornada, identificada por
   `codigo_sies`. Guarda el código de carrera Mineduc, el código DEMRE y la
   referencia a `programa_generico`: cada variante tiene exactamente una
   genérica, pero un título puede tener más de una (caso institución 45,
   «global business administration»).

`nombre_normalizado` se calcula como minúsculas sin tildes, con espacios y
signos colapsados. El nombre original queda en `nombre` para mostrarlo. La
normalización evita que diferencias de mayúsculas, tildes o puntuación creen
dos claves; no reemplaza el nombre oficial ni el nombre genérico con tildes.

### Datos y sus tablas

| Dato | Nivel | Forma de guardarlo |
|---|---|---|
| Empleabilidad, retención, duración real, continuidad e ingreso SIES | `programa_generico` | Filas de indicador con período, fuente y motivo. El ingreso se guarda como texto publicado más `desde_pesos` y `hasta_pesos`; `hasta_pesos` es `NULL` para «Sobre $3.500.000». |
| Arancel y matrícula | `programa_variante` | El arancel guarda pesos calculados, monto y unidad original, valor de la UF y fecha de esa UF. La matrícula total y de inscripción conservan su propio tipo y motivo. |
| Ponderaciones y puntajes mínimos DEMRE | `programa_variante` | Una fila de requisitos por proceso: NEM, ranking, competencia lectora, Matemática 1 y 2, Historia, Ciencias, bandera «Historia o Ciencias», prueba especial, asignación especial de pedagogía y puntajes mínimos `numeric`. Así `567,5` se conserva como decimal. |
| Vacantes DEMRE | `programa_variante` | Una fila por vía: regular, regular segundo semestre, + MC, BEA o PACE. Cero es un cupo publicado válido; `NULL` exige motivo. |
| Acreditación | `institucion` | Una fila histórica por situación informada: estado, años, desde, hasta, fuente y fecha. El texto de la fuente se muestra como «situación al 30 de abril de 2026», no como «vigente». |

Todas las tablas públicas nuevas tendrán Row Level Security (RLS) activada,
lectura para `anon` y `authenticated`, y ningún permiso de escritura para
esos roles. La clave de servicio mantiene la vía de carga, igual que las
tablas públicas existentes. Las restricciones exigirán el motivo cuando no
haya valor, rangos de porcentajes y ponderaciones, y claves únicas según el
nivel y período.

La carga inicial se hará con archivos SQL por lotes, generados de forma
determinista y no versionados en `datos/procesados/`. Cada archivo contendrá
`INSERT ... ON CONFLICT ... DO UPDATE` y será suficientemente pequeño para el
editor SQL. El líder los ejecutará en orden y podrá detenerse antes del lote
siguiente si una verificación falla. No habrá claves ni cadenas de conexión
en el repositorio.

## Justificación

- ADR 0011 separa la carrera de una institución de sus sedes y jornadas. La
  carrera genérica agrega el tercer nivel que exige la metodología SIES, sin
  convertir una cifra institucional en una cifra de una sede.
- Un tramo de ingresos, una UF con fecha y las vacantes por vía no son un solo
  número. Forzarlos dentro del `indicador` actual perdería significado o
  trasladaría validaciones al código de carga.
- Los lotes SQL no dependen de una credencial y permiten cargar 11.364 filas
  sin confiar en que el editor acepte una única consulta gigante. El mismo
  resultado se puede volver a generar y ejecutar sin duplicar datos.
- No se usa JSON para los datos que el portal deberá filtrar, mostrar y citar.
  La base valida su estructura antes de que una cifra llegue a una ficha.

## Consecuencias

- La próxima migración agregará las tablas y restricciones indicadas, sin
  editar las migraciones ya aplicadas. También actualizará las pruebas RLS.
- `lib/datos/tipos.ts` tendrá que reflejar el esquema cuando se conecte la
  base; no se cambia en esta decisión.
- El generador posterior deberá producir lotes en el orden: fuentes,
  instituciones, carreras genéricas, programas, variantes, acreditaciones,
  indicadores SIES, aranceles y matrículas, requisitos DEMRE y vacantes.
- Los vacíos que `carga.csv` no pueda explicar quedarán fuera de la carga o
  llevarán el motivo explícito que ya traiga la fuente. No se inferirá que un
  vacío es cero ni que una vacante ausente es «no aplica».
- Las consultas de control esperan 116 instituciones, 3.205 carreras
  genéricas, 3.971 programas, 11.364 variantes, 7.299 variantes con
  indicadores SIES, 2.138 con código DEMRE y 2.086 con requisitos y vacantes
  DEMRE. Los 52 códigos DEMRE sin fila de requisitos se conservan en la
  variante y no se completan por inferencia.
- La verificación manual de `datos/verificacion/demre_muestra.csv` sigue
  pendiente y no se sustituye con esta migración.
- Límite conocido: la matrícula de inscripción convertida desde UF conserva el
  valor en pesos, pero no el monto original en UF ni la fecha de esa UF. Antes
  de mostrarla como conversión, la carga deberá declarar esa ausencia.
