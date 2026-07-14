import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import GameCanvas from './components/GameCanvas';


function App() {
  return (
    // Contenedor principal: min-h-screen (ocupa toda la pantalla), fondo oscuro de arcade (bg-slate-950) y texto blanco
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-10 px-4">
      
      {/* 1. HEADER: El título de tu página */}
      <header className="text-center mb-8 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-yellow-500 tracking-wider uppercase mb-3 drop-shadow-[0_5px_5px_rgba(234,179,8,0.3)]">
          Battle City Classic
        </h1>
        <p className="text-slate-400 text-lg">
          Una recreación del legendario juego de tanques de la NES. ¡Protege tu base y destruye a los enemigos!
        </p>
      </header>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex flex-col items-center gap-8 w-full max-w-3xl">
        
        {/* Sección de Información y Controles */}
        <section className="bg-slate-900 p-6 rounded-xl border border-slate-800 w-full shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">¿Cómo jugar?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jugador 1 */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">Jugador 1</h3>
              <p className="text-slate-300">
                🎮 Moverse: <span className="font-mono bg-slate-800 px-2 py-1 rounded text-white text-sm">W, A, S, D</span>
              </p>
            </div>

            {/* Jugador 2 */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Jugador 2</h3>
              <p className="text-slate-300">
                🎮 Moverse: <span className="font-mono bg-slate-800 px-2 py-1 rounded text-white text-sm">↑, ↓, ←, →</span>
              </p>
            </div>
          </div>
        </section>

        {/* 3. EL JUEGO (Colocado abajo de la descripción) */}
        <div className="flex flex-col items-center w-full">
          <h3 className="text-xl font-bold text-slate-400 mb-2">🎮 ZONA DE JUEGO 🎮</h3>
          {/* Un marco genial estilo arcade para sostener el juego */}
          <div className="border-4 border-yellow-500 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.5)] bg-black">
            <GameCanvas />
          </div>
        </div>

      </main>

      {/* 4. FOOTER: Créditos */}
      <footer className="mt-16 text-slate-600 text-sm">
        Desarrollado con React, Tailwind CSS y Phaser.
      </footer>

    </div>
  );
}

export default App;