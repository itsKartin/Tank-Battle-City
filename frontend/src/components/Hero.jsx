function Hero() {
  return (
    <header className="relative overflow-hidden bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0c10]/60 to-[#0b0c10]" />
      <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-16 text-center animate-fade-up">
        <p className="font-mono text-xs tracking-[0.3em] text-[#c99a4a] mb-4 uppercase">
          // Proyecto académico — sátira táctica 2D
        </p>
        <h1 className="font-display font-bold text-5xl sm:text-6xl text-[#ffffff] uppercase leading-[1.05] tracking-wide mb-5">
          Nadie escapa<br />
          <span className="text-[#f2a900]">del turno de guardia.</span>
        </h1>
        <p className="text-[#8d9078] text-lg max-w-xl mx-auto leading-relaxed">
          República de Costa Guayaba, presente. Una coalición internacional viene por el "Líder Supremo"
          y tú te quedaste dormido en tu puesto. Defiende el palacio como puedas — no eres un héroe,
          eres el Cabo Pérez.
        </p>
      </div>
    </header>
  );
}

export default Hero;