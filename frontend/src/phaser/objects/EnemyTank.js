import Phaser from 'phaser';
import Tank from './Tank';

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const VECTORS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

export default class EnemyTank extends Tank {
<<<<<<< HEAD
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
=======
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
>>>>>>> phaser
    this.pickRandomDirection();

    this.directionTimer = scene.time.addEvent({
      delay: Phaser.Math.Between(1000, 2500),
      callback: this.pickRandomDirection,
      callbackScope: this,
      loop: true
    });

    this.shootTimer = scene.time.addEvent({
      delay: Phaser.Math.Between(1500, 3000),
      callback: this.tryShoot,
      callbackScope: this,
      loop: true
    });
  }

  pickRandomDirection() {
    const direction = Phaser.Utils.Array.GetRandom(DIRECTIONS);
    const v = VECTORS[direction];
    this.move(v.x, v.y);
  }

  tryShoot() {
    const bullet = this.shoot();
    if (bullet) {
      this.scene.bulletsGroup.add(bullet);
      bullet.launch();
    }
  }

  destroy(fromScene) {
    this.directionTimer.remove();
    this.shootTimer.remove();
    super.destroy(fromScene);
  }
}