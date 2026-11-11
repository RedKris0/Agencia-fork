# Reproducir el pronóstico de primer año

Este documento permite a cualquier persona volver a calcular las cifras de primer año y de cobertura sin pedirle nada a quien las publica. Todo se hace con fuentes públicas y agregados. No hay datos personales.

## 1. Requisitos

- Python 3.11 o superior. Se ejecuta con `python -I` (modo aislado).
- Sin dependencias externas: solo biblioteca estándar.

## 2. Fuente de datos

- **Base de matrícula del SIES, 2007-2026** (archivo `Matricula_2007_2026_WEB_....csv`, separado por `;`). Se descarga desde mifuturo.cl (Subsecretaría de Educación Superior). Ver `docs/fuentes.md`.
- Para el reparto por residencia: matrículas de cuarto medio por estudiante de Mineduc (datosabiertos.mineduc.cl), agregadas por comuna de residencia. Ver `datos/calibracion/agregar_origen_destino.py`.

Guarda el archivo y anota su fecha de descarga. La fecha forma parte del registro.

## 3. Pasos

Desde la raíz del repositorio:

```bash
# Entrantes por carrera y sede 2027 (solo celdas publicables con 10 o más)
# El SIES se lee en latin-1. Un archivo generado antes de este cambio tiene sedes con � y hay que regenerarlo.
python -I datos/pronosticos/entrada_carrera_sede.py <SIES.csv> datos/procesados/entrada_carrera_sede_2027.csv

# Cobertura del intervalo por carrera y sede (validación 2022-2026)
python -I datos/pronosticos/cobertura_entrada_sede.py <SIES.csv> datos/procesados/cobertura_entrada_sede.csv

# Comparación de niveles (carrera-sede, sede, institución)
python -I datos/pronosticos/cobertura_niveles.py <SIES.csv>

# Primer año nacional 2027 (requiere la cohorte por residencia)
python -I datos/pronosticos/entrada_primer_anio.py <SIES.csv> <carpeta_residencia_4to> <registro.csv> <fecha>

# Permanencia de primer año 2028 (requiere el registro anterior)
python -I datos/pronosticos/permanencia_primer_anio.py <registro.csv> <fecha>
```

El registro (`registro_pronosticos.csv`) es local: no está en el repositorio porque tiene pronósticos internos sin verificar. Se genera al correr los scripts `registrar_*`. Para verificarlo en tu copia:

```bash
python -I -c "import sys; from pathlib import Path; sys.path.insert(0, 'datos/pronosticos'); import registro; print(registro.verificar_cadena(Path('datos/pronosticos/registro_pronosticos.csv')))"
```

## 4. Resultados de referencia (2026-11-07)

Si tus salidas no coinciden con estas, algo cambió en la fuente o en el método. Revisa primero la fecha de descarga.

| Cifra | Valor |
|---|---|
| Primer año de pregrado 2027, nacional | 382.725 (357.992 a 387.869) |
| Permanencia de primer año 2028, nacional | 296.601 (277.434 a 300.588) |
| Celdas carrera-sede | 15.043 (6.961 publicables, 8.082 suprimidas) |
| Validación de celdas 2022-2026 (≥30 entrantes) | error mediano 11,9 %; cobertura 94,8 %; ancho mediano ×3,2 |

## 5. Límites

- La cobertura se mide suponiendo que el total del año es conocido. En un pronóstico real, el total también tiene incertidumbre; por eso la cobertura real es menor.
- El intervalo por carrera y sede es amplio (×3,2). Las cifras por celda son un orden de magnitud, no una cifra para decidir una sección.
- Sin datos individuales. Las celdas con menos de 10 estudiantes se suprimen.
