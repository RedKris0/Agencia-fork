import type { Indicador } from '@/lib/datos/carreras';
import { nombreDeFuente } from '@/lib/datos/fuentes';

import estilos from './DatoOficial.module.css';

type Props = {
  titulo: string;
  queMide: string;
  indicador?: Indicador;
  valor?: string;
  periodo?: string;
};

// Se reemplaza por los componentes de app/_componentes cuando existan.
export function DatoOficial({ titulo, queMide, indicador, valor, periodo }: Props) {
  // Si hay indicador con valor pero quien llama olvidó pasar el texto, se trata como
  // sin dato: un valor en blanco nunca debe llegar a la pantalla.
  const sinDato = !valor || indicador?.valor === null;

  return (
    <article className={estilos.dato} data-sin-dato={sinDato || undefined} data-reveal="tarjeta" data-panel>
      <h3>{titulo}</h3>
      {sinDato ? (
        <>
          <p className={estilos.sinDato}>Sin datos suficientes</p>
          <p>{indicador && 'motivo_sin_dato' in indicador ? indicador.motivo_sin_dato : 'Todavía no mostramos este dato en el portal.'}</p>
        </>
      ) : (
        <>
          <p className={estilos.valor}>{valor}</p>
          <p>{queMide}</p>
          <p>{periodo ?? indicador?.periodo}</p>
          {indicador ? (
            <p>
              Fuente:{' '}
              <a href={indicador.url} aria-label={`Fuente de ${titulo}: ${nombreDeFuente(indicador.fuente)}`}>
                {nombreDeFuente(indicador.fuente)}
              </a>
            </p>
          ) : <p>Todavía no tenemos la fuente de este dato.</p>}
        </>
      )}
    </article>
  );
}
