import { describe, it, expect } from 'vitest'
import { formatTeamsForClipboard } from './exporter.js'

describe('formatTeamsForClipboard', () => {
  it('debe formatear los dos equipos con emojis 👕 y 🎽 y numeración', () => {
    const teamA = ['Messi', 'Di Maria']
    const teamB = ['Ronaldo', 'Modric']

    const result = formatTeamsForClipboard(teamA, teamB)

    const expected = `*EQUIPO 1* 👕
1. Messi
2. Di Maria

*EQUIPO 2* 🎽
1. Ronaldo
2. Modric`

    expect(result).toBe(expected)
  })

  it('debe permitir personalizar los nombres de los equipos', () => {
    const teamA = ['Jugador A']
    const teamB = ['Jugador B']

    const result = formatTeamsForClipboard(teamA, teamB, {
      teamAName: 'BLANCOS',
      teamBName: 'PECHERAS',
    })

    expect(result).toContain('*BLANCOS* 👕')
    expect(result).toContain('*PECHERAS* 🎽')
  })

  it('debe manejar equipos vacíos o entradas no válidas sin romperse', () => {
    const result = formatTeamsForClipboard(null, undefined)

    expect(result).toContain('*EQUIPO 1* 👕')
    expect(result).toContain('(Sin jugadores)')
    expect(result).toContain('*EQUIPO 2* 🎽')
  })
})
