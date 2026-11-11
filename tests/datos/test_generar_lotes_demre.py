"""Pruebas de datos/generar_lotes_demre.py con filas inventadas (no son datos reales)."""

import importlib.util
import sys
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RAIZ / "datos"))
spec = importlib.util.spec_from_file_location("generar_lotes_demre", RAIZ / "datos" / "generar_lotes_demre.py")
demre = importlib.util.module_from_spec(spec)
sys.modules["generar_lotes_demre"] = demre
spec.loader.exec_module(demre)
base = demre.base


def fila(**cambios):
    f = {
        "oferta_institucion_codigo": "900",
        "oferta_carrera_nombre_oficial": "CARRERA FICTICIA",
        "demre_codigo": "9001", "demre_carrera": "Carrera Ficticia", "demre_notas": "", "demre_lugar": "Sede A",
        "demre_nem": "10", "demre_ranking": "20", "demre_lectora": "20", "demre_matematica_1": "20",
        "demre_matematica_2": "10", "demre_historia_cs_sociales": "10", "demre_ciencias": "10",
        "demre_historia_o_ciencias": "no", "demre_prueba_especial": "", "demre_asignacion_especial_pedagogia": "",
        "demre_puntaje_ponderado_minimo": "", "demre_puntaje_promedio_minimo": "",
        "demre_vacantes_regular": "50", "demre_vacantes_regular_2do_semestre": "", "demre_vacantes_mc": "",
        "demre_vacantes_bea": "", "demre_vacantes_pace": "", "demre_pagina_pdf": "12",
        "demre_fuente": "DEMRE", "demre_url_archivo": "https://ejemplo.invalid/demre.pdf",
        "demre_fecha_descarga": "2026-11-05", "demre_periodo": "Admisión 2027, oferta definitiva (2026-09-24)",
    }
    f.update(cambios)
    return f


class LotesDemreTest(unittest.TestCase):
    def test_cada_carrera_genera_cinco_vacantes_y_un_requisito(self):
        lotes, informe = demre.construir([fila()])
        self.assertEqual(len(lotes["09_vacantes_demre"]), 1 + 5)  # fuente + 5 vías
        self.assertEqual(len(lotes["10_requisitos_demre"]), 1)
        self.assertEqual(informe["vacantes_sin_dato"], 4)

    def test_cupos_no_publicados_quedan_nulos_con_motivo(self):
        lotes, _ = demre.construir([fila()])
        pace = [s for s in lotes["09_vacantes_demre"] if "'pace'" in s][0]
        self.assertIn("'pace', NULL", pace)
        self.assertIn("DEMRE no publica cupos", pace)

    def test_ponderaciones_que_no_suman_100_se_detienen(self):
        with self.assertRaises(base.ErrorDeLote):
            demre.construir([fila(demre_nem="11")])

    def test_historia_o_ciencias_usa_el_maximo(self):
        # Con historia_o_ciencias = si, la suma usa el máximo de historia y ciencias.
        r = fila(demre_historia_o_ciencias="si", demre_historia_cs_sociales="30", demre_ciencias="20",
                 demre_nem="10", demre_ranking="20", demre_lectora="20", demre_matematica_1="20",
                 demre_matematica_2="0", demre_prueba_especial="0", demre_asignacion_especial_pedagogia="0")
        self.assertEqual(demre._suma_ponderaciones(r), 100)

    def test_sin_filas_demre_se_detiene(self):
        with self.assertRaises(base.ErrorDeLote):
            demre.construir([fila(demre_codigo="")])

    def test_cupos_negativos_se_detienen(self):
        with self.assertRaises(base.ErrorDeLote):
            demre.construir([fila(demre_vacantes_regular="-1")])

    def test_tres_nombres_verificados_reciben_tildes_y_formato(self):
        # DEMRE, oferta definitiva 2027: páginas 500, 267 y 321.
        # https://demre.cl/publicaciones/pdf/2027-26-09-24-oferta-definitiva-carreras-p2027.pdf
        casos = [
            ("INGENIERIA EN CONSTRUCCION", "INGENIERÍA EN CONSTRUCCIÓN", "Ingeniería en Construcción"),
            ("ACTUACION TEATRAL", "ACTUACIÓN TEATRAL", "Actuación Teatral"),
            ("PSICOLOGIA", "PSICOLOGÍA", "Psicología"),
        ]

        for original, referencia, esperado in casos:
            with self.subTest(original=original):
                lotes, informe = demre.construir([fila(
                    oferta_carrera_nombre_oficial=original,
                    demre_carrera=referencia,
                )])
                self.assertIn(f"'{esperado}'", lotes["11_nombres_demre"][0])
                self.assertIn("nombre_verificado = true", lotes["11_nombres_demre"][0])
                self.assertEqual(informe["nombres_corregidos"], 1)
                self.assertEqual(informe["nombres_pendientes"], 0)

    def test_nombre_distinto_queda_original_y_pendiente(self):
        lotes, informe = demre.construir([fila(
            oferta_carrera_nombre_oficial="INGENIERIA EN CONSTRUCCION",
            demre_carrera="CONSTRUCCIÓN CIVIL",
        )])

        self.assertEqual(lotes["11_nombres_demre"], [])
        self.assertEqual(informe["nombres_corregidos"], 0)
        self.assertEqual(informe["nombres_pendientes"], 1)

    def test_referencias_inconsistentes_quedan_pendientes(self):
        filas = [
            fila(
                oferta_carrera_nombre_oficial="ADMINISTRACION PUBLICA",
                demre_carrera="ADMINISTRACIÓN PÚBLICA",
            ),
            fila(
                oferta_carrera_nombre_oficial="ADMINISTRACION PUBLICA",
                demre_codigo="9002",
                demre_carrera="ADMINISTRACIÓN PUBLICA",
            ),
        ]

        lotes, informe = demre.construir(filas)

        self.assertEqual(lotes["11_nombres_demre"], [])
        self.assertEqual(informe["nombres_pendientes"], 1)

    def test_nota_demre_no_pasa_al_nombre(self):
        lotes, _ = demre.construir([fila(
            oferta_carrera_nombre_oficial="PEDAGOGIA EN EDUCACION FISICA",
            demre_carrera="PEDAGOGÍA EN EDUCACIÓN FÍSICA (*)",
        )])

        self.assertIn("'Pedagogía en Educación Física'", lotes["11_nombres_demre"][0])
        self.assertNotIn("(*)", lotes["11_nombres_demre"][0])


if __name__ == "__main__":
    unittest.main()
