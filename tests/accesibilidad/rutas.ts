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
  { ruta: "/hoja", nombre: "Hoja de decisión sin carreras" },
  { ruta: "/hoja?carreras=I70S1C41J1V1,I87S1C49J1V3,I72S1C75J1V1&respaldo=I73S2C5J1V1", nombre: "Hoja de decisión con tres opciones y respaldo" },
];

// Etiquetas de reglas axe que cubren WCAG 2.2 nivel AA (AGENTS.md 2.6).
export const ETIQUETAS_WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
