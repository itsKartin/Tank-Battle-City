import { useRef } from 'react';
import GameCanvas from './GameCanvas';

function HudCorner({ className }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M2 14V2H14" stroke="#f2a900" strokeWidth="2" />
    </svg>
  );
}

function GameSection() {
  const wrapperRef = useRef(null);

  

  return (
    <section id="juego" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-3xl text-[#ffffff] uppercase tracking-wide">
            Cámara de seguridad
          </h2>
        </div>

        <div ref={wrapperRef} className="relative w-fit bg-[#0b0c10] p-1">
          <HudCorner className="absolute -top-1 -left-1" />
          <HudCorner className="absolute -top-1 -right-1 rotate-90" />
          <HudCorner className="absolute -bottom-1 -left-1 -rotate-90" />
          <HudCorner className="absolute -bottom-1 -right-1 rotate-180" />

          <div className="relative border border-[#1f2833] bg-black rounded-sm overflow-hidden">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#23271a] border-b border-[#1f2833] font-mono text-[10px] text-[#8d9078] uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b3402f] animate-blink" />
                REC
              </span>
              <span>CÁM. 04 — PALACIO PRESIDENCIAL</span>
            </div>
            <GameCanvas />
          </div>
        </div>

        
      </div>
    </section>
  );
}

export default GameSection;