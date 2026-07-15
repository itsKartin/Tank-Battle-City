export default class ScoreManager {
  constructor(scene, x, y) {
    this.scene = scene;
    this.score = 0;

    this.text = scene.add.text(x, y, 'PUNTAJE: 0', {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '18px',
      color: '#38bdf8',
    }).setDepth(1000);
  }

  addPoints(points) {
    this.score += points;
    this.text.setText(`PUNTAJE: ${this.score}`);
  }

  getScore() {
    return this.score;
  }
}