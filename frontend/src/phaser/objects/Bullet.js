import Phaser from 'phaser';

export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, direction) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);

    this.speed = 300;
    this.direction = direction;
  }

  launch() {
    const velocities = {
      up: { x: 0, y: -this.speed },
      down: { x: 0, y: this.speed },
      left: { x: -this.speed, y: 0 },
      right: { x: this.speed, y: 0 }
    };
    const v = velocities[this.direction];
    this.body.setVelocity(v.x, v.y);
  }
}