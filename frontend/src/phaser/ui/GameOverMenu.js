import PauseMenu from './PauseMenu';

export default class GameOverMenu extends PauseMenu {
  show(onExit) {
    const { width, height } = this.scene.scale;

    this.container = this.scene.add.container(0, 0).setDepth(1000);

    const overlay = this.scene.add.rectangle(0, 0, width, height, 0x0b0c10, 0.8).setOrigin(0, 0);

    const title = this.scene.add.text(width / 2, height * 0.35, 'GAME OVER', {
      fontFamily: 'Rajdhani, sans-serif',
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#f2a900',
      letterSpacing: 2,
    }).setOrigin(0.5);

    this.container.add([overlay, title]);
    this.container.add(this.createButton(width / 2, height * 0.5, 'VOLVER AL MENÚ', onExit));
  }
}