import Tank from './Tank';

export default class PlayerTank extends Tank {
  constructor(scene, x, y, texture, controls) {
    super(scene, x, y, texture);
    this.controls = controls; 
    this.cursors = scene.input.keyboard.addKeys(controls);
  }

  update() {
  let dx = 0, dy = 0;

  if (this.cursors.left.isDown) dx = -1;
  else if (this.cursors.right.isDown) dx = 1;

  if (this.cursors.up.isDown) dy = -1;
  else if (this.cursors.down.isDown) dy = 1;

  if (dx !== 0 || dy !== 0) this.move(dx, dy);
  else this.stop();
  }
}