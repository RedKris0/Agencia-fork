/* eslint-disable @typescript-eslint/no-require-imports -- archivo CommonJS: el paquete raíz es de tipo módulo */
// Pruebas de la lógica de filtros del tablero.
// Correr desde la raíz del repositorio: node --test datos/pronosticos/dashboard/filtros.test.cjs
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
// filtros.js es script de navegador (sin exports): se ejecuta en un contexto aislado.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'filtros.js'), 'utf8'), ctx);
const F = ctx.Filtros;
// Los objetos creados en el contexto aislado tienen otro prototipo: se copian a objetos normales para comparar.
const plano = o => JSON.parse(JSON.stringify(o));

test('sinTilde quita tildes y pasa a minúsculas', () => {
  assert.equal(F.sinTilde('Ñuñoa Ángeles'), 'nunoa angeles');
});

test('coincideTexto encuentra las palabras en cualquier orden', () => {
  const celda = 'SEDE SAN FERNANDO IP AIEP SAN FERNANDO';
  assert.equal(F.coincideTexto(celda, 'AIEP San Fernando'), true);
  assert.equal(F.coincideTexto(celda, 'san fernando aiep'), true);
});

test('coincideTexto exige todas las palabras', () => {
  assert.equal(F.coincideTexto('SEDE SAN FERNANDO IP AIEP', 'aiep rancagua'), false);
});

test('coincideTexto ignora tildes y mayúsculas', () => {
  assert.equal(F.coincideTexto('CAMPUS VIÑA DEL MAR', 'viña del mar'), true);
  assert.equal(F.coincideTexto('CAMPUS VIÑA DEL MAR', 'vina'), true);
});

test('coincideTexto con búsqueda vacía acepta todo', () => {
  assert.equal(F.coincideTexto('cualquier cosa', '   '), true);
  assert.equal(F.coincideTexto('cualquier cosa', ''), true);
});

test('coincideEleccion no filtra con elecciones vacías', () => {
  const celda = { region: 'Maule', comuna: 'Talca', sede: 'SEDE TALCA' };
  const eleccion = { region: '', comuna: '', sede: '' };
  assert.equal(F.coincideEleccion(celda, eleccion, ['region', 'comuna', 'sede']), true);
});

test('coincideEleccion respeta el orden y solo compara los campos pedidos', () => {
  const celda = { region: 'Maule', comuna: 'Talca', sede: 'SEDE TALCA' };
  const eleccion = { region: 'Maule', comuna: 'Curicó', sede: '' };
  assert.equal(F.coincideEleccion(celda, eleccion, ['region']), true);
  assert.equal(F.coincideEleccion(celda, eleccion, ['region', 'comuna']), false);
});

test('resumen suma entrantes y bordes del rango', () => {
  const celdas = [
    { n: 19, inf: 12, sup: 38 },
    { n: 10, inf: 6, sup: 20 },
  ];
  assert.deepEqual(plano(F.resumen(celdas)), { cantidad: 2, entrantes: 29, inferior: 18, superior: 58 });
});

test('resumen de cero celdas es cero', () => {
  assert.deepEqual(plano(F.resumen([])), { cantidad: 0, entrantes: 0, inferior: 0, superior: 0 });
});

const suprimida = {
  q: 'turismo chillan sede chillan ufro', carrera: 'TURISMO', sede: 'SEDE CHILLAN', comuna: 'CHILLAN',
  region: 'Ñuble', jornada: 'Diurna', inst: { codigo: '430', nombre: 'UNIVERSIDAD C', tipo: 'universidad' },
};
const sinFiltro = { texto: '', region: '', comuna: '', tipo: '', jornada: '', inst: '' };

test('coincideSuprimida sin filtros acepta la celda', () => {
  assert.equal(F.coincideSuprimida(suprimida, sinFiltro), true);
});

test('coincideSuprimida filtra por tipo de institución aunque venga del nombre histórico', () => {
  assert.equal(F.coincideSuprimida(suprimida, { ...sinFiltro, tipo: 'universidad' }), true);
  assert.equal(F.coincideSuprimida(suprimida, { ...sinFiltro, tipo: 'instituto_profesional' }), false);
});

test('coincideSuprimida combina texto, región, comuna, jornada e institución', () => {
  assert.equal(F.coincideSuprimida(suprimida, { ...sinFiltro, texto: 'chillan turismo' }), true);
  assert.equal(F.coincideSuprimida(suprimida, { ...sinFiltro, comuna: 'TALCA' }), false);
  assert.equal(F.coincideSuprimida(suprimida, { ...sinFiltro, region: 'Ñuble', jornada: 'Diurna', inst: '430' }), true);
  assert.equal(F.coincideSuprimida(suprimida, { ...sinFiltro, inst: '999' }), false);
});
