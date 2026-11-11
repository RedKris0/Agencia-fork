"""Genera los lotes SQL 09 a 11 (vacantes, requisitos y nombres verificados con DEMRE).

Va después de los lotes 1 a 8. No escribe en ninguna base; se detiene ante un
dato que no cumple el esquema.

Uso:
    python datos/generar_lotes_demre.py [ruta_carga.csv] [carpeta_salida]

Reglas:
- Se cruza cada fila DEMRE con la variante por su código DEMRE (codigo_demre).
- Un cupo que el DEMRE no publica se guarda nulo con su motivo.
- Las ponderaciones deben sumar 100 según la regla del esquema; si una fila no
  suma 100, el generador se detiene y la muestra.
- Un nombre solo recibe tildes y formato si conserva las mismas palabras que
  Mineduc; cualquier diferencia real queda pendiente.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import generar_lotes as base

FUENTE_DEMRE = {
    "organismo": "DEMRE",
    "nombre": "Oferta definitiva de carreras, vacantes y ponderaciones (Admisión 2027)",
}

# Vía de admisión -> columna de carga.csv
VIAS = [
    ("regular", "demre_vacantes_regular"),
    ("regular_2do_semestre", "demre_vacantes_regular_2do_semestre"),
    ("mc", "demre_vacantes_mc"),
    ("bea", "demre_vacantes_bea"),
    ("pace", "demre_vacantes_pace"),
]

MOTIVO_CUPOS = "DEMRE no publica cupos para esta vía en esta carrera."


def _entero(valor: str) -> int | None:
    return int(float(valor)) if valor.strip() else None


def _suma_ponderaciones(r: dict[str, str]) -> int:
    v = {k: (_entero(r[k]) or 0) for k in (
        "demre_nem", "demre_ranking", "demre_lectora", "demre_matematica_1", "demre_matematica_2",
        "demre_historia_cs_sociales", "demre_ciencias", "demre_prueba_especial",
        "demre_asignacion_especial_pedagogia")}
    hc = r["demre_historia_o_ciencias"].strip().lower() == "si"
    parte_historia_ciencias = (
        max(v["demre_historia_cs_sociales"], v["demre_ciencias"]) if hc
        else v["demre_historia_cs_sociales"] + v["demre_ciencias"]
    )
    return (
        v["demre_nem"] + v["demre_ranking"] + v["demre_lectora"] + v["demre_matematica_1"]
        + v["demre_matematica_2"] + v["demre_prueba_especial"]
        + v["demre_asignacion_especial_pedagogia"] + parte_historia_ciencias
    )


PALABRAS_MENORES = {
    "a", "al", "and", "con", "de", "del", "e", "el", "en", "la", "las", "los",
    "o", "of", "para", "por", "sin", "the", "u", "un", "una", "y",
}
PATRON_PALABRA = re.compile(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+")


def _proyectar_tildes(original: str, referencia: str) -> str | None:
    """Copia solo tildes de DEMRE; conserva palabras y puntuación de Mineduc."""
    referencia = re.sub(r"\s*(?:\(\*\)|\*)\s*$", "", referencia).strip()
    origen = list(PATRON_PALABRA.finditer(original))
    destino = list(PATRON_PALABRA.finditer(referencia))
    if len(origen) != len(destino) or any(
        base.normalizar(a.group()) != base.normalizar(b.group()) for a, b in zip(origen, destino)
    ):
        return None

    partes: list[str] = []
    inicio = 0
    for palabra_origen, palabra_destino in zip(origen, destino):
        partes.append(original[inicio:palabra_origen.start()])
        partes.append(palabra_destino.group().upper())
        inicio = palabra_origen.end()
    partes.append(original[inicio:])
    return "".join(partes)


def _formatear_nombre(nombre: str) -> str:
    """Usa mayúscula inicial en palabras relevantes."""
    primera = True

    def formatear(coincidencia: re.Match[str]) -> str:
        nonlocal primera
        palabra = coincidencia.group().lower()
        if not primera and palabra in PALABRAS_MENORES:
            return palabra
        primera = False
        return palabra[0].upper() + palabra[1:]

    return PATRON_PALABRA.sub(formatear, nombre)


def _correcciones_nombres(filas: list[dict[str, str]]) -> dict[str, str]:
    """Devuelve solo correcciones sin contradicciones entre referencias DEMRE."""
    candidatas: dict[str, set[str]] = {}
    for r in filas:
        original = r["oferta_carrera_nombre_oficial"].strip()
        referencia = r.get("demre_carrera", "").strip()
        proyectado = _proyectar_tildes(original, referencia) if original and referencia else None
        if proyectado:
            candidatas.setdefault(original, set()).add(proyectado)
    return {
        original: _formatear_nombre(next(iter(nombres)))
        for original, nombres in candidatas.items()
        if len(nombres) == 1
    }


def construir(filas: list[dict[str, str]]) -> tuple[dict[str, list[str]], dict]:
    con_demre = [r for r in filas if r["demre_codigo"].strip()]
    if not con_demre:
        raise base.ErrorDeLote("la carga no tiene filas DEMRE")

    url = con_demre[0]["demre_url_archivo"]
    fecha = con_demre[0]["demre_fecha_descarga"]
    periodo = con_demre[0]["demre_periodo"]
    if not url or not fecha or not periodo:
        raise base.ErrorDeLote("falta URL, fecha o período DEMRE en la carga")

    malas = [(r["demre_codigo"], _suma_ponderaciones(r)) for r in con_demre if _suma_ponderaciones(r) != 100]
    if malas:
        raise base.ErrorDeLote(f"{len(malas)} carreras no suman 100 en ponderaciones: {malas[:5]}")

    fuente_sql = (
        f"(select id from fuente where organismo = {base.sql_texto(FUENTE_DEMRE['organismo'])} "
        f"and nombre = {base.sql_texto(FUENTE_DEMRE['nombre'])})"
    )
    lotes: dict[str, list[str]] = {
        "09_vacantes_demre": [],
        "10_requisitos_demre": [],
        "11_nombres_demre": [],
    }
    lotes["09_vacantes_demre"].append(
        "insert into fuente (organismo, nombre, url, terminos_de_uso, terminos_revisados_el) values ("
        f"{base.sql_texto(FUENTE_DEMRE['organismo'])}, {base.sql_texto(FUENTE_DEMRE['nombre'])}, "
        f"{base.sql_texto(url)}, NULL, NULL) on conflict (organismo, nombre) do nothing;"
    )

    ref_variante = lambda codigo: f"(select id from programa_variante where codigo_demre = {base.sql_texto(codigo)})"  # noqa: E731

    cupos_filas = 0
    cupos_sin_dato = 0
    for r in con_demre:
        codigo = r["demre_codigo"].strip()
        for via, col in VIAS:
            cupos = _entero(r[col])
            if cupos is None:
                motivo_sql, cupos_sql = base.sql_texto(MOTIVO_CUPOS), "NULL"
                cupos_sin_dato += 1
            else:
                if cupos < 0:
                    raise base.ErrorDeLote(f"cupos negativos en {codigo}, {via}: {cupos}")
                motivo_sql, cupos_sql = "NULL", str(cupos)
            cupos_filas += 1
            lotes["09_vacantes_demre"].append(
                "insert into vacante_admision (variante_id, via, cupos, periodo, fuente_id, url, "
                "fecha_consulta, motivo_sin_dato) values ("
                f"{ref_variante(codigo)}, '{via}', {cupos_sql}, {base.sql_texto(periodo)}, {fuente_sql}, "
                f"{base.sql_texto(url)}, {base.sql_fecha(fecha)}, {motivo_sql}) "
                "on conflict do nothing;"
            )

        hc = "true" if r["demre_historia_o_ciencias"].strip().lower() == "si" else "false"
        lotes["10_requisitos_demre"].append(
            "insert into requisito_admision (variante_id, nem, ranking, competencia_lectora, matematica_1, "
            "matematica_2, historia_cs_sociales, ciencias, historia_o_ciencias, prueba_especial, "
            "asignacion_especial_pedagogia, puntaje_ponderado_minimo, puntaje_promedio_minimo, pagina_pdf, "
            "periodo, fuente_id, url, fecha_consulta) values ("
            f"{ref_variante(codigo)}, {base.sql_entero(r['demre_nem'])}, {base.sql_entero(r['demre_ranking'])}, "
            f"{base.sql_entero(r['demre_lectora'])}, {base.sql_entero(r['demre_matematica_1'])}, "
            f"{base.sql_entero(r['demre_matematica_2'])}, {base.sql_entero(r['demre_historia_cs_sociales'])}, "
            f"{base.sql_entero(r['demre_ciencias'])}, {hc}, {base.sql_entero(r['demre_prueba_especial'])}, "
            f"{base.sql_entero(r['demre_asignacion_especial_pedagogia'])}, "
            f"{base.sql_numero(r['demre_puntaje_ponderado_minimo'])}, {base.sql_numero(r['demre_puntaje_promedio_minimo'])}, "
            f"{base.sql_entero(r['demre_pagina_pdf'])}, {base.sql_texto(periodo)}, {fuente_sql}, "
            f"{base.sql_texto(url)}, {base.sql_fecha(fecha)}) "
            "on conflict (variante_id, periodo) do nothing;"
        )

    correcciones = _correcciones_nombres(con_demre)
    programas = {
        (r["oferta_institucion_codigo"], base.normalizar(r["oferta_carrera_nombre_oficial"])):
        r["oferta_carrera_nombre_oficial"]
        for r in filas
    }
    for (codigo_institucion, nombre_normalizado), nombre_oficial in sorted(programas.items()):
        nombre = correcciones.get(nombre_oficial)
        if not nombre:
            continue
        lotes["11_nombres_demre"].append(
            "update programa p set "
            f"nombre = {base.sql_texto(nombre)}, nombre_verificado = true, "
            f"nombre_fuente_id = {fuente_sql}, nombre_verificado_el = {base.sql_fecha(fecha)} "
            "from institucion i where p.institucion_id = i.id "
            f"and i.codigo_oficial = {base.sql_texto(codigo_institucion)} "
            f"and p.nombre_normalizado = {base.sql_texto(nombre_normalizado)} "
            f"and p.nombre_oficial = {base.sql_texto(nombre_oficial)};"
        )

    informe = {
        "carreras_con_demre": len(con_demre),
        "vacantes": cupos_filas,
        "vacantes_sin_dato": cupos_sin_dato,
        "requisitos": len(con_demre),
        "ponderaciones_que_suman_100": len(con_demre),
        "nombres_corregidos": len(lotes["11_nombres_demre"]),
        "nombres_pendientes": len(programas) - len(lotes["11_nombres_demre"]),
    }
    return lotes, informe


def escribir(lotes: dict[str, list[str]], informe: dict, salida: Path) -> None:
    salida.mkdir(parents=True, exist_ok=True)
    for nombre, sentencias in lotes.items():
        (salida / f"{nombre}.sql").write_text("\n".join(sentencias) + "\n", encoding="utf-8")
    (salida / "informe_demre.json").write_text(json.dumps(informe, ensure_ascii=False, indent=2), encoding="utf-8")


def main(argv: list[str]) -> int:
    carga = Path(argv[1]) if len(argv) > 1 else base.CARGA_POR_DEFECTO
    salida = Path(argv[2]) if len(argv) > 2 else base.SALIDA_POR_DEFECTO
    try:
        lotes, informe = construir(base.leer(carga))
    except base.ErrorDeLote as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1
    escribir(lotes, informe, salida)
    print(json.dumps(informe, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
