import React, { useState } from 'react'
import { Check, Copy, RefreshCw, Share2 } from 'lucide-react'
import { formatTeamsForClipboard } from '../utils/exporter.js'

export default function TeamCards({
  teamA,
  teamB,
  onReshuffle,
  onEditList,
}) {
  const [copied, setCopied] = useState(false)
  const [teamAName, setTeamAName] = useState('EQUIPO 1')
  const [teamBName, setTeamBName] = useState('EQUIPO 2')
  const [isEditingNames, setIsEditingNames] = useState(false)

  const handleCopy = async () => {
    const textToCopy = formatTeamsForClipboard(teamA, teamB, {
      teamAName,
      teamBName,
    })

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy)
      } else {
        // Fallback clásico
        const textArea = document.createElement('textarea')
        textArea.value = textToCopy
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err)
    }
  }

  const handleShare = async () => {
    const textToCopy = formatTeamsForClipboard(teamA, teamB, {
      teamAName,
      teamBName,
    })

    if (navigator?.share) {
      try {
        await navigator.share({
          title: 'Equipos de Fútbol',
          text: textToCopy,
        })
        return
      } catch {
        // El usuario canceló o el navegador no lo completó
      }
    }
    // Fallback a copiar si no está disponible la API nativa de share
    handleCopy()
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Barra de acciones principales (Mobile-First) */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onReshuffle}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 rounded-xl text-slate-100 font-semibold text-sm transition-all shadow-md cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-emerald-400" />
          <span>Remezclar</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar Lista</span>
            </>
          )}
        </button>
      </div>

      {/* Tarjetas de Equipos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Equipo 1 */}
        <div className="bg-slate-800/90 border-2 border-emerald-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label="Remera">
                👕
              </span>
              <div>
                {isEditingNames ? (
                  <input
                    type="text"
                    value={teamAName}
                    onChange={(e) => setTeamAName(e.target.value)}
                    className="bg-slate-900 text-white px-2 py-0.5 rounded text-sm font-bold border border-slate-700"
                  />
                ) : (
                  <h3 className="font-bold text-slate-100 text-base">{teamAName}</h3>
                )}
                <span className="text-xs text-slate-400">Camiseta clara / titular</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {teamA.length} jug.
            </span>
          </div>

          <ol className="flex flex-col gap-2">
            {teamA.map((player, index) => (
              <li
                key={`teamA-${index}-${player}`}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/40 text-sm text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-[11px] font-bold text-emerald-400">
                    {index + 1}
                  </span>
                  <span className="font-medium">{player}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Equipo 2 */}
        <div className="bg-slate-800/90 border-2 border-cyan-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label="Pechera">
                🎽
              </span>
              <div>
                {isEditingNames ? (
                  <input
                    type="text"
                    value={teamBName}
                    onChange={(e) => setTeamBName(e.target.value)}
                    className="bg-slate-900 text-white px-2 py-0.5 rounded text-sm font-bold border border-slate-700"
                  />
                ) : (
                  <h3 className="font-bold text-slate-100 text-base">{teamBName}</h3>
                )}
                <span className="text-xs text-slate-400">Pechera / suplente</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {teamB.length} jug.
            </span>
          </div>

          <ol className="flex flex-col gap-2">
            {teamB.map((player, index) => (
              <li
                key={`teamB-${index}-${player}`}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/40 text-sm text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-[11px] font-bold text-cyan-400">
                    {index + 1}
                  </span>
                  <span className="font-medium">{player}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Botones secundarios */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onEditList}
          className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 cursor-pointer"
        >
          Editar lista de jugadores
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsEditingNames(!isEditingNames)}
            className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            {isEditingNames ? 'Guardar nombres' : 'Cambiar nombres'}
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartir</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
