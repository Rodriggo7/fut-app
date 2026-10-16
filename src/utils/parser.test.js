import { describe, it, expect } from 'vitest'
import { parsePlayerList } from './parser.js'

describe('parsePlayerList', () => {
  it('debe retornar un arreglo vacío si el input es nulo, undefined o no es un string', () => {
    expect(parsePlayerList(null)).toEqual([])
    expect(parsePlayerList(undefined)).toEqual([])
    expect(parsePlayerList('')).toEqual([])
    expect(parsePlayerList(1234)).toEqual([])
  })

  it('debe limpiar listas con formato numérico "1.", "2."', () => {
    const raw = `1. Lionel Messi
2. Angel Di Maria
3. Rodrigo De Paul`
    expect(parsePlayerList(raw)).toEqual([
      'Lionel Messi',
      'Angel Di Maria',
      'Rodrigo De Paul',
    ])
  })

  it('debe limpiar listas con formato "1-", "2-" y "1)", "2)"', () => {
    const raw = `1- Lautaro Martinez
2- Julian Alvarez
3) Emiliano Martinez`
    expect(parsePlayerList(raw)).toEqual([
      'Lautaro Martinez',
      'Julian Alvarez',
      'Emiliano Martinez',
    ])
  })

  it('debe limpiar listas con viñetas ("-", "*", "•")', () => {
    const raw = `- Alexis Mac Allister
* Enzo Fernandez
• Cristian Romero`
    expect(parsePlayerList(raw)).toEqual([
      'Alexis Mac Allister',
      'Enzo Fernandez',
      'Cristian Romero',
    ])
  })

  it('debe ignorar líneas vacías y espacios en blanco redundantes', () => {
    const raw = `

   1.   Nicolas Otamendi   

   2. Nahuel Molina   

`
    expect(parsePlayerList(raw)).toEqual([
      'Nicolas Otamendi',
      'Nahuel Molina',
    ])
  })

  it('debe preservar aclaraciones entre paréntesis o texto de rol', () => {
    const raw = `1. Dibu Martinez (Arquero)
2. Franco Armani (Suplente)`
    expect(parsePlayerList(raw)).toEqual([
      'Dibu Martinez (Arquero)',
      'Franco Armani (Suplente)',
    ])
  })
})
