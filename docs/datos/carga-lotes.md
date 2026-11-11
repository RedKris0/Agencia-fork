# Carga por lotes de la oferta oficial (lote 1)

Guía paso a paso para generar, probar y cargar la oferta de Mineduc (matrícula 2026) en la base de datos. El lote 1 carga instituciones, carreras genéricas, títulos, variantes (sede y jornada) y aranceles.

**No incluye todavía:** indicadores del SIES (empleabilidad, ingreso, retención), vacantes, requisitos y ponderaciones del DEMRE, ni acreditación detallada. Son lotes posteriores (sección 9).

## 0. Resumen

| Paso | Qué hace | Dónde |
|---|---|---|
| 1 | Revisar el archivo de entrada | computador del líder |
| 2 | Generar los lotes SQL | computador del líder |
| 3 | Revisar el informe | computador del líder |
| 4 | Probar en una base de prueba | computador del líder |
| 5 | Comprobar la base de producción antes | editor SQL de Supabase (solo lectura) |
| 6 | Cargar los lotes en producción, en orden | computador del líder con `psql` (sección 6) |
| 7 | Comprobar los conteos después | editor SQL de Supabase (solo lectura) |

## 1. Archivo de entrada

Entrada: `datos/procesados/carga.csv`, producido por `datos/preparar_carga.py`. Cada fila es una variante (sede y jornada) de una carrera.

Comprobar que tiene 11.364 filas de datos:

```bash
python -c "import csv; print(len(list(csv.DictReader(open('datos/procesados/carga.csv', encoding='utf-8')))))"
```

## 2. Modelo de datos que usa el lote

Según las migraciones aplicadas (`20261104000000` y `20261105000000`) y ADR 0011 y 0014:

| Tabla | Qué es | Clave única |
|---|---|---|
| `institucion` | universidad, IP o CFT | `codigo_oficial` |
| `programa_generico` | carrera genérica SIES de una institución | (institución, nombre normalizado) |
| `programa` | título o carrera nombrada en una institución; conserva el nombre Mineduc y su estado de verificación | (institución, nombre normalizado) |
| `programa_variante` | sede y jornada, con su código SIES | `codigo_sies`, `codigo_demre` |
| `arancel_variante` | arancel anual de cada variante | (variante, periodo) |

El nombre normalizado quita tildes, pasa a minúsculas y colapsa espacios (`normalizar()` en el generador). Es la misma regla que usa la base. Si cambia, hay que regenerar los lotes.

La clave de programa **ya está resuelta por el esquema**: un programa es un título único por institución. No hace falta una clave inventada.

## 3. Generar los lotes

Desde la raíz del repositorio:

```bash
python datos/generar_lotes.py
```

Salida en `datos/procesados/lotes/` (fuera de git):

| Archivo | Tabla | Sentencias |
|---|---|---|
| `01_fuentes.sql` | `fuente` | 1 |
| `02_instituciones.sql` | `institucion` | 116 |
| `03_programas_genericos.sql` | `programa_generico` | 3.205 |
| `04_programas.sql` | `programa` | 3.974 |
| `05_variantes.sql` | `programa_variante` | 11.364 |
| `06_aranceles.sql` | `arancel_variante` | 11.364 |
| `informe.json` | resumen | — |

Si el generador termina con `ERROR:`, no escribió lotes completos. Corrige la causa y repite.

## 4. Revisar el informe

`datos/procesados/lotes/informe.json` debe mostrar:

- `filas_leidas`: 11364
- `instituciones`: 116
- `programas_genericos`: 3205
- `programas`: 3974
- `variantes`: 11364
- `aranceles_con_monto`: 11349 y `aranceles_sin_monto`: 15 (esas 15 quedan nulas con el motivo oficial)
- `nombres_que_se_unifican`: 0

Si una cifra no coincide, el archivo de entrada cambió. No sigas hasta entender por qué.

## 5. Prueba en una base de prueba

