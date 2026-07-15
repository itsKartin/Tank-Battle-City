import Phaser from 'phaser';

// Paleta consistente con la UI de React (App.jsx)
const COLORS = {
  bg: 0x0b0c10,
  panel: 0x0f172a,
  border: 0x1f2833,
  accent: 0xf2a900,
  accentHover: 0xffc000,
  cyan: 0x38bdf8,
  muted: 0x8d9078,
  white: 0xffffff,
};

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.image('menu-bg', 'assets/sprites/menu-bg.png');
  }

  create() {
    const { width, height } = this.scale;

    // Imagen de fondo, escalada para cubrir todo el canvas sin deformarse
    const bg = this.add.image(width / 2, height / 2, 'menu-bg');
    const scale = Math.max(width / bg.width, height / bg.height);
    bg.setScale(scale);

    // Overlay oscuro para que el texto siga siendo legible sobre la imagen
    this.add.rectangle(0, 0, width, height, COLORS.bg, 0.55).setOrigin(0, 0);

    // Título del juego
    this.add.text(width / 2, height * 0.18, 'OPERACIÓN:', {
      fontFamily: 'Rajdhani, sans-serif',
      fontSize: '28px',
      color: '#8d9078',
      letterSpacing: 4,
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.18 + 40, 'COSTA GUAYABA', {
      fontFamily: 'Rajdhani, sans-serif',
      fontSize: '52px',
      fontStyle: 'bold',
      color: '#f2a900',
      letterSpacing: 2,
    }).setOrigin(0.5);

    // Subtítulo
    this.add.text(width / 2, height * 0.18 + 95, 'Defiende el palacio como puedas', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#c5c6c7',
    }).setOrigin(0.5);

    // Botones
    this.createButton(width / 2, height * 0.55, '1 JUGADOR', () => {
      this.startGame(1);
    });

    this.createButton(width / 2, height * 0.55 + 80, '2 JUGADORES', () => {
      this.startGame(2);
    });
  }

  createButton(x, y, label, onClick) {
    const buttonWidth = 260;
    const buttonHeight = 56;

    const container = this.add.container(x, y);

    const bg = this.add.rectangle(0, 0, buttonWidth, buttonHeight, COLORS.panel)
      .setStrokeStyle(2, COLORS.border)
      .setInteractive({ useHandCursor: true });

    const text = this.add.text(0, 0, label, {
      fontFamily: 'Rajdhani, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
      letterSpacing: 2,
    }).setOrigin(0.5);

    container.add([bg, text]);

    bg.on('pointerover', () => {
      bg.setStrokeStyle(2, COLORS.accent);
      text.setColor('#f2a900');
    });

    bg.on('pointerout', () => {
      bg.setStrokeStyle(2, COLORS.border);
      text.setColor('#ffffff');
    });

    bg.on('pointerdown', () => {
      bg.setFillStyle(COLORS.accent);
      text.setColor('#0b0c10');
    });

    bg.on('pointerup', () => {
      onClick();
    });

    return container;
  }

  startGame(mode) {
    this.scene.start('GameScene', { mode });
  }
}
