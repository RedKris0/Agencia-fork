import { getCloudflareContext } from '@opennextjs/cloudflare';
// Lectura en vivo de la oferta desde Supabase (solo en el servidor).
// Usa la clave pública de lectura (SUPABASE_ANON_KEY). RLS da SELECT a anon en estas tablas.
// Cada visita hace pocas consultas y trae solo una página: no se carga la oferta completa.
import type { Carrera } from './carreras.ts';
import { construirOferta, type DatosBase } from './oferta-mapeo.ts';
import { parametrosBusqueda, parametrosPorCodigos, type FiltrosBusqueda, POR_PAGINA, listaPostgrest } from './consultas.ts';

type Fila = Record<string, unknown>;

// En Cloudflare, las variables de ejecución se leen del contexto del Worker
// (no de process.env). En desarrollo, process.env sirve de respaldo.
async function configuracion(): Promise<{ url: string; clave: string }> {
  let env: Record<string, unknown> = {};
  let errorContexto = '';
  try {
    env = (await getCloudflareContext({ async: true })).env as unknown as Record<string, unknown>;
  } catch (e) {
    // Fuera de Cloudflare (desarrollo o pruebas): se usa process.env.
    errorContexto = e instanceof Error ? e.message : String(e);
  }
  const url = (env.SUPABASE_URL ?? process.env.SUPABASE_URL) as string | undefined;
  const clave = (env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY) as string | undefined;
  if (!url || !clave) {
    // Diagnóstico: solo nombres de variables, nunca valores.
    console.error(
      `diagnóstico oferta: contexto=${errorContexto || 'ok'}; variables=${Object.keys(env).join(',') || 'ninguna'}; process.env_supabase=${Object.keys(process.env).filter((k) => k.startsWith('SUPABASE')).join(',') || 'ninguna'}`,
    );
    throw new Error('Faltan SUPABASE_URL o SUPABASE_ANON_KEY en el entorno.');
  }
  return { url: url.replace(/\/$/, ''), clave };
}

async function consultar(
  tabla: string,
  params: URLSearchParams,
  { contar = false }: { contar?: boolean } = {},
): Promise<{ filas: Fila[]; total: number }> {
  const { url, clave } = await configuracion();
  const cabeceras: Record<string, string> = { apikey: clave, Authorization: `Bearer ${clave}` };
  if (contar) cabeceras.Prefer = 'count=exact';

  const r = await fetch(`${url}/rest/v1/${tabla}?${params.toString()}`, { headers: cabeceras });
  if (!r.ok) throw new Error(`${tabla}: HTTP ${r.status}`);
  const filas = (await r.json()) as Fila[];
  const rango = r.headers.get('content-range');
  const total = rango?.includes('/') ? Number(rango.split('/')[1]) : filas.length;
  return { filas, total: Number.isFinite(total) ? total : filas.length };
}

// Fuentes: tabla pequeña; se trae una vez por proceso.
let fuentesCache: Promise<Fila[]> | null = null;
function fuentes(): Promise<Fila[]> {
  fuentesCache ??= consultar('fuente', new URLSearchParams({ select: 'id,organismo,nombre' })).then((r) => r.filas);
  return fuentesCache;
}

