import type { Metadata } from 'next';

import type { Carrera } from '@/lib/datos/carreras';
import { codigosDeLaHoja, rutaDeLaHoja } from '@/lib/datos/hoja';
import { buscarCarreras, carrerasPorCodigos } from '@/lib/datos/oferta-remota';

import { Hoja } from './Hoja';

export const metadata: Metadata = {
  title: 'Mi hoja de decisión',
  description: 'Reúne tus tres opciones y una de respaldo con sus datos oficiales para imprimirlas o descargarlas.',
};

// Se atiende en vivo, igual que el comparador: consulta solo las carreras del enlace.
export const dynamic = 'force-dynamic';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function valor(v: string | string[] | undefined): string {
  return (Array.isArray(v) ? v[0] : v) ?? '';
}

export default async function PaginaHoja({ searchParams }: Props) {
  const params = await searchParams;
  const { opciones: codigosOpciones, respaldo: codigoRespaldo } = codigosDeLaHoja(valor(params.carreras), valor(params.respaldo));
  const q = valor(params.q).trim();

  let opciones: Carrera[] = [];
  let respaldo: Carrera | null = null;
  let resultados: { carrera: Carrera; href: string }[] = [];
  let error = false;
  try {
    const encontradas = await carrerasPorCodigos([...codigosOpciones, ...(codigoRespaldo ? [codigoRespaldo] : [])]);
    opciones = encontradas.filter((carrera) => codigosOpciones.includes(carrera.codigo_sies));
    respaldo = encontradas.find((carrera) => carrera.codigo_sies === codigoRespaldo) ?? null;
    if (q && opciones.length && !respaldo) {
      const { carreras } = await buscarCarreras({ texto: q, regiones: [], tipos: [], jornadas: [] }, 1);
      resultados = carreras
        .filter((carrera) => !opciones.some((item) => item.codigo_sies === carrera.codigo_sies))
        .slice(0, 10)
        .map((carrera) => ({ carrera, href: rutaDeLaHoja(opciones, carrera) }));
    }
  } catch (e) {
    console.error('hoja: no se pudo consultar la oferta', e instanceof Error ? e.message : String(e));
    error = true;
  }

  const codigos = opciones.map((carrera) => encodeURIComponent(carrera.codigo_sies)).join(',');

  return (
    <Hoja
      opciones={opciones}
      respaldo={respaldo}
      resultados={resultados}
      q={q}
      codigosActuales={codigos}
      quitarRespaldoHref={rutaDeLaHoja(opciones)}
      volverAComparar={`/comparador?carreras=${codigos}`}
      error={error}
    />
  );
}
