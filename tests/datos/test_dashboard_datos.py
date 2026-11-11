"""Pruebas del generador de datos del tablero (datos/pronosticos/dashboard/generar_datos.py).

Usan datos mínimos hechos a mano: datos/procesados/ no está en el repositorio.
"""

import json
import math
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "datos" / "pronosticos" / "dashboard"))

import generar_datos as g  # noqa: E402


def _oferta():
    return [
        {"codigo_sies": "I1S1C1J1V1", "institucion_codigo": "1", "institucion_nombre": "UNIVERSIDAD A",
         "institucion_tipo": "universidad", "carrera_nombre_oficial": "DERECHO", "sede": "SEDE UNO",
         "comuna": "RANCAGUA", "region": "Lib. Gral. B. O'Higgins", "jornada": "Diurna", "modalidad": "Presencial"},
        {"codigo_sies": "I2S1C2J2V1", "institucion_codigo": "2", "institucion_nombre": "CFT B",
         "institucion_tipo": "centro_formacion_tecnica", "carrera_nombre_oficial": "ENFERMERIA", "sede": "SEDE DOS",
         "comuna": "TALCA", "region": "Maule", "jornada": "Vespertina", "modalidad": "Presencial"},
    ]


class Pruebas(unittest.TestCase):
    def test_cuantil_interpola(self):
        self.assertAlmostEqual(g.cuantil([1, 2, 3, 4, 5], 0.5), 3)
        self.assertAlmostEqual(g.cuantil([0, 10], 0.25), 2.5)

    def test_factores_intervalo_invierten_el_signo(self):
        # error = ln(previsto/real): un error negativo grande significa real mayor que lo previsto.
        fi = g.factores_intervalo([-0.5] * 5 + [0.0] * 90 + [0.3] * 5)
        self.assertLess(fi["factor_bajo"], 1)
        self.assertGreater(fi["factor_alto"], 1)
        self.assertAlmostEqual(fi["factor_alto"], math.exp(0.5), places=2)

    def test_celdas_suprimidas_no_llevan_cifra_ni_sexo(self):
        entrada = [
            {"institucion": "1", "sede": "SEDE UNO", "carrera": "I1S1C1J1V1", "entrantes_2027": "50",
             "proporcion_mujeres_2027": "0.8", "estado": "publicable"},
            {"institucion": "2", "sede": "SEDE DOS", "carrera": "I2S1C2J2V1", "entrantes_2027": "",
             "proporcion_mujeres_2027": "", "estado": "suprimido"},
        ]
        fi = {"factor_bajo": 0.6, "factor_alto": 2.0}
        r = g.construir_celdas(entrada, _oferta(), fi)
        self.assertEqual(len(r["filas"]), 1)
        self.assertEqual(len(r["suprimidas"]), 1)
        # grupo (institución, región, jornada) más sede, carrera y comuna: sin cifras
        self.assertEqual(len(r["suprimidas"][0]), 6)
        fila = dict(zip(r["columnas"], r["filas"][0]))
        self.assertEqual((fila["entrantes"], fila["inferior"], fila["superior"]), (50, 30, 100))
        texto = json.dumps(r).lower()
        self.assertNotIn("mujer", texto)
        self.assertNotIn("0.8", texto)

    def test_suprimida_sin_oferta_toma_su_nombre_del_historico(self):
        entrada = [
            {"institucion": "430", "sede": "SEDE CHILLAN", "carrera": "I430S22C280J1V1", "entrantes_2027": "",
             "proporcion_mujeres_2027": "", "estado": "suprimido"},
            {"institucion": "9", "sede": "SEDE SIN NADA", "carrera": "I9S1C9J1V1", "entrantes_2027": "",
             "proporcion_mujeres_2027": "", "estado": "suprimido"},
        ]
        nombres = {("I430S22C280J1V1", "SEDE CHILLAN"): {
            "codigo_sies": "I430S22C280J1V1", "institucion_codigo": "430", "institucion_nombre": "UNIVERSIDAD C",
            "institucion_tipo": "universidad",
            "sede": "SEDE CHILLAN", "carrera_nombre": "TURISMO", "region": "Ñuble", "comuna": "CHILLAN",
            "jornada": "Diurna", "anio_referencia": "2025"}}
        fi = {"factor_bajo": 0.6, "factor_alto": 2.0}
        r = g.construir_celdas(entrada, _oferta(), fi, nombres)
        self.assertEqual(len(r["suprimidas"]), 1)  # la celda sin nombre en ninguna fuente se cuenta aparte
        self.assertEqual(r["suprimidas_sin_ficha"], 1)
        s = r["suprimidas"][0]
        self.assertEqual(r["instituciones"][s[0]]["nombre"], "UNIVERSIDAD C")
        self.assertEqual(r["instituciones"][s[0]]["tipo"], "universidad")  # viene del nombre histórico
        self.assertEqual(s[3], "SEDE CHILLAN")
        self.assertEqual(s[4], "TURISMO")
        self.assertEqual(r["comunas"][s[5]], "CHILLAN")
        self.assertNotIn("entrantes", json.dumps(r["suprimidas"]))

    def test_celda_bajo_umbral_no_se_muestra_aunque_diga_publicable(self):
        entrada = [{"institucion": "1", "sede": "S", "carrera": "I1S1C1J1V1", "entrantes_2027": "9",
                    "proporcion_mujeres_2027": "", "estado": "publicable"}]
        r = g.construir_celdas(entrada, _oferta(), {"factor_bajo": 0.6, "factor_alto": 2.0})
        self.assertEqual(r["filas"], [])

    def test_region_de_oferta_se_normaliza(self):
        entrada = [{"institucion": "1", "sede": "S", "carrera": "I1S1C1J1V1", "entrantes_2027": "20",
                    "proporcion_mujeres_2027": "", "estado": "publicable"}]
        r = g.construir_celdas(entrada, _oferta(), {"factor_bajo": 0.6, "factor_alto": 2.0})
        self.assertEqual(r["regiones"], ["O'Higgins"])

    def test_proyeccion_de_comuna_suprime_bajo_el_umbral(self):
        self.assertIsNone(g.proyectar_comuna(9, 1.0314, 0.802, 1.355))
        self.assertIsNone(g.proyectar_comuna(None, 1.0314, 0.802, 1.355))
        p = g.proyectar_comuna(1000, 1.0314, 0.802, 1.355)
        self.assertEqual((p["inferior"], p["central"], p["superior"]), (802, 1031, 1355))

    def test_resumen_validacion_cuenta_cobertura_y_tramos(self):
        filas = []
        for i, (real, prev, cub) in enumerate([(40, 36, 1), (60, 90, 0), (150, 140, 1), (400, 410, 1)]):
            filas.append({"anio": "2025", "real": str(real), "previsto": str(prev),
                          "error_log": str(math.log(prev / real)),
                          "limite_inferior_log": "-0.6", "limite_superior_log": "0.4", "cubierto": str(cub)})
        r = g.resumen_validacion(filas)
        self.assertEqual(r["casos"], 4)
        self.assertAlmostEqual(r["cobertura"], 0.75)
        self.assertEqual([t["tramo"] for t in r["por_tramo"]], ["30 a 49", "50 a 99", "100 a 299", "300 o más"])
        self.assertEqual(sum(r["histograma"]["conteos"]) + r["histograma"]["fuera_bajo"]
                         + r["histograma"]["fuera_alto"], 4)
        self.assertAlmostEqual(r["por_anio"][0]["ancho"], math.exp(1.0))

    def test_region_de_comuna_por_codigo(self):
        self.assertEqual(g.region_de_comuna("06101"), "O'Higgins")
        self.assertEqual(g.region_de_comuna("16101"), "Ñuble")
        self.assertIsNone(g.region_de_comuna("99999"))

    def test_carreras_nuevas_son_las_filas_sin_codigo_sies(self):
        decisiones = [
            {"codigo_demre": "1", "institucion_sies": "1", "carrera_demre": "NUEVA", "lugar": "SEDE NUEVA",
             "codigo_sies": "", "decision": "carrera nueva en sede X"},
            {"codigo_demre": "2", "institucion_sies": "2", "carrera_demre": "ASIGNADA", "lugar": "SANTIAGO",
             "codigo_sies": "I2S1C2J1V1", "decision": "asignado"},
        ]
        nuevas = g.construir_nuevas(decisiones, _oferta())
        self.assertEqual(len(nuevas), 1)
        self.assertEqual(nuevas[0]["carrera"], "NUEVA")
        self.assertEqual(nuevas[0]["institucion"], "UNIVERSIDAD A")
        self.assertEqual(nuevas[0]["sede"], "SEDE NUEVA")
        self.assertNotIn("entrantes", json.dumps(nuevas))


if __name__ == "__main__":
    unittest.main()
