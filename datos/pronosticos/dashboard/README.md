# Tablero del pronóstico 2027-2028

Página interactiva de **uso interno** con los resultados del pronóstico de [`informe-pronostico-2027.md`](../../../docs/analisis/informe-pronostico-2027.md): qué se predijo, cómo se validó y qué se puede hacer con los datos. No se publica ni se cita fuera del repositorio (ADR 0017 y 0018).

## Cómo abrirlo

Desde la raíz del repositorio, con los archivos de `datos/procesados/` ya generados en tu equipo:

```bash
python -I datos/pronosticos/dashboard/generar_datos.py
```

```bash
python -m http.server 8765 --bind 127.0.0.1
```

Luego abre <http://localhost:8765/datos/pronosticos/dashboard/index.html>. Hace falta el servidor local porque la página carga los colores de `diseno/tokens.css` y las tipografías de `public/fuentes/` con rutas relativas.

Si falta algún archivo de `datos/procesados/`, el generador dice cuál. Esos archivos salen de los scripts de `datos/pronosticos/` y de `datos/cargar_oferta.py` (ver [`REPRODUCIR.md`](../REPRODUCIR.md)).

## Qué contiene

| # | Sección | Responde |
|---|---|---|
| 1 | Resumen nacional | Cifras registradas, su intervalo y cómo se encadenan |
| 2 | Verificación | Cuándo se compara cada pronóstico con lo observado |
| 3 | Método | Fórmulas y decisiones de datos que cambian el resultado |
| 4 | PAES | Por qué contar «filas» y «rendidores regulares» da series distintas |
| 5 | Validación por comuna | Por qué se descartó el intervalo n ± 1,96·√n |
| 6 | Validación por carrera y sede | Error, cobertura y ancho del intervalo, por año y por tamaño |
| 7 | Explorador | Entrantes estimados por carrera y sede, con filtros por región, comuna y texto, agrupación y descarga CSV. Incluye una consulta que elige región, comuna, sede, carrera y jornada y suma las celdas con cifra, y la lista de celdas suprimidas con su nombre y sin cifra |
| 8 | Capacidad | Secciones por carrera para una sede, con un tamaño de sección que ajustas tú |
| 9 | Permanencia | Escenarios de mezcla de instituciones y retención |
| 10 | Comunas | Cohorte de cuarto medio por residencia, proyección 2027 y diferencia con el colegio |
| 11 | Usos | Qué se puede y qué no se puede hacer con estos datos |
| 12 | Límites y fuentes | Lo que debe acompañar cualquier cifra |

## De dónde sale cada dato

| Bloque | Archivo de origen | Nota |
|---|---|---|
| Cifras nacionales, retención por tipo y jornada, calendario | `cifras_nacionales.json` (versionado) | Copiadas del informe y del ADR 0018. **Si cambian, se actualizan a mano aquí y se cambia la fecha** |
| Celdas por carrera y sede | `entrada_carrera_sede_2027.csv` + `oferta.csv` | Se une por código SIES para tener nombres, tipo, región y jornada |
| Nombres de las celdas suprimidas | `nombres_celdas.csv`, generado por `datos/pronosticos/nombres_celdas.py` desde la base histórica SIES 2007-2026 (mifuturo.cl) | Para las carreras que no están en la oferta 2026. Solo nombre, sede, comuna, región y jornada: sin cifra |
| Carreras nuevas de 2027 | `decisiones_carreras_2027.csv` (versionado): filas de la admisión 2027 sin código SIES asignado | 49 carreras sin historia: nombre y sede, sin cifra. La tabla de admisión no trae jornada |
| Validación por celda | `cobertura_entrada_sede.csv` | 18.178 casos con 30 o más entrantes; reproduce el 11,9 % de error y el 94,8 % de cobertura del informe |
| Validación por comuna | `backtest_persistencia.csv`, `calibracion_intervalos.csv` | |
| Serie PAES | `rendidores_regulares_series.csv` | |
| Comunas | `resumen_origen_destino_4to_2026.csv`, `cohorte_17_18_2026.csv`, `cuarto_medio_2026_comunas.csv` | Suma 236.962 residentes, igual que el informe |

El tablero **no lee** `registro_pronosticos.csv`: ese archivo es local y no está en el repositorio.

## Decisiones de este tablero

- **Intervalo por celda.** Sale de los cuantiles 2,5 % y 97,5 % de todos los errores 2022-2026, como dice el informe (intervalo fijo): el real queda entre ×0,62 y ×1,97 de lo previsto. El script de pronóstico no escribe ese intervalo en su salida; el tablero lo calcula con la misma validación.
- **Sin proporción de mujeres.** El archivo de trabajo la trae como dato de planificación, pero el ADR 0018 prohíbe cruces por variables protegidas como herramienta de decisión. El generador no la copia y hay una prueba que lo exige.
- **Supresión.** Las celdas con menos de 10 estudiantes no llevan cifra, intervalo ni suma. Se listan con su nombre de carrera, sede y comuna, y la etiqueta «menos de 10 estudiantes estimados». Es la opción B del [ADR 0025](../../../docs/decisiones/0025-celdas-suprimidas-visibles-sin-cifra.md), que cambia el límite 1 del ADR 0018 y requiere revisión legal pendiente.
- **Sin librerías.** Los gráficos son SVG propios (barras, líneas, histograma, intervalos). Así no hay dependencias que justificar, los colores salen de los tokens y todo funciona sin conexión.
- **Sin ranking de instituciones.** Las agrupaciones se ordenan por entrantes estimados, un criterio explícito, y la página lo dice.
- **Accesibilidad.** Cada gráfico tiene su tabla, los puntos y barras se alcanzan con teclado, nada se distingue solo por color (tramas y formas), y funciona a 360 px y en modo oscuro.

## Mantenimiento

- Cuando se publiquen los resultados de 2027, agregar una sección que compare lo previsto con lo observado y actualizar `cifras_nacionales.json` (estado «confirmada»).
- La versión pública (solo agregados) la genera `datos/pronosticos/exportar_transparencia.py` para la página `/transparencia`; ver `datos/transparencia/README.md`.
- `datos.js` no se sube al repositorio: trae cifras internas sin verificar y nombres de instituciones.
- Pruebas del generador: `python -m pytest tests/datos/test_dashboard_datos.py`.
- Pruebas de los filtros del tablero (lógica en `filtros.js`, sin dependencias): `node --test datos/pronosticos/dashboard/filtros.test.cjs`.
- Pruebas de los nombres de celdas: `python -m pytest tests/datos/test_nombres_celdas.py`. Para regenerar `nombres_celdas.csv` hace falta el CSV de la base histórica (ver `docs/fuentes.md`): `python datos/pronosticos/nombres_celdas.py <Matricula_2007_2026.csv> datos/procesados/nombres_celdas.csv`.