Esta prueba se hizo con **PGlite** (Postgres en WebAssembly, licencia Apache-2.0) sobre el mismo esquema de migraciones. Resultado del 9 de noviembre de 2026:

- Migraciones de datos oficiales: aplican sin error (21 tablas).
- Los seis lotes se cargan en orden sin error.
- Conteos: 116 instituciones, 3.205 genéricos, 3.974 programas, 11.364 variantes, 11.364 aranceles (15 sin monto).
- 16 regiones presentes.
- Sin filas huérfanas.
- 2.138 variantes con código DEMRE.
- 173 aranceles en UF con su valor de UF.

Limitación: PGlite no es el Postgres de Supabase; no tiene RLS ni roles reales. La carga en producción sí debe comprobarse con los conteos del paso 7.

Para repetir la prueba hace falta el shim de `auth` (esquema `auth`, tabla `auth.users`, funciones `auth.uid()` y `auth.role()`, roles `anon`, `authenticated` y `service_role`) y ejecutar las migraciones y los lotes en orden.

## 6. Carga en producción

El editor SQL de Supabase no admite archivos de 17 MB. La carga se hace con `psql` desde el computador del líder, con la cadena de conexión del proyecto (Supabase → Connect). **La cadena contiene la contraseña: no la pegues en chats ni en el repositorio.**

Orden (cada comando debe terminar sin error antes del siguiente):

```bash
psql "$CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/01_fuentes.sql
psql "$CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/02_instituciones.sql
psql "$CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/03_programas_genericos.sql
psql "$CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/04_programas.sql
psql "$CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/05_variantes.sql
psql "$CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/06_aranceles.sql
```

Donde `CADENA` es la variable de entorno con la cadena de conexión, que tú defines en tu terminal.

Antes del paso 1, comprobar que la base está vacía de datos de oferta (paso 5 de la guía, consulta de conteos en el editor SQL). Si algún conteo no es 0, parar y revisar.

## 7. Comprobar después

En el editor SQL de Supabase, solo lectura:

```sql
select
  (select count(*) from institucion) as instituciones,
  (select count(*) from programa_generico) as genericos,
  (select count(*) from programa) as programas,
  (select count(*) from programa_variante) as variantes,
  (select count(*) from arancel_variante) as aranceles,
  (select count(distinct region) from programa_variante) as regiones;
```

Resultado esperado: 116, 3205, 3974, 11364, 11364 y 16.

## 8. Deshacer la carga

Solo si el líder lo confirma. Orden inverso, en el editor SQL:

```sql
delete from programa_variante
 where fuente_id = (select id from fuente where organismo = 'Mineduc' and nombre = 'Datos Abiertos Mineduc');
delete from programa
 where fuente_id = (select id from fuente where organismo = 'Mineduc' and nombre = 'Datos Abiertos Mineduc');
delete from programa_generico
 where fuente_id = (select id from fuente where organismo = 'Mineduc' and nombre = 'Datos Abiertos Mineduc');
delete from institucion
 where id not in (select institucion_id from programa)
   and id not in (select institucion_id from programa_generico);
delete from fuente where organismo = 'Mineduc' and nombre = 'Datos Abiertos Mineduc';
```

Los aranceles se borran solos (`on delete cascade`).

## 9. Lo que no cubre el lote 1

- Indicadores del SIES: empleabilidad, ingreso al 4.º año, retención, duración real. Lote 2.
- Vacantes, requisitos y ponderaciones del DEMRE. Lote 3.
- Acreditación detallada (`acreditacion_institucion`). Lote 4.

## 10. Pruebas automáticas

`tests/datos/test_generar_lotes.py` cubre 13 casos con datos inventados: unificación de programas, tildes, aranceles en UF, aranceles sin monto, códigos repetidos, tipos inválidos, acreditación inconsistente, comillas simples, idempotencia de las sentencias y la interfaz de línea de comandos. Se corren con:

```bash
python -m unittest tests.datos.test_generar_lotes
```

## 11. Lote 2: indicadores e ingresos del SIES

