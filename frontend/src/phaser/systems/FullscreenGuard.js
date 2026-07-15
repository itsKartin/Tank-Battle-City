export default class FullscreenGuard {
  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener('keydown', this.handleKeyDown, true);
  }

  handleKeyDown(event) {
    if (event.key !== 'Escape') return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown, true);
  }
}