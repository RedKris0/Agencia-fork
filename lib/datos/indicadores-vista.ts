import type { Indicador } from './carreras.ts';

// Indicadores que el portal muestra al comparar o al armar la hoja de decisión.
// Cada uno dice qué mide, para que nadie lea una cifra por otra (AGENTS.md 2.1).

export type FilaIndicador = {
  tipo: Indicador['tipo'];
  titulo: string;
  unidad: string;
  queMide: string;
};

export const FILAS_INDICADORES: FilaIndicador[] = [
  { tipo: 'empleabilidad_1er_anio', titulo: 'Empleabilidad al 1.er año', unidad: 'porcentaje', queMide: 'Porcentaje de personas tituladas que ganaron al menos el sueldo mínimo durante el primer año después de titularse. Solo considera a quienes registran ingresos.' },
  { tipo: 'ingreso_promedio_4to_anio', titulo: 'Ingreso al 4.º año', unidad: 'pesos chilenos', queMide: 'Tramo del ingreso bruto mensual al cuarto año después de titularse.' },
  { tipo: 'arancel_anual', titulo: 'Arancel anual', unidad: 'pesos chilenos', queMide: 'Lo que pagas cada año, antes de aplicar beneficios.' },
  { tipo: 'duracion_real_semestres', titulo: 'Duración real', unidad: 'semestres', queMide: 'Tiempo que tardaron en titularse quienes terminaron la carrera.' },
  { tipo: 'puntaje_corte', titulo: 'Puntaje de corte', unidad: 'puntos', queMide: 'Puntaje del último matriculado el año anterior.' },
  { tipo: 'vacantes', titulo: 'Vacantes', unidad: 'cupos', queMide: 'Cupos disponibles para postular.' },
];

export function formatoIndicador(indicador: Indicador): string {
  if (indicador.valor === null) return 'Sin datos suficientes';
  if (indicador.unidad === 'pesos') {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(indicador.valor);
  }
  if (indicador.unidad === 'porcentaje') return `${new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(indicador.valor)} %`;
  return new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(indicador.valor);
}

// Valor para la hoja de decisión: además del número, la unidad cuando el número solo no se entiende
// («11,17» no dice nada; «11,17 semestres» sí). Pesos y porcentaje ya la traen en el formato.
export function valorConUnidad(indicador: Indicador, fila: FilaIndicador): string {
  const texto = formatoIndicador(indicador);
  if (indicador.valor === null || indicador.unidad === 'pesos' || indicador.unidad === 'porcentaje') return texto;
  return `${texto} ${fila.unidad}`;
}
