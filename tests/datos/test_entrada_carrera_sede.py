"""Pruebas de la lectura del archivo SIES en datos/pronosticos/entrada_carrera_sede.py.

El archivo oficial está en latin-1. Con utf-8 las tildes y eñes salían como �, y las sedes
dejaban de coincidir con la oferta. Usa unittest, como la CI.
"""
import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("entrada_carrera_sede", RAIZ / "datos/pronosticos/entrada_carrera_sede.py")
ecs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ecs)

CABECERA = [
    "AÑO", "TOTAL MATRICULA PRIMER AÑO", "TOTAL MATRICULA PRIMER AÑO MUJERES", "NIVEL GLOBAL",
    "CÓDIGO DE INSTITUCIÓN", "NOMBRE SEDE", "CÓDIGO CARRERA",
]


class PruebasLecturaSIES(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def escribir(self, filas):
        ruta = self.tmp / "sies.csv"
        texto = ";".join(CABECERA) + "\n" + "\n".join(";".join(f) for f in filas) + "\n"
        ruta.write_bytes(texto.encode("latin-1"))
        return ruta

    def test_conserva_tildes_y_enie_de_la_sede(self):
        ruta = self.escribir([["MAT_2026", "12", "5", "Pregrado", "19", "SEDE VIÑA DEL MAR", "I19S6C7J1V1"]])
        total, ent, muj = ecs.leer(ruta)
        self.assertIn(("19", "SEDE VIÑA DEL MAR", "I19S6C7J1V1"), ent[2026])
        self.assertEqual(ent[2026][("19", "SEDE VIÑA DEL MAR", "I19S6C7J1V1")], 12)
        self.assertEqual(muj[2026][("19", "SEDE VIÑA DEL MAR", "I19S6C7J1V1")], 5)
        self.assertEqual(total[2026], 12)

    def test_solo_cuenta_pregrado(self):
        ruta = self.escribir([
            ["MAT_2026", "12", "5", "Pregrado", "19", "SEDE X", "I19S1C1J1V1"],
            ["MAT_2026", "99", "0", "Postgrado", "19", "SEDE X", "I19S1C2J1V1"],
        ])
        total, _, _ = ecs.leer(ruta)
        self.assertEqual(total[2026], 12)


if __name__ == "__main__":
    unittest.main()
