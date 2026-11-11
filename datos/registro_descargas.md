# Registro de descargas oficiales

Los archivos originales se guardan en `datos/crudos/` y no se suben al repositorio.

| Archivo local | Fuente | URL exacta | Fecha de descarga | Período | Observación |
|---|---|---|---|---|---|
| `01_BaseINDICES_Pregrado.xlsx` (eliminado) | INDICES Educación Superior, CNED | https://cned.cl/indices_New_~/bbdd/01_BaseINDICES_Pregrado.xlsx | 2026-11-03 | 2005-2026 | Eliminado de `datos/crudos/` el 2026-11-04. No usar hasta autorización escrita ([ADR 0009](../docs/decisiones/0009-fuente-de-oferta-academica.md)). |
| `Buscador_Empleabilidad_ingresos_2025_2026_SIES.xlsx` | SIES / Mi Futuro | https://mifuturo.cl/wp-content/uploads/2025/12/Buscador_Empleabilidad_ingresos_2025_2026_SIES.xlsx | 2026-11-03 | 2025-2026 | XLSX; base más reciente publicada para el buscador. |
| `Metodologia-Buscador-Empleabilidad-e-Ingresos_2025-2026.pdf` | SIES / Mi Futuro | https://mifuturo.cl/wp-content/uploads/2025/12/Metodologia-Buscador-Empleabilidad-e-Ingresos_2025-2026.pdf | 2026-11-04 | 2025-2026 | Define los indicadores, períodos, agrupaciones y mínimos de casos usados por `datos/cargar_empleabilidad.py`. |
| `Metodologia-Estadisticas-por-Carrera_2025-2026.pdf` | SIES / Mi Futuro | https://mifuturo.cl/wp-content/uploads/2025/12/Metodologia-Estadisticas-por-Carrera_2025-2026.pdf | 2026-11-04 | 2025-2026 | Metodología complementaria por carrera genérica y tipo de institución. |
| `Matricula-Ed-Superior-2026.rar` | Datos Abiertos Mineduc | https://datosabiertos.mineduc.cl/wp-content/uploads/2026/09/Matricula-Ed-Superior-2026.rar | 2026-11-04 | 2026 | Conjunto “Matrícula en educación superior”. El CSV trae `valor_arancel` y `valor_matricula`; no trae vacantes. La matrícula por carrera no viene agregada: puede calcularse contando registros por `codigo_unico` o carrera, con una regla de agregación documentada. Contiene registros por estudiante: C5 debe descartar identificadores y atributos personales y cargar solo datos agregados de instituciones y programas. |
| `2027-26-09-24-oferta-definitiva-carreras-p2027.pdf` | DEMRE / Acceso Mineduc | https://demre.cl/publicaciones/pdf/2027-26-09-24-oferta-definitiva-carreras-p2027.pdf | 2026-11-03 | Admisión 2027 | Solo PDF; requiere revisión manual adicional al extraer ponderaciones y vacantes. Reconfirmado el 2026-11-10 con la misma URL (se usa para las carreras nuevas de 2027). |
| `PROCESO-DE-ADMISIÓN-2026-POSTULACIÓN-19-01-2026T11-16-18.rar` | Datos abiertos DEMRE | https://portal-transparencia.demre.cl/portal-base-datos | 2026-11-03 | Admisión 2026 | RAR “Estadísticas de Selección”; el portal genera una URL firmada temporal, por eso se registra la página estable y el nombre exacto. Informa el promedio de pruebas obligatorias del último seleccionado, no el puntaje ponderado del último matriculado. |
| `Matricula_2007_2026_WEB_10_07_2026.zip` (contiene un RAR y dentro un CSV) | SIES / Mi Futuro | https://www.mifuturo.cl/wp-content/uploads/2026/07/Matricula_2007_2026_WEB_10_07_2026.zip (enlace de «Base Matrícula Histórica 2007 – 2026», página https://www.mifuturo.cl/bases-de-datos-de-matriculados/) | 2026-11-10 | 2007-2026 | Archivo agregado por año, institución, sede y carrera; no trae datos por estudiante. La página pide inicio de sesión; el archivo se bajó directo, sin cuenta. Alimenta `datos/pronosticos/nombres_celdas.py` y reproduce la validación de `datos/pronosticos/entrada_carrera_sede.py` (11,9 %). Términos de uso: revisados legalmente el 2026-11-10 y confirmados por el líder. No se guarda en el repositorio. |

## Pendiente de fuente

No se encontró una base oficial del DEMRE que publique literalmente el “puntaje de corte del último matriculado” para la Admisión 2026. La base descargada usa otra definición: promedio de pruebas obligatorias del último seleccionado. No se debe mostrar como puntaje de corte ni mezclar ambos indicadores sin confirmación del líder y una fuente oficial equivalente.

## Revisión de cobertura

Revisado el 2026-11-06: el registro incluye todos los archivos oficiales conservados en `datos/crudos/` y el archivo de INDICES eliminado por sus restricciones de uso. Los archivos usados por los cargadores actuales quedan cubiertos así:

| Proceso | Archivo de datos | Documento metodológico |
|---|---|---|
| Oferta académica (`datos/cargar_oferta.py`) | `Matricula-Ed-Superior-2026.rar` | Diccionario incluido dentro del RAR |
| Empleabilidad e ingresos (`datos/cargar_empleabilidad.py`) | `Buscador_Empleabilidad_ingresos_2025_2026_SIES.xlsx` | `Metodologia-Buscador-Empleabilidad-e-Ingresos_2025-2026.pdf` |
| Ponderaciones y vacantes (`datos/cargar_demre.py`) | `2027-26-09-24-oferta-definitiva-carreras-p2027.pdf` | El mismo PDF oficial contiene las definiciones y tablas |
| Estadísticas de selección 2026 | `PROCESO-DE-ADMISIÓN-2026-POSTULACIÓN-19-01-2026T11-16-18.rar` | Portal de Datos Abiertos DEMRE |

`Metodologia-Estadisticas-por-Carrera_2025-2026.pdf` se conserva como respaldo complementario del SIES, aunque ningún cargador lo usa directamente.
