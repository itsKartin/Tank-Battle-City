import { useEffect, useRef } from 'react';
import { startPhaserGame } from '../phaser/main';

function GameCanvas() {
  const containerRef = useRef(null); // Referencia al div de React
  const gameRef = useRef(null);

  useEffect(() => {
    // Solo arrancamos el juego si el contenedor de React ya existe físicamente
    if (containerRef.current && !gameRef.current) {
      const game = startPhaserGame(containerRef.current);
      gameRef.current = game;
    }

    // Limpieza al salir o recargar
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    // Le asignamos la referencia con "ref" y definimos el tamaño
    <div ref={containerRef} className="w-[800px] h-[600px] bg-black" />
  );
}

export default GameCanvas;