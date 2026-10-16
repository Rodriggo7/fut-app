import React from 'react'
import { Users } from 'lucide-react'

export default function App() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4">
      <header className="w-full max-w-md py-6 text-center border-b border-slate-800">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Users className="w-7 h-7 text-emerald-400" />
          <h1 className="text-2xl font-bold tracking-tight text-white">Armador de Equipos</h1>
        </div>
        <p className="text-sm text-slate-400">Armá 2 equipos parejos desde WhatsApp en 1 clic</p>
      </header>

      <div className="w-full max-w-md mt-6">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 text-center shadow-lg">
          <p className="text-emerald-400 font-medium">Base del proyecto lista</p>
          <p className="text-xs text-slate-400 mt-1">Vite + React + Tailwind CSS + Vitest</p>
        </div>
      </div>
    </main>
  )
}
