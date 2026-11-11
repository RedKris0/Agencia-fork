"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Tren, ComparacionIlustrada, CalendarioIlustrado, FuentesIlustradas } from "./Tren";
import estilos from "./Portada.module.css";

const ESTACIONES = [
  { id: "explorar", nombre: "Explorar" },
  { id: "comparar", nombre: "Comparar" },
  { id: "beneficios", nombre: "Beneficios" },
  { id: "fuentes", nombre: "Fuentes" },
] as const;

export function CabeceraViaje() {
  const via = useRef<HTMLDivElement>(null);
  const tren = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const reduccion = matchMedia("(prefers-reduced-motion: reduce)");
    const secciones = ESTACIONES.map(({ id }) => document.getElementById(id));
    let cuadro = 0;

    function actualizar() {
      cuadro = 0;
      if (!via.current || !tren.current) return;
      const limite = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      const posiciones = secciones.map(seccion => seccion ? Math.min(limite, Math.max(0,
        seccion.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(seccion).scrollMarginBlockStart),
      )) : 0);
      const referencia = scrollY;
      let indice = 0;
      for (let i = 1; i < posiciones.length; i++) if (referencia >= posiciones[i]) indice = i;
      const siguiente = posiciones[indice + 1];
      const avance = siguiente === undefined ? 0 : Math.min(1, Math.max(0, (referencia - posiciones[indice]) / Math.max(1, siguiente - posiciones[indice])));
      const progreso = (indice + (reduccion.matches ? 0 : avance)) / (ESTACIONES.length - 1);
      tren.current.style.transform = `translate3d(${progreso * via.current.clientWidth}px, 0, 0)`;
      setActual(indice);
    }

    function programar() {
      if (!cuadro) cuadro = requestAnimationFrame(actualizar);
    }

    const observador = new IntersectionObserver(entradas => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          entrada.target.removeAttribute("data-pendiente");
          observador.unobserve(entrada.target);
        }
      }
    }, { threshold: 0.12 });
    const elementos = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!reduccion.matches) for (const elemento of elementos) {
      if (elemento.getBoundingClientRect().top > innerHeight) elemento.setAttribute("data-pendiente", "");
      observador.observe(elemento);
    }
    function cambiarPreferencia() {
      for (const elemento of elementos) elemento.removeAttribute("data-pendiente");
      programar();
    }

    programar();
    addEventListener("scroll", programar, { passive: true });
    addEventListener("resize", programar);
    reduccion.addEventListener("change", cambiarPreferencia);
    return () => {
      cancelAnimationFrame(cuadro);
      removeEventListener("scroll", programar);
      removeEventListener("resize", programar);
      reduccion.removeEventListener("change", cambiarPreferencia);
      observador.disconnect();
      for (const elemento of elementos) elemento.removeAttribute("data-pendiente");
    };
  }, []);

  return (
    <header className={estilos.cabecera}>
      <div className={estilos.navegacion}>
        <Link href="/" aria-label="Agencia de Enlace y Seguimiento Estudiantil, inicio"><Image src="/marca/logo-horizontal-oscuro.svg" alt="Agencia de Enlace & Seguimiento Estudiantil" width={1547} height={314} priority className={estilos.logo} /></Link>
        <nav className={estilos.menuEscritorio} aria-label="Navegación principal"><Link href="/carreras">Carreras</Link><Link href="/comparador">Comparador</Link><Link href="/beneficios">Beneficios y plazos</Link></nav>
        <details className={estilos.menuMovil}><summary>Menú</summary><nav aria-label="Navegación móvil"><Link href="/carreras">Carreras</Link><Link href="/comparador">Comparador</Link><Link href="/beneficios">Beneficios y plazos</Link></nav></details>
      </div>
      <nav className={estilos.recorrido} aria-label="Estaciones de esta página">
        <div className={estilos.via} ref={via}>
          <div ref={tren} className={estilos.trenPosicion} data-tren><Tren compacto /></div>
          {ESTACIONES.map(({ id, nombre }, indice) => <a key={id} href={`#${id}`} aria-current={actual === indice ? "location" : undefined} className={estilos.parada}><span aria-hidden="true" /><span>{nombre}</span></a>)}
        </div>
      </nav>
    </header>
  );
}

