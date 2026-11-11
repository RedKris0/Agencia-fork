import assert from 'node:assert/strict';
import test from 'node:test';

import { validarPuntajeRanking } from '../../../lib/calculos/2027/puntaje-ranking.ts';

// ADR 0024: el Puntaje Ranking lo ingresa la persona estudiante; no se calcula.
test('acepta un Puntaje Ranking ingresado dentro del rango oficial', () => {
  assert.equal(validarPuntajeRanking(100), 100);
  assert.equal(validarPuntajeRanking(700), 700);
  assert.equal(validarPuntajeRanking(1000), 1000);
});

test('rechaza un Puntaje Ranking fuera de rango o que no es un número', () => {
  const mensaje = /Puntaje Ranking debe ser un número entre 100 y 1000/i;

  assert.throws(() => validarPuntajeRanking(99), mensaje);
  assert.throws(() => validarPuntajeRanking(1001), mensaje);
  assert.throws(() => validarPuntajeRanking(Number.NaN), mensaje);
  assert.throws(() => validarPuntajeRanking('700' as unknown as number), mensaje);
});
