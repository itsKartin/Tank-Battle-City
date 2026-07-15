export default class ScoreManager {

  constructor(scene, x, y, initialScore = 0) {
    this.scene = scene;
    this.score = initialScore;
  
    this.text = scene.add.text(x, y, `PUNTAJE: ${this.score}`, {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '18px',
      color: '#0000',
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