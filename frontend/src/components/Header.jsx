import { GAME_NAME } from '../data/constants';

function NewsTicker() {
  const text =
    "ÚLTIMA HORA: EL PALACIO PRESIDENCIAL BAJO ASEDIO   ·   OPERACIÓN PÁJARO LIBRE EN CURSO   ·   EL CABO PÉREZ ES LA ÚLTIMA LÍNEA DE DEFENSA   ·   ";
  return (
    <div className="bg-[#b3402f] text-[#ffffff] overflow-hidden whitespace-nowrap py-1.5">
      <div className="inline-block animate-ticker font-mono text-xs font-bold tracking-wider uppercase">
        {text.repeat(4)}
      </div>
    </div>
  );
}

function NavBar() {
  const links = [
    { label: "Lore", href: "#lore" },
    { label: "Controles", href: "#controles" },
    { label: "Puntuaciones", href: "#leaderboard" },
  ];
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0c10]/90 border-b border-[#1f2833]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f2a900] shadow-[0_0_10px_#f2a900]" />
          <span className="font-display font-bold text-xl tracking-widest text-white uppercase">
            {GAME_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            
            <a  key={l.href}
              href={l.href}
              className="font-display text-sm tracking-widest text-[#c5c6c7] hover:text-[#f2a900] transition-colors uppercase"
            >
              {l.label}
            </a>
          ))}
          
           <a href="#juego"
            className="ml-4 font-display text-sm uppercase tracking-wider px-5 py-2 rounded-md bg-[#f2a900] text-[#0b0c10] font-bold hover:bg-[#ffc000] hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Jugar ahora
          </a>
        </div>
      </div>
    </nav>
  );
}

// Componente público: agrupa ticker + navbar como "el header"
function Header() {
  return (
    <>
      <NewsTicker />
      <NavBar />
    </>
  );
}

export default Header;