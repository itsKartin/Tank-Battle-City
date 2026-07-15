import Phaser from 'phaser';
import Tank from './Tank';

export default class PlayerTank extends Tank {
  constructor(scene, x, y, texture, controls, frame) {
    super(scene, x, y, texture, frame);
    this.controls = controls;
    this.cursors = scene.input.keyboard.addKeys(controls);
    this.fireKey = scene.input.keyboard.addKey(controls.fire);

    this.lives = 3;
    this.startX = x;
    this.startY = y;
  }

  takeDamage() {
    this.lives--;
    if (this.lives <= 0) {
      this.scene.handlePlayerDefeat(this);
    } else {
      this.respawn();
    }
  }

  respawn() {
    this.setPosition(this.startX, this.startY);
    this.stop();
  }
  
  update() {
    let dx = 0, dy = 0;

    if (this.cursors.left.isDown) dx = -1;
    else if (this.cursors.right.isDown) dx = 1;

    if (this.cursors.up.isDown) dy = -1;
    else if (this.cursors.down.isDown) dy = 1;

    if (dx !== 0 || dy !== 0) this.move(dx, dy);
    else this.stop();

    if (Phaser.Input.Keyboard.JustDown(this.fireKey)) {
      const bullet = this.shoot();
      if (bullet) {
        this.scene.bulletsGroup.add(bullet);
        bullet.launch();
      }
    }
  }
}