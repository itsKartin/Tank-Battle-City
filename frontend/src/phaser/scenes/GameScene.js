import Phaser from 'phaser';
import PlayerTank from '../objects/PlayerTank';
import BrickWall from '../objects/BrickWall';
import SteelWall from '../objects/SteelWall';
import Water from '../objects/Water';
import Smoke from '../objects/Smoke';
import EnemySpawner from '../systems/EnemySpawner';
import EnemyTank from '../objects/EnemyTank';
import Frames from '../constants/Frames';

export default class GameScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet('sheet', 'assets/sprites/sheet.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {

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
    const water1 = new Water(this, 400, 300, 'sheet', Frames.WATER_A);
    water1.play('water_ripple');
    this.watersGroup.add(water1);
  
    //Smoke
    this.smokeGroup = this.add.group();
    const smoke1 = new Smoke(this, 500, 400, 'sheet', Frames.SMOKE_A);
    smoke1.play('smoke_flicker');
    this.smokeGroup.add(smoke1);


    //Ground
    this.add.tileSprite(400, 300, 800, 600, 'sheet', Frames.GROUND_A).setDepth(-1);

    this.bulletsGroup = this.physics.add.group();
    this.wallsGroup = this.physics.add.staticGroup();

    this.wallsGroup.add(new BrickWall(this, 300, 300, 'sheet', Frames.BRICK));
    this.wallsGroup.add(new BrickWall(this, 332, 300, 'sheet', Frames.BRICK));
    this.wallsGroup.add(new SteelWall(this, 300, 332, 'sheet', Frames.STEEL));

    //Bullet
    this.bulletsGroup = this.physics.add.group();
    this.physics.add.overlap(this.bulletsGroup, this.wallsGroup, this.handleBulletWallCollision, null, this);

    this.physics.add.overlap(this.bulletsGroup, this.bulletsGroup, this.handleBulletBulletCollision, null, this);

    //Player
    this.player1 = new PlayerTank(this, 100, 100, 'sheet', {
      up: 'W', down: 'S', left: 'A', right: 'D', fire: 'SPACE'
    }, Frames.PLAYER1);
    
    this.player2 = new PlayerTank(this, 700, 500, 'sheet', {
      up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT', fire: 'ENTER'
    }, Frames.PLAYER2);

    this.physics.add.collider(this.player1, this.wallsGroup);
    this.physics.add.collider(this.player2, this.wallsGroup);
    this.physics.add.collider(this.player1, this.player2);

    //Enemy
    this.enemiesGroup = this.physics.add.group();

    const spawnPoints = [
      { x: 100, y: 50 },
      { x: 400, y: 50 },
      { x: 700, y: 50 }
    ];
    
    this.enemySpawner = new EnemySpawner(this, spawnPoints, {
      totalEnemies: 10,
      maxOnScreen: 4,
      spawnDelay: 2000
    });
    
    this.physics.add.collider(this.enemiesGroup, this.wallsGroup);
    this.physics.add.collider(this.player1, this.enemiesGroup);
    this.physics.add.collider(this.player2, this.enemiesGroup);
    this.physics.add.overlap(this.bulletsGroup, this.enemiesGroup, this.handleBulletEnemyCollision, null, this);
    this.physics.add.overlap(this.player1, this.bulletsGroup, this.handleBulletPlayerCollision, null, this);
    this.physics.add.overlap(this.player2, this.bulletsGroup, this.handleBulletPlayerCollision, null, this);
    
    this.baseGroup = this.physics.add.staticGroup();
    this.baseGroup = this.physics.add.staticGroup();
    this.base = this.baseGroup.create(400, 580, 'sheet', Frames.BASE_A);

    this.base.play('base_idle');

    this.physics.add.collider(this.player1, this.baseGroup);
    this.physics.add.collider(this.player2, this.baseGroup);
    this.physics.add.collider(this.enemiesGroup, this.baseGroup);
    this.physics.add.overlap(this.bulletsGroup, this.baseGroup, this.handleBulletBaseCollision, null, this);
    this.physics.add.overlap(this.enemiesGroup, this.baseGroup, this.handleEnemyBaseCollision, null, this);

    this.physics.add.overlap(this.bulletsGroup, this.wallsGroup, this.handleBulletWallCollision, null, this);
  }

  handleBulletWallCollision(bullet, wall) {
    wall.hit();
    bullet.owner.activeBullets = bullet.owner.activeBullets.filter(b => b !== bullet);
    bullet.destroy();
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

    graphics.destroy();
  }

  update() {
    this.player1.update();
    this.player2.update();
  
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