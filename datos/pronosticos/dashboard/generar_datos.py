"""Genera datos.js, la única entrada de datos del tablero del pronóstico.

Lee los archivos de datos/procesados/ (que salen de los scripts de
datos/pronosticos/ y de datos/cargar_oferta.py) y las cifras nacionales
versionadas en cifras_nacionales.json. No necesita librerías externas.

Reglas que aplica (AGENTS.md y ADR 0017 y 0018):
- Celdas con menos de UMBRAL estudiantes: no llevan cifra. Solo se cuentan.
- Sin variables protegidas: no se copia la proporción de mujeres ni ningún
  otro cruce por sexo, edad o situación socioeconómica.
- Cada bloque lleva su fuente y su fecha.

Uso (desde la raíz del repositorio):
    python -I datos/pronosticos/dashboard/generar_datos.py
"""

from __future__ import annotations

import csv
import json
import math
import statistics
import sys
from collections import Counter
from datetime import date
from pathlib import Path

UMBRAL = 10  # misma regla de supresión del ADR 0018, límite 1
MIN_CASOS = 30  # la validación solo usa celdas con al menos 30 entrantes
FECHA_DATOS = "2026-11-07"  # fecha de generación de las salidas de datos/procesados

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parents[2]
PROC = RAIZ / "datos" / "procesados"

# Región por código oficial (primeros dos dígitos del código de comuna). Orden norte a sur.
REGIONES = [
    ("15", "Arica y Parinacota"), ("01", "Tarapacá"), ("02", "Antofagasta"),
    ("03", "Atacama"), ("04", "Coquimbo"), ("05", "Valparaíso"),
    ("13", "Metropolitana"), ("06", "O'Higgins"), ("07", "Maule"),
    ("16", "Ñuble"), ("08", "Biobío"), ("09", "La Araucanía"),
    ("14", "Los Ríos"), ("10", "Los Lagos"), ("11", "Aysén"),
    ("12", "Magallanes"),
]
CODIGO_A_REGION = dict(REGIONES)
# La oferta escribe la región de O'Higgins con su nombre largo.
ALIAS_REGION = {"Lib. Gral. B. O'Higgins": "O'Higgins"}

TRAMOS = [(30, 49, "30 a 49"), (50, 99, "50 a 99"), (100, 299, "100 a 299"), (300, None, "300 o más")]


# ---------------------------------------------------------------- utilidades

