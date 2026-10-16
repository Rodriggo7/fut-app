/**
 * Mezcla un arreglo de forma aleatoria utilizando el algoritmo Fisher-Yates (Knuth).
 * Función pura: no muta el arreglo original y retorna una nueva copia mezclada.
 *
 * @template T
 * @param {T[]} array - Arreglo a mezclar.
 * @returns {T[]} Nuevo arreglo con los elementos en orden aleatorio.
 */
export function shuffleArray(array) {
  if (!Array.isArray(array)) {
    return []
  }

  const copy = [...array]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}
