import Phaser from 'phaser';
import PlayerTank from '../objects/PlayerTank';

export default class GameScene extends Phaser.Scene {
  init(data) {
    this.mode = data?.mode === 2 ? 2 : 1;
  }

  preload() {
    this.load.image('tank', 'assets/sprites/tank.png');
  }

  create() {
    this.player1 = new PlayerTank(this, 100, 100, 'tank', {
      up: 'W', down: 'S', left: 'A', right: 'D'
    });

    this.player2 = null;
    if (this.mode === 2) {
      this.player2 = new PlayerTank(this, 700, 500, 'tank', {
        up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT'
      });
    }
  }

  update() {
    this.player1.update();
    if (this.player2) this.player2.update();
  }
}