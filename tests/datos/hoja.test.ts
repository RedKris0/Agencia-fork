import assert from 'node:assert/strict';
import { test } from 'node:test';

import { listarCarreras } from '../../lib/datos/carreras.ts';
import { codigosDeLaHoja, rutaDeLaHoja, textoDeLaHoja } from '../../lib/datos/hoja.ts';

// Las pruebas usan la muestra, no la oferta exportada.
process.env.OFERTA_RUTA = new URL('../../datos/ejemplos/carreras.json', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

const carreras = listarCarreras();

test('la hoja acepta hasta tres opciones únicas y un respaldo distinto', () => {
  const { opciones, respaldo } = codigosDeLaHoja('a,b,a,c,d', 'e');
  assert.deepEqual(opciones, ['a', 'b', 'c']);
  assert.equal(respaldo, 'e');
});

test('el respaldo no puede repetir una de las opciones', () => {
  assert.equal(codigosDeLaHoja('a,b', 'b').respaldo, null);
  assert.deepEqual(codigosDeLaHoja(null, null), { opciones: [], respaldo: null });
});

test('el enlace de la hoja guarda solo códigos de carrera', () => {
  assert.equal(
    rutaDeLaHoja(carreras.slice(0, 2), carreras[2]),
    `/hoja?carreras=${carreras[0].codigo_sies},${carreras[1].codigo_sies}&respaldo=${carreras[2].codigo_sies}`,
  );
  assert.equal(rutaDeLaHoja(carreras.slice(0, 1)), `/hoja?carreras=${carreras[0].codigo_sies}`);
});

test('el texto descargable incluye las opciones, el respaldo, las anotaciones y la fuente de cada cifra', () => {
  const texto = textoDeLaHoja({
    opciones: carreras.slice(0, 2),
    respaldo: carreras[2],
    anotaciones: { influencia: 'El arancel anual me alcanza', pregunta: 'Cómo se paga el traslado' },
    fecha: '2026-11-11',
  });
  assert.match(texto, /Opción 1: /);
  assert.match(texto, /Opción 2: /);
  assert.match(texto, /Respaldo: /);
  assert.ok(texto.includes(carreras[0].carrera));
  assert.match(texto, /Generada el 11 de noviembre de 2026/);
  assert.match(texto, /El arancel anual me alcanza/);
  assert.match(texto, /Cómo se paga el traslado/);
  assert.match(texto, /Fuente: /);
  assert.match(texto, /Consultada el /);
});

test('sin anotaciones el texto lo dice y un dato faltante no se muestra como cero', () => {
  const texto = textoDeLaHoja({ opciones: carreras.slice(0, 1), respaldo: null, anotaciones: { influencia: '  ', pregunta: '' }, fecha: '2026-11-11' });
  assert.equal(texto.match(/\(sin anotar\)/g)?.length, 2);
  assert.ok(!texto.includes('Respaldo:'));
  assert.ok(!/: 0 \(/.test(texto));
});

test('el texto de la hoja pone la unidad a las cifras que la necesitan', () => {
  const texto = textoDeLaHoja({ opciones: carreras.slice(0, 1), respaldo: null, anotaciones: { influencia: '', pregunta: '' }, fecha: '2026-11-11' });
  assert.match(texto, /Duración real: [\d.,]+ semestres/);
  assert.match(texto, /Vacantes: [\d.,]+ cupos/);
  assert.match(texto, /Arancel anual: \$/);
});
