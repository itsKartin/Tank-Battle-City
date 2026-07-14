import Phaser from 'phaser';
import PlayerTank from '../objects/PlayerTank';
import BrickWall from '../objects/BrickWall';
import SteelWall from '../objects/SteelWall';

export default class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('tank', 'assets/sprites/tank.png');
    this.load.image('bullet', 'assets/sprites/bullet.png');
  }

  create() {
    this.createPlaceholderTextures();

    this.bulletsGroup = this.physics.add.group();
    this.wallsGroup = this.physics.add.staticGroup();

    this.wallsGroup.add(new BrickWall(this, 300, 300, 'brick'));
    this.wallsGroup.add(new BrickWall(this, 332, 300, 'brick'));
    this.wallsGroup.add(new SteelWall(this, 300, 332, 'steel'));
    
    this.player1 = new PlayerTank(this, 100, 100, 'tank', {
      up: 'W', down: 'S', left: 'A', right: 'D', fire: 'SPACE'
    });

    this.player2 = new PlayerTank(this, 700, 500, 'tank', {
      up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT', fire: 'ENTER'
    });

    this.physics.add.collider(this.player1, this.wallsGroup);
    this.physics.add.collider(this.player2, this.wallsGroup);

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