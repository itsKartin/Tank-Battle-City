import Phaser from 'phaser';

export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 150;
    this.direction = 'up'; 
    this.setScale(0.04);
  }

  move(dx, dy) {
    this.body.setVelocity(dx * this.speed, dy * this.speed);

    if (dx > 0) this.direction = 'right';
    else if (dx < 0) this.direction = 'left';
    else if (dy > 0) this.direction = 'down';
    else if (dy < 0) this.direction = 'up';

    this.rotation = this.getRotationFromDirection();
  }

  getRotationFromDirection() {
    const rotations = { up: 0, right: Math.PI / 2, down: Math.PI, left: -Math.PI / 2 };
    return rotations[this.direction];
  }

  stop() {
    this.body.setVelocity(0, 0);
  }
}