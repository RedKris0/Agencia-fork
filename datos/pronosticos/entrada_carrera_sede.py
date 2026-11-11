"""Pronóstico de primer año de pregrado 2027 por carrera y sede, con reparto por sexo.

Método (agregado, sin datos individuales):
    entrantes_2027(sede, carrera) = total_nacional_2027 × participación_promedio_2024-2026
    mujeres_share_2027(sede, carrera) = promedio de la proporción de mujeres 2024-2026

El total nacional 2027 viene de entrada_primer_anio.py (registrado).

Validación (hacia atrás, 2022-2026): para cada año y celda, la participación se
estima con los tres años anteriores y se compara con la observada. Se mide el
error absoluto porcentual mediano y el error absoluto de la proporción de mujeres
en puntos porcentuales. Solo celdas con al menos MIN_CASOS entrantes.

Publicación: celdas con menos de UMBRAL entrantes se suprimen.

Uso:
    python entrada_carrera_sede.py <SIES_matricula.csv> <salida.csv>
"""

from __future__ import annotations

import csv
import re
import statistics
import sys
from collections import defaultdict
from pathlib import Path

UMBRAL = 10
MIN_CASOS = 30
TOTAL_2027 = 382725  # registrado en entrada_primer_anio.py (estimación nacional)


def leer(ruta: Path):
    total = defaultdict(int)
    ent: dict[int, dict[tuple, int]] = defaultdict(lambda: defaultdict(int))
    muj: dict[int, dict[tuple, int]] = defaultdict(lambda: defaultdict(int))
    # El archivo oficial del SIES está en latin-1: con utf-8 las tildes y eñes salen como �,
    # y los nombres de sede dejan de coincidir con los de la oferta y los nombres históricos.
    with ruta.open(encoding="latin-1", newline="") as f:
        rd = csv.DictReader(f, delimiter=";")
        cols = rd.fieldnames or []
        ycol = cols[0]
        m1 = next(c for c in cols if "PRIMER" in c and c.startswith("TOTAL MATR")
                  and "MUJER" not in c and "HOMBRE" not in c and "BINARIO" not in c)
        mm = next(c for c in cols if "PRIMER" in c and "MUJERES" in c and c.startswith("TOTAL MATR"))
        niv = next(c for c in cols if c.startswith("NIVEL GLOBAL"))
        ins = next(c for c in cols if c.startswith("C") and "DE INSTITUCI" in c)
        sede = next(c for c in cols if c.strip() == "NOMBRE SEDE")
        car = next(c for c in cols if "CARRERA" in c and "DIGO" in c and "CLASIF" not in c)
        for r in rd:
            m = re.search(r"(\d{4})", r[ycol])
            if not m or r[niv].strip() != "Pregrado":
                continue
            y = int(m.group(1))
            try:
                v = int(float(r[m1].replace(",", ".") or 0))
                w = int(float(r[mm].replace(",", ".") or 0))
            except ValueError:
                continue
            clave = (r[ins].strip(), r[sede].strip(), r[car].strip())
            total[y] += v
            ent[y][clave] += v
            muj[y][clave] += w
    return total, ent, muj


def main(argv: list[str]) -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    if len(argv) != 3:
        print(__doc__)
        return 2
    total, ent, muj = leer(Path(argv[1]))
    salida = Path(argv[2])

    # validación 2022-2026
    errores_part, errores_muj = [], []
    for y in range(2022, 2027):
        for k, n in ent[y].items():
            if n < MIN_CASOS:
                continue
            # mismo método que el pronóstico: participación del último año
            hist = ent[y - 1].get(k, 0) / total[y - 1]
            if hist <= 0:
                continue
            pred_part = hist
            real_part = n / total[y]
            errores_part.append(abs(pred_part * total[y] - n) / n)
            hist_m = [muj[y - j].get(k, 0) / max(ent[y - j].get(k, 0), 1) for j in (1, 2, 3)]
            pred_m = sum(hist_m) / 3
            real_m = muj[y][k] / n
            errores_muj.append(abs(pred_m - real_m) * 100)
    print(f"validación 2022-2026 ({len(errores_part)} celdas con ≥{MIN_CASOS} entrantes):")
    print(f"  entrantes: error absoluto porcentual mediano {100*statistics.median(errores_part):.1f} %")
    print(f"  proporción de mujeres: error absoluto mediano {statistics.median(errores_muj):.1f} puntos porcentuales")

    # pronóstico 2027
    filas = []
    for k in set().union(*[ent[y].keys() for y in (2024, 2025, 2026)]):
        # Último año: en la prueba de 2022-2026 fue el método con menor error (11,6 %
        # frente a 15,8 % del promedio de tres años). Ver docs/analisis/informe-pronostico-2027.md.
        part = ent[2026].get(k, 0) / total[2026]
        n_pred = TOTAL_2027 * part
        fm = [muj[y].get(k, 0) / max(ent[y].get(k, 0), 1) for y in (2024, 2025, 2026) if ent[y].get(k, 0) > 0]
        share_m = sum(fm) / len(fm) if fm else None
        suprimido = n_pred < UMBRAL
        filas.append({
            "institucion": k[0], "sede": k[1], "carrera": k[2],
            "entrantes_2027": "" if suprimido else round(n_pred),
            "proporcion_mujeres_2027": "" if (suprimido or share_m is None) else round(share_m, 3),
            "estado": "suprimido" if suprimido else "publicable",
        })
    salida.parent.mkdir(parents=True, exist_ok=True)
    with salida.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(filas[0].keys()))
        w.writeheader()
        w.writerows(filas)
    pub = sum(1 for x in filas if x["estado"] == "publicable")
    print(f"celdas: {len(filas)} · publicables: {pub} · suprimidas: {len(filas) - pub}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
