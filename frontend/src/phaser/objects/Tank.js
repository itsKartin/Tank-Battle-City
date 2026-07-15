import Phaser from 'phaser';
import Frames from '../constants/Frames';
import Bullet from './Bullet';

export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    
    this.speed = 150;
    this.direction = 'up';
    this.activeBullets = [];
    this.maxBullets = 1;

  }

  applyHitbox(width, height) {
  const offsetX = (this.width - width) / 2;
  const offsetY = (this.height - height) / 2;
  this.body.setSize(width, height);
  this.body.setOffset(offsetX, offsetY);
  }

  move(dx, dy) {
    this.body.setVelocity(dx * this.speed, dy * this.speed);

    if (dx > 0) this.direction = 'right';
    else if (dx < 0) this.direction = 'left';
    else if (dy > 0) this.direction = 'down';
    else if (dy < 0) this.direction = 'up';

    this.rotation = this.getRotationFromDirection();
  }

  shoot() {
    if (this.activeBullets.length >= this.maxBullets) return null;

    const offsets = {
      up: { x: 0, y: -20 },
      down: { x: 0, y: 20 },
      left: { x: -20, y: 0 },
      right: { x: 20, y: 0 }
    };
    const offset = offsets[this.direction];
    const bullet = new Bullet(this.scene, this.x + offset.x, this.y + offset.y, 'sheet', Frames.BULLET, this.direction);
    bullet.owner = this;
    this.activeBullets.push(bullet);
    return bullet;
  }

  getRotationFromDirection() {
    const rotations = { up: 0, right: Math.PI / 2, down: Math.PI, left: -Math.PI / 2 };
    return rotations[this.direction];
  }

  stop() {
    this.body.setVelocity(0, 0);
  }
}