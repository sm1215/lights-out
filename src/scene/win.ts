import { Scene, SceneActivationContext } from "excalibur";

export class Win extends Scene {
    body: HTMLElement | null;
    replayButton: HTMLButtonElement | null;
    // context: SceneActivationContext | null;

    constructor() {
      super();
      this.body = document.querySelector('body');
      this.replayButton = document.querySelector('#replay-button');
    }

    public onActivate(context: SceneActivationContext): void {
      this.body?.classList.add('win');
      this.replayButton?.addEventListener('click', this.replayEvent.bind(context));
    }

    public onDeactivate(context: SceneActivationContext): void {
      this.body?.classList.remove('win');
      this.replayButton?.removeEventListener('click', this.replayEvent.bind(context));
    }

    private replayEvent = (): void => {
      this.engine.emit('playGame');
    }
}
