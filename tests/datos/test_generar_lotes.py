"""Pruebas de datos/generar_lotes.py con un archivo de ejemplo inventado.

Los datos no son reales: instituciones, carreras y valores son ficticios.
"""

import csv
import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("generar_lotes", RAIZ / "datos" / "generar_lotes.py")
generar = importlib.util.module_from_spec(spec)
sys.modules["generar_lotes"] = generar
spec.loader.exec_module(generar)

COLUMNAS = [
    "oferta_codigo_sies", "oferta_institucion_codigo", "oferta_institucion_nombre",
    "oferta_institucion_tipo", "oferta_carrera_codigo", "oferta_carrera_nombre_oficial",
    "oferta_carrera_generica", "oferta_sede", "oferta_comuna", "oferta_region", "oferta_jornada",
    "oferta_modalidad", "oferta_vigencia", "oferta_duracion_formal_semestres",
    "oferta_matricula_total", "oferta_arancel_anual_pesos", "oferta_arancel_unidad_original",
    "oferta_arancel_valor_original", "oferta_matricula_inscripcion_pesos", "oferta_uf_valor",
    "oferta_uf_fecha", "oferta_motivo_arancel", "oferta_motivo_matricula_inscripcion",
    "oferta_acreditacion_estado", "oferta_acreditacion_anios", "oferta_acreditacion_desde",
    "oferta_acreditacion_hasta", "oferta_motivo_acreditacion", "oferta_codigo_demre",
    "oferta_fuente", "oferta_url_archivo", "oferta_fecha_descarga", "oferta_periodo",
]


def fila(**cambios):
    base = {c: "" for c in COLUMNAS}
    base.update({
        "oferta_codigo_sies": "I900S1C1J1V1",
        "oferta_institucion_codigo": "900",
        "oferta_institucion_nombre": "Instituto de Ejemplo",
        "oferta_institucion_tipo": "instituto_profesional",
        "oferta_carrera_codigo": "1",
        "oferta_carrera_nombre_oficial": "Carrera Ficticia",
        "oferta_carrera_generica": "Área ficticia",
        "oferta_sede": "Sede A",
        "oferta_comuna": "Comuna A",
        "oferta_region": "Metropolitana",
        "oferta_jornada": "Diurna",
        "oferta_duracion_formal_semestres": "6",
        "oferta_arancel_anual_pesos": "1000000",
        "oferta_arancel_unidad_original": "pesos",
        "oferta_arancel_valor_original": "1000000",
        "oferta_acreditacion_estado": "acreditada",
        "oferta_acreditacion_anios": "4",
        "oferta_acreditacion_hasta": "2030-01-01",
        "oferta_fuente": "Datos Abiertos Mineduc",
        "oferta_url_archivo": "https://ejemplo.invalid/archivo.rar",
        "oferta_fecha_descarga": "2026-11-05",
        "oferta_periodo": "matrícula 2026",
    })
    base.update(cambios)
    return base


