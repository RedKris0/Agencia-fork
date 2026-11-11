"""Valida los datos versionados de beneficios y plazos del proceso 2027."""
import json
import unittest
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

RAIZ = Path(__file__).resolve().parents[2]


def cargar(nombre):
    with (RAIZ / "datos" / "beneficios" / nombre).open(encoding="utf-8") as archivo:
        return json.load(archivo)


class PruebasBeneficios(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.catalogo = cargar("beneficios_2027.json")
        cls.beneficios = cls.catalogo["beneficios"]
        cls.por_codigo = {fila["codigo"]: fila for fila in cls.beneficios}

    def test_campos_trazables_y_codigos_unicos(self):
        self.assertEqual(len(self.por_codigo), len(self.beneficios))
        for fila in self.beneficios:
            for campo in ("codigo", "tipo", "nombre_oficial", "explicacion_simple", "requisitos_simples", "requisitos_oficiales", "cobertura", "fuente", "url", "fecha_consulta"):
                self.assertTrue(fila.get(campo) not in (None, "", []), (fila.get("codigo"), campo))
            self.assertEqual(urlparse(fila["url"]).hostname, "portal.beneficiosestudiantiles.cl")
            date.fromisoformat(fila["fecha_consulta"])

    def test_lenguaje_personal_no_promete_asignacion(self):
        promesas = ("recibirás", "obtendrás", "te corresponde", "vas a recibir")
        for fila in self.beneficios:
            texto = " ".join([fila["explicacion_simple"], *fila["requisitos_simples"]]).lower()
            self.assertIn("podrías", texto, fila["codigo"])
            for promesa in promesas:
                self.assertNotIn(promesa, texto, fila["codigo"])

    def test_valores_contrastados_a_mano_con_la_fuente(self):
        gratuidad = self.por_codigo["gratuidad"]
        self.assertEqual(gratuidad["tramo_socioeconomico_maximo"], 60)
        self.assertIn("Matrícula y arancel", gratuidad["cobertura"]["descripcion"])
        # Verificados manualmente por Cristóbal el 2026-11-06; detalle en el README.
        montos = {
            "beca_nuevo_milenio": 860000,
            "beca_excelencia_academica": 1150000,
            "beca_excelencia_tecnica": 900000,
            "beca_trayectorias_educativas": 1150000,
            "beca_hijos_profesionales_educacion": 500000,
            "beca_articulacion": 750000,
            "beca_juan_gomez_millas": 1150000,
            "beca_juan_gomez_millas_extranjeros": 1150000,
        }
        for codigo, monto in montos.items():
            self.assertEqual(self.por_codigo[codigo]["cobertura"]["monto_maximo_pesos"], monto)

    def test_no_copia_fechas_desactualizadas_de_juan_gomez_millas(self):
        advertencias = {fila["codigo_beneficio"]: fila for fila in self.catalogo["advertencias_fuente"]}
        for codigo in ("beca_juan_gomez_millas", "beca_juan_gomez_millas_extranjeros"):
            self.assertIn(codigo, self.por_codigo)
            self.assertIn(codigo, advertencias)
            self.assertIn("2025", advertencias[codigo]["motivo"])
            self.assertNotIn("2025", " ".join(self.por_codigo[codigo]["requisitos_oficiales"]))


class PruebasPlazos(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.catalogo = cargar("plazos_2027.json")
        cls.plazos = cls.catalogo["plazos"]
        cls.por_codigo = {fila["codigo"]: fila for fila in cls.plazos}

    def test_primer_periodo_fuas_contrastado_con_la_fuente(self):
        plazo = self.por_codigo["fuas_primer_periodo"]
        self.assertEqual((plazo["inicio"], plazo["termino"]), ("2026-10-01", "2026-10-22"))

    def test_extension_y_hitos_del_primer_periodo_contrastados_con_la_fuente(self):
        # Contrastado el 2026-11-11 con https://postulacion.beneficiosestudiantiles.cl/fuas/
        esperado = {
            "fuas_extension_primer_periodo": ("2026-10-22", "2026-11-06"),
            "nivel_socioeconomico_primer_periodo": ("2026-12-17", "2026-12-17"),
            "preseleccion_primer_periodo": ("2027-01-15", "2027-01-15"),
            "asignacion_primer_periodo": ("2027-03-10", "2027-03-10"),
            "apelacion_primer_periodo": ("2027-03-10", "2027-03-25"),
        }
        for codigo, fechas in esperado.items():
            plazo = self.por_codigo[codigo]
            self.assertEqual((plazo["inicio"], plazo["termino"]), fechas, codigo)
            self.assertEqual(plazo["estado"], "publicado", codigo)

    def test_fechas_publicadas_son_iso_y_ordenadas(self):
        for fila in self.plazos:
            for campo in ("fuente", "url", "fecha_consulta"):
                self.assertTrue(fila.get(campo), (fila["codigo"], campo))
            self.assertIn(urlparse(fila["url"]).hostname, {"www.fuas.cl", "portal.beneficiosestudiantiles.cl", "postulacion.beneficiosestudiantiles.cl"})
            date.fromisoformat(fila["fecha_consulta"])
            if fila["estado"] == "publicado":
                inicio = date.fromisoformat(fila["inicio"])
                termino = date.fromisoformat(fila["termino"])
                self.assertLessEqual(inicio, termino, fila["codigo"])

    def test_fecha_ausente_tiene_motivo_y_nunca_cero(self):
        for fila in self.plazos:
            for campo in ("inicio", "termino"):
                self.assertNotEqual(fila[campo], 0, fila["codigo"])
            if fila["inicio"] is None or fila["termino"] is None:
                self.assertEqual(fila["estado"], "fecha_pendiente", fila["codigo"])
                self.assertTrue(fila["motivo_sin_fecha"], fila["codigo"])


if __name__ == "__main__":
    unittest.main()
