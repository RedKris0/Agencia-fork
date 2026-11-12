import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { NavegacionPortal } from "@/app/(portal)/Viaje";
import { Tren, ComparacionIlustrada, CalendarioIlustrado } from "@/app/(portal)/Tren";
import { IndicadorEstacion } from "./IndicadorEstacion";
import estilos from "./CabeceraInterior.module.css";

type Pagina = "carreras" | "comparador" | "beneficios" | "ficha";
const PARADAS = [
  { href: "/", nombre: "Inicio" },
  { href: "/carreras", nombre: "Carreras" },
  { href: "/comparador", nombre: "Comparador" },
  { href: "/beneficios", nombre: "Beneficios" },
];
const ILUSTRACIONES = { carreras: Tren, comparador: ComparacionIlustrada, beneficios: CalendarioIlustrado, ficha: Tren };

export function CabeceraInterior({ pagina, titulo, children }: { pagina: Pagina; titulo: string; children: ReactNode }) {
  const ruta = pagina === "ficha" ? "/carreras" : `/${pagina}`;
  const volverAlExplorador = pagina === "comparador" || pagina === "ficha";
  const Arte = ILUSTRACIONES[pagina];
  return (
    <>
      <header className={estilos.cabecera} data-cabecera-portal>
        <NavegacionPortal actual={ruta} />
        <nav className={estilos.recorrido} aria-label="Recorrido del portal">
          {PARADAS.filter(({ href }) => href === "/" || href === ruta).map(({ href, nombre }) => (
            <span key={href} className={estilos.parada} aria-current={href === ruta ? "page" : undefined}>
              <span className={estilos.nodo} aria-hidden="true">{href === ruta ? <span className={estilos.tren}><Tren compacto /></span> : null}</span>
              <span>{nombre}</span>
            </span>
          ))}
        </nav>
      </header>
      <section className={estilos.hero} data-cabecera-ficha={pagina === "ficha" || undefined} aria-labelledby="titulo-pagina">
        <div className={estilos.interior}>
          <div className={estilos.texto}>
            <Link className={estilos.volver} href={volverAlExplorador ? "/carreras" : "/"}><ArrowLeft aria-hidden="true" />{volverAlExplorador ? "Volver al explorador" : "Volver al inicio"}</Link>
            <h1 id="titulo-pagina">{titulo}</h1>
            {children}
            <div className={estilos.etapas}><IndicadorEstacion actual={pagina === "beneficios" ? 2 : 1} /></div>
          </div>
          <div className={estilos.arte} aria-hidden="true"><Arte /></div>
        </div>
      </section>
    </>
  );
}