class GenerarLotesTest(unittest.TestCase):
    def construir(self, filas):
        lotes, informe = generar.construir(filas)
        return lotes, informe

    def test_una_carrera_en_dos_sedes_es_un_programa_y_dos_variantes(self):
        filas = [
            fila(),
            fila(oferta_codigo_sies="I900S2C1J1V1", oferta_sede="Sede B"),
        ]
        _, informe = self.construir(filas)
        self.assertEqual(informe["programas"], 1)
        self.assertEqual(informe["variantes"], 2)

    def test_el_programa_se_identifica_por_institucion_y_nombre_normalizado(self):
        lotes, _ = self.construir([fila(oferta_carrera_nombre_oficial="Enfermería  Ficticia")])
        self.assertIn("'enfermeria ficticia'", lotes["04_programas"][0])
        self.assertIn("on conflict (institucion_id, nombre_normalizado) do nothing", lotes["04_programas"][0])

    def test_nombres_que_difieren_solo_en_tildes_forman_un_programa(self):
        filas = [
            fila(),
            fila(oferta_codigo_sies="I900S2C1J1V1", oferta_sede="Sede B",
                 oferta_carrera_nombre_oficial="CARRERA FICTICIA"),
        ]
        _, informe = self.construir(filas)
        self.assertEqual(informe["programas"], 1)
        self.assertEqual(informe["nombres_que_se_unifican"], 1)

    def test_normalizar_quita_tildes_y_espacios(self):
        self.assertEqual(generar.normalizar("  Ingeniería   Civil  "), "ingenieria civil")

    def test_programa_conserva_el_nombre_oficial(self):
        lotes, _ = self.construir([fila()])
        sentencia = lotes["04_programas"][0]

        self.assertIn("nombre_oficial", sentencia)
        self.assertEqual(sentencia.count("'Carrera Ficticia'"), 2)

    def test_arancel_en_uf_exige_valor_y_fecha_de_uf(self):
        filas = [fila(oferta_arancel_unidad_original="uf", oferta_arancel_valor_original="30")]
        with self.assertRaises(generar.ErrorDeLote):
            self.construir(filas)

    def test_arancel_en_uf_con_valor_y_fecha_pasa(self):
        filas = [fila(
            oferta_arancel_unidad_original="uf",
            oferta_arancel_valor_original="30",
            oferta_uf_valor="41000",
            oferta_uf_fecha="2026-11-05",
        )]
        lotes, _ = self.construir(filas)
        self.assertIn("'uf'", lotes["06_aranceles"][0])
        self.assertIn("'2026-11-05'", lotes["06_aranceles"][0])

    def test_sin_arancel_queda_nulo_con_el_motivo_oficial(self):
        filas = [fila(
            oferta_arancel_anual_pesos="",
            oferta_arancel_unidad_original="",
            oferta_arancel_valor_original="",
            oferta_motivo_arancel="Mineduc informa 0 o no informa este monto",
        )]
        lotes, informe = self.construir(filas)
        self.assertIn("NULL, NULL, NULL, NULL, NULL, 'Mineduc informa 0 o no informa este monto'", lotes["06_aranceles"][0])
        self.assertEqual(informe["aranceles_sin_monto"], 1)

    def test_codigo_sies_repetido_se_detiene(self):
        with self.assertRaises(generar.ErrorDeLote):
            self.construir([fila(), fila(oferta_sede="Sede B")])

    def test_tipo_de_institucion_invalido_se_detiene(self):
        with self.assertRaises(generar.ErrorDeLote):
            self.construir([fila(oferta_institucion_tipo="escuela")])

    def test_acreditacion_inconsistente_en_una_institucion_se_detiene(self):
        filas = [
            fila(),
            fila(oferta_codigo_sies="I900S2C2J1V1", oferta_carrera_codigo="2", oferta_acreditacion_anios="5"),
        ]
        with self.assertRaises(generar.ErrorDeLote):
            self.construir(filas)

    def test_comilla_simple_en_el_nombre_se_escapa(self):
        lotes, _ = self.construir([fila(oferta_carrera_nombre_oficial="Carrera d'Ejemplo")])
        self.assertIn("'Carrera d''Ejemplo'", lotes["04_programas"][0])

    def test_las_sentencias_son_idempotentes(self):
        lotes, _ = self.construir([fila()])
        for nombre, sentencias in lotes.items():
            for s in sentencias:
                self.assertIn("on conflict", s, nombre)

    def test_cli_escribe_archivos_y_no_cambia_el_csv(self):
        with tempfile.TemporaryDirectory() as tmp:
            carga = Path(tmp) / "carga.csv"
            with carga.open("w", encoding="utf-8", newline="") as f:
                w = csv.DictWriter(f, fieldnames=COLUMNAS)
                w.writeheader()
                w.writerow(fila())
            antes = carga.read_bytes()
            salida = Path(tmp) / "lotes"
            codigo = generar.main(["x", str(carga), str(salida)])
            self.assertEqual(codigo, 0)
            self.assertEqual(carga.read_bytes(), antes)
            informe = json.loads((salida / "informe.json").read_text(encoding="utf-8"))
            self.assertEqual(informe["filas_leidas"], 1)
            self.assertTrue((salida / "06_aranceles.sql").exists())


if __name__ == "__main__":
    unittest.main()
