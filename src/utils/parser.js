/**
 * Parsea y normaliza una lista de jugadores pegada desde WhatsApp u otra fuente de texto.
 * Remueve numeraciones iniciales (1., 2-, 3)), viñetas (-, *, •) y espacios redundantes.
 *
 * @param {string} rawText - Texto sin procesar con la lista de jugadores.
 * @returns {string[]} Arreglo con nombres de jugadores limpios.
 */
export function parsePlayerList(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return []
  }

  return rawText
    .split(/\r?\n/)
    .map((line) => {
      let cleaned = line.trim()
      // Remueve numeraciones del tipo "1.", "1-", "1)", "1: ", "1 "
      cleaned = cleaned.replace(/^\d+[\.\-\)\:\s]+\s*/, '')
      // Remueve viñetas comunes como "-", "*", "•", "–", "—", ">"
      cleaned = cleaned.replace(/^[\-\*\•\–\—\>]\s*/, '')
      return cleaned.trim()
    })
    .filter((line) => line.length > 0)
}
