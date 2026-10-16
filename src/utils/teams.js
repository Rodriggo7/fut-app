/**
 * Divide un arreglo de jugadores en dos equipos cuantitativamente equitativos (teamA y teamB).
 * Si la cantidad de jugadores es impar, el equipo A tendrá un jugador adicional.
 *
 * @template T
 * @param {T[]} playersArray - Lista de jugadores.
 * @returns {{ teamA: T[], teamB: T[] }} Objeto con los dos equipos divididos.
 */
export function divideTeams(playersArray) {
  if (!Array.isArray(playersArray) || playersArray.length === 0) {
    return {
      teamA: [],
      teamB: [],
    }
  }

  const mid = Math.ceil(playersArray.length / 2)

  return {
    teamA: playersArray.slice(0, mid),
    teamB: playersArray.slice(mid),
  }
}
