import Phaser from 'phaser';

const ROTATIONS = {
  up: 0,
  right: Math.PI / 2,
  down: Math.PI,
  left: -Math.PI / 2
};

export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, direction) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);

    this.speed = 300;
    this.direction = direction;
  }

  launch() {
    this.setScale(1.8);
    this.rotation = ROTATIONS[this.direction];

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