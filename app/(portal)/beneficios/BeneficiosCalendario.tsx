"use client";

import { useMemo, useState } from "react";

import { Aviso } from "@/app/_componentes/Aviso";
import { Encabezado } from "@/app/_componentes/Encabezado";
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

  // Un hito de un solo día (por ejemplo, una publicación de resultados) tiene inicio y término iguales.
  if (plazo.inicio === plazo.termino) {
    return <p><strong>Fecha:</strong> <time dateTime={plazo.inicio}>{fechaLarga(plazo.inicio)}</time>.</p>;
  }

  return <p><strong>Fecha:</strong> <time dateTime={plazo.inicio}>{fechaLarga(plazo.inicio)}</time> al <time dateTime={plazo.termino}>{fechaLarga(plazo.termino)}</time>.</p>;
}

export function BeneficiosCalendario({ beneficios, plazos }: Props) {
  const [consulta, setConsulta] = useState("");
  const resultados = useMemo(() => filtrarBeneficios(beneficios, consulta), [beneficios, consulta]);
  const plazosOrdenados = useMemo(() => ordenarPlazos(plazos), [plazos]);

  return (
    <>
      <Encabezado estacionActual={2} navegacion={[{ href: "/", texto: "Inicio" }, { href: "/carreras", texto: "Carreras" }]} />
      <main id="contenido" tabIndex={-1} className={`${estilos.pagina} ${estilos.contenido}`}>
        <header className={estilos.encabezado}>
          <h1>Beneficios y plazos 2027</h1>
          <p>Revisa opciones oficiales. Cumplir requisitos no asegura un beneficio: podrías acceder si el Ministerio de Educación (Mineduc) confirma tus antecedentes.</p>
        </header>

        <section aria-labelledby="buscar-beneficios" className={estilos.seccion}>
          <h2 id="buscar-beneficios">Busca beneficios</h2>
          <label htmlFor="consulta-beneficios">Escribe el nombre o una palabra del beneficio</label>
          <input
            id="consulta-beneficios"
            className={estilos.busqueda}
            type="search"
            value={consulta}
            onChange={(evento) => setConsulta(evento.target.value)}
          />
          <p role="status">{resultados.length} {resultados.length === 1 ? "beneficio encontrado" : "beneficios encontrados"}.</p>
          <div className={estilos.listaBeneficios}>
            {resultados.map((beneficio) => (
              <article key={beneficio.codigo} className={estilos.tarjeta}>
                <h3>{beneficio.nombre_oficial}</h3>
                <p>{beneficio.explicacion_simple}</p>
                <h4>Requisitos</h4>
                <ul>{beneficio.requisitos_simples.map((requisito) => <li key={requisito}>{requisito}</li>)}</ul>
                <h4>Cobertura</h4>
                <p>{beneficio.cobertura.descripcion}</p>
                <h4>Cómo postular</h4>
                <p>{beneficio.postulacion}</p>
                <Fuente fuente={beneficio.fuente} url={beneficio.url} fecha={beneficio.fecha_consulta} />
              </article>
            ))}
          </div>
          {!resultados.length ? <p>No encontramos beneficios con esa búsqueda. Prueba con otro nombre.</p> : null}
        </section>

        <section aria-labelledby="calendario-plazos" className={estilos.seccion}>
          <h2 id="calendario-plazos">Calendario de plazos</h2>
          <p>Los plazos con fecha exacta aparecen primero. Revisa la fuente antes de hacer una postulación.</p>
          <ol className={estilos.listaPlazos}>
            {plazosOrdenados.map((plazo) => (
              <li key={plazo.codigo} className={estilos.tarjeta}>
                <h3>{plazo.proceso}</h3>
                <p>{plazo.descripcion}</p>
                <RangoDeFechas plazo={plazo} />
                <Fuente fuente={plazo.fuente} url={plazo.url} fecha={plazo.fecha_consulta} />
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
