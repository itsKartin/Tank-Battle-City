import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';

export const startPhaserGame = (parentElement) => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: parentElement,
    physics: {
      default: 'arcade',
      arcade: { debug: false }
    },
    scene: [MenuScene, GameScene] // <-- MenuScene va primero, es la que arranca
  };

  return new Phaser.Game(config);
};