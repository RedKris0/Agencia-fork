/* Tablero del pronóstico 2027-2028. Sin librerías: gráficos en SVG propio.
 * Lee window.DATOS (datos.js, generado por generar_datos.py).
 * Todo color sale de las variables de diseno/tokens.css (vía tablero.css). */
(function () {
  'use strict';

  const D = window.DATOS;
  const SIN = 'Sin datos suficientes';
  const NS = 'http://www.w3.org/2000/svg';
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  if (!D) {
    document.getElementById('principal').insertAdjacentHTML('afterbegin',
      '<div class="aviso"><div><p><strong>No se encontró <code>datos.js</code>.</strong></p>' +
      '<p>Genéralo con <code>python -I datos/pronosticos/dashboard/generar_datos.py</code> desde la raíz del repositorio y recarga la página.</p></div></div>');
    return;
  }

  /* ------------------------------------------------------------ utilidades */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function crear(ns, tag, attrs, hijos) {
    const e = ns ? document.createElementNS(NS, tag) : document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') e.setAttribute('class', v);
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    [].concat(hijos || []).flat(Infinity).forEach(c => {
      if (c == null || c === false) return;
      e.append(c instanceof Node ? c : document.createTextNode(String(c)));
    });
    return e;
  }
  const h = (tag, attrs, ...hijos) => crear(false, tag, attrs, hijos);
  const sv = (tag, attrs, ...hijos) => crear(true, tag, attrs, hijos);

  const miles = n => (n == null ? SIN : String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
  const dec = (n, d = 1) => (n == null ? SIN : Number(n).toFixed(d).replace('.', ','));
  const pct = (x, d = 1) => (x == null ? SIN : dec(x * 100, d) + ' %');
  const firmado = (x, d = 1) => (x > 0 ? '+' : x < 0 ? '−' : '') + dec(Math.abs(x), d);
  const fechaLarga = iso => {
    const [a, m, d] = iso.split('-').map(Number);
    return d + ' de ' + MESES[m - 1] + ' de ' + a;
  };
  const sinTilde = t => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const TIPOS = {
    universidad: 'Universidad',
    instituto_profesional: 'Instituto profesional (IP)',
    centro_formacion_tecnica: 'Centro de formación técnica (CFT)',
  };

  const ICONOS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
    alerta: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    flecha: '<path d="m9 18 6-6-6-6"/>',
  };
  const icono = n => sv('svg', { class: 'icono', viewBox: '0 0 24 24', 'aria-hidden': 'true', html: ICONOS[n] });


  function fuentePie(o) {
    const p = h('p', null, 'Fuente: ', o.url ? h('a', { href: o.url, target: '_blank', rel: 'noopener' }, o.fuente) : o.fuente);
    if (o.consultado) p.append(' · Consultado el ' + fechaLarga(o.consultado) + '.');
    return p;
  }

  function tabla(el, { titulo, columnas, filas, pie }) {
    const thead = h('thead', null, h('tr', null, columnas.map(c =>
      h('th', { scope: 'col', class: c.num ? 'num' : '' }, c.nombre))));
    const tbody = h('tbody', null, filas.map(f => h('tr', null, columnas.map((c, i) => {
      const v = f[i];
      const celda = h('td', { class: c.num ? 'num' : '' });
      if (v instanceof Node) celda.append(v);
      else if (v == null) celda.append(h('span', { class: 'sin-dato' }, SIN));
      else celda.append(String(v));
      return celda;
    }))));
    el.replaceChildren(titulo ? h('caption', null, titulo) : '', thead, tbody);
    if (pie) el.append(h('tfoot', null, h('tr', null, pie.map((v, i) =>
      h('td', { class: columnas[i] && columnas[i].num ? 'num' : '' }, v == null ? '' : String(v))))));
  }

  /* ---------------------------------------------------------------- tooltip */
  const tip = $('#tip');
  function colocarTip(x, y) {
    const r = tip.getBoundingClientRect();
    const izq = Math.min(Math.max(8, x + 14), window.innerWidth - r.width - 8);
    const sup = y + 18 + r.height > window.innerHeight ? y - r.height - 12 : y + 18;
    tip.style.left = izq + 'px';
    tip.style.top = Math.max(8, sup) + 'px';
  }
  function mostrarTip(el, x, y) {
    tip.textContent = el.getAttribute('data-tip');
    tip.hidden = false;
    colocarTip(x, y);
  }
  document.addEventListener('pointerover', e => {
    const t = e.target.closest && e.target.closest('[data-tip]');
    if (t) mostrarTip(t, e.clientX, e.clientY);
  });
  document.addEventListener('pointermove', e => { if (!tip.hidden) colocarTip(e.clientX, e.clientY); });
  document.addEventListener('pointerout', e => {
    if (e.target.closest && e.target.closest('[data-tip]')) tip.hidden = true;
  });
  document.addEventListener('focusin', e => {
    const t = e.target.closest && e.target.closest('[data-tip]');
    if (!t) return;
    const r = t.getBoundingClientRect();
    mostrarTip(t, r.left + r.width / 2, r.top + r.height / 2);
  });
  document.addEventListener('focusout', () => { tip.hidden = true; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') tip.hidden = true; });

  /* ----------------------------------------------------------------- tema */
  (function tema() {
    const botones = $$('.tema__grupo button');
    const aplicar = t => {
      if (t === 'auto') delete document.documentElement.dataset.tema;
      else document.documentElement.dataset.tema = t;
      botones.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tema === t)));
    };
    let guardado = 'auto';
    try { guardado = localStorage.getItem('tablero-tema') || 'auto'; } catch { /* sin almacenamiento */ }
    aplicar(guardado);
    botones.forEach(b => b.addEventListener('click', () => {
      aplicar(b.dataset.tema);
      try { localStorage.setItem('tablero-tema', b.dataset.tema); } catch { /* sin almacenamiento */ }
    }));
  })();

  /* ------------------------------------------------------- gráficos en SVG */
  const dibujos = [];
  function lienzo(selector, fn) {
    const cont = $(selector);
    const item = { cont, ancho: 0, fn };
    item.dibujar = () => {
      const w = Math.max(260, Math.floor(cont.clientWidth));
      item.ancho = w;
      cont.replaceChildren(fn(w));
    };
    dibujos.push(item);
    item.dibujar();
    return item.dibujar;
  }
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => dibujos.forEach(d => {
        if (Math.floor(d.cont.clientWidth) !== d.ancho && d.cont.clientWidth > 0) d.dibujar();
      }));
    });
    dibujos.forEach(d => ro.observe(d.cont));
  }

  const lineal = (d0, d1, r0, r1) => v => r0 + ((v - d0) * (r1 - r0)) / (d1 - d0 || 1);
  function ejeNice(min, max, n = 5) {
    const raw = (max - min || Math.abs(max) || 1) / n;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const paso = [1, 2, 2.5, 5, 10].map(f => f * mag).find(x => x >= raw);
    const lo = Math.floor(min / paso) * paso;
    const hi = Math.ceil(max / paso) * paso;
    const ticks = [];
    for (let v = lo; v <= hi + paso / 1e6; v += paso) ticks.push(+v.toPrecision(12));
    return { ticks, lo, hi };
  }
  let contadorId = 0;
  const idUnico = p => p + '-' + (++contadorId);

  function patron(id) {
    // Trama diagonal: distingue una serie sin depender solo del color.
    return sv('pattern', { id, width: 7, height: 7, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' },
      sv('rect', { width: 7, height: 7, fill: 'var(--color-superficie)' }),
      sv('line', { x1: 0, y1: 0, x2: 0, y2: 7, class: 'patron-linea' }));
  }

  function leyenda(items) {
    return h('ul', { class: 'leyenda' }, items.map(it => h('li', null, it.svg, it.nombre)));
  }
  const muestraLinea = (cls, forma) => sv('svg', { viewBox: '0 0 24 16', 'aria-hidden': 'true' },
    sv('line', { x1: 0, x2: 24, y1: 8, y2: 8, class: cls }),
    forma === 'cuadrado'
      ? sv('rect', { x: 8, y: 4, width: 8, height: 8, class: cls === 'serie-a' ? 'marca-a' : 'marca-b' })
      : sv('circle', { cx: 12, cy: 8, r: 4, class: cls === 'serie-a' ? 'marca-a' : 'marca-b' }));
  const muestraBarra = (cls, pid) => sv('svg', { viewBox: '0 0 24 16', 'aria-hidden': 'true' },
    pid ? patron(pid) : '',
    sv('rect', { x: 2, y: 2, width: 20, height: 12, class: pid ? '' : cls, fill: pid ? 'url(#' + pid + ')' : null,
      stroke: pid ? 'var(--color-texto-suave)' : null, 'stroke-width': pid ? 1.5 : null }));

  function graficoLineas(w, { xs, series, fmtY, alto = 300, etiqueta }) {
    const ancho = w > 560;
    const m = { t: 14, r: ancho ? 130 : 22, b: 34, l: ancho ? 70 : 54 };
    const todos = series.flatMap(s => s.valores);
    const eje = ejeNice(Math.min(...todos), Math.max(...todos));
    const x = lineal(0, xs.length - 1, m.l, w - m.r);
    const y = lineal(eje.lo, eje.hi, alto - m.b, m.t);
    const g = [];
    eje.ticks.forEach(t => {
      g.push(sv('line', { class: 'rejilla', x1: m.l, x2: w - m.r, y1: y(t), y2: y(t) }));
      g.push(sv('text', { x: m.l - 8, y: y(t) + 4, 'text-anchor': 'end', class: 'cifra' }, fmtY(t)));
    });
    xs.forEach((v, i) => g.push(sv('text', { x: x(i), y: alto - 10, 'text-anchor': 'middle', class: 'cifra' }, v)));
    series.forEach(s => {
      const pts = s.valores.map((v, i) => [x(i), y(v)]);
      g.push(sv('path', { d: 'M' + pts.map(p => p.join(',')).join('L'), class: 'serie-' + s.id }));
      pts.forEach((p, i) => {
        const tip = s.nombre + ', ' + xs[i] + ': ' + fmtY(s.valores[i]);
        const marca = s.forma === 'cuadrado'
          ? sv('rect', { x: p[0] - 5, y: p[1] - 5, width: 10, height: 10, class: 'marca-' + s.id + ' marca-tip' })
          : sv('circle', { cx: p[0], cy: p[1], r: 5, class: 'marca-' + s.id + ' marca-tip' });
        marca.setAttribute('data-tip', tip);
        marca.setAttribute('tabindex', '0');
        marca.setAttribute('role', 'img');
        marca.setAttribute('aria-label', tip);
        g.push(marca);
      });
      if (ancho) {
        const ult = pts[pts.length - 1];
        g.push(sv('text', { x: ult[0] + 12, y: ult[1] + 4, class: 'fuerte' }, s.corto || s.nombre));
      }
    });
    return sv('svg', { width: w, height: alto, viewBox: `0 0 ${w} ${alto}`, role: 'group', 'aria-label': etiqueta }, g);
  }

  function graficoBarrasAgrupadas(w, { cats, series, ref, alto = 300, etiqueta, fmt }) {
    const m = { t: 22, r: 16, b: 38, l: 48 };
    const y = lineal(0, 1, alto - m.b, m.t);
    const gw = (w - m.l - m.r) / cats.length;
    const bw = Math.min(30, (gw * 0.8) / series.length);
    const g = [];
    const defs = [];
    series.forEach(s => { if (s.patron) { s.pid = idUnico('trama'); defs.push(patron(s.pid)); } });
    [0, 0.25, 0.5, 0.75, 1].forEach(t => {
      g.push(sv('line', { class: 'rejilla', x1: m.l, x2: w - m.r, y1: y(t), y2: y(t) }));
      g.push(sv('text', { x: m.l - 8, y: y(t) + 4, 'text-anchor': 'end', class: 'cifra' }, Math.round(t * 100) + ' %'));
    });
    cats.forEach((c, i) => {
      const cx = m.l + gw * i + gw / 2;
      g.push(sv('text', { x: cx, y: alto - 14, 'text-anchor': 'middle', class: 'cifra' }, c));
      series.forEach((s, j) => {
        const v = s.valores[i];
        if (v == null) return;
        const bx = cx - (bw * series.length) / 2 + bw * j;
        const tip = s.nombre + ', ' + c + ': ' + fmt(v);
        const r = sv('rect', {
          x: bx + 1, y: y(v), width: bw - 2, height: Math.max(1, y(0) - y(v)), rx: 2,
          class: s.patron ? '' : 'barra-' + s.id,
          fill: s.patron ? 'url(#' + s.pid + ')' : null,
          stroke: s.patron ? 'var(--color-texto-suave)' : null, 'stroke-width': s.patron ? 1.5 : null,
          'data-tip': tip, tabindex: 0, role: 'img', 'aria-label': tip,
        });
        g.push(r);
      });
    });
    if (ref) {
      g.push(sv('line', { class: 'ref', x1: m.l, x2: w - m.r, y1: y(ref.valor), y2: y(ref.valor) }));
      // A la izquierda: ahí las barras son bajas y la etiqueta no tapa ninguna.
      g.push(sv('text', { x: m.l + 6, y: y(ref.valor) - 6, 'text-anchor': 'start', class: 'fuerte' }, ref.texto));
    }
    return sv('svg', { width: w, height: alto, viewBox: `0 0 ${w} ${alto}`, role: 'group', 'aria-label': etiqueta }, sv('defs', null, defs), g);
  }

  function graficoHistograma(w, { conteos, inicio, paso, qBajo, qAlto, alto = 280, etiqueta }) {
    const m = { t: 26, r: 14, b: 40, l: 54 };
    const fin = inicio + paso * conteos.length;
    const x = lineal(inicio, fin, m.l, w - m.r);
    const eje = ejeNice(0, Math.max(...conteos), 4);
    const y = lineal(0, eje.hi, alto - m.b, m.t);
    const pid = idUnico('trama');
    const g = [];
    eje.ticks.forEach(t => {
      g.push(sv('line', { class: 'rejilla', x1: m.l, x2: w - m.r, y1: y(t), y2: y(t) }));
      g.push(sv('text', { x: m.l - 8, y: y(t) + 4, 'text-anchor': 'end', class: 'cifra' }, miles(t)));
    });
    conteos.forEach((c, i) => {
      const a = inicio + i * paso;
      const centro = a + paso / 2;
      const dentro = centro >= qBajo && centro <= qAlto;
      g.push(sv('rect', {
        x: x(a) + 0.5, y: y(c), width: Math.max(1, x(a + paso) - x(a) - 1), height: Math.max(0, y(0) - y(c)),
        class: dentro ? 'barra-a' : '', fill: dentro ? null : 'url(#' + pid + ')',
        stroke: dentro ? null : 'var(--color-texto-suave)', 'stroke-width': dentro ? null : 1,
        'data-tip': `Error de ${dec(a, 1)} a ${dec(a + paso, 1)}: ${miles(c)} celdas`,
      }));
    });
    [-1.5, -1, -0.5, 0, 0.5, 1, 1.5].forEach(t => {
      g.push(sv('line', { class: 'eje', x1: x(t), x2: x(t), y1: alto - m.b, y2: alto - m.b + 5 }));
      g.push(sv('text', { x: x(t), y: alto - m.b + 20, 'text-anchor': 'middle', class: 'cifra' }, firmado(t, t % 1 === 0 ? 0 : 1).replace('+', '')));
    });
    g.push(sv('line', { class: 'eje', x1: m.l, x2: w - m.r, y1: y(0), y2: y(0) }));
    [[qBajo, '2,5 %', 'end'], [qAlto, '97,5 %', 'start']].forEach(([q, t, anc]) => {
      g.push(sv('line', { class: 'ref-alerta', x1: x(q), x2: x(q), y1: m.t - 6, y2: alto - m.b }));
      g.push(sv('text', { x: x(q) + (anc === 'end' ? -5 : 5), y: m.t - 10, 'text-anchor': anc, class: 'fuerte' }, t));
    });
    g.push(sv('text', { x: (m.l + w - m.r) / 2, y: alto - 4, 'text-anchor': 'middle' }, 'ln(previsto ÷ real): negativo = el real fue mayor que lo previsto'));
    return { svg: sv('svg', { width: w, height: alto, viewBox: `0 0 ${w} ${alto}`, role: 'group', 'aria-label': etiqueta }, sv('defs', null, patron(pid)), g), pid };
  }

  function recortar(t, max) { return t.length > max ? t.slice(0, Math.max(1, max - 1)) + '…' : t; }

  // Barras horizontales con etiqueta directa al final.
  function graficoBarrasH(w, { filas, fmt = miles, etiqueta, clase = 'barra-a', izquierda }) {
    const fila = 30;
    const l = izquierda || Math.min(Math.round(w * 0.4), 230);
    const m = { t: 6, r: w > 420 ? 70 : 56, b: 8, l };
    const max = Math.max(...filas.map(f => f.valor), 1);
    const x = lineal(0, max, m.l, w - m.r);
    const alto = m.t + m.b + fila * filas.length;
    const maxCar = Math.floor((l - 10) / 6.6);
    const g = [];
    filas.forEach((f, i) => {
      const cy = m.t + fila * i;
      const tip = f.etiqueta + ': ' + fmt(f.valor);
      g.push(sv('text', { x: m.l - 8, y: cy + fila / 2 + 4, 'text-anchor': 'end', class: 'fuerte' }, recortar(f.etiqueta, maxCar), sv('title', null, f.etiqueta)));
      g.push(sv('rect', { x: m.l, y: cy + 5, width: Math.max(2, x(f.valor) - m.l), height: fila - 10, rx: 2, class: clase, 'data-tip': tip, tabindex: 0, role: 'img', 'aria-label': tip }));
      g.push(sv('text', { x: x(f.valor) + 6, y: cy + fila / 2 + 4, class: 'cifra' }, fmt(f.valor)));
    });
    g.unshift(sv('line', { class: 'eje', x1: m.l, x2: m.l, y1: m.t, y2: alto - m.b }));
    return sv('svg', { width: w, height: alto, viewBox: `0 0 ${w} ${alto}`, role: 'group', 'aria-label': etiqueta }, g);
  }

  // Un intervalo por fila: pista clara de inf a sup y punto en el valor central.
  function graficoRangos(w, { filas, etiqueta, fmt = miles }) {
    const fila = 34;
    const l = Math.min(Math.round(w * 0.38), 240);
    const ancho = w > 560;
    const m = { t: 22, r: ancho ? 150 : 14, b: 8, l };
    const max = Math.max(...filas.map(f => f.sup), 1);
    const eje = ejeNice(0, max, 4);
    const x = lineal(0, eje.hi, m.l, w - m.r);
    const alto = m.t + m.b + fila * filas.length;
    const maxCar = Math.floor((l - 10) / 6.6);
    const g = [];
    eje.ticks.forEach(t => {
      g.push(sv('line', { class: 'rejilla', x1: x(t), x2: x(t), y1: m.t - 4, y2: alto - m.b }));
      g.push(sv('text', { x: x(t), y: m.t - 8, 'text-anchor': 'middle', class: 'cifra' }, miles(t)));
    });
    filas.forEach((f, i) => {
      const cy = m.t + fila * i + fila / 2;
      const tip = `${f.etiqueta}: ${fmt(f.med)} (de ${fmt(f.inf)} a ${fmt(f.sup)})`;
      g.push(sv('text', { x: m.l - 8, y: cy + 4, 'text-anchor': 'end', class: 'fuerte' }, recortar(f.etiqueta, maxCar), sv('title', null, f.etiqueta)));
      g.push(sv('rect', { x: x(f.inf), y: cy - 7, width: Math.max(2, x(f.sup) - x(f.inf)), height: 14, rx: 2, class: 'barra-pista', 'data-tip': tip }));
      g.push(sv('circle', { cx: x(f.med), cy, r: 6, class: 'marca-a marca-tip', 'data-tip': tip, tabindex: 0, role: 'img', 'aria-label': tip }));
      if (ancho) g.push(sv('text', { x: w - m.r + 10, y: cy + 4, class: 'cifra' }, `${fmt(f.med)} (${fmt(f.inf)}–${fmt(f.sup)})`));
    });
    return sv('svg', { width: w, height: alto, viewBox: `0 0 ${w} ${alto}`, role: 'group', 'aria-label': etiqueta }, g);
  }

  /* --------------------------------------------------------------- bloque 1 */
  const N = D.nacional;
  $('#meta-datos').textContent = 'Datos procesados el ' + fechaLarga(D.meta.fecha_datos) + ' · Tablero generado el ' + fechaLarga(D.meta.generado) + '.';
  $('#pie-generado').textContent = 'Tablero generado el ' + fechaLarga(D.meta.generado) + ' a partir de datos del ' + fechaLarga(D.meta.fecha_datos) + '.';

  (function resumen() {
    const tarjetaPron = p => {
      const pos = ((p.valor - p.inferior) / (p.superior - p.inferior)) * 100;
      return h('article', { class: 'tarjeta' },
        h('h3', null, p.titulo),
        h('div', { class: 'tarjeta__cifra' }, miles(p.valor)),
        h('div', { class: 'rango', role: 'img', 'aria-label': `Intervalo de ${miles(p.inferior)} a ${miles(p.superior)}, con valor central ${miles(p.valor)}` },
          h('span', { class: 'rango__pista' }),
          h('span', { class: 'rango__extremo', style: 'left:0' }),
          h('span', { class: 'rango__extremo', style: 'right:0' }),
          h('span', { class: 'rango__marca', style: 'left:' + pos + '%' })),
        h('div', { class: 'rango__etiquetas' }, h('span', null, miles(p.inferior)), h('span', null, miles(p.superior))),
        h('p', { class: 'tarjeta__mide' }, p.mide + '. Intervalo de 95 %.'),
        h('p', { class: 'tarjeta__mide' }, 'Método: ' + p.metodo + '.'),
        h('div', { class: 'tarjeta__pie' },
          h('p', null, h('span', { class: 'estado estado--espera' }, icono('clock'), 'Pronóstico sin verificar')),
          h('p', null, 'Registrado el ' + fechaLarga(p.registrado) + '.'),
          fuentePie({ fuente: p.fuente, url: p.url })));
    };
    const tarjetaDato = (titulo, cifra, o) => h('article', { class: 'tarjeta' },
      h('h3', null, titulo), h('div', { class: 'tarjeta__cifra' }, cifra),
      h('p', { class: 'tarjeta__mide' }, o.mide),
      h('div', { class: 'tarjeta__pie' }, fuentePie({ fuente: o.fuente, url: o.url, consultado: N.version })));
    const I = N.insumos;
    $('#tarjetas-resumen').replaceChildren(
      tarjetaPron(N.pronosticos.primer_anio_2027),
      tarjetaPron(N.pronosticos.permanencia_2028),
      tarjetaDato('Cohorte de cuarto medio 2026', miles(I.cohorte_residencia_2026.valor), I.cohorte_residencia_2026),
      tarjetaDato('Tasa de entrada 2026', dec(I.tasa_entrada_2026.valor, 3), I.tasa_entrada_2026),
      tarjetaDato('Retención ponderada', pct(I.retencion_ponderada.valor), I.retencion_ponderada));

    const P = N.pronosticos;
    const producto = I.cohorte_residencia_2026.valor * I.tasa_entrada_2026.valor;
    $('#cadena').replaceChildren(
      h('li', null, h('span', null, 'Cuarto medio 2026, por residencia'), h('strong', null, miles(I.cohorte_residencia_2026.valor))),
      h('li', null, h('span', null, 'Se multiplica por la tasa de entrada'), h('strong', null, '× ' + dec(I.tasa_entrada_2026.valor, 3))),
      h('li', null, h('span', null, 'Primer año de pregrado 2027'), h('strong', null, miles(P.primer_anio_2027.valor))),
      h('li', null, h('span', null, 'Se multiplica por la retención ponderada'), h('strong', null, '× ' + pct(I.retencion_ponderada.valor))),
      h('li', null, h('span', null, 'Permanencia de primer año 2028'), h('strong', null, miles(P.permanencia_2028.valor))));
    $('#cadena').after(h('p', { class: 'chico suave' },
      `Las tasas se muestran redondeadas: ${miles(I.cohorte_residencia_2026.valor)} × ${dec(I.tasa_entrada_2026.valor, 3)} da ${miles(producto)}, y el valor registrado usa la tasa sin redondear.`));
  })();

  /* --------------------------------------------------------------- bloque 2 */
  (function verificacion() {
    const chip = e => e === 'confirmada'
      ? h('span', { class: 'estado estado--ok' }, icono('check'), 'Fecha confirmada')
      : h('span', { class: 'estado estado--espera' }, icono('clock'), 'Fecha por verificar');
    tabla($('#tabla-verificacion'), {
      columnas: [{ nombre: 'Qué se compara' }, { nombre: 'Cuándo' }, { nombre: 'Estado' }, { nombre: 'Detalle' }],
      filas: N.verificacion.map(v => [v.comparacion, v.cuando, chip(v.estado), v.detalle]),
    });
  })();

  /* --------------------------------------------------------------- bloque 4 */
  (function paes() {
    const s = D.paes.serie;
    const xs = s.map(d => String(d.anio));
    const a22 = s.find(d => d.anio === 2022), a23 = s.find(d => d.anio === 2023);
    const vF = a23.filas / a22.filas - 1, vR = a23.regulares / a22.regulares - 1;
    $('#paes-bajada').textContent =
      `Entre 2022 y 2023 las filas del archivo suben ${dec(vF * 100)} %, pero los rendidores regulares solo ${dec(vR * 100)} %. ` +
      'El salto de las filas era un cambio de lo que se contaba (incluía a quienes solo rindieron Invierno), no más estudiantes.';
    $('#paes-leyenda').replaceChildren(leyenda([
      { svg: muestraLinea('serie-b', 'cuadrado'), nombre: 'Filas del archivo (incluye solo Invierno)' },
      { svg: muestraLinea('serie-a', 'circulo'), nombre: 'Rendidores regulares (definición adoptada)' },
    ]));
    lienzo('#grafico-paes', w => graficoLineas(w, {
      xs, fmtY: miles, etiqueta: 'Filas del archivo y rendidores regulares de la PAES, 2020 a 2026',
      series: [
        { id: 'b', nombre: 'Filas del archivo', corto: 'Filas', forma: 'cuadrado', valores: s.map(d => d.filas) },
        { id: 'a', nombre: 'Rendidores regulares', corto: 'Regulares', forma: 'circulo', valores: s.map(d => d.regulares) },
      ],
    }));
    $('#paes-pie').replaceChildren(h('span', null, 'El eje vertical no parte de cero. ' + D.paes.definicion + ' '), fuentePie(D.paes));
    tabla($('#tabla-paes'), {
      columnas: [{ nombre: 'Año' }, { nombre: 'Filas del archivo', num: true }, { nombre: 'Rendidores regulares', num: true }, { nombre: 'Filas que no son regulares', num: true }, { nombre: 'Parte de las filas', num: true }],
      filas: s.map(d => [d.anio, miles(d.filas), miles(d.regulares), miles(d.filas - d.regulares), pct((d.filas - d.regulares) / d.filas)]),
    });
  })();

  /* --------------------------------------------------------------- bloque 5 */
  (function validacionComunas() {
    const p = D.validacion_comunas.pasos;
    const recientes = p.filter(x => x.hasta >= 2024);
    const rangoP = [Math.min(...recientes.map(x => x.cobertura_poisson)), Math.max(...recientes.map(x => x.cobertura_poisson))];
    const emp = p.filter(x => x.cobertura_empirico != null);
    const rangoE = [Math.min(...emp.map(x => x.cobertura_empirico)), Math.max(...emp.map(x => x.cobertura_empirico))];
    $('#vcom-bajada').textContent =
      `Un intervalo que dice 95 % debería cubrir el valor real 95 veces de cada 100. El intervalo n ± 1,96·√n cubrió entre ${pct(rangoP[0], 0)} y ${pct(rangoP[1], 0)} en los pasos 2023→2024 a 2025→2026, así que se descartó. ` +
      `El intervalo empírico cubrió entre ${pct(rangoE[0], 0)} y ${pct(rangoE[1], 0)}.`;
    $('#vcom-leyenda').replaceChildren(leyenda([
      { svg: muestraBarra('', 'leyenda-trama'), nombre: 'n ± 1,96·√n (descartado)' },
      { svg: muestraBarra('barra-a'), nombre: 'Intervalo empírico (adoptado)' },
    ]));
    lienzo('#grafico-vcom', w => graficoBarrasAgrupadas(w, {
      cats: p.map(x => `${x.desde}→${String(x.hasta).slice(2)}`),
      fmt: v => pct(v), ref: { valor: 0.95, texto: '95 % declarado' },
      etiqueta: 'Cobertura de dos intervalos por paso entre años, con la meta de 95 %',
      series: [
        { id: 'neutra', nombre: 'n ± 1,96·√n', patron: true, valores: p.map(x => x.cobertura_poisson) },
        { id: 'a', nombre: 'Intervalo empírico', valores: p.map(x => x.cobertura_empirico) },
      ],
    }));
    $('#vcom-pie').replaceChildren(
      h('span', null, 'El intervalo empírico se calibra con los demás pasos y se mide en el que quedó fuera. El paso 2020→2021 (pandemia) queda bajo la meta: es un cambio que los otros años no contienen. '),
      fuentePie(D.validacion_comunas));
    tabla($('#tabla-vcom'), {
      columnas: [{ nombre: 'Paso' }, { nombre: 'Comunas medidas', num: true }, { nombre: 'Error mediano de la persistencia', num: true }, { nombre: 'Cobertura n ± 1,96·√n', num: true }, { nombre: 'Cobertura empírica', num: true }],
      filas: p.map(x => [`${x.desde} a ${x.hasta}`, miles(x.comunas), pct(x.error_mediano), pct(x.cobertura_poisson), x.cobertura_empirico == null ? null : pct(x.cobertura_empirico)]),
    });
  })();

  /* --------------------------------------------------------------- bloque 6 */
  (function validacionCeldas() {
    const V = D.validacion_celdas;
    const dato = (v, n) => h('div', { class: 'dato' }, h('span', { class: 'dato__valor' }, v), h('span', { class: 'dato__nombre' }, n));
    $('#vcel-bajada').textContent =
      'Para cada año de 2022 a 2026 se estimó la participación de cada celda con el año anterior y se comparó con lo ocurrido. Solo celdas con 30 o más entrantes reales.';
    $('#vcel-kpis').replaceChildren(
      dato(miles(V.casos), 'casos validados'),
      dato(pct(V.error_mediano), 'error mediano'),
      dato(pct(V.cobertura), 'cobertura del intervalo de 95 %'),
      dato('×' + dec(V.ancho_mediano, 1), 'ancho mediano del intervalo'));
    const hi = V.histograma, fi = V.intervalo_2027;
    $('#vcel-leyenda').replaceChildren(leyenda([
      { svg: muestraBarra('barra-a'), nombre: 'Dentro del intervalo de 95 %' },
      { svg: muestraBarra('', 'leyenda-trama-2'), nombre: 'Fuera del intervalo' },
    ]));
    lienzo('#grafico-hist', w => graficoHistograma(w, {
      conteos: hi.conteos, inicio: hi.inicio, paso: hi.paso, qBajo: fi.q_bajo, qAlto: fi.q_alto,
      etiqueta: 'Distribución del error de la participación por carrera y sede; el 95 % central queda entre ' + dec(fi.q_bajo, 2) + ' y ' + dec(fi.q_alto, 2),
    }).svg);
    $('#hist-pie').replaceChildren(
      h('span', null, `El intervalo de 2027 por celda sale de estos cuantiles: el real queda entre ×${dec(fi.factor_bajo, 2)} y ×${dec(fi.factor_alto, 2)} de lo previsto (ancho ×${dec(fi.ancho, 1)}). ` +
        `Hay ${miles(hi.fuera_bajo + hi.fuera_alto)} celdas fuera del rango del gráfico. `),
      fuentePie(V));
    tabla($('#tabla-vcel-anio'), {
      titulo: 'Por año validado',
      columnas: [{ nombre: 'Año' }, { nombre: 'Casos', num: true }, { nombre: 'Error mediano', num: true }, { nombre: 'Cobertura', num: true }, { nombre: 'Ancho', num: true }],
      filas: V.por_anio.map(a => [a.anio, miles(a.casos), pct(a.error_mediano), pct(a.cobertura), '×' + dec(a.ancho, 2)]),
    });
    tabla($('#tabla-vcel-tramo'), {
      titulo: 'Por tamaño real de la celda (entrantes)',
      columnas: [{ nombre: 'Tamaño' }, { nombre: 'Casos', num: true }, { nombre: 'Error mediano', num: true }, { nombre: 'Cobertura', num: true }],
      filas: V.por_tramo.map(t => [t.tramo, miles(t.casos), pct(t.error_mediano), pct(t.cobertura)]),
    });
    lienzo('#grafico-tramo', w => graficoBarrasH(w, {
      filas: V.por_tramo.map(t => ({ etiqueta: t.tramo + ' entrantes', valor: t.error_mediano * 100 })),
      fmt: v => dec(v, 1) + ' %', izquierda: Math.min(150, Math.round(w * 0.4)),
      etiqueta: 'Error mediano por tamaño de celda',
    }));
  })();

  /* --------------------------------------------------------------- bloque 7 */
  const C = D.celdas;
  const celdas = C.filas.map(f => ({
    inst: C.instituciones[f[0]], sede: f[1], carrera: f[2], jornada: C.jornadas[f[3]],
    modalidad: C.modalidades[f[4]], region: C.regiones[f[5]], comuna: C.comunas[f[6]],
    n: f[7], inf: f[8], sup: f[9], codigo: f[10],
  }));
  // Nombre plano para los selectores de la consulta (la institución va en el objeto `inst`).
  celdas.forEach(c => { c.institucion = c.inst.nombre; });
  celdas.forEach(c => { c.q = sinTilde([c.carrera, c.sede, c.inst.nombre, c.comuna, c.region].join(' ')); });
  // Sin cifra: solo grupo, nombre de sede y carrera, y comuna.
  const suprimidas = C.suprimidas.map(s => {
    const o = { inst: C.instituciones[s[0]], region: C.regiones[s[1]], jornada: C.jornadas[s[2]], sede: s[3], carrera: s[4], comuna: C.comunas[s[5]] };
    o.q = sinTilde([o.carrera, o.sede, o.inst.nombre, o.comuna, o.region].join(' '));
    return o;
  });

  function llenarSelect(sel, opciones, textoTodos) {
    sel.replaceChildren(h('option', { value: '' }, textoTodos), ...opciones.map(o => h('option', { value: o.valor }, o.texto)));
  }
  function paginador(el, { total, pagina, porPagina, alCambiar, unidad }) {
    const paginas = Math.max(1, Math.ceil(total / porPagina));
    const desde = total ? pagina * porPagina + 1 : 0;
    const hasta = Math.min(total, (pagina + 1) * porPagina);
    el.replaceChildren(
      h('span', { 'aria-live': 'polite' }, `Mostrando ${miles(desde)} a ${miles(hasta)} de ${miles(total)} ${unidad}`),
      h('div', null,
        h('button', { type: 'button', disabled: pagina <= 0, onclick: () => alCambiar(pagina - 1) }, 'Anterior'),
        h('span', { class: 'pagina' }, `Página ${pagina + 1} de ${paginas}`),
        h('button', { type: 'button', disabled: pagina >= paginas - 1, onclick: () => alCambiar(pagina + 1) }, 'Siguiente')));
  }

  (function explorador() {
    const regiones = D.meta.regiones.filter(r => C.regiones.includes(r));
    const jornadas = [...C.jornadas].sort((a, b) => a.localeCompare(b, 'es'));
    llenarSelect($('#exp-region'), regiones.map(r => ({ valor: r, texto: r })), 'Todas las regiones');
    llenarSelect($('#exp-tipo'), Object.entries(TIPOS).map(([k, t]) => ({ valor: k, texto: t })), 'Todos los tipos');
    llenarSelect($('#exp-jornada'), jornadas.map(j => ({ valor: j, texto: j })), 'Todas las jornadas');
    const agr = {
      region: ['Región', c => c.region],
      tipo: ['Tipo de institución', c => TIPOS[c.inst.tipo] || c.inst.tipo],
      jornada: ['Jornada', c => c.jornada],
      inst: ['Institución', c => c.inst.nombre],
      carrera: ['Nombre de la carrera', c => c.carrera],
    };
    $('#exp-agrupar').replaceChildren(...Object.entries(agr).map(([k, v]) => h('option', { value: k }, v[0])));

    const est = { texto: '', region: '', comuna: '', tipo: '', jornada: '', inst: '', min: 0, orden: 'n', dir: -1, pagina: 0, agrupar: 'region' };

    // La lista de comunas sigue a la región elegida: no se puede elegir una comuna fuera de ella.
    function llenarComunas() {
      const opc = [...new Set(celdas.filter(c => !est.region || c.region === est.region).map(c => c.comuna).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, 'es'));
      if (est.comuna && !opc.includes(est.comuna)) est.comuna = '';
      $('#exp-comuna').replaceChildren(h('option', { value: '' }, 'Todas las comunas'), ...opc.map(m => h('option', { value: m }, m)));
      $('#exp-comuna').value = est.comuna;
    }

    // La lista de instituciones sigue a la región y a la comuna: solo aparecen las que tienen celdas ahí.
    function llenarInstituciones() {
      const enZona = x => (!est.region || x.region === est.region) && (!est.comuna || x.comuna === est.comuna);
      const mapa = new Map();
      celdas.filter(enZona).forEach(c => mapa.set(c.inst.codigo, c.inst));
      suprimidas.filter(enZona).forEach(s => mapa.set(s.inst.codigo, s.inst));
      const opc = [...mapa.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
      if (est.inst && !mapa.has(est.inst)) est.inst = '';
      $('#exp-inst').replaceChildren(h('option', { value: '' }, 'Todas las instituciones'), ...opc.map(i => h('option', { value: i.codigo }, i.nombre)));
      $('#exp-inst').value = est.inst;
    }

    const POR_PAGINA = 25;
    const COLS = [
      ['inst', 'Institución', c => c.inst.nombre, false],
      ['sede', 'Sede', c => c.sede, false],
      ['carrera', 'Carrera', c => c.carrera, false],
      ['jornada', 'Jornada', c => c.jornada, false],
      ['region', 'Región', c => c.region, false],
      ['n', 'Entrantes 2027 (estimado)', c => c.n, true],
      ['rango', 'Intervalo de 95 %', c => c.inf, true],
    ];
    let filtradas = [];
    let redibujarGrupo = () => {};

    function filtrar() {
      const ok = c =>
        Filtros.coincideTexto(c.q, est.texto) && (!est.region || c.region === est.region) && (!est.comuna || c.comuna === est.comuna) &&
        (!est.tipo || c.inst.tipo === est.tipo) && (!est.jornada || c.jornada === est.jornada) &&
        (!est.inst || c.inst.codigo === est.inst) && c.n >= est.min;
      filtradas = celdas.filter(ok);
      const col = COLS.find(c => c[0] === est.orden) || COLS[5];
      const f = col[2];
      filtradas.sort((a, b) => {
        const va = f(a), vb = f(b);
        const r = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb), 'es');
        return (r || b.n - a.n) * est.dir;
      });
    }

    function suprimidasEnFiltro() {
      return suprimidas.filter(s =>
        (!est.region || s.region === est.region) && (!est.tipo || s.inst.tipo === est.tipo) &&
        (!est.jornada || s.jornada === est.jornada) && (!est.inst || s.inst.codigo === est.inst)).length;
    }

    // Lista de celdas suprimidas: nombre sí, cifra no. Usa los mismos filtros que el explorador.
    function pintarSuprimidas() {
      const lista = suprimidas.filter(s => Filtros.coincideSuprimida(s, est));
      const MAX = 50;
      const cab = ['Institución', 'Sede', 'Carrera', 'Comuna', 'Jornada'].map(t => h('th', { scope: 'col' }, t));
      const filas = lista.slice(0, MAX).map(s => h('tr', null,
        h('td', null, s.inst.nombre), h('td', null, s.sede), h('td', null, s.carrera), h('td', null, s.comuna), h('td', null, s.jornada)));
      $('#tabla-supr').replaceChildren(
        h('caption', { class: 'solo-lectores' }, 'Celdas suprimidas: menos de 10 estudiantes, sin cifra'),
        h('thead', null, h('tr', null, cab)),
        h('tbody', null, filas.length ? filas : [h('tr', null, h('td', { colspan: 5, class: 'sin-dato' }, SIN + ': ninguna celda suprimida coincide con estos filtros.'))]));
      $('#supr-nota').textContent = `Hay ${miles(lista.length)} celdas suprimidas con estos filtros${lista.length > MAX ? `; se muestran las primeras ${MAX}` : ''}. Tienen menos de 10 estudiantes estimados: no tienen cifra, intervalo ni suma.`;
    }

    // Carreras de 2027 sin historia: nombre y sede, sin cifra. Mismos filtros de texto e institución.
    const nuevas = (C.nuevas_2027 || []).map(n => ({ ...n, q: sinTilde([n.carrera, n.sede, n.institucion].join(' ')) }));
    function pintarNuevas() {
      const lista = nuevas.filter(n => Filtros.coincideTexto(n.q, est.texto) && (!est.inst || n.institucion_codigo === est.inst));
      const cab = ['Institución', 'Lugar (PDF DEMRE)', 'Carrera'].map(t => h('th', { scope: 'col' }, t));
      const filas = lista.map(n => h('tr', null, h('td', null, n.institucion), h('td', null, n.sede), h('td', null, n.carrera)));
      $('#tabla-nuevas').replaceChildren(
        h('caption', { class: 'solo-lectores' }, 'Carreras nuevas de 2027, sin cifra'),
        h('thead', null, h('tr', null, cab)),
        h('tbody', null, filas.length ? filas : [h('tr', null, h('td', { colspan: 3, class: 'sin-dato' }, SIN + ': ninguna carrera nueva coincide con estos filtros.'))]));
      $('#nuevas-nota').textContent = `Hay ${miles(lista.length)} carreras nuevas de 2027 con estos filtros. Son ${miles(nuevas.length)} en total. Los filtros de región y jornada no se aplican aquí: la tabla de admisión no los trae.`;
    }

    function pintar() {
      filtrar();
      const suma = filtradas.reduce((a, c) => a + c.n, 0);
      const nSup = suprimidasEnFiltro();
      const dato = (v, n) => h('div', { class: 'dato' }, h('span', { class: 'dato__valor' }, v), h('span', { class: 'dato__nombre' }, n));
      $('#exp-kpis').replaceChildren(
        dato(miles(filtradas.length), 'celdas con cifra'),
        dato(miles(suma), 'entrantes estimados (suma de cifras centrales)'),
        dato(miles(nSup), 'celdas suprimidas en este filtro (menos de 10)'));
      const notas = ['Cada celda es una carrera en una sede y jornada. La suma de las cifras centrales no es el total nacional porque las celdas suprimidas no suman.'];
      if (est.texto.trim() || est.min > 0 || est.comuna) notas.push('El conteo de arriba no considera el texto buscado, la comuna ni el mínimo de entrantes. La lista de celdas suprimidas, más abajo, sí los considera.');
      if (C.suprimidas_sin_ficha) notas.push(`Hay otras ${miles(C.suprimidas_sin_ficha)} celdas suprimidas sin ficha de oferta que no se pueden asignar a un filtro.`);
      $('#exp-nota').textContent = notas.join(' ');

      const thead = h('thead', null, h('tr', null, COLS.map(([k, nombre, , num]) => {
        const activo = est.orden === k;
        return h('th', { scope: 'col', class: num ? 'num' : '', 'aria-sort': activo ? (est.dir > 0 ? 'ascending' : 'descending') : 'none' },
          h('button', { type: 'button', onclick: () => { est.dir = activo ? -est.dir : (num ? -1 : 1); est.orden = k === 'rango' ? 'n' : k; est.pagina = 0; pintar(); } },
            nombre, activo ? (est.dir > 0 ? ' ▲' : ' ▼') : ''));
      })));
      const pag = filtradas.slice(est.pagina * POR_PAGINA, (est.pagina + 1) * POR_PAGINA);
      const tbody = h('tbody', null, pag.length ? pag.map(c => h('tr', null,
        h('td', null, c.inst.nombre), h('td', null, c.sede), h('td', null, c.carrera), h('td', null, c.jornada), h('td', null, c.region),
        h('td', { class: 'num' }, miles(c.n)), h('td', { class: 'num' }, miles(c.inf) + ' a ' + miles(c.sup))))
        : [h('tr', null, h('td', { colspan: COLS.length, class: 'sin-dato' }, SIN + ': ningún dato coincide con estos filtros.'))]);
      $('#tabla-exp').replaceChildren(h('caption', { class: 'solo-lectores' }, 'Celdas de carrera y sede con entrantes estimados 2027'), thead, tbody);
      paginador($('#exp-pag'), { total: filtradas.length, pagina: est.pagina, porPagina: POR_PAGINA, unidad: 'celdas', alCambiar: p => { est.pagina = p; pintar(); $('#tabla-exp').scrollIntoView({ block: 'nearest' }); } });
      redibujarGrupo();
      pintarSuprimidas();
      pintarNuevas();
    }

    function grupos() {
      const f = agr[est.agrupar][1];
      const m = new Map();
      filtradas.forEach(c => m.set(f(c), (m.get(f(c)) || 0) + c.n));
      return [...m.entries()].map(([etiqueta, valor]) => ({ etiqueta, valor })).sort((a, b) => b.valor - a.valor);
    }
    redibujarGrupo = lienzo('#grafico-grupo', w => {
      const todos = grupos();
      const top = todos.slice(0, 12);
      $('#grupo-pie').textContent = todos.length
        ? `Se muestran los ${top.length} grupos más grandes de ${todos.length}. El orden es por entrantes estimados: no es un ranking de calidad ni de preferencia.`
        : 'No hay celdas con estos filtros.';
      if (!top.length) return h('p', { class: 'sin-dato' }, SIN + ' para estos filtros.');
      return graficoBarrasH(w, { filas: top, etiqueta: 'Entrantes estimados agrupados por ' + agr[est.agrupar][0].toLowerCase() });
    });

    const enlazar = (id, clave, num) => $(id).addEventListener(num ? 'input' : 'input', e => {
      est[clave] = num ? Math.max(0, Number(e.target.value) || 0) : e.target.value;
      est.pagina = 0;
      pintar();
    });
    enlazar('#exp-texto', 'texto'); enlazar('#exp-tipo', 'tipo');
    $('#exp-comuna').addEventListener('input', e => {
      est.comuna = e.target.value;
      est.pagina = 0;
      llenarInstituciones();
      pintar();
    });
    $('#exp-region').addEventListener('input', e => {
      est.region = e.target.value;
      est.pagina = 0;
      llenarComunas();
      llenarInstituciones();
      pintar();
    });
    enlazar('#exp-jornada', 'jornada'); enlazar('#exp-inst', 'inst'); enlazar('#exp-min', 'min', true);
    $('#exp-agrupar').addEventListener('input', e => { est.agrupar = e.target.value; redibujarGrupo(); });
    $('#exp-limpiar').addEventListener('click', () => {
      Object.assign(est, { texto: '', region: '', comuna: '', tipo: '', jornada: '', inst: '', min: 0, pagina: 0 });
      $('#exp-controles').reset();
      llenarComunas();
      llenarInstituciones();
      pintar();
    });
    $('#exp-csv').addEventListener('click', () => {
      const cab = ['institucion', 'sede', 'carrera', 'jornada', 'modalidad', 'region', 'comuna', 'entrantes_2027_estimado', 'inferior_95', 'superior_95', 'fuente', 'fecha_consulta'];
      const esc = v => '"' + String(v).replace(/"/g, '""') + '"';
      const filas = filtradas.map(c => [c.inst.nombre, c.sede, c.carrera, c.jornada, c.modalidad, c.region, c.comuna, c.n, c.inf, c.sup, 'SIES (Mi Futuro, Mineduc); elaboración propia', C.consultado].map(esc).join(','));
      const blob = new Blob(['﻿' + cab.join(',') + '\n' + filas.join('\n')], { type: 'text/csv;charset=utf-8' });
      const a = h('a', { href: URL.createObjectURL(blob), download: 'pronostico-2027-seleccion.csv' });
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    $('#exp-pie').replaceChildren(fuentePie(C));
    llenarComunas();
    llenarInstituciones();
    pintar();
  })();

  /* --------------------------------------------------------------- consulta */
  // Elige región → comuna → sede → carrera → jornada, y muestra la suma de las celdas con cifra.
  (function consulta() {
    const orden = ['region', 'comuna', 'institucion', 'sede', 'carrera', 'jornada'];
    const sel = { region: $('#con-region'), comuna: $('#con-comuna'), institucion: $('#con-inst'), sede: $('#con-sede'), carrera: $('#con-carrera'), jornada: $('#con-jornada') };
    const todos = { region: 'Todas las regiones', comuna: 'Todas las comunas', institucion: 'Todas las instituciones', sede: 'Todas las sedes', carrera: 'Todas las carreras', jornada: 'Todas las jornadas' };
    const val = { region: '', comuna: '', institucion: '', sede: '', carrera: '', jornada: '' };
    const cumple = (c, hasta) => Filtros.coincideEleccion(c, val, orden.slice(0, hasta));
    const dato = (v, n) => h('div', { class: 'dato' }, h('span', { class: 'dato__valor' }, v), h('span', { class: 'dato__nombre' }, n));

    // Cada lista solo ofrece lo que queda tras las elecciones anteriores.
    function llenar() {
      orden.forEach((k, i) => {
        const opc = [...new Set(celdas.filter(c => cumple(c, i)).map(c => c[k]))].filter(Boolean)
          .sort((a, b) => String(a).localeCompare(String(b), 'es'));
        if (val[k] && !opc.includes(val[k])) val[k] = '';
        sel[k].replaceChildren(h('option', { value: '' }, todos[k]), ...opc.map(o => h('option', { value: o }, o)));
        sel[k].value = val[k];
      });
    }

    function resultado() {
      const ok = celdas.filter(c => cumple(c, orden.length));
      const r = Filtros.resumen(ok);
      $('#con-kpis').replaceChildren(
        dato(miles(r.entrantes), 'entrantes estimados 2027'),
        dato(ok.length ? `${miles(r.inferior)} a ${miles(r.superior)}` : '—', 'rango aproximado (suma de intervalos)'),
        dato(miles(ok.length), 'celdas con cifra en esta elección'));

      const nota = [];
      if (!orden.some(k => val[k])) nota.push('Sin elección, se suman todas las celdas con cifra del tablero.');
      nota.push('El rango suma los intervalos de cada celda. Tiende a ser más amplio que el intervalo real del total, porque no considera que los errores se compensan.');
      if (val.comuna || val.sede || val.carrera) {
        nota.push('Las celdas suprimidas no suman a esta consulta: no tienen cifra. Aparecen con su nombre en la lista de celdas suprimidas del explorador.');
      } else {
        const supr = suprimidas.filter(s => (!val.region || s.region === val.region) && (!val.jornada || s.jornada === val.jornada)).length;
        nota.push(`Hay ${miles(supr)} celdas suprimidas (menos de 10 estudiantes) en la región y jornada elegidas; no suman a la cifra.`);
      }
      if (!ok.length) nota.push('No hay celdas con cifra para esta elección.');
      if (ok.length > 50) nota.push(`Se muestran las 50 celdas más grandes de ${miles(ok.length)}.`);
      $('#con-nota').textContent = nota.join(' ');

      const filas = ok.slice().sort((a, b) => b.n - a.n).slice(0, 50).map(c => h('tr', null,
        h('td', null, c.institucion), h('td', null, c.carrera), h('td', null, c.sede), h('td', null, c.comuna), h('td', null, c.jornada),
        h('td', { class: 'num' }, miles(c.n)), h('td', { class: 'num' }, `${miles(c.inf)} a ${miles(c.sup)}`)));
      const cab = ['Institución', 'Carrera', 'Sede', 'Comuna', 'Jornada'].map(t => h('th', { scope: 'col' }, t))
        .concat([h('th', { scope: 'col', class: 'num' }, 'Entrantes (estimado)'), h('th', { scope: 'col', class: 'num' }, 'Rango')]);
      $('#tabla-con').replaceChildren(
        h('caption', { class: 'solo-lectores' }, 'Celdas de la consulta con entrantes estimados 2027'),
        h('thead', null, h('tr', null, cab)),
        h('tbody', null, filas.length ? filas : [h('tr', null, h('td', { colspan: 7, class: 'sin-dato' }, SIN + ': ningún dato coincide con esta elección.'))]));
    }

    orden.forEach(k => sel[k].addEventListener('input', e => { val[k] = e.target.value; llenar(); resultado(); }));
    $('#con-limpiar').addEventListener('click', () => {
      orden.forEach(k => { val[k] = ''; });
      llenar(); resultado();
    });
    $('#con-pie').replaceChildren(fuentePie(D.celdas));
    llenar();
    resultado();
  })();

  /* --------------------------------------------------------------- bloque 8 */
  (function capacidad() {
    const instSel = $('#cap-inst'), sedeSel = $('#cap-sede'), tamIn = $('#cap-tam');
    const porInst = new Map();
    celdas.forEach(c => {
      if (!porInst.has(c.inst.codigo)) porInst.set(c.inst.codigo, { inst: c.inst, sedes: new Map() });
      const s = porInst.get(c.inst.codigo).sedes;
      if (!s.has(c.sede)) s.set(c.sede, []);
      s.get(c.sede).push(c);
    });
    const lista = [...porInst.values()].sort((a, b) => a.inst.nombre.localeCompare(b.inst.nombre, 'es'));
    instSel.replaceChildren(...lista.map(i => h('option', { value: i.inst.codigo }, i.inst.nombre)));
    // Parte en la institución con más celdas publicables para que haya algo que ver.
    const masGrande = lista.map(i => [i, [...i.sedes.values()].reduce((a, v) => a + v.length, 0)]).sort((a, b) => b[1] - a[1])[0];
    if (masGrande) instSel.value = masGrande[0].inst.codigo;

    let seleccion = [];
    let redibujar = () => {};
    function llenarSedes() {
      const sedes = [...porInst.get(instSel.value).sedes.entries()].sort((a, b) => b[1].reduce((x, c) => x + c.n, 0) - a[1].reduce((x, c) => x + c.n, 0));
      sedeSel.replaceChildren(...sedes.map(([s, v]) => h('option', { value: s }, `${s} (${v.length} celdas)`)));
    }
    function pintar() {
      const tam = Math.max(1, Math.floor(Number(tamIn.value) || 1));
      seleccion = [...(porInst.get(instSel.value).sedes.get(sedeSel.value) || [])].sort((a, b) => b.n - a.n);
      const sec = (n) => Math.ceil(n / tam);
      const tot = seleccion.reduce((a, c) => ({ n: a.n + c.n, inf: a.inf + c.inf, sup: a.sup + c.sup, sMed: a.sMed + sec(c.n), sInf: a.sInf + sec(c.inf), sSup: a.sSup + sec(c.sup) }),
        { n: 0, inf: 0, sup: 0, sMed: 0, sInf: 0, sSup: 0 });
      const dato = (v, n) => h('div', { class: 'dato' }, h('span', { class: 'dato__valor' }, v), h('span', { class: 'dato__nombre' }, n));
      $('#cap-kpis').replaceChildren(
        dato(miles(tot.n), 'entrantes estimados en la sede'),
        dato(miles(tot.sMed), 'secciones con la cifra central'),
        dato(`${miles(tot.sInf)} a ${miles(tot.sSup)}`, 'secciones entre los extremos del intervalo'));
      $('#cap-titulo').textContent = `Entrantes estimados por carrera en ${sedeSel.value}`;
      tabla($('#tabla-cap'), {
        columnas: [{ nombre: 'Carrera' }, { nombre: 'Jornada' }, { nombre: 'Entrantes (central)', num: true }, { nombre: 'Intervalo de 95 %', num: true }, { nombre: 'Secciones (central)', num: true }, { nombre: 'Secciones (rango)', num: true }],
        filas: seleccion.map(c => [c.carrera, c.jornada, miles(c.n), `${miles(c.inf)} a ${miles(c.sup)}`, sec(c.n), `${sec(c.inf)} a ${sec(c.sup)}`]),
        pie: ['Total de la sede', '', miles(tot.n), `${miles(tot.inf)} a ${miles(tot.sup)}`, tot.sMed, `${tot.sInf} a ${tot.sSup}`],
      });
      redibujar();
    }
    redibujar = lienzo('#grafico-cap', w => {
      const filas = seleccion.slice(0, 15).map(c => ({ etiqueta: c.carrera + (c.jornada ? ' · ' + c.jornada : ''), med: c.n, inf: c.inf, sup: c.sup }));
      if (!filas.length) return h('p', { class: 'sin-dato' }, SIN + ' para esta sede.');
      return graficoRangos(w, { filas, etiqueta: 'Entrantes estimados por carrera con su intervalo' });
    });
    instSel.addEventListener('input', () => { llenarSedes(); pintar(); });
    sedeSel.addEventListener('input', pintar);
    tamIn.addEventListener('input', pintar);
    if (lista.length) { llenarSedes(); pintar(); }
  })();

  /* --------------------------------------------------------------- bloque 9 */
  (function permanencia() {
    const R = N.retencion_por_tipo.valores;
    const base = {
      total: N.pronosticos.primer_anio_2027.valor,
      uni: (R[0].ingreso_2026 / N.retencion_por_tipo.ingreso_total_2026) * 100,
      ip: (R[1].ingreso_2026 / N.retencion_por_tipo.ingreso_total_2026) * 100,
      r: R.map(x => x.retencion * 100),
    };
    const total = $('#per-total'), uni = $('#per-uni'), ip = $('#per-ip'), cft = $('#per-cft');
    const rins = [$('#ret-uni'), $('#ret-ip'), $('#ret-cft')];
    function reset() {
      total.value = base.total; uni.value = base.uni; ip.value = base.ip;
      rins.forEach((e, i) => { e.value = base.r[i]; });
    }
    function pintar() {
      let u = Number(uni.value), p = Number(ip.value);
      if (u + p > 100) { p = 100 - u; ip.value = p; }
      const c = 100 - u - p;
      const rs = rins.map(e => Math.min(100, Math.max(0, Number(e.value) || 0)));
      const t = Math.max(0, Number(total.value) || 0);
      $('#per-uni-et').textContent = `Universidades: ${dec(u)} % del ingreso`;
      $('#per-ip-et').textContent = `Institutos profesionales (IP): ${dec(p)} % del ingreso`;
      cft.textContent = dec(c) + ' % del ingreso';
      const ret = (u * rs[0] + p * rs[1] + c * rs[2]) / 10000;
      const perm = t * ret;
      const reg = N.pronosticos.permanencia_2028.valor;
      const dato = (v, n) => h('div', { class: 'dato' }, h('span', { class: 'dato__valor' }, v), h('span', { class: 'dato__nombre' }, n));
      $('#per-kpis').replaceChildren(
        dato(pct(ret), 'retención ponderada del escenario'),
        dato(miles(perm), 'siguen en segundo año'),
        dato(miles(t - perm), 'no siguen en la misma institución según esa tasa'),
        dato(miles(t * 0.01), 'estudiantes por cada punto de retención'),
        dato(firmado(perm - reg, 0).replace(/(\d)(?=(\d{3})+$)/g, '$1.'), 'frente al valor registrado'));
      const retBase = (base.uni * base.r[0] + base.ip * base.r[1] + (100 - base.uni - base.ip) * base.r[2]) / 10000;
      const dif = Math.round(base.total * retBase - reg);
      $('#per-nota').textContent =
        `El escenario de partida da ${miles(base.total * retBase)} y el valor registrado es ${miles(reg)}${dif === 0 ? ': coinciden' : `, una diferencia de ${miles(Math.abs(dif))}`}. ` +
        `La mezcla sale de las matrículas de primer año 2026 por tipo (SIES, tabla 7): ${R.map(x => miles(x.ingreso_2026)).join(' / ')}. ` +
        `En 2026 unas ${miles(N.retencion_por_tipo.traspaso_cft_a_ip_aprox)} matrículas pasaron de un CFT a un IP: la retención de 2025 no lo refleja. ` +
        'La retención es la tasa de primer año que publica el SIES (sigue en la misma institución al año siguiente) para la cohorte 2025: describe a una cohorte, no a un estudiante en particular.';
    }
    [total, uni, ip, ...rins].forEach(e => e.addEventListener('input', pintar));
    $('#per-reset').addEventListener('click', () => { reset(); pintar(); });
    reset(); pintar();

    lienzo('#grafico-ret', w => graficoBarrasH(w, {
      filas: R.map(x => ({ etiqueta: x.nombre, valor: x.retencion * 100 })),
      fmt: v => dec(v, 1) + ' %', izquierda: Math.min(230, Math.round(w * 0.5)),
      etiqueta: 'Retención de primer año por tipo de institución',
    }));
    $('#ret-pie').replaceChildren(fuentePie({ fuente: N.retencion_por_tipo.fuente + ', cohorte ' + N.retencion_por_tipo.cohorte, url: N.retencion_por_tipo.url, consultado: N.retencion_por_tipo.consultado }));
    const J = N.retencion_por_jornada;
    tabla($('#tabla-jornada'), {
      columnas: [{ nombre: 'Jornada' }, { nombre: 'Retención de primer año', num: true }],
      filas: J.valores.map(v => [v.nombre, pct(v.retencion)]),
    });
    $('#jornada-nota').replaceChildren(h('span', null, J.nota + ' '), fuentePie({ fuente: J.fuente, url: J.url, consultado: J.consultado }));
  })();

  /* -------------------------------------------------------------- bloque 10 */
  (function comunas() {
    const K = D.comunas;
    const filas = K.filas.map(f => ({ ...f, nombre: f.comuna || 'Código ' + f.codigo }));
    const conDato = filas.filter(f => f.residentes != null);
    const totRes = conDato.reduce((a, f) => a + f.residentes, 0);
    $('#com-bajada').textContent =
      `${miles(conDato.length)} comunas con 10 o más residentes en cuarto medio suman ${miles(totRes)} estudiantes. ` +
      'Se cuenta por comuna de residencia: así se evita atribuir a una comuna a quienes solo estudian en ella.';

    // Total por región
    const porReg = D.meta.regiones.map(r => {
      const g = conDato.filter(f => f.region === r);
      const res = g.reduce((a, f) => a + f.residentes, 0);
      const p = g.reduce((a, f) => a + (f.proy ? f.proy.central : 0), 0);
      const i = g.reduce((a, f) => a + (f.proy ? f.proy.inferior : 0), 0);
      const s = g.reduce((a, f) => a + (f.proy ? f.proy.superior : 0), 0);
      return { region: r, res, p, i, s, n: g.length };
    });
    $('#com-leyenda').replaceChildren(leyenda([
      { svg: muestraBarra('barra-a'), nombre: 'Cohorte 2026 (observada)' },
      { svg: muestraBarra('', 'leyenda-trama-3'), nombre: 'Proyección 2027 con su intervalo' },
    ]));
    lienzo('#grafico-reg', w => {
      const fila = 44, l = Math.min(Math.round(w * 0.3), 150), m = { t: 22, r: 20, b: 8, l };
      const max = Math.max(...porReg.map(x => x.s), 1);
      const eje = ejeNice(0, max, 4);
      const x = lineal(0, eje.hi, m.l, w - m.r);
      const alto = m.t + m.b + fila * porReg.length;
      const pid = idUnico('trama');
      const g = [];
      eje.ticks.forEach(t => {
        g.push(sv('line', { class: 'rejilla', x1: x(t), x2: x(t), y1: m.t - 4, y2: alto - m.b }));
        g.push(sv('text', { x: x(t), y: m.t - 8, 'text-anchor': 'middle', class: 'cifra' }, miles(t)));
      });
      porReg.forEach((r, i) => {
        const cy = m.t + fila * i;
        g.push(sv('text', { x: m.l - 8, y: cy + fila / 2 + 4, 'text-anchor': 'end', class: 'fuerte' }, r.region));
        const t1 = `${r.region}, cohorte 2026: ${miles(r.res)}`;
        const t2 = `${r.region}, proyección 2027: ${miles(r.p)} (de ${miles(r.i)} a ${miles(r.s)})`;
        g.push(sv('rect', { x: m.l, y: cy + 6, width: Math.max(2, x(r.res) - m.l), height: 13, rx: 2, class: 'barra-a', 'data-tip': t1, tabindex: 0, role: 'img', 'aria-label': t1 }));
        g.push(sv('rect', { x: m.l, y: cy + 23, width: Math.max(2, x(r.p) - m.l), height: 13, rx: 2, fill: 'url(#' + pid + ')', stroke: 'var(--color-texto-suave)', 'stroke-width': 1.5, 'data-tip': t2, tabindex: 0, role: 'img', 'aria-label': t2 }));
        g.push(sv('line', { x1: x(r.i), x2: x(r.s), y1: cy + 29.5, y2: cy + 29.5, stroke: 'var(--color-texto)', 'stroke-width': 1.5 }));
        g.push(sv('line', { x1: x(r.i), x2: x(r.i), y1: cy + 25, y2: cy + 34, stroke: 'var(--color-texto)', 'stroke-width': 1.5 }));
        g.push(sv('line', { x1: x(r.s), x2: x(r.s), y1: cy + 25, y2: cy + 34, stroke: 'var(--color-texto)', 'stroke-width': 1.5 }));
      });
      return sv('svg', { width: w, height: alto, viewBox: `0 0 ${w} ${alto}`, role: 'group', 'aria-label': 'Cohorte 2026 y proyección 2027 por región' }, sv('defs', null, patron(pid)), g);
    });
    $('#grafico-reg').after(h('details', null, h('summary', null, 'Ver como tabla'),
      h('div', { class: 'tabla-wrap', tabindex: 0, role: 'region', 'aria-label': 'Totales por región' }, h('table', { id: 'tabla-reg' }))));
    tabla($('#tabla-reg'), {
      columnas: [{ nombre: 'Región' }, { nombre: 'Comunas con dato', num: true }, { nombre: 'Cohorte 2026', num: true }, { nombre: 'Proyección 2027', num: true }, { nombre: 'Intervalo', num: true }],
      filas: porReg.map(r => [r.region, miles(r.n), miles(r.res), miles(r.p), `${miles(r.i)} a ${miles(r.s)}`]),
      pie: ['Total', miles(conDato.length), miles(totRes), miles(porReg.reduce((a, r) => a + r.p, 0)), ''],
    });

    // Diferencia colegio frente a residencia (solo comunas de tamaño suficiente)
    const grandes = conDato.filter(f => f.colegio != null && f.residentes >= 500).map(f => ({ ...f, dif: f.colegio / f.residentes - 1 }));
    grandes.sort((a, b) => b.dif - a.dif);
    const muestra = [...grandes.slice(0, 8), ...grandes.slice(-6)];
    lienzo('#grafico-dif', w => {
      const fila = 28, l = Math.min(Math.round(w * 0.36), 190), m = { t: 20, r: 60, b: 8, l };
      const extremo = Math.max(...muestra.map(f => Math.abs(f.dif)), 0.05);
      const x = lineal(-extremo, extremo, m.l, w - m.r);
      const alto = m.t + m.b + fila * muestra.length;
      const g = [sv('line', { class: 'eje', x1: x(0), x2: x(0), y1: m.t - 6, y2: alto - m.b })];
      g.push(sv('text', { x: x(0), y: 10, 'text-anchor': 'middle' }, '0 %'));
      muestra.forEach((f, i) => {
        const cy = m.t + fila * i;
        const tip = `${f.nombre}: el colegio cuenta ${miles(f.colegio)} y la residencia ${miles(f.residentes)} (${firmado(f.dif * 100)} %)`;
        g.push(sv('text', { x: m.l - 8, y: cy + fila / 2 + 4, 'text-anchor': 'end', class: 'fuerte' }, recortar(f.nombre, Math.floor((l - 10) / 6.6)), sv('title', null, f.nombre)));
        const x0 = x(0), x1 = x(f.dif);
        g.push(sv('rect', { x: Math.min(x0, x1), y: cy + 5, width: Math.max(2, Math.abs(x1 - x0)), height: fila - 10, rx: 2, class: f.dif >= 0 ? 'barra-a' : 'barra-b', 'data-tip': tip, tabindex: 0, role: 'img', 'aria-label': tip }));
        g.push(sv('text', { x: f.dif >= 0 ? x1 + 6 : x1 - 6, y: cy + fila / 2 + 4, 'text-anchor': f.dif >= 0 ? 'start' : 'end', class: 'cifra' }, firmado(f.dif * 100) + ' %'));
      });
      return sv('svg', { width: w, height: alto, viewBox: `0 0 ${w} ${alto}`, role: 'group', 'aria-label': 'Diferencia entre contar por colegio y por residencia en comunas de 500 o más residentes' }, g);
    });
    const sf = filas.find(f => /^san fernando$/i.test(f.comuna || ''));
    $('#dif-pie').replaceChildren(
      h('span', null,
        `A la derecha (azul), la comuna cuenta más estudiantes por colegio que por residencia: sobreestimaría la cohorte local. A la izquierda (verde), menos. Solo comunas con 500 o más residentes, las 8 con mayor diferencia positiva y las 6 con mayor diferencia negativa. ` +
        (sf && sf.residentes ? `En San Fernando, el colegio cuenta ${miles(sf.colegio)} frente a ${miles(sf.residentes)} por residencia (${firmado((sf.colegio / sf.residentes - 1) * 100)} %). ` : '')),
      fuentePie(K));

    // Tabla de comunas
    const est = { texto: '', region: '', orden: 'residentes', pagina: 0 };
    llenarSelect($('#com-region'), D.meta.regiones.map(r => ({ valor: r, texto: r })), 'Todas las regiones');
    const ORDENES = { residentes: 'Cohorte 2026 (mayor a menor)', nombre: 'Nombre de la comuna', dif: 'Diferencia colegio frente a residencia', salida: 'Estudiantes que salen a estudiar a otra comuna' };
    $('#com-orden').replaceChildren(...Object.entries(ORDENES).map(([k, t]) => h('option', { value: k }, t)));
    const POR = 20;
    function pintar() {
      const q = sinTilde(est.texto.trim());
      let f = filas.filter(c => (!q || sinTilde(c.nombre).includes(q)) && (!est.region || c.region === est.region));
      const dif = c => (c.colegio != null && c.residentes ? c.colegio / c.residentes - 1 : -Infinity);
      const claves = { residentes: c => -(c.residentes ?? -1), nombre: c => c.nombre, dif: c => -dif(c), salida: c => -(c.salida ?? -1) };
      const k = claves[est.orden];
      f.sort((a, b) => { const x = k(a), y = k(b); return typeof x === 'string' ? x.localeCompare(y, 'es') : x - y; });
      const pag = f.slice(est.pagina * POR, (est.pagina + 1) * POR);
      const sd = v => (v == null ? h('span', { class: 'sin-dato' }, SIN) : miles(v));
      tabla($('#tabla-com'), {
        titulo: 'Comunas de residencia de estudiantes de cuarto medio',
        columnas: [{ nombre: 'Comuna' }, { nombre: 'Región' }, { nombre: 'Cohorte 2026 por residencia', num: true }, { nombre: 'Por colegio', num: true }, { nombre: 'Diferencia', num: true },
          { nombre: 'Salen a estudiar a otra comuna', num: true }, { nombre: 'Entran desde otra comuna', num: true }, { nombre: 'Proyección 2027 (intervalo)', num: true }, { nombre: 'Población de 17 y 18 años (INE, dos cohortes)', num: true }],
        filas: pag.map(c => [c.nombre, c.region, sd(c.residentes), sd(c.colegio),
          c.residentes && c.colegio != null ? firmado((c.colegio / c.residentes - 1) * 100) + ' %' : null,
          sd(c.salida), sd(c.entrada),
          c.proy ? `${miles(c.proy.central)} (${miles(c.proy.inferior)} a ${miles(c.proy.superior)})` : null,
          c.pob_17_18 == null ? null : miles(c.pob_17_18)]),
      });
      paginador($('#com-pag'), { total: f.length, pagina: est.pagina, porPagina: POR, unidad: 'comunas', alCambiar: p => { est.pagina = p; pintar(); } });
    }
    [['#com-texto', 'texto'], ['#com-region', 'region'], ['#com-orden', 'orden']].forEach(([id, k]) =>
      $(id).addEventListener('input', e => { est[k] = e.target.value; est.pagina = 0; pintar(); }));
    pintar();
  })();

  /* -------------------------------------------------------------- bloque 11 */
  (function usos() {
    const lista = (sel, items, ic) => $(sel).replaceChildren(...items.map(([t, d, ancla]) =>
      h('li', null, icono(ic), h('div', null, h('strong', null, t), ancla ? h('span', null, ' (', h('a', { href: ancla }, 'ver sección'), ')') : '', h('br'), h('span', { class: 'suave' }, d)))));
    lista('#usos-si', [
      ['Planificar capacidad', 'Secciones, docentes y salas por carrera y sede, usando la cifra con su intervalo.', '#capacidad'],
      ['Orientar apoyo por jornada o carrera', 'Tutorías donde la retención histórica es más baja, sin clasificar estudiantes.', '#permanencia'],
      ['Seguir el error cada año', 'Comparar lo estimado con lo observado y publicar el error, bueno o malo.', '#verificacion'],
      ['Mirar la cohorte por territorio', 'Cuántos estudiantes de cuarto medio hay por comuna de residencia y cuántos salen a estudiar a otra.', '#comunas'],
      ['Probar escenarios', 'Qué cambia en la permanencia si cambia la mezcla de instituciones o la retención.', '#permanencia'],
      ['Auditar sin depender de nosotros', 'El registro con hash y los scripts permiten recalcular todo con datos públicos (datos/pronosticos/REPRODUCIR.md).'],
    ], 'check');
    lista('#usos-no', [
      ['Admitir, seleccionar o priorizar personas', 'Termina el contrato si una institución lo hace (ADR 0018).'],
      ['Perfilar por sexo, edad, nivel socioeconómico, origen escolar o discapacidad', 'Ley 20.609, art. 2°; y la Ley 21.719 define la situación socioeconómica como dato sensible.'],
      ['Etiquetar grupos', 'Nada de «dispuestos», «en riesgo» ni parecidos. Se describe la cohorte y su tendencia.'],
      ['Ordenar o destacar instituciones por ser clientes', 'Neutralidad del portal (AGENTS.md, sección 1).'],
      ['Decidir una sección con la cifra de una carrera', 'El intervalo por carrera y sede es de ×3,2: orden de magnitud.'],
      ['Predecir a un estudiante', 'El ADR 0016 no está habilitado; este tablero no tiene datos individuales.'],
    ], 'ban');
    $('#usos-falta').replaceChildren(
      h('li', null, 'Vacantes por carrera y demanda por sede: el informe indica que reducir el ancho del intervalo exige información externa de este tipo.'),
      h('li', null, 'La serie histórica de una institución real, para medir si la planificación actual se equivoca más o menos que este método.'),
      h('li', null, 'Revisión legal del producto y del contrato antes de cualquier oferta comercial (ADR 0018).'),
      h('li', null, 'Los resultados de 2027 para ver cuánto acertó el pronóstico.'));
  })();

  /* -------------------------------------------------------------- bloque 12 */
  (function limites() {
    $('#lista-limites').replaceChildren(...N.limites.map(t => h('li', null, t)));
    $('#lista-fuentes').replaceChildren(...N.fuentes.map(f => h('li', null, h('a', { href: f.url, target: '_blank', rel: 'noopener' }, f.nombre), ' · ', f.nota)));
  })();

  /* ----------------------------------------------------- navegación activa */
  (function menu() {
    const enlaces = $$('#menu a');
    const secciones = enlaces.map(a => $(a.getAttribute('href'))).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        enlaces.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)));
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    secciones.forEach(s => io.observe(s));
  })();
})();