// Dado un conjunto de variantes (filas de programa_variante con su programa embebido),
// trae sus aranceles, cupos e indicadores SIES y arma las carreras del portal.
async function cargarCarreras(variantes: Fila[]): Promise<Carrera[]> {
  if (variantes.length === 0) return [];

  const idsVariantes = variantes.map((v) => String(v.id));
  const idsGenericos = [...new Set(variantes.map((v) => String(v.programa_generico_id)))];

  const [aranceles, cupos, indicadores, fuentesFilas] = await Promise.all([
    consultar(
      'arancel_variante',
      new URLSearchParams({
        select: 'variante_id,valor_pesos,periodo,fuente_id,url,fecha_consulta,motivo_sin_dato',
        variante_id: listaPostgrest(idsVariantes),
      }),
    ),
    consultar(
      'vacante_admision',
      new URLSearchParams({
        select: 'variante_id,via,cupos,periodo,fuente_id,url,fecha_consulta,motivo_sin_dato',
        variante_id: listaPostgrest(idsVariantes),
        via: 'eq.regular',
      }),
    ),
    consultar(
      'indicador',
      new URLSearchParams({
        select: 'programa_generico_id,tipo,valor,unidad,periodo,fuente_id,url,fecha_consulta,motivo_sin_dato',
        programa_generico_id: listaPostgrest(idsGenericos),
      }),
    ),
    fuentes(),
  ]);

  // Instituciones y programas, sin repetir.
  const instituciones = new Map<string, Fila>();
  const programas = new Map<string, Fila>();
  for (const v of variantes) {
    const prog = v.programa as Fila;
    const inst = prog.institucion as Fila;
    instituciones.set(String(inst.id), { id: inst.id, nombre: inst.nombre, tipo: inst.tipo });
    programas.set(String(prog.id), { id: prog.id, institucion_id: inst.id, nombre: prog.nombre });
  }

  const datos: DatosBase = {
    instituciones: [...instituciones.values()] as DatosBase['instituciones'],
    programas: [...programas.values()] as DatosBase['programas'],
    variantes: variantes.map((v) => ({
      id: String(v.id),
      programa_id: String((v.programa as Fila).id),
      programa_generico_id: String(v.programa_generico_id),
      codigo_sies: String(v.codigo_sies),
      sede: (v.sede as string | null) ?? null,
      comuna: (v.comuna as string | null) ?? null,
      region: (v.region as string | null) ?? null,
      jornada: (v.jornada as string | null) ?? null,
      duracion_semestres: (v.duracion_semestres as number | null) ?? null,
      fuente_id: String(v.fuente_id),
    })) as DatosBase['variantes'],
    aranceles: aranceles.filas as unknown as DatosBase['aranceles'],
    vacantes: cupos.filas as unknown as DatosBase['vacantes'],
    indicadores: indicadores.filas as unknown as DatosBase['indicadores'],
    fuentes: fuentesFilas as unknown as DatosBase['fuentes'],
  };

  return construirOferta(datos);
}

// Modo sin red, solo para la prueba de accesibilidad de la CI (OFERTA_LOCAL=1 en el
// flujo de GitHub). Lee la muestra que copia `datos:ejemplo-si-falta`. Existe porque la
// CI no tiene las claves de Supabase y los PR desde copias del repositorio no reciben
// secretos. En Cloudflare la variable no está definida: el sitio siempre lee la base.
function modoLocal(): boolean {
  return process.env.OFERTA_LOCAL === '1';
}

async function carrerasLocales(): Promise<Carrera[]> {
  const { listarCarreras } = await import('./carreras.ts');
  return listarCarreras();
}

export type ResultadoBusqueda = { carreras: Carrera[]; total: number };

export async function buscarCarreras(filtros: FiltrosBusqueda, pagina: number): Promise<ResultadoBusqueda> {
  if (modoLocal()) {
    const { filtrarCarreras } = await import('./buscar.ts');
    const todas = filtrarCarreras(await carrerasLocales(), filtros as Parameters<typeof filtrarCarreras>[1]);
    const desde = Math.max(0, pagina - 1) * POR_PAGINA;
    return { carreras: todas.slice(desde, desde + POR_PAGINA), total: todas.length };
  }
  const { filas, total } = await consultar('programa_variante', parametrosBusqueda(filtros, pagina), { contar: true });
  return { carreras: await cargarCarreras(filas), total };
}

export async function carrerasPorCodigos(codigos: readonly string[]): Promise<Carrera[]> {
  if (codigos.length === 0) return [];
  if (modoLocal()) {
    const porCodigo = new Map((await carrerasLocales()).map((c) => [c.codigo_sies, c]));
    return codigos.flatMap((codigo) => (porCodigo.has(codigo) ? [porCodigo.get(codigo)!] : []));
  }
  const { filas } = await consultar('programa_variante', parametrosPorCodigos(codigos));
  // Respeta el orden en que se pidieron.
  const porCodigo = new Map((await cargarCarreras(filas)).map((c) => [c.codigo_sies, c]));
  return codigos.flatMap((codigo) => (porCodigo.has(codigo) ? [porCodigo.get(codigo)!] : []));
}

export { POR_PAGINA };
