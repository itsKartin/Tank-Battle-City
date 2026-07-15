import { DUMMY_SCORES } from '../data/scores';

function Leaderboard() {
  const medalColor = (rank) =>
    rank === 1 ? "#f2a900" : rank === 2 ? "#e2e8f0" : rank === 3 ? "#d97706" : "#64748b";

  return (
    <section id="leaderboard" className="py-20 px-6 border-t border-[#1f2833] bg-[#0b0c10]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-3xl text-white uppercase tracking-wide">Tabla de puntuaciones</h2>
        </div>

        <div className="border border-[#1e293b] rounded-lg overflow-hidden shadow-xl">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="bg-[#1e293b] text-[#94a3b8] uppercase text-xs tracking-wider">
                <th className="text-left px-5 py-4 font-medium">#</th>
                <th className="text-left px-5 py-4 font-medium">Jugador</th>
                <th className="text-right px-5 py-4 font-medium">Etapa</th>
                <th className="text-right px-5 py-4 font-medium">Puntaje</th>
              </tr>
            </thead>
            <tbody className="bg-[#0f172a]">
              {DUMMY_SCORES.map((row) => (
                <tr key={row.rank} className="border-t border-[#1e293b] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="px-5 py-4 font-bold" style={{ color: medalColor(row.rank) }}>
                    {String(row.rank).padStart(2, "0")}
                  </td>
                  <td className="px-5 py-4 text-white tracking-wide">{row.name}</td>
                  <td className="px-5 py-4 text-right text-[#94a3b8]">{row.stage}</td>
                  <td className="px-5 py-4 text-right text-[#38bdf8] font-bold">{row.score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;