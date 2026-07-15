export default class PauseMenu {
  constructor(scene) {
    this.scene = scene;
    this.container = null;
  }

  show(onResume, onExit) {
    const { width, height } = this.scene.scale;

    this.container = this.scene.add.container(0, 0).setDepth(1000);

    const overlay = this.scene.add.rectangle(0, 0, width, height, 0x0b0c10, 0.7).setOrigin(0, 0);

    const title = this.scene.add.text(width / 2, height * 0.35, 'PAUSA', {
      fontFamily: 'Rajdhani, sans-serif',
      fontSize: '42px',
      fontStyle: 'bold',
      color: '#f2a900',
      letterSpacing: 2,
    }).setOrigin(0.5);

    this.container.add([overlay, title]);
    this.container.add(this.createButton(width / 2, height * 0.5, 'REANUDAR', onResume));
    this.container.add(this.createButton(width / 2, height * 0.5 + 70, 'VOLVER AL MENÚ', onExit));
  }

  hide() {
    if (this.container) {
      this.container.destroy();
      this.container = null;
    }
  }

  createButton(x, y, label, onClick) {
    const container = this.scene.add.container(x, y).setDepth(1001);

    const bg = this.scene.add.rectangle(0, 0, 260, 56, 0x0f172a)
      .setStrokeStyle(2, 0x1f2833)
      .setInteractive({ useHandCursor: true });

    const text = this.scene.add.text(0, 0, label, {
      fontFamily: 'Rajdhani, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
      letterSpacing: 2,
    }).setOrigin(0.5);

    container.add([bg, text]);

    bg.on('pointerover', () => {
      bg.setStrokeStyle(2, 0xf2a900);
      text.setColor('#f2a900');
    });
    bg.on('pointerout', () => {
      bg.setStrokeStyle(2, 0x1f2833);
      text.setColor('#ffffff');
    });
    bg.on('pointerup', onClick);

    return container;
  }
}