// Páginas del portal que se revisan. Al agregar una página pública nueva, súmala aquí.
// No se incluyen las páginas de prueba interna. /componentes responde 404 en producción
// (guía interna del equipo), así que no se audita aquí.
export const RUTAS: { ruta: string; nombre: string }[] = [
  { ruta: "/", nombre: "Portada" },
  { ruta: "/carreras", nombre: "Explorador de carreras" },
  { ruta: "/carreras/universidad-de-chile/enfermeria-santiago-i70s1c41j1v1", nombre: "Ficha de carrera" },
  { ruta: "/comparador", nombre: "Comparador" },
  { ruta: "/fuas", nombre: "Guía del FUAS" },
  { ruta: "/beneficios", nombre: "Beneficios y plazos" },
];

// Etiquetas de reglas axe que cubren WCAG 2.2 nivel AA (AGENTS.md 2.6).
export const ETIQUETAS_WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
