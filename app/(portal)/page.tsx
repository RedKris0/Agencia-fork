import Link from "next/link";
import { ArrowUpRight, CalendarDays, Check, ExternalLink } from "lucide-react";
import beneficios from "@/datos/beneficios/beneficios_2027.json";
import plazos from "@/datos/beneficios/plazos_2027.json";
import { Aviso } from "@/app/_componentes/Aviso";
import { Enlace } from "@/app/_componentes/Enlace";
import { fechaLarga } from "@/lib/datos/fechas";
import { CabeceraViaje, Carrusel } from "./Viaje";
import { hoyEnChile, primerPeriodoCerrado } from "./beneficios/beneficios";

import estilos from "./Portada.module.css";

// El aviso se actualiza con la fecha de Chile en cada visita.
export const dynamic = "force-dynamic";

export default function Inicio() {
  const cerrado = primerPeriodoCerrado(plazos.plazos, hoyEnChile());
  return (
    <div className={estilos.portada}>
      <CabeceraViaje />
      <main id="contenido" tabIndex={-1}>
        <section id="explorar" className={estilos.hero} aria-labelledby="titulo-portada" data-estacion="Explorar">
          <div className={estilos.heroInterior}>
            <div className={estilos.presentacion}>
              <h1 id="titulo-portada">Tu camino a la educación superior</h1>
              <p className={estilos.entrada}>Información oficial y apoyo para elegir, postular y avanzar.</p>
              <Link className={estilos.accion} href="/carreras">Explorar carreras <ArrowUpRight aria-hidden="true" /></Link>

              <Link className={estilos.accionSecundaria} href="/fuas">Revisar mi próximo paso para becas y gratuidad (FUAS)</Link>
            </div>
            <Carrusel />
            <p className={estilos.notaHero}>Datos de Mineduc — SIES y Datos Abiertos — y DEMRE.<br />Beneficios consultados el <time dateTime={beneficios.fecha_consulta}>{fechaLarga(beneficios.fecha_consulta)}</time>.<br /><a href="#fuentes">Consulta las fuentes y sus fechas.</a></p>
            {cerrado ? (
              <div className={estilos.avisoFuas}>
                <Aviso tipo="plazo" titulo="el primer período de postulación ya cerró">
                  <div className={estilos.textoAviso}>
                    <p>La postulación al Formulario Único de Acreditación Socioeconómica (FUAS) cerró el <time dateTime={cerrado.cierre}>{fechaLarga(cerrado.cierre)}</time>, con su extensión incluida.</p>
                    {cerrado.nivelSocioeconomico ? <p>Si ya postulaste, el Ministerio de Educación (Mineduc) informa tu nivel socioeconómico el <time dateTime={cerrado.nivelSocioeconomico}>{fechaLarga(cerrado.nivelSocioeconomico)}</time>.</p> : null}
                    {cerrado.segundoPeriodo ? <p>Si no alcanzaste a postular, Mineduc informa un segundo período de {cerrado.segundoPeriodo}. Aún no publica las fechas exactas.</p> : null}
                    <p>Fuente: <Enlace href={cerrado.url}>{cerrado.fuente}</Enlace>. Consultada el <time dateTime={cerrado.fechaConsulta}>{fechaLarga(cerrado.fechaConsulta)}</time>.</p>
                  </div>
                </Aviso>
              </div>
            ) : null}
          </div>
          <a className={estilos.bajar} href="#comparar">Sigue tu recorrido <span aria-hidden="true">↓</span></a>
        </section>

        <section id="comparar" className={`${estilos.estacion} ${estilos.comparar}`} aria-labelledby="titulo-comparar" data-estacion="Comparar">
          <div className={estilos.seccionInterior}>
            <div className={estilos.textoEstacion} data-reveal>
              <p className={estilos.nombreEstacion}><span aria-hidden="true" /> Comparar carreras</p>
              <h2 id="titulo-comparar">Tus opciones.<br />Frente a frente.</h2>
              <p>Aranceles, empleabilidad, ingresos y duración. Revisa hasta tres carreras con la fuente de cada dato a la vista.</p>
              <Link className={estilos.accionOscura} href="/comparador">Abrir el comparador <ArrowUpRight aria-hidden="true" /></Link>
            </div>
            <div className={estilos.comparacionVisual} aria-label="El comparador organiza institución, sede, jornada e indicadores de cada opción." data-reveal>
              <div className={estilos.billete}>
                <p>Una opción</p><strong>Tu primera carrera</strong>
                <ul><li><Check aria-hidden="true" /> Institución y sede</li><li><Check aria-hidden="true" /> Costos y duración</li><li><Check aria-hidden="true" /> Fuente y período</li></ul>
              </div>
              <div className={`${estilos.billete} ${estilos.billeteAlternativo}`}>
                <p>Otra posibilidad</p><strong>Tu segunda carrera</strong>
                <ul><li><Check aria-hidden="true" /> Institución y sede</li><li><Check aria-hidden="true" /> Costos y duración</li><li><Check aria-hidden="true" /> Fuente y período</li></ul>
              </div>
              <p className={estilos.aclaracionVisual}>Tú eliges qué comparar.</p>
            </div>
          </div>
        </section>

        <section id="beneficios" className={`${estilos.estacion} ${estilos.beneficios}`} aria-labelledby="titulo-beneficios" data-estacion="Beneficios">
          <div className={estilos.seccionInterior}>
            <div className={estilos.cartelPlazos} aria-hidden="true" data-reveal>
              <CalendarDays strokeWidth={1} />
              <span>Tu próxima<br />postulación</span>
              <div className={estilos.lineaCartel}><i /><i /><i /></div>
            </div>
            <div className={estilos.textoEstacion} data-reveal>
              <p className={estilos.nombreEstacion}><span aria-hidden="true" /> Beneficios y plazos</p>
              <h2 id="titulo-beneficios">Cada oportunidad<br />tiene su momento.</h2>
              <p>Conoce gratuidad, becas y créditos. Revisa requisitos, cómo postular y las fechas publicadas por el Ministerio de Educación.</p>
              <Link className={estilos.accionOscura} href="/beneficios">Revisar beneficios <ArrowUpRight aria-hidden="true" /></Link>
              <Link className={estilos.enlaceSimple} href="/beneficios#calendario-plazos">Ver el calendario de plazos</Link>
              <p className={estilos.fechaCatalogo}>Catálogo de beneficios 2027 · Consultado el <time dateTime={beneficios.fecha_consulta}>{fechaLarga(beneficios.fecha_consulta)}</time>.</p>
            </div>
          </div>
        </section>

        <section id="fuentes" className={`${estilos.estacion} ${estilos.fuentes}`} aria-labelledby="titulo-fuentes" data-estacion="Fuentes">
          <div className={estilos.fuentesInterior}>
            <div className={estilos.textoEstacion} data-reveal>
              <p className={estilos.nombreEstacion}><span aria-hidden="true" /> Datos oficiales y fuentes</p>
              <h2 id="titulo-fuentes">Una decisión importante.<br />Datos que puedes revisar.</h2>
              <p>Cada indicador muestra qué mide, a qué período corresponde y cuándo se consultó su fuente. Cuando falta un dato, encontrarás su explicación.</p>
            </div>
            <div className={estilos.listaFuentes} data-reveal>
              <a href="https://www.mifuturo.cl/" target="_blank" rel="noopener noreferrer"><span><strong>SIES / Mi Futuro</strong><small>Servicio de Información de Educación Superior, Mineduc</small></span><ExternalLink aria-hidden="true" /><span className={estilos.soloLectores}>Se abre en otra pestaña</span></a>
              <a href="https://datosabiertos.mineduc.cl/" target="_blank" rel="noopener noreferrer"><span><strong>Datos Abiertos Mineduc</strong><small>Ministerio de Educación</small></span><ExternalLink aria-hidden="true" /><span className={estilos.soloLectores}>Se abre en otra pestaña</span></a>
              <a href="https://demre.cl/" target="_blank" rel="noopener noreferrer"><span><strong>DEMRE</strong><small>Departamento de Evaluación, Medición y Registro Educacional</small></span><ExternalLink aria-hidden="true" /><span className={estilos.soloLectores}>Se abre en otra pestaña</span></a>
            </div>
            <p className={estilos.notaFuentes}>Las fechas de consulta de carreras se muestran en sus fichas y en el comparador. El catálogo de beneficios fue consultado el <time dateTime={beneficios.fecha_consulta}>{fechaLarga(beneficios.fecha_consulta)}</time>.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
