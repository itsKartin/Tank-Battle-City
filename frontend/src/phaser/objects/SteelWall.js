import Wall from './Wall';

export default class SteelWall extends Wall {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.destructible = false;
  }

  hit() {
  }
}