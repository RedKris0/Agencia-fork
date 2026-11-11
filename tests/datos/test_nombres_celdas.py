"""Pruebas de datos/pronosticos/nombres_celdas.py con un archivo de ejemplo en latin-1.

Usa unittest (no pytest): así lo corre la CI con `python3 -m unittest discover`.
"""
import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("nombres_celdas", RAIZ / "datos/pronosticos/nombres_celdas.py")
nc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(nc)

CABECERA = [
    "AÑO", "NIVEL GLOBAL", "CÓDIGO DE INSTITUCIÓN", "NOMBRE INSTITUCIÓN", "NOMBRE SEDE",
    "NOMBRE CARRERA", "CÓDIGO CARRERA", "REGIÓN", "COMUNA", "JORNADA", "CLASIFICACIÓN INSTITUCIÓN NIVEL 1",
]


def fila(anio, nivel, codigo, sede="SEDE ÑUÑOA", nombre="PSICOLOGÍA", inst="430", clasif="Universidades"):
    return [f"MAT_{anio}", nivel, inst, "UNIVERSIDAD DE PRUEBA", sede, nombre, codigo,
            "Metropolitana", "ÑUÑOA", "Diurna", clasif]


class PruebasNombresCeldas(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def escribir(self, filas):
        ruta = self.tmp / "matricula.csv"
        texto = ";".join(CABECERA) + "\n" + "\n".join(";".join(f) for f in filas) + "\n"
        ruta.write_bytes(texto.encode("latin-1"))
        return ruta

    def test_toma_el_anio_mas_reciente(self):
        ruta = self.escribir([
            fila(2024, "Pregrado", "I430S22C280J1V1", nombre="NOMBRE VIEJO"),
            fila(2025, "Pregrado", "I430S22C280J1V1", nombre="NOMBRE NUEVO"),
        ])
        filas = nc.leer_nombres(ruta)
        self.assertEqual(len(filas), 1)
        self.assertEqual(filas[0]["carrera_nombre"], "NOMBRE NUEVO")
        self.assertEqual(filas[0]["anio_referencia"], 2025)

    def test_conserva_tildes_y_enie_desde_latin1(self):
        ruta = self.escribir([fila(2026, "Pregrado", "I430S22C280J1V1")])
        f = nc.leer_nombres(ruta)[0]
        self.assertEqual(f["sede"], "SEDE ÑUÑOA")
        self.assertEqual(f["carrera_nombre"], "PSICOLOGÍA")
        self.assertEqual(f["comuna"], "ÑUÑOA")

    def test_excluye_lo_que_no_es_pregrado(self):
        ruta = self.escribir([
            fila(2026, "Postgrado", "I430S22C280J1V1"),
            fila(2026, "Pregrado", "I430S22C281J1V1"),
        ])
        filas = nc.leer_nombres(ruta)
        self.assertEqual([f["codigo_sies"] for f in filas], ["I430S22C281J1V1"])

    def test_salta_filas_sin_codigo(self):
        ruta = self.escribir([fila(2026, "Pregrado", "")])
        self.assertEqual(nc.leer_nombres(ruta), [])

    def test_falta_una_columna_es_error_claro(self):
        ruta = self.tmp / "malo.csv"
        ruta.write_bytes("AÑO;OTRA\n2026;x\n".encode("latin-1"))
        with self.assertRaises(SystemExit):
            nc.leer_nombres(ruta)

    def test_tipo_de_institucion_usa_el_mismo_codigo_que_la_oferta(self):
        self.assertEqual(nc.tipo_institucion("Universidades"), "universidad")
        self.assertEqual(nc.tipo_institucion("Institutos Profesionales"), "instituto_profesional")
        self.assertEqual(nc.tipo_institucion("Centros de Formaci�n T�cnica"), "centro_formacion_tecnica")
        self.assertEqual(nc.tipo_institucion("otra cosa"), "")

    def test_un_codigo_en_dos_sedes_conserva_ambos_nombres_de_sede(self):
        ruta = self.escribir([
            fila(2026, "Pregrado", "I11S2C64J1V1", sede="CAMPUS REPUBLICA"),
            fila(2026, "Pregrado", "I11S2C64J1V1", sede="CAMPUS SERRANO"),
        ])
        filas = nc.leer_nombres(ruta)
        self.assertEqual(sorted(f["sede"] for f in filas), ["CAMPUS REPUBLICA", "CAMPUS SERRANO"])

    def test_guarda_el_tipo_de_institucion(self):
        ruta = self.escribir([fila(2026, "Pregrado", "I430S22C280J1V1", clasif="Institutos Profesionales")])
        self.assertEqual(nc.leer_nombres(ruta)[0]["institucion_tipo"], "instituto_profesional")


if __name__ == "__main__":
    unittest.main()
