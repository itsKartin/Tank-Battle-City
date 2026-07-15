import Phaser from 'phaser';
import EnemyTank from '../objects/EnemyTank';
import Frames from '../constants/Frames';

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
      const enemy = new EnemyTank(this.scene, point.x, point.y, 'sheet', Frames.ENEMY);
      this.scene.enemiesGroup.add(enemy);
      enemy.pickRandomDirection();
      this.activeEnemies.push(enemy);
      this.spawned++;
  }

  removeEnemy(enemy) {
      const index = this.activeEnemies.indexOf(enemy);
      if (index !== -1) this.activeEnemies.splice(index, 1);
  }

  isLevelComplete() {
    return this.spawned >= this.totalEnemies && this.activeEnemies.length === 0;
  }
}