import { GAME_NAME } from '../data/constants';

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-[#1f2833] bg-[#0b0c10]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f2a900]" />
          <span className="font-display font-bold tracking-widest text-white text-sm uppercase">
            {GAME_NAME}
          </span>
        </div>

        <p className="font-mono text-xs text-[#94a3b8] text-center sm:text-right">
          Proyecto académico · Obra de ficción — cualquier parecido con la realidad es pura coincidencia, guiño guiño.
        </p>
      </div>
    </footer>
  );
}

export default Footer;