const DIAPOSITIVAS = [
  { titulo: "Elige dónde empieza tu camino.", texto: "Explora carreras, instituciones y lugares para estudiar.", accion: "Encontrar una carrera", href: "/carreras", clase: "laminaExplorar", Arte: Tren },
  { titulo: "Mira tus opciones en perspectiva.", texto: "Pon hasta tres carreras frente a frente con datos oficiales.", accion: "Comparar carreras", href: "/comparador", clase: "laminaComparar", Arte: ComparacionIlustrada },
  { titulo: "Haz espacio para tu próxima oportunidad.", texto: "Revisa beneficios, requisitos y plazos de postulación.", accion: "Ver beneficios y plazos", href: "/beneficios", clase: "laminaBeneficios", Arte: CalendarioIlustrado },
  { titulo: "Sigue la línea hasta la fuente.", texto: "Conoce de dónde viene la información que te ayuda a decidir.", accion: "Consultar las fuentes", href: "#fuentes", clase: "laminaFuentes", Arte: FuentesIlustradas },
] as const;

export function Carrusel() {
  const pista = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);
  const [mejorado, setMejorado] = useState(false);
  useEffect(() => {
    const cuadro = requestAnimationFrame(() => setMejorado(true));
    return () => cancelAnimationFrame(cuadro);
  }, []);

  function ir(indice: number) {
    const destino = Math.max(0, Math.min(DIAPOSITIVAS.length - 1, indice));
    pista.current?.scrollTo({ left: destino * pista.current.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function teclado(evento: KeyboardEvent<HTMLDivElement>) {
    if ((evento.target as HTMLElement).closest("a")) return;
    const destinos: Record<string, number> = { ArrowLeft: actual - 1, ArrowRight: actual + 1, Home: 0, End: DIAPOSITIVAS.length - 1 };
    if (!(evento.key in destinos)) return;
    evento.preventDefault();
    ir(destinos[evento.key]);
  }

  return (
    <div className={estilos.carrusel} role="region" aria-roledescription="carrusel" aria-label="Encuentra tu próximo paso" onKeyDown={teclado}>
      <div className={estilos.pista} ref={pista} tabIndex={0} aria-label="Diapositivas. Usa las flechas para avanzar o retroceder." onScroll={() => { if (pista.current?.clientWidth) setActual(Math.max(0, Math.min(DIAPOSITIVAS.length - 1, Math.round(pista.current.scrollLeft / pista.current.clientWidth)))); }}>
        {DIAPOSITIVAS.map(({ titulo, texto, accion, href, clase, Arte }, indice) => (
          <div key={href} role="group" aria-roledescription="diapositiva" aria-label={`${indice + 1} de ${DIAPOSITIVAS.length}`} aria-hidden={mejorado && actual !== indice ? true : undefined} className={`${estilos.lamina} ${estilos[clase]}`}>
            <div className={estilos.arteLamina}><Arte /></div>
            <div className={estilos.textoLamina}><h2>{titulo}</h2><p>{texto}</p><Link href={href} tabIndex={mejorado && actual !== indice ? -1 : undefined}>{accion}<ArrowUpRight aria-hidden="true" /></Link></div>
          </div>
        ))}
      </div>
      <div className={estilos.controlesCarrusel} hidden={!mejorado}>
        <button type="button" onClick={() => ir(actual - 1)} disabled={actual === 0} aria-label="Diapositiva anterior"><ArrowLeft aria-hidden="true" /></button>
        <div className={estilos.indicadores}>{DIAPOSITIVAS.map((item, indice) => <button type="button" key={item.href} aria-label={`Ir a diapositiva ${indice + 1}`} aria-pressed={actual === indice} onClick={() => ir(indice)}><span /></button>)}</div>
        <span className={estilos.cuentaCarrusel} aria-hidden="true">{actual + 1} / {DIAPOSITIVAS.length}</span>
        <button type="button" onClick={() => ir(actual + 1)} disabled={actual === DIAPOSITIVAS.length - 1} aria-label="Diapositiva siguiente"><ArrowRight aria-hidden="true" /></button>
      </div>
      <p className={estilos.soloLectores} role="status" aria-live="polite" aria-atomic="true">Diapositiva {actual + 1} de {DIAPOSITIVAS.length}: {DIAPOSITIVAS[actual].titulo}</p>
    </div>
  );
}
