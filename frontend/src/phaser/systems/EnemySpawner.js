import Phaser from 'phaser';
import EnemyTank from '../objects/EnemyTank';

export default class EnemySpawner {
  constructor(scene, spawnPoints, config) {
    this.scene = scene;
    this.spawnPoints = spawnPoints;
    this.totalEnemies = config.totalEnemies;
    this.maxOnScreen = config.maxOnScreen;
    this.spawned = 0;
    this.activeEnemies = [];

    this.spawnTimer = scene.time.addEvent({
      delay: config.spawnDelay || 2000,
      callback: this.trySpawn,
      callbackScope: this,
      loop: true
    });
  }

  trySpawn() {
    if (this.spawned >= this.totalEnemies) {
      this.spawnTimer.remove();
      return;
    }
    if (this.activeEnemies.length >= this.maxOnScreen) return;

    const point = Phaser.Utils.Array.GetRandom(this.spawnPoints);
    const enemy = new EnemyTank(this.scene, point.x, point.y, 'tank');
    this.scene.enemiesGroup.add(enemy);
    this.activeEnemies.push(enemy);
    this.spawned++;
  }

  removeEnemy(enemy) {
    this.activeEnemies = this.activeEnemies.filter(e => e !== enemy);
  }

  isLevelComplete() {
    return this.spawned >= this.totalEnemies && this.activeEnemies.length === 0;
  }
}