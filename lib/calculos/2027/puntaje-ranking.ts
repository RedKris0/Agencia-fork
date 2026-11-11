/**
 * Puntaje Ranking, Proceso de Admisión 2027.
 *
 * Según la decisión 0024, la plataforma no calcula este puntaje: la persona
 * estudiante ingresa el valor oficial que recibió. Solo se valida su rango.
 */
const PUNTAJE_MINIMO = 100;
const PUNTAJE_MAXIMO = 1000;

export function validarPuntajeRanking(puntaje: number): number {
  if (
    typeof puntaje !== 'number' ||
    !Number.isFinite(puntaje) ||
    puntaje < PUNTAJE_MINIMO ||
    puntaje > PUNTAJE_MAXIMO
  ) {
    throw new RangeError(
      `El Puntaje Ranking debe ser un número entre ${PUNTAJE_MINIMO} y ${PUNTAJE_MAXIMO}.`,
    );
  }

  return puntaje;
}
