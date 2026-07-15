function LoreLine({ label, value }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
      <span className="font-mono text-[11px] text-[#38bdf8] uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
      <span className="font-display text-sm text-white uppercase tracking-wide">{value}</span>
    </div>
  );
}


function ScreenshotPlaceholder({ label, src }) {
  if (src) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden border border-[#1f2833] bg-[#111318]">
        <img src={src} alt={label} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 font-mono text-[11px] text-[#8d9078] tracking-wider uppercase">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden border border-[#1f2833] bg-[#111318] bg-grid">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-6 gap-1 opacity-70">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-[2px]"
              style={{
                background: [
                  "#1f2833", "#1f2833", "#f2a90022", "#1f2833",
                  "#c99a4a22", "#1f2833",
                ][i % 6],
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 font-mono text-[11px] text-[#8d9078] tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

function Lore() {
  return (
    <>
      <section id="lore" className="py-20 px-6 border-t border-[#1f2833] bg-[#0b0c10]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-xs tracking-[0.3em] text-[#f2a900] mb-2 uppercase">Expediente clasificado</p>
            <h2 className="font-display font-bold text-3xl text-white uppercase tracking-wide">
              Operación: Extracción en Costa Guayaba
            </h2>
          </div>

          <div className="border border-[#1e293b] rounded-lg bg-[#0f172a] p-6 sm:p-8 shadow-xl">
            <div className="grid sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-[#1e293b]">
              <LoreLine label="Lugar" value="Rep. de Costa Guayaba" />
              <LoreLine label="Operación" value="Pájaro Libre" />
              <LoreLine label="Unidad" value="Guardia de Honor" />
            </div>

            <p className="text-[#94a3b8] leading-relaxed mb-4">
              Estás en la ficticia (pero muy familiar) <span className="text-white font-bold">República de Costa Guayaba</span>.
              Las fuerzas internacionales de la coalición <span className="text-[#38bdf8] font-bold">S.W.A.T.</span> ("Special
              Weapons And Tactics... y otras cosas") han iniciado la <span className="text-[#f2a900] font-bold">Operación:
              Pájaro Libre</span> para capturar al <span className="text-white font-bold">"Líder Supremo"</span>, quien se
              niega a soltar el poder y está atrincherado en el Palacio Presidencial.
            </p>
            <p className="text-[#94a3b8] leading-relaxed">
              Tú no eres un héroe, eres simplemente el <span className="text-white font-bold">Cabo Pérez</span>, el último
              Guardia de Honor que no escuchó la alarma de evacuación porque estaba escuchando música con
              audífonos. Ahora es tu deber defender el podio presidencial usando lo que tengas a mano contra
              las fuerzas tácticas más avanzadas del mundo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-[#1f2833]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-xs tracking-[0.3em] text-[#c99a4a] mb-2 uppercase">Vista previa</p>
            <h2 className="font-display font-bold text-3xl text-[#ffffff] uppercase tracking-wide">Capturas</h2>
            <p className="text-[#6b6e5c] text-sm mt-2 font-mono">
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <ScreenshotPlaceholder label="Palacio - Planta baja" src="/images/screenshot-1.png" />
            <ScreenshotPlaceholder label="Cabo Pérez en acción" src="/images/screenshot-2.png" />
            <ScreenshotPlaceholder label="Asedio S.W.A.T." src="/images/screenshot-3.png" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Lore;