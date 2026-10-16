import { describe, it, expect } from 'vitest'
import { shuffleArray } from './shuffle.js'

describe('shuffleArray', () => {
  it('debe retornar un arreglo vacío si el input no es un arreglo', () => {
    expect(shuffleArray(null)).toEqual([])
    expect(shuffleArray(undefined)).toEqual([])
    expect(shuffleArray('not-an-array')).toEqual([])
    expect(shuffleArray({})).toEqual([])
  })

  it('debe manejar arreglos vacíos y de 1 solo elemento sin mutarlos', () => {
    expect(shuffleArray([])).toEqual([])
    const single = ['Messi']
    const result = shuffleArray(single)
    expect(result).toEqual(['Messi'])
    expect(result).not.toBe(single) // Referencia distinta
  })

  it('debe ser una función pura y NO mutar el arreglo original', () => {
    const original = ['A', 'B', 'C', 'D', 'E']
    const originalCopy = [...original]
    const shuffled = shuffleArray(original)

    expect(original).toEqual(originalCopy)
    expect(shuffled).not.toBe(original)
  })

  it('debe conservar todos los elementos originales sin duplicar ni perder ninguno', () => {
    const original = ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4', 'Jugador 5']
    const shuffled = shuffleArray(original)

    expect(shuffled).toHaveLength(original.length)
    expect([...shuffled].sort()).toEqual([...original].sort())
  })

  it('debe generar orden aleatorio distribuido (Fisher-Yates)', () => {
    const original = Array.from({ length: 20 }, (_, i) => `P${i}`)
    let hasDifferentOrder = false

    // Al mezclar varias veces, al menos una debe tener un orden diferente al original
    for (let i = 0; i < 5; i++) {
      const shuffled = shuffleArray(original)
      if (shuffled.some((val, idx) => val !== original[idx])) {
        hasDifferentOrder = true
        break
      }
    }

    expect(hasDifferentOrder).toBe(true)
  })
})
