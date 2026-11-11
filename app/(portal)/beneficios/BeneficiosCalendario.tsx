"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDown, CalendarDays, Search } from "lucide-react";

import { Aviso } from "@/app/_componentes/Aviso";
import { IndicadorEstacion } from "@/app/_componentes/IndicadorEstacion";
import { Enlace } from "@/app/_componentes/Enlace";
import { fechaLarga } from "@/lib/datos/fechas";

import { filtrarBeneficios, ordenarPlazos, type Beneficio, type Plazo } from "./beneficios";
import estilos from "./beneficios.module.css";

type Props = { beneficios: Beneficio[]; plazos: Plazo[] };

function Fuente({ fuente, url, fecha }: { fuente: string; url: string; fecha: string }) {
  return (
    <p className={estilos.fuente}>
      Fuente: <Enlace href={url}>{fuente}</Enlace><br />
      URL: <Enlace href={url}>{url}</Enlace><br />
      Consultada el <time dateTime={fecha}>{fechaLarga(fecha)}</time>
    </p>
  );
}

function RangoDeFechas({ plazo }: { plazo: Plazo }) {
  if (!plazo.inicio || !plazo.termino) {
    return (
      <Aviso tipo="plazo" titulo="Fecha pendiente">
        <p>{plazo.motivo_sin_fecha}</p>
        {plazo.periodo_referencial ? <p>Referencia: {plazo.periodo_referencial}.</p> : null}
      </Aviso>
    );
  }

  return <p><strong>Fecha:</strong> <time dateTime={plazo.inicio}>{fechaLarga(plazo.inicio)}</time> al <time dateTime={plazo.termino}>{fechaLarga(plazo.termino)}</time>.</p>;
}

export function BeneficiosCalendario({ beneficios, plazos }: Props) {
  const [consulta, setConsulta] = useState("");
  const resultados = useMemo(() => filtrarBeneficios(beneficios, consulta), [beneficios, consulta]);
  const plazosOrdenados = useMemo(() => ordenarPlazos(plazos), [plazos]);

  return (
    <main id="contenido" tabIndex={-1} className={estilos.pagina}>
      <header className={estilos.encabezado}>
        <div className={estilos.interior}>
          <Link className={estilos.volver} href="/"><ArrowLeft aria-hidden="true" />Volver al inicio</Link>
          <div className={estilos.presentacion}>
            <div>
              <h1>Beneficios y plazos 2027</h1>
              <p>Revisa opciones oficiales. Cumplir requisitos no asegura un beneficio: podrías acceder si el Ministerio de Educación (Mineduc) confirma tus antecedentes.</p>
            </div>
            <CalendarDays className={estilos.senal} aria-hidden="true" />
          </div>
          <nav className={estilos.accesos} aria-label="En esta página">
            <a className={estilos.accion} href="#calendario-plazos">Ver calendario<ArrowDown aria-hidden="true" /></a>
            <a className={estilos.enlaceHero} href="#buscar-beneficios">Buscar beneficios<ArrowDown aria-hidden="true" /></a>
          </nav>
        </div>
      </header>

      <div className={estilos.contenido}>
        <div className={estilos.trayecto}><IndicadorEstacion actual={2} /></div>
        <section aria-labelledby="buscar-beneficios" className={estilos.seccion}>
          <h2 id="buscar-beneficios" tabIndex={-1}>Busca beneficios</h2>
          <div className={estilos.buscador}>
            <label htmlFor="consulta-beneficios">Escribe el nombre o una palabra del beneficio</label>
            <div className={estilos.campo}>
              <Search aria-hidden="true" />
              <input
                id="consulta-beneficios"
                className={estilos.busqueda}
                type="search"
                value={consulta}
                onChange={(evento) => setConsulta(evento.target.value)}
              />
            </div>
            <p className={estilos.conteo} role="status">{resultados.length} {resultados.length === 1 ? "beneficio encontrado" : "beneficios encontrados"}.</p>
          </div>
          <div className={estilos.listaBeneficios}>
            {resultados.map((beneficio) => (
              <article key={beneficio.codigo} className={estilos.tarjeta}>
                <div className={estilos.resumenBeneficio}>
                  <h3>{beneficio.nombre_oficial}</h3>
                  <p>{beneficio.explicacion_simple}</p>
                </div>
                <div className={estilos.detalleBeneficio}>
                  <div><h4>Requisitos</h4><ul>{beneficio.requisitos_simples.map((requisito) => <li key={requisito}>{requisito}</li>)}</ul></div>
                  <div><h4>Cobertura</h4><p>{beneficio.cobertura.descripcion}</p></div>
                  <div><h4>Cómo postular</h4><p>{beneficio.postulacion}</p></div>
                </div>
                <Fuente fuente={beneficio.fuente} url={beneficio.url} fecha={beneficio.fecha_consulta} />
              </article>
            ))}
          </div>
          {!resultados.length ? <div className={estilos.vacio}><Search aria-hidden="true" /><p>No encontramos beneficios con esa búsqueda. Prueba con otro nombre.</p></div> : null}
        </section>

        <section aria-labelledby="calendario-plazos" className={estilos.seccion}>
          <h2 id="calendario-plazos" tabIndex={-1}>Calendario de plazos</h2>
          <p>Los plazos con fecha exacta aparecen primero. Revisa la fuente antes de hacer una postulación.</p>
          <ol className={estilos.listaPlazos}>
            {plazosOrdenados.map((plazo) => (
              <li key={plazo.codigo} className={estilos.plazo}>
                <div className={estilos.resumenPlazo}><h3>{plazo.proceso}</h3><p>{plazo.descripcion}</p></div>
                <div className={estilos.fechaPlazo}><RangoDeFechas plazo={plazo} /></div>
                <Fuente fuente={plazo.fuente} url={plazo.url} fecha={plazo.fecha_consulta} />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
