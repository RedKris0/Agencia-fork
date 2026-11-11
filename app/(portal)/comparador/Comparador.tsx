'use client';

import { AlertTriangle, ArrowUpRight, Search, X } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { indicadorDe } from '@/lib/datos/comparador';
import type { Carrera, Indicador } from '@/lib/datos/carreras';
import { fechaLarga } from '@/lib/datos/fechas';
import { nombreDeFuente } from '@/lib/datos/fuentes';

import estilos from './comparador.module.css';
import { CabeceraInterior } from '@/app/_componentes/CabeceraInterior';

// Solo el estado de qué columnas se ven en el teléfono vive aquí. Agregar y quitar
// carreras son enlaces que arma el servidor (no hace falta JavaScript para usarlos).
type Resultado = { carrera: Carrera; href: string };
type Props = {
  seleccionadas: Carrera[];
  quitarHref: Record<string, string>;
  resultados: Resultado[];
  q: string;
  carrerasActuales: string;
  error?: boolean;
};

type Fila = {
  tipo: Indicador['tipo'];
  titulo: string;
  unidad: string;
  queMide: string;
};

const filas: Fila[] = [
  { tipo: 'empleabilidad_1er_anio', titulo: 'Empleabilidad al 1.er año', unidad: 'porcentaje', queMide: 'Porcentaje de personas tituladas que ganaron al menos el sueldo mínimo durante el primer año después de titularse. Solo considera a quienes registran ingresos.' },
  { tipo: 'ingreso_promedio_4to_anio', titulo: 'Ingreso al 4.º año', unidad: 'pesos chilenos', queMide: 'Tramo del ingreso bruto mensual al cuarto año después de titularse.' },
  { tipo: 'arancel_anual', titulo: 'Arancel anual', unidad: 'pesos chilenos', queMide: 'Lo que pagas cada año, antes de aplicar beneficios.' },
  { tipo: 'duracion_real_semestres', titulo: 'Duración real', unidad: 'semestres', queMide: 'Tiempo que tardaron en titularse quienes terminaron la carrera.' },
  { tipo: 'puntaje_corte', titulo: 'Puntaje de corte', unidad: 'puntos', queMide: 'Puntaje del último matriculado el año anterior.' },
  { tipo: 'vacantes', titulo: 'Vacantes', unidad: 'cupos', queMide: 'Cupos disponibles para postular.' },
];

function formatoNumero(indicador: Indicador): string {
  if (indicador.valor === null) return 'Sin datos suficientes';
  if (indicador.unidad === 'pesos') {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(indicador.valor);
  }
  if (indicador.unidad === 'porcentaje') return `${new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(indicador.valor)} %`;
  return new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(indicador.valor);
}

function Celda({ carrera, fila, ocultaEnMovil }: { carrera: Carrera; fila: Fila; ocultaEnMovil: boolean }) {
  const indicador = indicadorDe(carrera, fila.tipo);
  const sinDato = !indicador || indicador.valor === null;

  return (
    <div className={`${estilos.celda} ${ocultaEnMovil ? estilos.ocultaEnMovil : ''}`} data-sin-dato={sinDato || undefined} role="group" aria-label={`${carrera.carrera} · ${carrera.institucion.nombre} · ${carrera.sede} · ${carrera.jornada}`}>
      <p className={sinDato ? estilos.sinDato : estilos.valor}>{sinDato ? 'Sin datos suficientes' : formatoNumero(indicador)}</p>
      {sinDato ? (
        <p>{indicador && 'motivo_sin_dato' in indicador ? indicador.motivo_sin_dato : 'Este dato aún no está cargado.'}</p>
      ) : (
        <>
          <p>{indicador.nivel === 'programa' ? 'Toda la carrera en esta institución.' : 'Esta sede y jornada.'}</p>
          <p>Período: {indicador.periodo}</p>
          <p>
            Fuente: <a href={indicador.url}>{nombreDeFuente(indicador.fuente)}</a> · Consultada el {fechaLarga(indicador.fecha_consulta)}
          </p>
        </>
      )}
    </div>
  );
}

function FilaComparacion({ carreras, fila, visiblesEnMovil }: { carreras: Carrera[]; fila: Fila; visiblesEnMovil: string[] }) {
  const periodos = carreras
    .map((carrera) => indicadorDe(carrera, fila.tipo))
    .filter((indicador): indicador is Indicador => Boolean(indicador && indicador.valor !== null))
    .map((indicador) => indicador.periodo);
  const hayPeriodosDistintos = new Set(periodos).size > 1;

  return (
    <section className={estilos.fila} aria-labelledby={`indicador-${fila.tipo}`} data-reveal="fila">
      <div className={estilos.etiqueta}>
        <h2 id={`indicador-${fila.tipo}`}>{fila.titulo}</h2>
        <p>Unidad: {fila.unidad}</p>
        <p>{fila.queMide}</p>
      </div>
      <div className={estilos.celdas}>
        {carreras.map((carrera) => (
          <Celda
            key={carrera.codigo_sies}
            carrera={carrera}
            fila={fila}
            ocultaEnMovil={!visiblesEnMovil.includes(carrera.codigo_sies)}
          />
        ))}
      </div>
      {hayPeriodosDistintos ? (
        <p className={estilos.aviso}><AlertTriangle aria-hidden="true" /><span><strong>Aviso</strong>. Los períodos no son iguales. Revísalos antes de comparar.</span></p>
      ) : null}
    </section>
  );
}



