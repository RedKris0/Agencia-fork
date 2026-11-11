import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, CircleDashed, Clock, CalendarDays, type LucideIcon } from "lucide-react";

import { Aviso } from "@/app/_componentes/Aviso";
import { Enlace } from "@/app/_componentes/Enlace";
import { IndicadorEstacion } from "@/app/_componentes/IndicadorEstacion";
import plazos from "@/datos/beneficios/plazos_2027.json";
import { fechaLarga } from "@/lib/datos/fechas";

import {
  HITOS_DESPUES_DE_POSTULAR,
  hitosConEstado,
  hoyEnChile,
  primerPeriodoCerrado,
  type EstadoDeHito,
  type Plazo,
} from "../beneficios/beneficios";
import estilos from "./fuas.module.css";

export const metadata: Metadata = {
  title: "Tu próximo paso del FUAS",
  description: "Según si ya enviaste el Formulario Único de Acreditación Socioeconómica o no, mira qué sigue y cuándo.",
};

// Depende de la fecha de hoy: no puede quedar fija desde la compilación.
export const dynamic = "force-dynamic";

// Palabra + ícono, nunca solo color (docs/diseno.md).
const ETIQUETAS: Record<EstadoDeHito, { texto: string; Icono: LucideIcon }> = {
  paso: { texto: "Ya pasó", Icono: CircleCheck },
  en_curso: { texto: "Está en curso", Icono: Clock },
  proximo: { texto: "Próximo paso", Icono: Clock },
  mas_adelante: { texto: "Más adelante", Icono: CalendarDays },
  sin_fecha: { texto: "Fecha por confirmar", Icono: CircleDashed },
};

function Fechas({ plazo }: { plazo: Plazo }) {
  if (!plazo.inicio || !plazo.termino) return <p>{plazo.motivo_sin_fecha}</p>;
  if (plazo.inicio === plazo.termino) return <p><time dateTime={plazo.inicio}>{fechaLarga(plazo.inicio)}</time></p>;
  return (
    <p>
      Del <time dateTime={plazo.inicio}>{fechaLarga(plazo.inicio)}</time> al <time dateTime={plazo.termino}>{fechaLarga(plazo.termino)}</time>
    </p>
  );
}

export default function GuiaFuas() {
  const hoy = hoyEnChile();
  const todos = plazos.plazos as Plazo[];
  const siguientes = hitosConEstado(todos, HITOS_DESPUES_DE_POSTULAR, hoy);
  const periodoDePostulacion = hitosConEstado(todos, ["fuas_primer_periodo", "fuas_extension_primer_periodo"], hoy);
  const abierto = periodoDePostulacion.find((hito) => hito.estado === "en_curso");
  const cerrado = primerPeriodoCerrado(todos, hoy);
  const segundo = todos.find((plazo) => plazo.codigo === "fuas_segundo_periodo");

  return (
    <main id="contenido" tabIndex={-1} className={estilos.guia}>
      <IndicadorEstacion actual={2} />
      <header className={estilos.encabezado}>
        <h1>Tu próximo paso del FUAS</h1>
        <p>
          El Formulario Único de Acreditación Socioeconómica (FUAS) es el que pide el Estado para saber a qué beneficios podrías acceder:
          gratuidad, becas y créditos. Elige tu situación.
        </p>
      </header>

      <section className={estilos.situacion} aria-labelledby="ya-envie">
        <h2 id="ya-envie">Ya envié el formulario</h2>
        <p>Estos son los pasos que siguen, con las fechas que informa el Ministerio de Educación (Mineduc).</p>
        <ol className={estilos.pasos}>
          {siguientes.map(({ plazo, estado }) => {
            const { texto, Icono } = ETIQUETAS[estado];
            return (
              <li key={plazo.codigo} className={estado === "proximo" || estado === "en_curso" ? estilos.destacado : ""}>
                <p className={estilos.estado}><Icono aria-hidden="true" className={estilos.icono} /><strong>{texto}</strong></p>
                <h3>{plazo.proceso}</h3>
                <Fechas plazo={plazo} />
                <p>{plazo.descripcion}</p>
              </li>
            );
          })}
        </ol>
        <p>Cumplir los requisitos no asegura un beneficio: podrías acceder si Mineduc confirma tus antecedentes.</p>
        <p><Enlace href={plazos.url_resultados}>Ver los resultados en el sitio oficial</Enlace></p>
      </section>

      <section className={estilos.situacion} aria-labelledby="no-alcance">
        <h2 id="no-alcance">No alcancé a postular</h2>
        {abierto ? (
          <Aviso tipo="exito" titulo="todavía estás a tiempo">
            <p>
              Puedes completar el formulario hasta el <time dateTime={abierto.plazo.termino ?? undefined}>{abierto.plazo.termino ? fechaLarga(abierto.plazo.termino) : ""}</time>.
            </p>
          </Aviso>
        ) : cerrado ? (
          <p>
            El primer período de postulación cerró el <time dateTime={cerrado.cierre}>{fechaLarga(cerrado.cierre)}</time>, con su extensión incluida.
          </p>
        ) : (
          <p>El primer período de postulación todavía no abre. Revisa sus fechas en el calendario.</p>
        )}
        {segundo?.periodo_referencial ? (
          <p>Mineduc informa un segundo período de {segundo.periodo_referencial}, pero todavía no publica las fechas exactas.</p>
        ) : null}
        <p>Las fechas exactas se publican en el sitio oficial del FUAS. Vuelve a revisarlas cuando se acerque ese período.</p>
        <ul className={estilos.enlaces}>
          <li><Enlace href={segundo?.url ?? plazos.url}>Preguntas frecuentes del FUAS</Enlace></li>
          <li><Link className={estilos.enlace} href="/beneficios">Revisar qué beneficios existen y sus requisitos</Link></li>
        </ul>
      </section>

      <section className={estilos.situacion} aria-labelledby="no-se">
        <h2 id="no-se">No sé si lo envié</h2>
        <p>Entra al sitio oficial del FUAS para comprobar si tu postulación quedó registrada.</p>
        <p><Enlace href={plazos.url}>Ir al sitio oficial del FUAS</Enlace></p>
      </section>

      <p className={estilos.fuente}>
        Fuente: <Enlace href={plazos.url}>{plazos.fuente}</Enlace>. Consultada el <time dateTime={plazos.fecha_consulta}>{fechaLarga(plazos.fecha_consulta)}</time>.
        Las fechas pueden cambiar: confírmalas en el sitio oficial antes de actuar.
      </p>
    </main>
  );
}
