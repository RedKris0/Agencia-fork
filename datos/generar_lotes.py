"""Genera los lotes SQL de la oferta oficial (lote 1: fuentes, instituciones,
programas, variantes y aranceles) a partir de datos/procesados/carga.csv.

No escribe en ninguna base de datos. Solo genera archivos SQL y un informe.
Cómo se usa, paso a paso: docs/datos/carga-lotes.md.

Uso:
    python datos/generar_lotes.py [ruta_carga.csv] [carpeta_salida]

Decisiones (ver docs/datos/carga-lotes.md, sección 2):
- Un programa es una carrera en una institución, única por (institución,
  nombre normalizado), según ADR 0011 y la migración 20261104000000. El código
  SIES va en cada variante (sede y jornada).
- Las filas sin arancel se cargan como nulas con su motivo oficial.
- Si una institución tiene valores distintos de acreditación en sus filas, el
  script se detiene y lo informa; no elige uno.
"""

from __future__ import annotations

import csv
import json
import re
import sys
import unicodedata
from collections import defaultdict
from datetime import date
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CARGA_POR_DEFECTO = RAIZ / "datos" / "procesados" / "carga.csv"
SALIDA_POR_DEFECTO = RAIZ / "datos" / "procesados" / "lotes"

TIPOS_INSTITUCION = {"universidad", "instituto_profesional", "centro_formacion_tecnica"}
ESTADOS_ACREDITACION = {"acreditada", "no_acreditada", "bajo_tutela"}
UNIDADES_ARANCEL = {"pesos", "uf"}


class ErrorDeLote(Exception):
    """Un dato no cumple una restricción del esquema. Se detiene el lote."""


def normalizar(nombre: str) -> str:
    """Nombre de programa sin tildes, en minúsculas y con espacios simples.

    Es la misma regla que usa la base (programa.nombre_normalizado). Cambiarla
    obliga a regenerar los lotes.
    """
    sin_tildes = "".join(
        c for c in unicodedata.normalize("NFKD", nombre) if not unicodedata.combining(c)
    )
    return re.sub(r"\s+", " ", sin_tildes).strip().lower()


def sql_texto(valor: str | None) -> str:
    if valor is None or valor.strip() == "":
        return "NULL"
    return "'" + valor.replace("'", "''") + "'"


def sql_numero(valor: str | None) -> str:
    if valor is None or valor.strip() == "":
        return "NULL"
    return str(float(valor.replace(",", ".")))


def sql_entero(valor: str | None) -> str:
    if valor is None or valor.strip() == "":
        return "NULL"
    return str(int(float(valor)))


def sql_fecha(valor: str | None) -> str:
    if valor is None or valor.strip() == "":
        return "NULL"
    date.fromisoformat(valor.strip())  # lanza si la fecha es inválida
    return f"'{valor.strip()}'"


