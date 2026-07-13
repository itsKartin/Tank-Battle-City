import Phaser, { Scene } from 'phaser';

class BootScene extends Phaser.Scene {
    preload() {
        this.load.image('tank', 'assets/sprites/tank.png');
    }
    create() {
        this.add.image(400,300, 'tank');
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [BootScene]
}

export default new Phaser.Game(config);