export function Comparador({ seleccionadas, quitarHref, resultados, q, carrerasActuales, error }: Props) {
  const [elegidasEnMovil, setElegidasEnMovil] = useState<string[]>([]);
  const visiblesEnMovil = (elegidasEnMovil.length ? elegidasEnMovil : seleccionadas.slice(0, 2).map((carrera) => carrera.codigo_sies))
    .filter((codigo) => seleccionadas.some((carrera) => carrera.codigo_sies === codigo));

  function alternarVisible(codigo: string) {
    if (visiblesEnMovil.includes(codigo)) {
      setElegidasEnMovil(visiblesEnMovil.filter((item) => item !== codigo));
      return;
    }
    if (visiblesEnMovil.length < 2) setElegidasEnMovil([...visiblesEnMovil, codigo]);
  }

  return (
    <div className={estilos.comparador} data-pagina-interior>
      <CabeceraInterior pagina="comparador" titulo="Compara carreras"><p>Revisa los datos de hasta tres opciones. Esta página no ordena ni recomienda instituciones.</p></CabeceraInterior>
      <main id="contenido" tabIndex={-1} aria-labelledby="titulo-pagina">
        <div className={estilos.contenido}>
          {error ? <div role="alert" className={estilos.error}><AlertTriangle aria-hidden="true" /><p>No pudimos cargar las carreras en este momento. Intenta de nuevo en unos minutos.</p></div> : null}

          <section className={estilos.selector} aria-labelledby="elige-carreras">
            <h2 id="elige-carreras">Elige hasta tres carreras</h2>
            {seleccionadas.length ? (
              <ul className={estilos.seleccionadas}>
                {seleccionadas.map((carrera) => (
                  <li key={carrera.codigo_sies} data-reveal="tarjeta" data-panel>
                    <div><strong>{carrera.carrera}</strong><span>{carrera.institucion.nombre} · {carrera.sede} · {carrera.jornada}</span></div>
                    <Link href={quitarHref[carrera.codigo_sies]}><X aria-hidden="true" />Quitar carrera</Link>
                  </li>
                ))}
              </ul>
            ) : <p>Agrega carreras para comparar sus datos oficiales.</p>}

            {seleccionadas.length < 3 ? (
              <form method="get" action="/comparador" className={estilos.buscarCarrera}>
                {carrerasActuales ? <input type="hidden" name="carreras" value={carrerasActuales} /> : null}
                <label htmlFor="buscar-carrera">Busca una carrera para agregar</label>
                <div className={estilos.entrada}>
                  <input id="buscar-carrera" name="q" defaultValue={q} />
                  <button type="submit"><Search aria-hidden="true" />Buscar</button>
                </div>
              </form>
            ) : <p>Ya elegiste tres carreras. Quita una para agregar otra.</p>}

            {q && !error && seleccionadas.length < 3 ? (
              resultados.length ? (
                <ul className={estilos.resultadosComparador} aria-label="Resultados para agregar">
                  {resultados.map(({ carrera, href }) => (
                    <li key={carrera.codigo_sies} data-reveal="tarjeta">
                      <Link href={href}><span>Agregar: {carrera.carrera} · {carrera.institucion.nombre} · {carrera.sede} · {carrera.jornada}</span><ArrowUpRight aria-hidden="true" /></Link>
                    </li>
                  ))}
                </ul>
              ) : <p className={estilos.vacio}>No encontramos carreras con «{q}». Prueba con otra palabra.</p>
            ) : null}

            {seleccionadas.length === 3 ? (
              <fieldset className={estilos.elegirMovil}>
                <legend>En teléfono, elige dos carreras para ver lado a lado</legend>
                {seleccionadas.map((carrera) => {
                  const estaVisible = visiblesEnMovil.includes(carrera.codigo_sies);
                  const estaDeshabilitada = !estaVisible && visiblesEnMovil.length === 2;
                  const idDeAyuda = `limite-visible-${carrera.codigo_sies}`;

                  return (
                    <Fragment key={carrera.codigo_sies}>
                      <label>
                        <input
                          type="checkbox"
                          checked={estaVisible}
                          disabled={estaDeshabilitada}
                          aria-describedby={estaDeshabilitada ? idDeAyuda : undefined}
                          onChange={() => alternarVisible(carrera.codigo_sies)}
                        />
                        {carrera.carrera} · {carrera.institucion.nombre}
                      </label>
                      {estaDeshabilitada ? <p id={idDeAyuda} role="status">Ya ves dos carreras. Quita una para ver esta.</p> : null}
                    </Fragment>
                  );
                })}
              </fieldset>
            ) : null}
            {seleccionadas.length ? <p className={estilos.compartir}>La dirección de esta página guarda solo las carreras elegidas. Puedes copiarla para compartir esta comparación.</p> : null}
          </section>

          {seleccionadas.length ? (
            <section className={estilos.tabla} aria-label="Datos comparados">
              <div className={estilos.columnas}>
                {seleccionadas.map((carrera) => (
                  <p className={visiblesEnMovil.includes(carrera.codigo_sies) ? '' : estilos.ocultaEnMovil} key={carrera.codigo_sies}>
                    <strong>{carrera.carrera}</strong><span>{carrera.institucion.nombre}</span><span>{carrera.sede} · {carrera.jornada}</span>
                  </p>
                ))}
              </div>
              {filas.map((fila) => <FilaComparacion key={fila.tipo} carreras={seleccionadas} fila={fila} visiblesEnMovil={visiblesEnMovil} />)}
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}
