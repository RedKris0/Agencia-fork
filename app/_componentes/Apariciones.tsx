"use client";

import { useEffect } from "react";

export function Apariciones() {
  useEffect(() => {
    const reduccion = matchMedia("(prefers-reduced-motion: reduce)");
    const elementos = new Set<HTMLElement>();
    const observador = new IntersectionObserver(entradas => {
      for (const entrada of entradas) {
        if (reduccion.matches || entrada.isIntersecting || entrada.target.contains(document.activeElement)) {
          entrada.target.removeAttribute("data-pendiente");
        } else {
          entrada.target.setAttribute("data-desde", entrada.boundingClientRect.bottom <= 0 ? "arriba" : "abajo");
          entrada.target.setAttribute("data-pendiente", "");
        }
      }
    });

    function registrar() {
      const presentes = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      for (const elemento of elementos) {
        if (!presentes.has(elemento)) {
          observador.unobserve(elemento);
          elementos.delete(elemento);
        }
      }
      for (const elemento of presentes) {
        if (elementos.has(elemento)) continue;
        if (!reduccion.matches && elemento.getBoundingClientRect().top >= innerHeight) {
          elemento.setAttribute("data-pendiente", "");
        }
        observador.observe(elemento);
        elementos.add(elemento);
      }
    }

    function mostrarFoco(evento: FocusEvent) {
      for (const elemento of elementos) {
        if (elemento.contains(evento.target as Node)) elemento.removeAttribute("data-pendiente");
      }
    }

    function cambiarPreferencia() {
      for (const elemento of elementos) elemento.removeAttribute("data-pendiente");
    }

    // Los filtros y la navegación pueden insertar tarjetas después de la primera carga.
    const cambios = new MutationObserver(registrar);
    registrar();
    cambios.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("focusin", mostrarFoco);
    reduccion.addEventListener("change", cambiarPreferencia);
    return () => {
      observador.disconnect();
      cambios.disconnect();
      document.removeEventListener("focusin", mostrarFoco);
      reduccion.removeEventListener("change", cambiarPreferencia);
      for (const elemento of elementos) {
        elemento.removeAttribute("data-pendiente");
        elemento.removeAttribute("data-desde");
      }
    };
  }, []);

  return null;
}
