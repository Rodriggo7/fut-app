/**
 * Formatea los dos equipos generados en texto plano optimizado para WhatsApp con emojis (👕/🎽).
 *
 * @param {string[]} [teamA=[]] - Lista de jugadores del Equipo 1.
 * @param {string[]} [teamB=[]] - Lista de jugadores del Equipo 2.
 * @param {Object} [options={}] - Opciones de formato opcionales.
 * @param {string} [options.teamAName='EQUIPO 1'] - Título para el equipo A.
 * @param {string} [options.teamBName='EQUIPO 2'] - Título para el equipo B.
 * @returns {string} Texto formateado listo para copiar al portapapeles.
 */
export function formatTeamsForClipboard(teamA = [], teamB = [], options = {}) {
  const safeTeamA = Array.isArray(teamA) ? teamA : []
  const safeTeamB = Array.isArray(teamB) ? teamB : []

  const nameA = options.teamAName || 'EQUIPO 1'
  const nameB = options.teamBName || 'EQUIPO 2'

  const formattedA = safeTeamA.length > 0
    ? safeTeamA.map((player, idx) => `${idx + 1}. ${player}`).join('\n')
    : '(Sin jugadores)'

  const formattedB = safeTeamB.length > 0
    ? safeTeamB.map((player, idx) => `${idx + 1}. ${player}`).join('\n')
    : '(Sin jugadores)'

  return `*${nameA}* 👕\n${formattedA}\n\n*${nameB}* 🎽\n${formattedB}`
}
