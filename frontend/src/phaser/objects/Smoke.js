import Phaser from 'phaser';

export default class Smoke extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    this.setDepth(10);
    this.setAlpha(0.85);
  }
}