import React, { useState, useMemo, useCallback } from 'react'
import Header from './components/Header.jsx'
import ListInput from './components/ListInput.jsx'
import TeamCards from './components/TeamCards.jsx'
import { parsePlayerList } from './utils/parser.js'
import { shuffleArray } from './utils/shuffle.js'
import { divideTeams } from './utils/teams.js'

export default function App() {
  const [rawText, setRawText] = useState('')
  const [teams, setTeams] = useState(null)

  // Mantiene el parsing sincronizado de manera reactiva e inmutable
  const parsedPlayers = useMemo(() => {
    return parsePlayerList(rawText)
  }, [rawText])

  const handleArmarEquipos = useCallback(() => {
    if (parsedPlayers.length < 2) return
    const shuffled = shuffleArray(parsedPlayers)
    const divided = divideTeams(shuffled)
    setTeams(divided)
  }, [parsedPlayers])

  const handleReshuffle = useCallback(() => {
    if (parsedPlayers.length < 2) return
    const shuffled = shuffleArray(parsedPlayers)
    const divided = divideTeams(shuffled)
    setTeams(divided)
  }, [parsedPlayers])

  const handleEditList = useCallback(() => {
    setTeams(null)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center px-4 pb-12 selection:bg-emerald-500 selection:text-slate-950">
      <Header />

      <main className="w-full max-w-lg flex flex-col gap-4">
        {!teams ? (
          <ListInput
            rawText={rawText}
            onChange={(val) => {
              setRawText(val)
            }}
            playerCount={parsedPlayers.length}
            onArmarEquipos={handleArmarEquipos}
          />
        ) : (
          <TeamCards
            teamA={teams.teamA}
            teamB={teams.teamB}
            onReshuffle={handleReshuffle}
            onEditList={handleEditList}
          />
        )}
      </main>

      <footer className="w-full max-w-lg mt-auto pt-8 text-center text-xs text-slate-500">
        <p>App Armadora de Equipos • v1.0 Client-Side</p>
      </footer>
    </div>
  )
}
