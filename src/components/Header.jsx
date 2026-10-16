import React from 'react'

export default function Header() {
  return (
    <header className="w-full max-w-lg py-5 text-center">
      <div className="inline-flex items-center justify-center gap-2 mb-1.5">
        <span className="text-3xl" role="img" aria-label="Pelota de fútbol">
          ⚽
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Armador de Equipos
        </h1>
      </div>
      <p className="text-xs md:text-sm text-slate-400 font-medium">
        Pegá la lista de WhatsApp y armá dos equipos al instante
      </p>
    </header>
  )
}