def leer(carga: Path) -> list[dict[str, str]]:
    with carga.open(encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def construir(filas: list[dict[str, str]]) -> tuple[dict[str, list[str]], dict]:
    lotes: dict[str, list[str]] = {
        "01_fuentes": [],
        "02_instituciones": [],
        "03_programas_genericos": [],
        "04_programas": [],
        "05_variantes": [],
        "06_aranceles": [],
    }
    informe: dict = {"filas_leidas": len(filas), "errores": []}

    # Una sola fuente en la carga: Mineduc, matrícula 2026.
    url_fuente = filas[0]["oferta_url_archivo"]
    fecha_fuente = filas[0]["oferta_fecha_descarga"]
    nombre_fuente = filas[0]["oferta_fuente"]
    lotes["01_fuentes"].append(
        "insert into fuente (organismo, nombre, url, terminos_de_uso, terminos_revisados_el) values ("
        f"'Mineduc', {sql_texto(nombre_fuente)}, {sql_texto(url_fuente)}, NULL, NULL) "
        "on conflict (organismo, nombre) do nothing;"
    )

    # Instituciones: una fila por código, con la acreditación que la fuente informa.
    inst: dict[str, dict] = {}
    acred_por_inst: dict[str, set[tuple]] = defaultdict(set)
    for r in filas:
        codigo = r["oferta_institucion_codigo"]
        if r["oferta_institucion_tipo"] not in TIPOS_INSTITUCION:
            raise ErrorDeLote(f"tipo de institución no válido: {r['oferta_institucion_tipo']}")
        if r["oferta_acreditacion_estado"] not in ESTADOS_ACREDITACION:
            raise ErrorDeLote(f"estado de acreditación no válido: {r['oferta_acreditacion_estado']}")
        acred_por_inst[codigo].add((r["oferta_acreditacion_anios"], r["oferta_acreditacion_hasta"]))
        inst.setdefault(codigo, r)

    for codigo, acreds in acred_por_inst.items():
        if len(acreds) > 1:
            informe["errores"].append(
                {"tipo": "acreditacion_inconsistente", "institucion": codigo, "valores": sorted(map(str, acreds))}
            )
    if informe["errores"]:
        raise ErrorDeLote(
            f"{len(informe['errores'])} instituciones con acreditación inconsistente; ver el informe"
        )

    for codigo, r in inst.items():
        anios, hasta = next(iter(acred_por_inst[codigo]))
        if anios and not (0 <= int(float(anios)) <= 7):
            raise ErrorDeLote(f"años de acreditación fuera de rango en {codigo}: {anios}")
        lotes["02_instituciones"].append(
            "insert into institucion (codigo_oficial, nombre, tipo, anios_acreditacion, acreditada_hasta) values ("
            f"{sql_texto(codigo)}, {sql_texto(r['oferta_institucion_nombre'])}, "
            f"'{r['oferta_institucion_tipo']}', {sql_entero(anios)}, {sql_fecha(hasta)}) "
            "on conflict (codigo_oficial) do nothing;"
        )

    # Programas: una carrera por institución.
    # Carrera genérica SIES: una por institución y nombre normalizado (ADR 0014).
    genericas: dict[tuple[str, str], dict] = {}
    for r in filas:
        clave = (r["oferta_institucion_codigo"], normalizar(r["oferta_carrera_generica"]))
        genericas.setdefault(clave, r)
    for (cod_inst, norm), r in genericas.items():
        lotes["03_programas_genericos"].append(
            "insert into programa_generico (institucion_id, nombre, nombre_normalizado, fuente_id) values ("
            f"(select id from institucion where codigo_oficial = {sql_texto(cod_inst)}), "
            f"{sql_texto(r['oferta_carrera_generica'])}, {sql_texto(norm)}, "
            f"(select id from fuente where organismo = 'Mineduc' and nombre = {sql_texto(nombre_fuente)})) "
            "on conflict (institucion_id, nombre_normalizado) do nothing;"
        )

    # Programa = título (carrera nombrada) + institución (ADR 0011, migración 20261104000000):
    # única por (institución, nombre_normalizado).
    programas: dict[tuple[str, str], dict] = {}
    nombres_por_clave: dict[tuple[str, str], set[str]] = defaultdict(set)
    for r in filas:
        clave = (r["oferta_institucion_codigo"], normalizar(r["oferta_carrera_nombre_oficial"]))
        programas.setdefault(clave, r)
        nombres_por_clave[clave].add(r["oferta_carrera_nombre_oficial"])
    informe["nombres_que_se_unifican"] = sum(1 for v in nombres_por_clave.values() if len(v) > 1)

    for (cod_inst, norm), r in programas.items():
        lotes["04_programas"].append(
            "insert into programa (institucion_id, nombre, nombre_oficial, nombre_normalizado, area, fuente_id) values ("
            f"(select id from institucion where codigo_oficial = {sql_texto(cod_inst)}), "
            f"{sql_texto(r['oferta_carrera_nombre_oficial'])}, "
            f"{sql_texto(r['oferta_carrera_nombre_oficial'])}, {sql_texto(norm)}, "
            f"{sql_texto(r['oferta_carrera_generica'])}, "
            f"(select id from fuente where organismo = 'Mineduc' and nombre = {sql_texto(nombre_fuente)})) "
            "on conflict (institucion_id, nombre_normalizado) do nothing;"
        )

    # Variantes: una por código SIES (sede y jornada).
    vistos: set[str] = set()
    for r in filas:
        codigo_sies = r["oferta_codigo_sies"]
        if codigo_sies in vistos:
            raise ErrorDeLote(f"código SIES repetido: {codigo_sies}")
        vistos.add(codigo_sies)
        cod_inst = r["oferta_institucion_codigo"]
        norm = normalizar(r["oferta_carrera_nombre_oficial"])
        codigo_demre = r["oferta_codigo_demre"].strip() or None
        norm_generica = normalizar(r["oferta_carrera_generica"])
        lotes["05_variantes"].append(
            "insert into programa_variante (programa_id, programa_generico_id, carrera_codigo_mineduc, "
            "codigo_demre, codigo_sies, sede, comuna, region, jornada, duracion_semestres, fuente_id) values ("
            "(select p.id from programa p join institucion i on i.id = p.institucion_id "
            f"where i.codigo_oficial = {sql_texto(cod_inst)} and p.nombre_normalizado = {sql_texto(norm)}), "
            "(select g.id from programa_generico g join institucion i on i.id = g.institucion_id "
            f"where i.codigo_oficial = {sql_texto(cod_inst)} and g.nombre_normalizado = {sql_texto(norm_generica)}), "
            f"{sql_texto(r['oferta_carrera_codigo'])}, {sql_texto(codigo_demre)}, "
            f"{sql_texto(codigo_sies)}, {sql_texto(r['oferta_sede'])}, {sql_texto(r['oferta_comuna'])}, "
            f"{sql_texto(r['oferta_region'])}, {sql_texto(r['oferta_jornada'])}, "
            f"{sql_entero(r['oferta_duracion_formal_semestres'])}, "
            f"(select id from fuente where organismo = 'Mineduc' and nombre = {sql_texto(nombre_fuente)})) "
            "on conflict (codigo_sies) do nothing;"
        )

        # Arancel: en pesos, o en UF con su valor y fecha de conversión. Si no hay monto, motivo oficial.
        unidad = r["oferta_arancel_unidad_original"]
        if r["oferta_arancel_anual_pesos"].strip():
            if unidad not in UNIDADES_ARANCEL:
                raise ErrorDeLote(f"unidad de arancel no válida en {codigo_sies}: {unidad}")
            if unidad == "uf" and (not r["oferta_uf_valor"].strip() or not r["oferta_uf_fecha"].strip()):
                raise ErrorDeLote(f"arancel en UF sin valor o fecha de UF en {codigo_sies}")
            if float(r["oferta_arancel_anual_pesos"]) <= 0:
                raise ErrorDeLote(f"arancel no positivo en {codigo_sies}")
            campos_uf = (
                f"{sql_numero(r['oferta_uf_valor']) if unidad == 'uf' else 'NULL'}, "
                f"{sql_fecha(r['oferta_uf_fecha']) if unidad == 'uf' else 'NULL'}"
            )
            valores = (
                f"{sql_numero(r['oferta_arancel_anual_pesos'])}, {sql_texto(unidad)}, "
                f"{sql_numero(r['oferta_arancel_valor_original'])}, {campos_uf}, NULL"
            )
        else:
            motivo = r["oferta_motivo_arancel"] or "Mineduc no informa este monto"
            valores = f"NULL, NULL, NULL, NULL, NULL, {sql_texto(motivo)}"
        lotes["06_aranceles"].append(
            "insert into arancel_variante (variante_id, valor_pesos, unidad_original, valor_original, "
            "uf_valor, uf_fecha, motivo_sin_dato, periodo, fuente_id, url, fecha_consulta) values ("
            f"(select id from programa_variante where codigo_sies = {sql_texto(codigo_sies)}), "
            f"{valores}, "
            f"'año 2026', (select id from fuente where organismo = 'Mineduc' and nombre = {sql_texto(nombre_fuente)}), "
            f"{sql_texto(r['oferta_url_archivo'])}, {sql_fecha(r['oferta_fecha_descarga'])}) "
            "on conflict (variante_id, periodo) do nothing;"
        )

    informe["fuentes"] = 1
    informe["instituciones"] = len(inst)
    informe["programas_genericos"] = len(genericas)
    informe["programas"] = len(programas)
    informe["variantes"] = len(vistos)
    informe["aranceles_con_monto"] = sum(1 for r in filas if r["oferta_arancel_anual_pesos"].strip())
    informe["aranceles_sin_monto"] = len(filas) - informe["aranceles_con_monto"]
    informe["fecha_descarga"] = fecha_fuente
    return lotes, informe


def escribir(lotes: dict[str, list[str]], informe: dict, salida: Path) -> None:
    salida.mkdir(parents=True, exist_ok=True)
    for nombre, sentencias in lotes.items():
        cuerpo = "\n".join(sentencias) + "\n"
        (salida / f"{nombre}.sql").write_text(cuerpo, encoding="utf-8")
    (salida / "informe.json").write_text(json.dumps(informe, ensure_ascii=False, indent=2), encoding="utf-8")


def main(argv: list[str]) -> int:
    carga = Path(argv[1]) if len(argv) > 1 else CARGA_POR_DEFECTO
    salida = Path(argv[2]) if len(argv) > 2 else SALIDA_POR_DEFECTO
    filas = leer(carga)
    try:
        lotes, informe = construir(filas)
    except ErrorDeLote as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1
    escribir(lotes, informe, salida)
    print(json.dumps({k: v for k, v in informe.items() if k != "errores"}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
