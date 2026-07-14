import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

// Ahora la función recibe el contenedor exacto de React (parentElement)
export const startPhaserGame = (parentElement) => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: parentElement, // <--- Le pasamos el elemento real aquí
    physics: {
      default: 'arcade',
      arcade: { debug: false }
    },
    scene: [GameScene]
  };

  return new Phaser.Game(config);
};