import Phaser from 'phaser';

export default class Wall extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    this.destructible = false;
  }

  hit() {
  }
}