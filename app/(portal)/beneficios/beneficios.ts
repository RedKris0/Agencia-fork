export type Beneficio = {
  codigo: string;
  nombre_oficial: string;
  explicacion_simple: string;
  requisitos_simples: string[];
  cobertura: { descripcion: string };
  postulacion: string;
  fuente: string;
  url: string;
  fecha_consulta: string;
};

export type Plazo = {
  codigo: string;
  proceso: string;
  descripcion: string;
  inicio: string | null;
  termino: string | null;
  estado: string;
  periodo_referencial?: string;
  motivo_sin_fecha: string | null;
  fuente: string;
  url: string;
  fecha_consulta: string;
};

export type PrimerPeriodoCerrado = {
  cierre: string;
  nivelSocioeconomico: string | null;
  segundoPeriodo: string | null;
  fuente: string;
  url: string;
  fechaConsulta: string;
};

// "2026-11-12" en la zona horaria de Chile, para comparar con las fechas ISO de los plazos.
export function hoyEnChile(ahora: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(ahora);
}

// El primer período termina el último día de su extensión. Devuelve null mientras siga abierto
// o si los datos no traen una fecha de término publicada (nunca se supone una fecha).
export function primerPeriodoCerrado(plazos: Plazo[], hoy: string): PrimerPeriodoCerrado | null {
  const porCodigo = (codigo: string) => plazos.find((plazo) => plazo.codigo === codigo);
  const periodo = ["fuas_primer_periodo", "fuas_extension_primer_periodo"]
    .map(porCodigo)
    .filter((plazo): plazo is Plazo => Boolean(plazo?.termino));
  if (!periodo.length) return null;

  const ultimo = periodo.reduce((a, b) => ((a.termino as string) >= (b.termino as string) ? a : b));
  const cierre = ultimo.termino as string;
  if (hoy <= cierre) return null;

  return {
    cierre,
    nivelSocioeconomico: porCodigo("nivel_socioeconomico_primer_periodo")?.inicio ?? null,
    segundoPeriodo: porCodigo("fuas_segundo_periodo")?.periodo_referencial ?? null,
    fuente: ultimo.fuente,
    url: ultimo.url,
    fechaConsulta: ultimo.fecha_consulta,
  };
}

// Hitos que siguen a la postulación, en el orden en que ocurren (primer período).
export const HITOS_DESPUES_DE_POSTULAR = [
  "nivel_socioeconomico_primer_periodo",
  "preseleccion_primer_periodo",
  "asignacion_primer_periodo",
  "apelacion_primer_periodo",
] as const;

export type EstadoDeHito = "paso" | "en_curso" | "proximo" | "mas_adelante" | "sin_fecha";
export type HitoConEstado = { plazo: Plazo; estado: EstadoDeHito };

// Marca cada hito como ya pasado, en curso, el próximo o más adelante. Solo el primer hito futuro
// es «próximo». Un hito sin fecha publicada queda «sin_fecha»: nunca se le supone una.
export function hitosConEstado(plazos: Plazo[], codigos: readonly string[], hoy: string): HitoConEstado[] {
  const porCodigo = new Map(plazos.map((plazo) => [plazo.codigo, plazo]));
  let hayProximo = false;
  return codigos.flatMap((codigo): HitoConEstado[] => {
    const plazo = porCodigo.get(codigo);
    if (!plazo) return [];
    if (!plazo.inicio || !plazo.termino) return [{ plazo, estado: "sin_fecha" }];
    if (hoy > plazo.termino) return [{ plazo, estado: "paso" }];
    if (hoy >= plazo.inicio) {
      hayProximo = true;
      return [{ plazo, estado: "en_curso" }];
    }
    if (!hayProximo) {
      hayProximo = true;
      return [{ plazo, estado: "proximo" }];
    }
    return [{ plazo, estado: "mas_adelante" }];
  });
}

export function normalizarTexto(texto: string): string {
  return texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("es-CL");
}

export function filtrarBeneficios(beneficios: Beneficio[], consulta: string): Beneficio[] {
  const busqueda = normalizarTexto(consulta.trim());
  if (!busqueda) return beneficios;
  return beneficios.filter((beneficio) => normalizarTexto(`${beneficio.nombre_oficial} ${beneficio.explicacion_simple}`).includes(busqueda));
}

export function ordenarPlazos(plazos: Plazo[]): Plazo[] {
  return [...plazos].sort((primero, segundo) => {
    if (!primero.inicio) return segundo.inicio ? 1 : 0;
    if (!segundo.inicio) return -1;
    return primero.inicio.localeCompare(segundo.inicio);
  });
}
