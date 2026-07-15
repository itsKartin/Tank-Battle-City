import PauseMenu from './PauseMenu';
import ScoreService from '../services/ScoreService';

export default class GameOverMenu extends PauseMenu {
  show(score, levelReached, onExit) {
    const { width, height } = this.scene.scale;

    this.scene.input.keyboard.enabled = false;

    this.container = this.scene.add.container(0, 0).setDepth(1000);

    const overlay = this.scene.add.rectangle(0, 0, width, height, 0x0b0c10, 0.8).setOrigin(0, 0);

    const title = this.scene.add.text(width / 2, height * 0.22, 'GAME OVER', {
      fontFamily: 'Rajdhani, sans-serif',
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#f2a900',
      letterSpacing: 2,
    }).setOrigin(0.5);

    const scoreText = this.scene.add.text(width / 2, height * 0.32, `PUNTAJE FINAL: ${score}`, {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '22px',
      color: '#38bdf8',
    }).setOrigin(0.5);

    this.container.add([overlay, title, scoreText]);

    const canSave = score > 0;
    let skipButtonY = height * 0.5;

    if (canSave) {
      const prompt = this.scene.add.text(width / 2, height * 0.4, 'ESCRIBE TU NOMBRE PARA LA TABLA', {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '14px',
        color: '#c5c6c7',
      }).setOrigin(0.5);
      this.container.add(prompt);

      this.createNameInput(width, height);


      let submitted = false;
      const saveButton = this.createButton(width / 2, height * 0.62, 'GUARDAR', async () => {
        if (submitted) return;
        submitted = true;
        const name = this.nameInput.value.trim() || 'ANONIMO';
        try {
          await ScoreService.submitScore(name, score, levelReached);
        } catch (err) {
          console.error(err);
        }
        this.closeAndExit(onExit);
      });

      this.container.add(saveButton);

      skipButtonY = height * 0.62 + 70;
    }

    const skipLabel = canSave ? 'OMITIR' : 'VOLVER AL MENÚ PRINCIPAL';
    const skipButton = this.createButton(width / 2, skipButtonY, skipLabel, () => {
      this.closeAndExit(onExit);
    });
    this.container.add(skipButton);
  }

  createNameInput(width, height) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 12;
    input.placeholder = 'TU NOMBRE';
    input.style.position = 'fixed';
    input.style.width = '200px';
    input.style.padding = '8px';
    input.style.fontFamily = 'JetBrains Mono, monospace';
    input.style.fontSize = '16px';
    input.style.textAlign = 'center';
    input.style.background = '#0f172a';
    input.style.color = '#ffffff';
    input.style.border = '2px solid #1f2833';
    input.style.borderRadius = '4px';
    input.style.zIndex = '1000';

    input.addEventListener('keydown', (e) => e.stopPropagation());
    input.addEventListener('keyup', (e) => e.stopPropagation());

    document.body.appendChild(input);
    this.nameInput = input;

    this.handleReposition = () => this.repositionInput(width, height);
    window.addEventListener('scroll', this.handleReposition);
    window.addEventListener('resize', this.handleReposition);

    this.repositionInput(width, height);
    input.focus();
  }

  repositionInput(width, height) {
    if (!this.nameInput) return;

    const canvas = this.scene.sys.game.canvas;
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / canvas.width;
    const scaleY = rect.height / canvas.height;

    this.nameInput.style.left = `${rect.left + width * 0.5 * scaleX - 100}px`;
    this.nameInput.style.top = `${rect.top + height * 0.48 * scaleY}px`;
  }

  closeAndExit(onExit) {
    this.scene.input.keyboard.enabled = true;
    this.hide();
    onExit();
  }

  hide() {
    if (this.nameInput) {
      window.removeEventListener('scroll', this.handleReposition);
      window.removeEventListener('resize', this.handleReposition);
      this.nameInput.remove();
      this.nameInput = null;
    }
    super.hide();
  }
}