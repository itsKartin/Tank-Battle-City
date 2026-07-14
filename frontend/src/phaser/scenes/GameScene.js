import Phaser from 'phaser';
import PlayerTank from '../objects/PlayerTank';

export default class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('tank', 'assets/sprites/tank.png');
    this.load.image('bullet', 'assets/sprites/bullet.png');
  }

  create() {
    this.bullets = [];

    this.player1 = new PlayerTank(this, 100, 100, 'tank', {
      up: 'W', down: 'S', left: 'A', right: 'D', fire: 'SPACE'
    });

    this.player2 = new PlayerTank(this, 700, 500, 'tank', {
      up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT', fire: 'ENTER'
    });
  }

  update() {
    this.player1.update();
    this.player2.update();

    this.bullets = this.bullets.filter(bullet => {
      const outOfBounds =
        bullet.x < 0 || bullet.x > 800 || bullet.y < 0 || bullet.y > 600;
      if (outOfBounds) {
        bullet.owner.activeBullets = bullet.owner.activeBullets.filter(b => b !== bullet);
        bullet.destroy();
        return false;
      }
      return true;
    });
  }
}