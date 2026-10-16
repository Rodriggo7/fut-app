import { describe, it, expect } from 'vitest'
import { divideTeams } from './teams.js'

describe('divideTeams', () => {
  it('debe retornar arreglos vacíos si el input no es un arreglo o está vacío', () => {
    expect(divideTeams(null)).toEqual({ teamA: [], teamB: [] })
    expect(divideTeams(undefined)).toEqual({ teamA: [], teamB: [] })
    expect(divideTeams([])).toEqual({ teamA: [], teamB: [] })
  })

  it('debe dividir equitativamente una cantidad par de jugadores (ej. Fútbol 5 = 10 jugadores)', () => {
    const players = [
      'Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4', 'Jugador 5',
      'Jugador 6', 'Jugador 7', 'Jugador 8', 'Jugador 9', 'Jugador 10',
    ]

    const { teamA, teamB } = divideTeams(players)

    expect(teamA).toHaveLength(5)
    expect(teamB).toHaveLength(5)
    expect(teamA).toEqual(['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4', 'Jugador 5'])
    expect(teamB).toEqual(['Jugador 6', 'Jugador 7', 'Jugador 8', 'Jugador 9', 'Jugador 10'])
  })

  it('debe manejar una cantidad impar de jugadores con una diferencia máxima de 1', () => {
    const players = ['A', 'B', 'C', 'D', 'E']
    const { teamA, teamB } = divideTeams(players)

    expect(teamA).toHaveLength(3)
    expect(teamB).toHaveLength(2)
    expect([...teamA, ...teamB]).toEqual(players)
  })

  it('debe manejar el caso de 1 solo jugador', () => {
    const { teamA, teamB } = divideTeams(['Solo'])
    expect(teamA).toEqual(['Solo'])
    expect(teamB).toEqual([])
  })

  it('no debe mutar el arreglo de jugadores original', () => {
    const original = ['P1', 'P2', 'P3', 'P4']
    const copy = [...original]
    divideTeams(original)
    expect(original).toEqual(copy)
  })
})