def leer_csv(ruta: Path) -> list[dict]:
    with ruta.open(encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def cuantil(valores: list[float], p: float) -> float:
    """Cuantil con interpolación lineal (igual que numpy por defecto)."""
    v = sorted(valores)
    if not v:
        raise ValueError("sin valores")
    pos = (len(v) - 1) * p
    i = math.floor(pos)
    j = min(i + 1, len(v) - 1)
    return v[i] + (v[j] - v[i]) * (pos - i)


def region_normal(nombre: str) -> str:
    return ALIAS_REGION.get(nombre, nombre)


def region_de_comuna(codigo: str) -> str | None:
    return CODIGO_A_REGION.get(codigo[:2])


def entero(texto: str) -> int | None:
    texto = (texto or "").strip()
    if not texto:
        return None
    return int(float(texto.replace(",", ".")))


# --------------------------------------------------------- validación por celda

def factores_intervalo(errores_log: list[float]) -> dict:
    """Intervalo multiplicativo para el real a partir del error log(previsto/real).

    error = ln(previsto / real). El real queda entre previsto·e^(−q97,5) y
    previsto·e^(−q2,5). Son los cuantiles de TODOS los errores 2022-2026, como
    dice el informe (intervalo fijo).
    """
    q_bajo = cuantil(errores_log, 0.025)
    q_alto = cuantil(errores_log, 0.975)
    return {
        "q_bajo": q_bajo,
        "q_alto": q_alto,
        "factor_bajo": math.exp(-q_alto),
        "factor_alto": math.exp(-q_bajo),
    }


def _tramo(real: float) -> str:
    for lo, hi, nombre in TRAMOS:
        if real >= lo and (hi is None or real <= hi):
            return nombre
    return "menos de 30"


def resumen_validacion(filas: list[dict]) -> dict:
    """Resume la validación hacia atrás por celda (cobertura_entrada_sede.csv)."""
    reg = []
    for r in filas:
        real = float(r["real"])
        prev = float(r["previsto"])
        reg.append({
            "anio": int(r["anio"]),
            "real": real,
            "ape": abs(prev - real) / real,
            "err": float(r["error_log"]),
            "lo": float(r["limite_inferior_log"]),
            "hi": float(r["limite_superior_log"]),
            "cub": r["cubierto"].strip() == "1",
        })
    if not reg:
        raise ValueError("la validación no tiene filas")

    por_anio = []
    for anio in sorted({x["anio"] for x in reg}):
        g = [x for x in reg if x["anio"] == anio]
        por_anio.append({
            "anio": anio,
            "casos": len(g),
            "error_mediano": statistics.median(x["ape"] for x in g),
            "cobertura": sum(x["cub"] for x in g) / len(g),
            "ancho": math.exp(g[0]["hi"] - g[0]["lo"]),
        })

    por_tramo = []
    for _, _, nombre in TRAMOS:
        g = [x for x in reg if _tramo(x["real"]) == nombre]
        if not g:
            continue
        por_tramo.append({
            "tramo": nombre,
            "casos": len(g),
            "error_mediano": statistics.median(x["ape"] for x in g),
            "cobertura": sum(x["cub"] for x in g) / len(g),
        })

    # Histograma del error ln(previsto/real) en pasos de 0,1 entre −1,5 y 1,5.
    inicio, paso, n_bins = -1.5, 0.1, 30
    conteos = [0] * n_bins
    bajo = alto = 0
    for x in reg:
        if x["err"] < inicio:
            bajo += 1
        elif x["err"] >= inicio + paso * n_bins:
            alto += 1
        else:
            conteos[int((x["err"] - inicio) / paso)] += 1

    errores = [x["err"] for x in reg]
    fi = factores_intervalo(errores)
    return {
        "casos": len(reg),
        "minimo_real": min(x["real"] for x in reg),
        "error_mediano": statistics.median(x["ape"] for x in reg),
        "cobertura": sum(x["cub"] for x in reg) / len(reg),
        "ancho_mediano": statistics.median(math.exp(x["hi"] - x["lo"]) for x in reg),
        "intervalo_2027": {**fi, "ancho": fi["factor_alto"] / fi["factor_bajo"]},
        "por_anio": por_anio,
        "por_tramo": por_tramo,
        "histograma": {"inicio": inicio, "paso": paso, "conteos": conteos,
                       "fuera_bajo": bajo, "fuera_alto": alto},
    }


# ------------------------------------------------------------ celdas de 2027

def construir_celdas(entrada: list[dict], oferta: list[dict], fi: dict, nombres: dict | None = None) -> dict:
    """Une el pronóstico por celda con la ficha de oferta (nombres, tipo, región).

    Solo las celdas publicables llevan cifra. Las suprimidas guardan su grupo (institución,
    región, jornada) y, si se conoce, su sede, carrera y comuna, para listarlas sin cifra.
    Los nombres salen de la oferta oficial y, si falta una carrera ahí, de `nombres`
    (datos/procesados/nombres_celdas.csv, desde la base histórica SIES). No se copia la
    proporción de mujeres.
    """
    ficha = {r["codigo_sies"]: r for r in oferta}
    nombres = nombres or {}
    instituciones: dict[str, int] = {}
    tablas = {"instituciones": [], "jornadas": [], "modalidades": [], "regiones": [], "comunas": []}
    idx: dict[str, dict[str, int]] = {k: {} for k in tablas}

    def indice(tabla: str, valor, objeto=None) -> int:
        d = idx[tabla]
        if valor not in d:
            d[valor] = len(tablas[tabla])
            tablas[tabla].append(objeto if objeto is not None else valor)
        return d[valor]

    filas = []
    suprimidas = []
    sin_ficha = 0
    for r in entrada:
        f = ficha.get(r["carrera"])
        if r["estado"] != "publicable":
            # Clave (código, sede): un código puede estar en varias sedes.
            nom = nombres.get((r["carrera"], r["sede"]))
            if f is None and nom is None:
                sin_ficha += 1
            else:
                # Sin cifra: solo nombre y grupo. La oferta tiene prioridad; el nombre histórico completa.
                base = f or nom
                suprimidas.append([
                    indice("instituciones", base["institucion_codigo"],
                           {"codigo": base["institucion_codigo"], "nombre": base["institucion_nombre"],
                            "tipo": f["institucion_tipo"] if f else nom["institucion_tipo"]}),
                    indice("regiones", region_normal(base["region"])),
                    indice("jornadas", base["jornada"]),
                    f["sede"] if f else nom["sede"],
                    f["carrera_nombre_oficial"] if f else nom["carrera_nombre"],
                    indice("comunas", f["comuna"] if f else nom["comuna"]),
                ])
            continue
        n = entero(r["entrantes_2027"])
        if n is None or n < UMBRAL or f is None:
            # Un publicable sin ficha no debería existir; se cuenta como sin ficha y no se muestra.
            sin_ficha += 1
            continue
        filas.append([
            indice("instituciones", f["institucion_codigo"],
                   {"codigo": f["institucion_codigo"], "nombre": f["institucion_nombre"],
                    "tipo": f["institucion_tipo"]}),
            f["sede"],
            f["carrera_nombre_oficial"],
            indice("jornadas", f["jornada"]),
            indice("modalidades", f["modalidad"]),
            indice("regiones", region_normal(f["region"])),
            indice("comunas", f["comuna"]),
            n,
            round(n * fi["factor_bajo"]),
            round(n * fi["factor_alto"]),
            f["codigo_sies"],
        ])
    return {
        **tablas,
        "columnas": ["inst", "sede", "carrera", "jornada", "modalidad", "region", "comuna",
                     "entrantes", "inferior", "superior", "codigo"],
        "filas": filas,
        "suprimidas": suprimidas,
        "suprimidas_sin_ficha": sin_ficha,
        "total_estimado_publicable": sum(x[7] for x in filas),
    }


def construir_nuevas(decisiones: list[dict], oferta: list[dict]) -> list[dict]:
    """Carreras de admisión 2027 sin historia de matrícula 2026: nombre y sede, sin cifra.

    Vienen de datos/pronosticos/decisiones_carreras_2027.csv: las filas sin código SIES asignado.
    La tabla de admisión no trae jornada, así que no se muestra.
    """
    nombre_inst = {r["institucion_codigo"]: r["institucion_nombre"] for r in oferta}
    filas = [
        {"institucion_codigo": r["institucion_sies"],
         "institucion": nombre_inst.get(r["institucion_sies"], ""),
         "sede": r["lugar"],
         "carrera": r["carrera_demre"],
         "codigo_demre": r["codigo_demre"]}
        for r in decisiones if not r["codigo_sies"]  # sin código SIES asignado = carrera nueva
    ]
    return sorted(filas, key=lambda x: (x["institucion"], x["sede"], x["carrera"]))


# ----------------------------------------------------------------- comunas

def proyectar_comuna(residentes: int | None, factor: float, f_inf: float, f_sup: float) -> dict | None:
    """Cohorte 2027 de una comuna: persistencia con la tendencia nacional."""
    if residentes is None or residentes < UMBRAL:
        return None
    central = residentes * factor
    return {"central": round(central), "inferior": round(residentes * f_inf),
            "superior": round(residentes * f_sup)}


def construir_comunas(resumen: list[dict], cohorte_ine: list[dict], cuarto: list[dict], nac: dict) -> dict:
    cq = nac["insumos"]["cuarto_medio_2027"]
    ine = {r["codigo_comuna"]: r for r in cohorte_ine}
    colegio_dato = {r["codigo_comuna"]: entero(r["cuarto_medio_2026"]) for r in cuarto}
    filas = []
    inconsistentes = 0
    for r in resumen:
        cod = r["codigo_comuna"]
        reg = region_de_comuna(cod)
        if reg is None:
            continue  # por ejemplo, "NO EN ANEXO"
        res = entero(r["residentes_en_cuarto"])
        local = entero(r["en_colegio_local"])
        ent = entero(r["entrada"])
        sal = entero(r["salida"])
        colegio = (local + ent) if None not in (local, ent) else None
        if colegio is not None and cod in colegio_dato and colegio_dato[cod] != colegio:
            inconsistentes += 1
        proy = proyectar_comuna(res, cq["factor"], cq["factor_inferior"], cq["factor_superior"])
        suprimida = res is None or res < UMBRAL
        i = ine.get(cod)
        filas.append({
            "codigo": cod,
            "comuna": r["comuna"],
            "region": reg,
            "residentes": None if suprimida else res,
            "colegio": None if suprimida or colegio is None else colegio,
            "entrada": None if suprimida else ent,
            "salida": None if suprimida else sal,
            "proy": proy,
            "pob_17_18": None if not i else round(float(i["cohorte_2026_17_18_ajustada"])),
        })
    return {"filas": filas, "inconsistentes_colegio_vs_cuarto": inconsistentes}


# ----------------------------------------------------------------- principal

def generar() -> dict:
    nac = json.loads((AQUI / "cifras_nacionales.json").read_text(encoding="utf-8"))

    valid_celdas = resumen_validacion(leer_csv(PROC / "cobertura_entrada_sede.csv"))
    nombres = {(r["codigo_sies"], r["sede"]): r for r in leer_csv(PROC / "nombres_celdas.csv")}
    celdas = construir_celdas(
        leer_csv(PROC / "entrada_carrera_sede_2027.csv"),
        leer_csv(PROC / "oferta.csv"),
        valid_celdas["intervalo_2027"],
        nombres,
    )
    celdas["nuevas_2027"] = construir_nuevas(
        leer_csv(AQUI.parent / "decisiones_carreras_2027.csv"),
        leer_csv(PROC / "oferta.csv"),
    )
    comunas = construir_comunas(
        leer_csv(PROC / "resumen_origen_destino_4to_2026.csv"),
        leer_csv(PROC / "cohorte_17_18_2026.csv"),
        leer_csv(PROC / "cuarto_medio_2026_comunas.csv"),
        nac,
    )

    backtest = {(r["desde"], r["hasta"]): r for r in leer_csv(PROC / "backtest_persistencia.csv")}
    calib = {(r["desde"], r["hasta"]): r for r in leer_csv(PROC / "calibracion_intervalos.csv")}
    validacion_comunas = []
    for k in sorted(backtest):
        b, c = backtest[k], calib.get(k)
        validacion_comunas.append({
            "desde": int(k[0]), "hasta": int(k[1]),
            "comunas": int(b["comunas_medidas"]),
            "error_mediano": float(b["ape_mediano"]) / 100,
            "cobertura_poisson": float(b["cobertura_intervalo"]) / 100,
            "cobertura_empirico": None if c is None else float(c["cobertura_intervalo_empirico"]) / 100,
        })

    paes = [{"anio": int(r["anio"]), "filas": int(r["filas_archivo"]),
             "regulares": int(r["rendidores_regulares"])}
            for r in leer_csv(PROC / "rendidores_regulares_series.csv")]

    n_pub = len(celdas["filas"])
    n_sup = len(celdas["suprimidas"]) + celdas["suprimidas_sin_ficha"]
    return {
        "meta": {
            "generado": date.today().isoformat(),
            "fecha_datos": FECHA_DATOS,
            "umbral_supresion": UMBRAL,
            "min_casos_validacion": MIN_CASOS,
            "regiones": [r for _, r in REGIONES],
            "celdas_publicables": n_pub,
            "celdas_suprimidas": n_sup,
            "celdas_total": n_pub + n_sup,
        },
        "nacional": nac,
        "paes": {
            "serie": paes,
            "fuente": "Departamento de Evaluación, Medición y Registro Educacional (DEMRE), bases de datos abiertas de las pruebas de acceso. Elaboración propia",
            "url": "https://demre.cl/",
            "consultado": FECHA_DATOS,
            "definicion": "Rendidor regular: fila con al menos un puntaje regular distinto de vacío y de cero (confirmado por DEMRE el 2026-11-07). Las filas del archivo incluyen a quienes rindieron solo la prueba de invierno.",
        },
        "validacion_comunas": {
            "pasos": validacion_comunas,
            "fuente": "Elaboración propia con matrícula de cuarto medio (Mineduc) y PAES (DEMRE)",
            "consultado": FECHA_DATOS,
        },
        "validacion_celdas": {
            **valid_celdas,
            "fuente": "Elaboración propia con la base de matrícula SIES 2007-2026 (Mi Futuro, Mineduc)",
            "url": "https://www.mifuturo.cl/",
            "consultado": FECHA_DATOS,
        },
        "celdas": {
            **celdas,
            "fuente": "SIES, matrícula de primer año 2026 por sede y carrera, y oferta académica (datos/cargar_oferta.py)",
            "url": "https://www.mifuturo.cl/",
            "consultado": FECHA_DATOS,
            "total_nacional_usado": 382725,
        },
        "comunas": {
            **comunas,
            "fuente": "Mineduc, matrícula por estudiante 2026 (residencia y colegio); INE, población 17-18 años (base 2024)",
            "url": "https://datosabiertos.mineduc.cl/",
            "consultado": FECHA_DATOS,
        },
    }


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    faltan = [n for n in ("cobertura_entrada_sede.csv", "entrada_carrera_sede_2027.csv", "oferta.csv",
                          "nombres_celdas.csv",
                          "resumen_origen_destino_4to_2026.csv", "cohorte_17_18_2026.csv",
                          "cuarto_medio_2026_comunas.csv", "backtest_persistencia.csv",
                          "calibracion_intervalos.csv", "rendidores_regulares_series.csv")
              if not (PROC / n).exists()]
    if faltan:
        print("Faltan archivos en datos/procesados/ (se generan con los scripts de datos/):")
        for n in faltan:
            print("  -", n)
        return 1

    datos = generar()
    salida = AQUI / "datos.js"
    cuerpo = json.dumps(datos, ensure_ascii=False, separators=(",", ":"))
    salida.write_text(
        "// ARCHIVO GENERADO por generar_datos.py. No editar a mano ni subir al repositorio.\n"
        f"window.DATOS = {cuerpo};\n",
        encoding="utf-8",
    )
    m = datos["meta"]
    v = datos["validacion_celdas"]
    c = datos["celdas"]
    print(f"datos.js: {salida.stat().st_size / 1024:.0f} KB")
    print(f"celdas publicables {m['celdas_publicables']} · suprimidas {m['celdas_suprimidas']} "
          f"(sin ficha de oferta: {c['suprimidas_sin_ficha']})")
    print(f"suma de entrantes publicables {c['total_estimado_publicable']:,}".replace(",", "."))
    print(f"validación: {v['casos']} casos · error mediano {100 * v['error_mediano']:.1f} % · "
          f"cobertura {100 * v['cobertura']:.1f} % · mínimo real {v['minimo_real']:.0f}")
    fi = v["intervalo_2027"]
    print(f"intervalo 2027 por celda: ×{fi['factor_bajo']:.3f} a ×{fi['factor_alto']:.3f} "
          f"(ancho ×{fi['ancho']:.2f})")
    print(f"comunas: {len(datos['comunas']['filas'])} · colegio≠cuarto en "
          f"{datos['comunas']['inconsistentes_colegio_vs_cuarto']} comunas")
    sf = [x for x in datos["comunas"]["filas"] if x["comuna"].upper().startswith("SAN FERNANDO")]
    for x in sf:
        if x["residentes"] and x["colegio"]:
            print(f"San Fernando: colegio {x['colegio']} frente a residencia {x['residentes']} "
                  f"({100 * (x['colegio'] / x['residentes'] - 1):+.1f} %)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
