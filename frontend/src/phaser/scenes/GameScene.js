import Phaser from 'phaser';
import PlayerTank from '../objects/PlayerTank';
import BrickWall from '../objects/BrickWall';
import SteelWall from '../objects/SteelWall';
import Water from '../objects/Water';
import Smoke from '../objects/Smoke';
import EnemySpawner from '../systems/EnemySpawner';
import EnemyTank from '../objects/EnemyTank';
import Frames from '../constants/Frames';
import PauseMenu from '../ui/PauseMenu';
import GameOverMenu from '../ui/GameOverMenu';
import ScoreManager from '../systems/ScoreManager';
import { MAP_1, MAP_2, MAP_3, MAP_4, MAPS, buildMap } from '../maps/maps';


export default class GameScene extends Phaser.Scene {
  init(data) {
  this.mode = data?.mode === 2 ? 2 : 1;
  this.mapIndex = data?.mapIndex || 0;
  this.levelComplete = false;
}
  constructor() {
    super('GameScene');
  } 

  preload() {
    this.load.audio('bgm', 'assets/audio/background.mp3');
    this.load.audio('shot_sfx', 'assets/audio/shot.mp3');
    this.load.spritesheet('sheet', 'assets/sprites/sheet.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {

    if (!this.sound.get('bgm')) {
      this.bgm = this.sound.add('bgm', { loop: true, volume: 0.4 });
      this.bgm.play();
    } else {
      this.bgm = this.sound.get('bgm');
    }

    //pause key and menu instance
    this.physics.resume();
    this.time.paused = false;

    this.gameOver = false;
    this.isPaused = false;
    this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.pauseMenu = new PauseMenu(this);
    this.gameOverMenu = new GameOverMenu(this);

    this.scoreManager = new ScoreManager(this, 16, 16);


    

    //Water animeation
    this.anims.create({
      key: 'water_ripple',
      frames: this.anims.generateFrameNumbers('sheet', { frames: [Frames.WATER_A, Frames.WATER_B] }),
      frameRate: 2,
      repeat: -1
    });

    //Smoke animation
    this.anims.create({
      key: 'smoke_flicker',
      frames: this.anims.generateFrameNumbers('sheet', { frames: [Frames.SMOKE_A, Frames.SMOKE_B] }),
      frameRate: 3,
      repeat: -1
    });

    //Bdse animation
    this.anims.create({
      key: 'base_idle',
      frames: this.anims.generateFrameNumbers('sheet', { frames: [Frames.BASE_A, Frames.BASE_B] }),
      frameRate: 2,
      repeat: -1
    });

    //water
    this.watersGroup = this.physics.add.staticGroup();
    this.smokeGroup = this.add.group();

    const map = buildMap(this, MAPS[this.mapIndex]);

    map.walls.forEach(w => {
      if (w.type === 'water') {
        const water = new Water(this, w.x, w.y, 'sheet', Frames.WATER_A);
        water.play('water_ripple');
        this.watersGroup.add(water);
      }
    });

    map.smokeSpots.forEach(s => {
      const smoke = new Smoke(this, s.x, s.y, 'sheet', Frames.SMOKE_A);
      smoke.play('smoke_flicker');
      this.smokeGroup.add(smoke);
    });


    //Ground
    this.add.tileSprite(400, 300, 800, 600, 'sheet', Frames.GROUND_A).setDepth(-1);

    this.bulletsGroup = this.physics.add.group();
    this.wallsGroup = this.physics.add.staticGroup();

    

    const wallClasses = { brick: BrickWall, steel: SteelWall };
    map.walls.forEach(w => {
      const WallClass = wallClasses[w.type];
      if (!WallClass) return;
      const frame = w.type === 'brick' ? Frames.BRICK : Frames.STEEL;
      this.wallsGroup.add(new WallClass(this, w.x, w.y, 'sheet', frame));
    });

    //Bullet
    this.bulletsGroup = this.physics.add.group();
    this.physics.add.overlap(this.bulletsGroup, this.wallsGroup, this.handleBulletWallCollision, null, this);

    this.physics.add.overlap(this.bulletsGroup, this.bulletsGroup, this.handleBulletBulletCollision, null, this);

    //Player
    this.player1 = new PlayerTank(this, map.player1Start.x, map.player1Start.y, 'sheet', {
      up: 'W', down: 'S', left: 'A', right: 'D', fire: 'SPACE'
    }, Frames.PLAYER1);
    this.physics.add.existing(this.player1);
    
    if (this.mode === 2) {
      this.player2 = new PlayerTank(this, map.player2Start.x, map.player2Start.y, 'sheet', {
        up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT', fire: 'ENTER'
      }, Frames.PLAYER2);
      this.physics.add.existing(this.player2);
    }
    
    this.physics.add.collider(this.player1, this.wallsGroup);
    this.physics.add.collider(this.player1, this.watersGroup);
    this.physics.add.collider(this.player1, this.enemiesGroup);
    this.physics.add.overlap(this.player1, this.bulletsGroup, this.handleBulletPlayerCollision, null, this);
    this.physics.add.collider(this.player1, this.baseGroup);
    
    if (this.player2) {
      this.physics.add.collider(this.player2, this.wallsGroup);
      this.physics.add.collider(this.player2, this.watersGroup);
      this.physics.add.collider(this.player1, this.player2);
      this.physics.add.overlap(this.player2, this.bulletsGroup, this.handleBulletPlayerCollision, null, this);
    }

    //Enemy
    this.enemiesGroup = this.physics.add.group();

    this.enemySpawner = new EnemySpawner(this, map.spawnPoints, {
      totalEnemies: 10,
      maxOnScreen: 4,
      spawnDelay: 2000
    });

    this.physics.add.collider(this.enemiesGroup, this.wallsGroup);
    this.physics.add.collider(this.enemiesGroup, this.watersGroup);
    this.physics.add.collider(this.player1, this.enemiesGroup);
    this.physics.add.overlap(this.bulletsGroup, this.enemiesGroup, this.handleBulletEnemyCollision, null, this);
    this.physics.add.overlap(this.player1, this.bulletsGroup, this.handleBulletPlayerCollision, null, this);
    this.baseGroup = this.physics.add.staticGroup();
    this.base = this.baseGroup.create(map.basePosition.x, map.basePosition.y, 'sheet', Frames.BASE_A);    this.base.play('base_idle');

    this.physics.add.collider(this.player1, this.baseGroup);
    this.physics.add.collider(this.enemiesGroup, this.baseGroup);
    this.physics.add.overlap(this.bulletsGroup, this.baseGroup, this.handleBulletBaseCollision, null, this);
    this.physics.add.overlap(this.enemiesGroup, this.baseGroup, this.handleEnemyBaseCollision, null, this);

        this.physics.add.overlap(this.bulletsGroup, this.wallsGroup, this.handleBulletWallCollision, null, this);
  }

 //Bullet-wall collision 
  handleBulletWallCollision(bullet, wall) {
    wall.hit();
    bullet.owner.activeBullets = bullet.owner.activeBullets.filter(b => b !== bullet);
    bullet.destroy();
  }

  //Bullet-enemy collision
  handleBulletEnemyCollision(bullet, enemy) {
  if (bullet.owner instanceof EnemyTank) return;

  bullet.owner.activeBullets = bullet.owner.activeBullets.filter(b => b !== bullet);
  bullet.destroy();
  this.enemySpawner.removeEnemy(enemy);
  enemy.destroy();
  this.scoreManager.addPoints(500);
}

  //Bullet-bullet collision  
  handleBulletBulletCollision(bulletA, bulletB) {
  if (!bulletA.active || !bulletB.active) return;
  
    bulletA.owner.activeBullets = bulletA.owner.activeBullets.filter(b => b !== bulletA);
    bulletB.owner.activeBullets = bulletB.owner.activeBullets.filter(b => b !== bulletB);
    bulletA.destroy();
    bulletB.destroy();
  }

  //Bullet-player collision  
  handleBulletPlayerCollision(player, bullet) {
    if (bullet.owner instanceof PlayerTank) return;
    if (!bullet.active) return;
  
    bullet.owner.activeBullets = bullet.owner.activeBullets.filter(b => b !== bullet);
    bullet.destroy();
    player.takeDamage();
  }
  
  //Bullet-base collision
  handleBulletBaseCollision(bullet, base) {
    bullet.owner.activeBullets = bullet.owner.activeBullets.filter(b => b !== bullet);
    bullet.destroy();
    this.handleGameOver();
  }
  
  //Enemy-base collision
  handleEnemyBaseCollision(enemy, base) {
    this.handleGameOver();
  }
  
  //Player l ose
  handlePlayerDefeat(player) {
    const p1Dead = this.player1.lives <= 0;
    const p2Dead = !this.player2 || this.player2.lives <= 0;
    if (p1Dead && p2Dead) {
      this.handleGameOver();
    }
  }

  togglePause() {
    if (this.isPaused) this.resumeGame();
    else this.pauseGame();
  }

  pauseGame() {
    this.isPaused = true;
    this.physics.pause();
    this.time.paused = true;
    this.pauseMenu.show(
      () => this.resumeGame(),
      () => this.scene.start('MenuScene')
    );
  }

  resumeGame() {
    this.isPaused = false;
    this.physics.resume();
    this.time.paused = false;
    this.pauseMenu.hide();
  }
  
  //Game over
 
 handleGameOver() {
  if (this.gameOver) return;
  this.gameOver = true;
  this.physics.pause();
  this.time.paused = true;
  this.gameOverMenu.show(
    this.scoreManager.getScore(),
    1,
    () => this.scene.start('MenuScene')
  );
}


  createPlaceholderTextures() {
    const graphics = this.add.graphics();

    graphics.fillStyle(0x8b4513);
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture('brick', 32, 32);

    graphics.clear();
    graphics.fillStyle(0x808080);
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture('steel', 32, 32);

    graphics.clear();
    graphics.fillStyle(0xffd700);
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture('base', 32, 32);

    graphics.destroy();
  }

  update() {

    if (Phaser.Input.Keyboard.JustDown(this.pauseKey) && !this.gameOver) {
      this.togglePause();
    }

    if (this.isPaused) return;

    this.player1.update();
    if (this.player2) this.player2.update();

    this.enemySpawner.activeEnemies.forEach(enemy => {
      const outOfBounds = enemy.x < 0 || enemy.x > 800 || enemy.y < 0 || enemy.y > 600;
      if (outOfBounds) enemy.stop();
    });
    
  if (this.enemySpawner.isLevelComplete() && !this.levelComplete) {
  this.levelComplete = true;
  this.time.delayedCall(1500, () => {
    const nextIndex = this.mapIndex + 1;
    if (nextIndex < MAPS.length) {
      this.scene.restart({ mode: this.mode, mapIndex: nextIndex });
    } else {
      console.log('victory, all maps cleared');
    }
  });
}

    this.bulletsGroup.getChildren().forEach(bullet => {
      const outOfBounds =
        bullet.x < 0 || bullet.x > 800 || bullet.y < 0 || bullet.y > 600;
      if (outOfBounds) {
        bullet.owner.activeBullets = bullet.owner.activeBullets.filter(b => b !== bullet);
        bullet.destroy();
      }
    });
  }
}