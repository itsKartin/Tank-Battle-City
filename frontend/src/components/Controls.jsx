function Key({ label, accent, className = "" }) {
  return (
    <div
      className={`font-mono text-sm text-white bg-[#1e293b] border rounded flex items-center justify-center h-9 transition-colors shadow-sm ${className}`}
      style={{ borderColor: accent }}
    >
      {label}
    </div>
  );
}

function ControlCard({ player, accent, keys }) {
  return (
    <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-6 flex-1 shadow-lg flex flex-col items-center" style={{ color: accent }}>
      <h3 className="font-display font-bold text-lg uppercase tracking-wide mb-6 text-white w-full text-left">
        {player}
      </h3>

      <div className="w-full max-w-[160px] mb-5">
        <p className="font-mono text-[10px] text-[#94a3b8] uppercase mb-2 text-center tracking-widest">
          Mover personaje
        </p>
        <div className="grid grid-cols-3 gap-2">
          <span />
          <Key label={keys.up} accent={accent} />
          <span />
          <Key label={keys.left} accent={accent} />
          <Key label={keys.down} accent={accent} />
          <Key label={keys.right} accent={accent} />
        </div>
      </div>

      <div className="w-full max-w-[160px] border-t border-[#1e293b] pt-4 mt-auto">
        <p className="font-mono text-[10px] text-[#94a3b8] uppercase mb-2 text-center tracking-widest">
          Disparo
        </p>
        <Key label={keys.shoot} accent={accent} className="w-full" />
      </div>
    </div>
  );
}

function Controls() {
  return (
    <section id="controles" className="py-20 px-6 border-t border-[#1f2833] bg-[#0b0c10]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-3xl text-white uppercase tracking-wide">Controles de Mando</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <ControlCard
            player="Jugador 1"
            accent="#f2a900"
            keys={{ up: "W", down: "S", left: "A", right: "D", shoot: "ESPACIO" }}
          />
          <ControlCard
            player="Jugador 2"
            accent="#38bdf8"
            keys={{ up: "↑", down: "↓", left: "←", right: "→", shoot: "ENTER" }}
          />
        </div>
      </div>
    </section>
  );
}

export default Controls;