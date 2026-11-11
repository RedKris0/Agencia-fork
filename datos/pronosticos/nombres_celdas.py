"""Nombres de cada carrera y sede para las celdas del pronóstico, desde la base histórica SIES.

Por qué: la oferta oficial 2026 (datos/cargar_oferta.py) no trae las carreras que dejaron de
tener matrícula en 2026. Esas celdas quedan suprimidas en el pronóstico, pero el tablero no
puede nombrarlas sin una fuente que sí las tenga. La base histórica 2007-2026 sí las tiene.

Solo agregados: el archivo de entrada ya viene agregado por año, institución, sede y carrera
(no es un registro por estudiante). Este script no escribe ningún dato de estudiante.

Fuente: «Base Matrícula Histórica 2007 – 2026», Mi Futuro (mifuturo.cl), archivo
Matricula_2007_2026_WEB_10_07_2026.zip. Ver docs/fuentes.md.

Uso:
    python datos/pronosticos/nombres_celdas.py <Matricula_2007_2026.csv> datos/procesados/nombres_celdas.csv

La clave es el código de carrera SIES (p. ej. I430S22C280J1V1), que ya incluye institución,
sede, carrera, jornada y versión. Para cada par (código, sede) se toma la fila del año más reciente.
"""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

COLUMNAS_SALIDA = [
    "codigo_sies", "institucion_codigo", "institucion_nombre", "institucion_tipo", "sede", "carrera_nombre",
    "region", "comuna", "jornada", "anio_referencia",
]


def tipo_institucion(clasificacion: str) -> str:
    """Mismo código que usa oferta.csv (datos/cargar_oferta.py: TIPOS_INSTITUCION).

    El archivo histórico trae los nombres con los caracteres mal codificados, por eso se busca
    por la primera palabra clave y no por el texto completo.
    """
    t = clasificacion.lower()
    if t.startswith("universidad"):
        return "universidad"
    if t.startswith("institutos profesionales"):
        return "instituto_profesional"
    if t.startswith("centros de formaci"):
        return "centro_formacion_tecnica"
    return ""


def buscar(encabezado: list[str], pred) -> int:
    for i, c in enumerate(encabezado):
        if pred(c.strip()):
            return i
    raise SystemExit("Falta una columna esperada en el archivo de matrícula histórica.")


def leer_nombres(ruta: Path) -> list[dict]:
    # El archivo oficial está en latin-1 (con tildes y eñes); no se usa utf-8 con reemplazo.
    with ruta.open(encoding="latin-1", newline="") as f:
        rd = csv.reader(f, delimiter=";")
        cab = next(rd)
        i_anio = 0
        i_nivel = buscar(cab, lambda c: c == "NIVEL GLOBAL")
        i_inst = buscar(cab, lambda c: c.startswith("C") and "DE INSTITUCI" in c)
        i_inst_n = buscar(cab, lambda c: c == "NOMBRE INSTITUCIÓN" or c.startswith("NOMBRE INSTITUCI"))
        i_sede = buscar(cab, lambda c: c == "NOMBRE SEDE")
        i_carrera_n = buscar(cab, lambda c: c == "NOMBRE CARRERA")
        i_codigo = buscar(cab, lambda c: "CARRERA" in c and "DIGO" in c and "CLASIF" not in c)
        i_region = buscar(cab, lambda c: c.startswith("REGI"))
        i_comuna = buscar(cab, lambda c: c == "COMUNA")
        i_jornada = buscar(cab, lambda c: c == "JORNADA")
        i_clasif = buscar(cab, lambda c: c.startswith("CLASIFICACI") and "NIVEL 1" in c)

        mejor: dict[tuple[str, str], tuple[int, dict]] = {}
        for fila in rd:
            if len(fila) <= i_codigo:
                continue
            m = re.search(r"(\d{4})", fila[i_anio])
            if not m or fila[i_nivel].strip() != "Pregrado":
                continue
            anio = int(m.group(1))
            codigo = fila[i_codigo].strip()
            sede = fila[i_sede].strip()
            if not codigo:
                continue
            # La clave es (código, sede): un mismo código puede aparecer en varias sedes.
            if (codigo, sede) in mejor and mejor[(codigo, sede)][0] >= anio:
                continue
            mejor[(codigo, sede)] = (anio, {
                "codigo_sies": codigo,
                "institucion_codigo": fila[i_inst].strip(),
                "institucion_nombre": fila[i_inst_n].strip(),
                "institucion_tipo": tipo_institucion(fila[i_clasif]),
                "sede": sede,
                "carrera_nombre": fila[i_carrera_n].strip(),
                "region": fila[i_region].strip(),
                "comuna": fila[i_comuna].strip(),
                "jornada": fila[i_jornada].strip(),
                "anio_referencia": anio,
            })
    return [v[1] for k, v in sorted(mejor.items())]


def main(argv: list[str]) -> int:
    if len(argv) != 3:
        print(__doc__)
        return 2
    filas = leer_nombres(Path(argv[1]))
    salida = Path(argv[2])
    salida.parent.mkdir(parents=True, exist_ok=True)
    with salida.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=COLUMNAS_SALIDA)
        w.writeheader()
        w.writerows(filas)
    print(f"nombres escritos: {len(filas)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
