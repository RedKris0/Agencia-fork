/*
 * Lógica pura de los filtros del tablero: sin DOM, para poder probarla con `node --test`.
 * Se carga antes de tablero.js (en el navegador queda como `Filtros`).
 */
(function (raiz) {
  'use strict';

  // Quita tildes y pasa a minúsculas: «Ñuñoa» y «nunoa» se comparan igual.
  const sinTilde = t => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  // Cada palabra buscada debe aparecer en el texto de la celda, en cualquier orden.
  // Así «AIEP San Fernando» y «San Fernando AIEP» encuentran lo mismo.
  function coincideTexto(textoCelda, busqueda) {
    const palabras = sinTilde(busqueda).trim().split(/\s+/).filter(Boolean);
    const texto = sinTilde(textoCelda);
    return palabras.every(p => texto.includes(p));
  }

  // Una elección vacía no filtra. `campos` va en el orden en que se eligen.
  function coincideEleccion(celda, eleccion, campos) {
    return campos.every(k => !eleccion[k] || celda[k] === eleccion[k]);
  }

  // Suma entrantes y bordes de las celdas con cifra. El rango es la suma de intervalos:
  // tiende a ser más amplio que el intervalo real del total (los errores se compensan).
  function resumen(celdas) {
    return {
      cantidad: celdas.length,
      entrantes: celdas.reduce((a, c) => a + c.n, 0),
      inferior: celdas.reduce((a, c) => a + c.inf, 0),
      superior: celdas.reduce((a, c) => a + c.sup, 0),
    };
  }

  // Celda suprimida: sin cifra, pero con grupo y nombre. Mismos filtros que el explorador.
  function coincideSuprimida(s, e) {
    return coincideTexto(s.q, e.texto) && (!e.region || s.region === e.region) &&
      (!e.comuna || s.comuna === e.comuna) && (!e.tipo || s.inst.tipo === e.tipo) &&
      (!e.jornada || s.jornada === e.jornada) && (!e.inst || s.inst.codigo === e.inst);
  }

  const api = { sinTilde, coincideTexto, coincideEleccion, resumen, coincideSuprimida };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else raiz.Filtros = api;
})(typeof window !== 'undefined' ? window : globalThis);