Se carga después de los lotes 1 a 6, con el mismo procedimiento (secciones 3 a 7).

**Generar:**

```bash
python datos/generar_lotes_sies.py
```

Salida en `datos/procesados/lotes/`: `07_indicadores_sies.sql` (fuente y cinco indicadores por carrera genérica) y `08_ingresos_sies.sql` (tramo de ingreso al 4.º año), más `informe_sies.json`.

Resultado esperado del informe: 3.205 carreras genéricas, 1.590 con cruce SIES, 7.950 indicadores, 1.590 tramos y 1.615 sin cruce SIES (no se les asigna nada).

**Cargar** (en orden, después del lote 6):

```powershell
psql "$env:CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/07_indicadores_sies.sql
psql "$env:CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/08_ingresos_sies.sql
```

**Comprobar:**

```powershell
psql "$env:CADENA" -c "select tipo, count(*) from indicador group by tipo order by tipo;"
psql "$env:CADENA" -c "select count(*) from tramo_ingreso_sies;"
```

Esperado: 1.590 de cada tipo de indicador y 1.590 tramos.

**Reglas aplicadas:**
- Una carrera genérica con varias sedes debe tener los mismos datos SIES en todas sus filas; si no, el generador se detiene.
- La empleabilidad al 1.er año de carreras con excepción (Derecho y similares) queda nula con su motivo.
- El ingreso al 4.º año es un tramo de pesos, no un promedio: va a `tramo_ingreso_sies`.
- Un dato que la fuente no publica queda nulo con su motivo.

**Deshacer** (solo si el líder lo confirma):

```sql
delete from tramo_ingreso_sies where fuente_id = (select id from fuente where organismo = 'SIES, Mineduc' and nombre = 'Buscador de Empleabilidad e Ingresos (Mi Futuro)');
delete from indicador where fuente_id = (select id from fuente where organismo = 'SIES, Mineduc' and nombre = 'Buscador de Empleabilidad e Ingresos (Mi Futuro)');
```

## 12. Lote 3: vacantes y requisitos de admisión del DEMRE

Se carga después de los lotes 1 a 8.

**Generar:**

```bash
python datos/generar_lotes_demre.py
```

Salida: `09_vacantes_demre.sql` (fuente DEMRE y cinco vías de cupos por variante), `10_requisitos_demre.sql` (ponderaciones, puntaje mínimo y página del PDF), `11_nombres_demre.sql` (tildes y mayúsculas verificadas) e `informe_demre.json`.

Resultado esperado: 2.086 carreras con DEMRE, 10.430 registros de vacantes (4.683 sin cupos publicados, nulos con su motivo), 2.086 requisitos, 1.798 nombres corregidos y 2.176 pendientes. Todas las ponderaciones suman 100; si una no suma, el generador se detiene y la muestra.

**Cargar** (en orden, después del lote 8):

```powershell
psql "$env:CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/09_vacantes_demre.sql
psql "$env:CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/10_requisitos_demre.sql
psql "$env:CADENA" -v ON_ERROR_STOP=1 -f datos/procesados/lotes/11_nombres_demre.sql
```

**Comprobar:**

```powershell
psql "$env:CADENA" -c "select (select count(*) from vacante_admision) as vacantes, (select count(*) from requisito_admision) as requisitos, (select count(*) from programa where nombre_verificado) as nombres_corregidos, (select count(*) from programa where not nombre_verificado) as nombres_pendientes;"
```

Esperado: 10.430, 2.086, 1.798 y 2.176.

**Reglas aplicadas:**
- Una vía sin cupos publicados queda nula con el motivo «DEMRE no publica cupos para esta vía en esta carrera».
- El enlace y la fecha son los del PDF de la oferta definitiva (Admisión 2027).
- El nombre original de Mineduc siempre queda en `programa.nombre_oficial`. `programa.nombre` cambia solo cuando DEMRE contiene las mismas palabras y respalda la ortografía; si no, queda original con `nombre_verificado = false`.
