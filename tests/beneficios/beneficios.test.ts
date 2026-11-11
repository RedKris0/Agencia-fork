import assert from "node:assert/strict";
import test from "node:test";

import { filtrarBeneficios, hitosConEstado, hoyEnChile, ordenarPlazos, primerPeriodoCerrado } from "../../app/(portal)/beneficios/beneficios.ts";

test("busca beneficios sin distinguir tildes", () => {
  const beneficios = [
    { codigo: "uno", nombre_oficial: "Beca Educación", explicacion_simple: "Podrías recibir apoyo.", requisitos_simples: [], cobertura: { descripcion: "Apoyo" }, postulacion: "Formulario", fuente: "Mineduc", url: "https://ejemplo.cl", fecha_consulta: "2026-11-05" },
  ];

  assert.equal(filtrarBeneficios(beneficios, "educacion").length, 1);
});

test("ordena plazos publicados antes de las fechas pendientes", () => {
  const plazos = [
    { codigo: "pendiente", proceso: "Pendiente", descripcion: "", inicio: null, termino: null, estado: "fecha_pendiente" as const, motivo_sin_fecha: "Sin fecha", fuente: "Mineduc", url: "https://ejemplo.cl", fecha_consulta: "2026-11-05" },
    { codigo: "publicado", proceso: "Publicado", descripcion: "", inicio: "2026-10-01", termino: "2026-10-22", estado: "publicado" as const, motivo_sin_fecha: null, fuente: "Mineduc", url: "https://ejemplo.cl", fecha_consulta: "2026-11-05" },
  ];

  assert.deepEqual(ordenarPlazos(plazos).map((plazo) => plazo.codigo), ["publicado", "pendiente"]);
});

const plazo = (codigo: string, inicio: string | null, termino: string | null, extra = {}) => ({
  codigo, proceso: codigo, descripcion: "", inicio, termino,
  estado: inicio ? ("publicado" as const) : ("fecha_pendiente" as const),
  motivo_sin_fecha: inicio ? null : "Sin fecha", fuente: "FUAS, Mineduc", url: "https://ejemplo.cl", fecha_consulta: "2026-11-11", ...extra,
});

const primerPeriodo = [
  plazo("fuas_primer_periodo", "2026-10-01", "2026-10-22"),
  plazo("fuas_extension_primer_periodo", "2026-10-22", "2026-11-06"),
  plazo("nivel_socioeconomico_primer_periodo", "2026-12-17", "2026-12-17"),
  plazo("fuas_segundo_periodo", null, null, { periodo_referencial: "febrero a marzo de 2027" }),
];

test("el primer período sigue abierto hasta el último día de la extensión", () => {
  assert.equal(primerPeriodoCerrado(primerPeriodo, "2026-10-30"), null);
  assert.equal(primerPeriodoCerrado(primerPeriodo, "2026-11-06"), null);
});

test("el primer período figura cerrado desde el día siguiente a la extensión", () => {
  const cerrado = primerPeriodoCerrado(primerPeriodo, "2026-11-07");
  assert.equal(cerrado?.cierre, "2026-11-06");
  assert.equal(cerrado?.nivelSocioeconomico, "2026-12-17");
  assert.equal(cerrado?.segundoPeriodo, "febrero a marzo de 2027");
});

test("sin fecha de término publicada no se afirma que cerró", () => {
  const sinFecha = [plazo("fuas_primer_periodo", null, null)];
  assert.equal(primerPeriodoCerrado(sinFecha, "2027-01-01"), null);
});

test("sin la fecha de nivel socioeconómico o del segundo período, no se inventan", () => {
  const cerrado = primerPeriodoCerrado([plazo("fuas_primer_periodo", "2026-10-01", "2026-10-22")], "2026-11-11");
  assert.equal(cerrado?.nivelSocioeconomico, null);
  assert.equal(cerrado?.segundoPeriodo, null);
});

test("la fecha de hoy se toma en la zona horaria de Chile", () => {
  // 01:00 UTC del 7 de noviembre es todavía el 6 de noviembre en Chile (UTC-3).
  assert.equal(hoyEnChile(new Date("2026-11-07T01:00:00Z")), "2026-11-06");
  assert.equal(hoyEnChile(new Date("2026-11-07T12:00:00Z")), "2026-11-07");
});

const hitos = [
  plazo("nivel_socioeconomico_primer_periodo", "2026-12-17", "2026-12-17"),
  plazo("preseleccion_primer_periodo", "2027-01-15", "2027-01-15"),
  plazo("asignacion_primer_periodo", "2027-03-10", "2027-03-10"),
  plazo("apelacion_primer_periodo", "2027-03-10", "2027-03-25"),
];
const codigosHitos = hitos.map((hito) => hito.codigo);
const estados = (hoy: string) => hitosConEstado(hitos, codigosHitos, hoy).map((h) => h.estado);

test("antes del primer hito, el primero es el próximo y el resto queda más adelante", () => {
  assert.deepEqual(estados("2026-11-11"), ["proximo", "mas_adelante", "mas_adelante", "mas_adelante"]);
});

test("el día del hito está en curso y el siguiente pasa a ser el próximo", () => {
  assert.deepEqual(estados("2026-12-17"), ["en_curso", "mas_adelante", "mas_adelante", "mas_adelante"]);
  assert.deepEqual(estados("2026-12-18"), ["paso", "proximo", "mas_adelante", "mas_adelante"]);
});

test("un período de varios días está en curso entre su inicio y su término", () => {
  assert.deepEqual(estados("2027-03-20"), ["paso", "paso", "paso", "en_curso"]);
  assert.deepEqual(estados("2027-03-26"), ["paso", "paso", "paso", "paso"]);
});

test("un hito sin fecha publicada no se marca como pasado ni como próximo", () => {
  const conSinFecha = [...hitos.slice(0, 1), plazo("preseleccion_primer_periodo", null, null)];
  assert.deepEqual(hitosConEstado(conSinFecha, ["nivel_socioeconomico_primer_periodo", "preseleccion_primer_periodo"], "2026-11-11").map((h) => h.estado), ["proximo", "sin_fecha"]);
});

test("los códigos que no existen en los datos se omiten", () => {
  assert.deepEqual(hitosConEstado(hitos, ["no_existe", "preseleccion_primer_periodo"], "2026-11-11").map((h) => h.plazo.codigo), ["preseleccion_primer_periodo"]);
});
