import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Boton } from '../../_componentes/Boton';
import { DatoOficial } from '../../_componentes/DatoOficial';
import type { Carrera, Indicador } from '@/lib/datos/carreras';
import { carrerasPorCodigos } from '@/lib/datos/oferta-remota';
import { fechaLarga } from '@/lib/datos/fechas';
import { nombreDeFuente } from '@/lib/datos/fuentes';
import { rutaDelComparador } from '@/lib/datos/comparador';
import { codigoDeSegmento, rutaDeCarrera } from '@/lib/datos/ruta';

import estilos from './FichaCarrera.module.css';
import { CabeceraInterior } from '@/app/_componentes/CabeceraInterior';

// Se atiende en vivo: consulta Supabase por el código SIES de la ruta.
export const dynamic = 'force-dynamic';

type Params = { institucion: string; carrera: string };
type Fuente = Pick<Indicador, 'fuente' | 'url' | 'fecha_consulta'>;

// La ruta termina en el código SIES: se consulta la base por ese código y se verifica la ruta.
async function encontrarCarrera(params: Params): Promise<Carrera | undefined> {
  const codigo = codigoDeSegmento(params.carrera).toUpperCase();
  const [carrera] = await carrerasPorCodigos([codigo]);
  if (!carrera) return undefined;
  return rutaDeCarrera(carrera) === `/carreras/${params.institucion}/${params.carrera}` ? carrera : undefined;
}

function indicador(carrera: Carrera, tipo: Indicador['tipo']) {
  return carrera.indicadores.find((item) => item.tipo === tipo);
}

function formatoNumero(valor: number, unidad: Indicador['unidad']) {
  if (unidad === 'pesos') return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(valor);
  if (unidad === 'porcentaje') return `${new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(valor)} %`;
  return `${new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(valor)} ${unidad}`;
}

function valorTexto(item: Indicador | undefined) {
  return item && item.valor !== null ? formatoNumero(item.valor, item.unidad) : undefined;
}

function Fuentes({ carrera }: { carrera: Carrera }) {
  const fuentes = carrera.indicadores.reduce<Fuente[]>((acumuladas, item) => {
    if (!acumuladas.some((fuente) => fuente.url === item.url)) acumuladas.push(item);
    return acumuladas;
  }, []);

  return (
    <section className={estilos.fuentes} aria-labelledby="fuentes">
      <h2 id="fuentes">¿De dónde salen estos datos?</h2>
      <ul>
        {fuentes.map((fuente) => (
          <li key={fuente.url}>
            <a href={fuente.url}>{nombreDeFuente(fuente.fuente)}</a> · Consultada el {fechaLarga(fuente.fecha_consulta)}
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const carrera = await encontrarCarrera(await params);
  if (!carrera) return {};
  return {
    title: `${carrera.carrera} en ${carrera.institucion.nombre}`,
    description: `Datos oficiales de ${carrera.carrera} en ${carrera.institucion.nombre}, sede ${carrera.sede}.`,
  };
}

export default async function PaginaCarrera({ params }: { params: Promise<Params> }) {
  const carrera = await encontrarCarrera(await params);
  if (!carrera) notFound();

  const empleabilidad = indicador(carrera, 'empleabilidad_1er_anio');
  const ingreso = indicador(carrera, 'ingreso_promedio_4to_anio');
  const arancel = indicador(carrera, 'arancel_anual');
  const duracionReal = indicador(carrera, 'duracion_real_semestres');
  const vacantes = indicador(carrera, 'vacantes');
  const matricula = indicador(carrera, 'matricula');

  // TODO(fuente): la duración formal (campo duracion_semestres) no se muestra: el dato no registra fuente ni período
  // y AGENTS.md 2.1 prohíbe publicar lo que no se puede verificar. Vuelve cuando C3 documente su origen.
  return (
    <div className={estilos.ficha} data-pagina-interior>
      <CabeceraInterior pagina="ficha" titulo={carrera.carrera}>
        <p className={estilos.institucion}>{carrera.institucion.nombre}</p>
        <p className={estilos.ubicacion}>{carrera.sede} · {carrera.comuna} · Región: {carrera.region}</p>
      </CabeceraInterior>
      <main id="contenido" tabIndex={-1} aria-labelledby="titulo-pagina">
        <div className={estilos.contenido}>

          <section className={estilos.seccion} aria-labelledby="datos-principales">
            <h2 id="datos-principales">Datos para comparar</h2>
            <div className={estilos.datos}>
              <DatoOficial titulo="Empleabilidad al 1.er año" queMide="Porcentaje de personas tituladas que ganaron al menos el sueldo mínimo durante el primer año después de titularse. Solo considera a quienes registran ingresos." indicador={empleabilidad} valor={empleabilidad?.valor === null || !empleabilidad ? undefined : formatoNumero(empleabilidad.valor, empleabilidad.unidad)} />
              <DatoOficial titulo="Ingreso promedio al 4.º año" queMide="Tramo del ingreso bruto mensual al cuarto año después de titularse. Pesos de septiembre de 2025." indicador={ingreso} valor={ingreso?.valor === null || !ingreso ? undefined : formatoNumero(ingreso.valor, ingreso.unidad)} />
              <DatoOficial titulo="Arancel anual" queMide="Precio de un año de la carrera, antes de aplicar beneficios." indicador={arancel} valor={arancel?.valor === null || !arancel ? undefined : formatoNumero(arancel.valor, arancel.unidad)} />
              <DatoOficial titulo="Duración real" queMide="Semestres que tardaron quienes se titularon" indicador={duracionReal} valor={duracionReal?.valor === null || !duracionReal ? undefined : formatoNumero(duracionReal.valor, duracionReal.unidad)} />
              <DatoOficial titulo="Vacantes" queMide="Cupos disponibles para postular" indicador={vacantes} valor={vacantes?.valor === null || !vacantes ? undefined : formatoNumero(vacantes.valor, vacantes.unidad)} />
              <DatoOficial titulo="Acreditación de la institución" queMide="Años de acreditación y fecha hasta la que está vigente." />
              <DatoOficial titulo="Puntaje de corte del año anterior" queMide="Puntaje de la última persona que se matriculó el año pasado." indicador={indicador(carrera, 'puntaje_corte')} valor={valorTexto(indicador(carrera, 'puntaje_corte'))} />
              <DatoOficial titulo="Ponderaciones para postular" queMide="Porcentaje que aporta cada factor al cálculo de tu puntaje." />
            </div>
          </section>

          <section className={estilos.seccion} aria-labelledby="matricula">
            <h2 id="matricula">Cuántas personas estudian aquí</h2>
            <div className={estilos.datos}>
              <DatoOficial titulo="Matrícula total" queMide="Personas matriculadas en esta carrera, sumando todos sus años." indicador={matricula} valor={valorTexto(matricula)} />
            </div>
          </section>

          <section className={estilos.acciones} aria-label="Próximas acciones">
            <Boton principal href={rutaDelComparador([carrera])}>Comparar con otra carrera</Boton>
            <Boton nota="Disponible pronto">Simular mi puntaje para esta carrera</Boton>
          </section>

          <Fuentes carrera={carrera} />
        </div>
      </main>
    </div>
  );
}
