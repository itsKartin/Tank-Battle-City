import './App.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Lore from './components/Lore';
import GameSection from './components/GameSection';
import Controls from './components/Controls';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#ffffff]">
      <Header />
      <Hero />
      <Lore />
      <GameSection />
      <Controls />
      <Leaderboard />
      <Footer />
    </div>
  );
}

export default App;