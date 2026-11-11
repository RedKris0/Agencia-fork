import type { Carrera } from './carreras.ts';
import { indicadorDe } from './comparador.ts';
import { fechaLarga } from './fechas.ts';
import { FILAS_INDICADORES, valorConUnidad } from './indicadores-vista.ts';
import { nombreDeFuente } from './fuentes.ts';

// Hoja de decisión: hasta tres opciones y una de respaldo. El enlace guarda solo códigos de carrera
// (nunca lo que la persona escribe) y las anotaciones quedan en su navegador, no en un servidor.
export const MAXIMO_OPCIONES_HOJA = 3;

export type Anotaciones = { influencia: string; pregunta: string };

export function codigosDeLaHoja(carreras: string | null, respaldo: string | null): { opciones: string[]; respaldo: string | null } {
  const opciones = (carreras ?? '')
    .split(',')
    .map((codigo) => codigo.trim())
    .filter((codigo, i, lista) => codigo !== '' && lista.indexOf(codigo) === i)
    .slice(0, MAXIMO_OPCIONES_HOJA);
  const codigoRespaldo = respaldo?.trim() ?? '';
  return { opciones, respaldo: codigoRespaldo !== '' && !opciones.includes(codigoRespaldo) ? codigoRespaldo : null };
}

export function rutaDeLaHoja(opciones: readonly Carrera[], respaldo?: Carrera | null): string {
  const parametros = [`carreras=${opciones.map((carrera) => encodeURIComponent(carrera.codigo_sies)).join(',')}`];
  if (respaldo) parametros.push(`respaldo=${encodeURIComponent(respaldo.codigo_sies)}`);
  return `/hoja?${parametros.join('&')}`;
}

export function nombreCompleto(carrera: Carrera): string {
  return `${carrera.carrera} · ${carrera.institucion.nombre} · ${carrera.sede} · ${carrera.jornada}`;
}

function bloqueDeCarrera(etiqueta: string, carrera: Carrera): string[] {
  const lineas = [`${etiqueta}: ${nombreCompleto(carrera)}`];
  for (const fila of FILAS_INDICADORES) {
    const indicador = indicadorDe(carrera, fila.tipo);
    if (!indicador || indicador.valor === null) {
      lineas.push(`  - ${fila.titulo}: Sin datos suficientes`);
      continue;
    }
    lineas.push(
      `  - ${fila.titulo}: ${valorConUnidad(indicador, fila)} (${fila.queMide} Período: ${indicador.periodo}. Fuente: ${nombreDeFuente(indicador.fuente)}, ${indicador.url}. Consultada el ${fechaLarga(indicador.fecha_consulta)}.)`,
    );
  }
  return lineas;
}

// Texto plano para descargar. `fecha` es el día en que se genera la hoja (AAAA-MM-DD).
export function textoDeLaHoja(
  { opciones, respaldo, anotaciones, fecha }: { opciones: readonly Carrera[]; respaldo: Carrera | null; anotaciones: Anotaciones; fecha: string },
): string {
  const lineas = ['MI HOJA DE DECISIÓN', `Generada el ${fechaLarga(fecha)}. Los datos pueden cambiar: revisa la fuente de cada cifra.`, ''];
  opciones.forEach((carrera, i) => lineas.push(...bloqueDeCarrera(`Opción ${i + 1}`, carrera), ''));
  if (respaldo) lineas.push(...bloqueDeCarrera('Respaldo', respaldo), '');
  lineas.push(
    'Qué dato influyó más en mi primera opción:',
    anotaciones.influencia.trim() || '(sin anotar)',
    '',
    'Qué pregunta me falta resolver:',
    anotaciones.pregunta.trim() || '(sin anotar)',
    '',
    'Esta hoja es tuya: no se guardó en ningún servidor. Los plazos de becas y gratuidad están en el calendario oficial de beneficios.',
  );
  return lineas.join('\n');
}
