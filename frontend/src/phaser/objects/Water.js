import Wall from './Wall';

export default class Water extends Wall {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.destructible = false;
  }
}