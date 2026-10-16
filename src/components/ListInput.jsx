import React, { useState } from 'react'
import { Clipboard, Sparkles, Trash2, Users } from 'lucide-react'

const EXAMPLE_LIST = `Fútbol 5 Jueves 20:00hs
1. Rodrigo
2. Juan Carlos
3. Lucas
4. Mateo
5. Matias
6. Nicolas (GK)
7. Sebastian
8. Santiago
9. Franco (GK)
10. Agustin`

export default function ListInput({
  rawText,
  onChange,
  playerCount,
  onArmarEquipos,
}) {
  const [copiedExampleNotice, setCopiedExampleNotice] = useState(false)

  const handlePasteFromClipboard = async () => {
    try {
      if (navigator?.clipboard?.readText) {
        const text = await navigator.clipboard.readText()
        if (text) {
          onChange(text)
        }
      }
    } catch {
      // Si el navegador bloquea permisos de lectura del portapapeles, no falla ruidosamente
    }
  }

  const handleLoadExample = () => {
    onChange(EXAMPLE_LIST)
    setCopiedExampleNotice(true)
    setTimeout(() => setCopiedExampleNotice(false), 2000)
  }

  const handleClear = () => {
    onChange('')
  }

  const getFormatDescription = () => {
    if (playerCount === 0) return 'Sin jugadores detectados'
    const half = Math.floor(playerCount / 2)
    if (playerCount % 2 === 0) {
      return `${playerCount} jugadores detectados (${half} vs ${half})`
    }
    return `${playerCount} jugadores detectados (${half + 1} vs ${half})`
  }

  return (
    <div className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <label htmlFor="player-input" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span>Pegá la lista de WhatsApp</span>
        </label>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePasteFromClipboard}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-700/80 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors active:scale-95 cursor-pointer"
            title="Pegar portapapeles"
          >
            <Clipboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pegar</span>
          </button>
          <button
            type="button"
            onClick={handleLoadExample}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-700/80 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors active:scale-95 cursor-pointer"
            title="Cargar lista de ejemplo"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ejemplo</span>
          </button>
          {rawText && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
              title="Limpiar texto"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <textarea
          id="player-input"
          value={rawText}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`1. Lionel\n2. Angel\n3. Rodrigo\n4. Lautaro\n...`}
          rows={6}
          className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono transition-all resize-y"
        />
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/50">
        <div className="flex items-center gap-1.5 text-xs">
          <Users className="w-4 h-4 text-emerald-400" />
          <span className={playerCount >= 2 ? 'text-emerald-400 font-medium' : 'text-slate-400'}>
            {getFormatDescription()}
          </span>
        </div>

        {copiedExampleNotice && (
          <span className="text-xs text-amber-300 font-medium animate-pulse">
            Ejemplo cargado
          </span>
        )}
      </div>

      <button
        type="button"
        disabled={playerCount < 2}
        onClick={onArmarEquipos}
        className={`w-full mt-4 py-3.5 px-4 rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${
          playerCount >= 2
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 shadow-emerald-500/20'
            : 'bg-slate-700/50 text-slate-500 cursor-not-allowed shadow-none'
        }`}
      >
        <span>⚽ Armar Equipos</span>
      </button>
    </div>
  )
}
