import Wall from './Wall';

export default class BrickWall extends Wall {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.destructible = true;
  }

  hit() {
    this.destroy();
  }
}