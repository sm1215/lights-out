import { Scene, SceneActivationContext } from "excalibur";

export class Win extends Scene {
    replayButton;
    context: SceneActivationContext;

    public onActivate(context: SceneActivationContext): void {
      this.context = context;
      document.querySelector('body').classList.add('win');

      this.replayButton = document.querySelector('#replay-button');
      this.replayButton.addEventListener('click', this.replayEvent);
    }

    public onDeactivate(context: SceneActivationContext): void {
      document.querySelector('body').classList.remove('win');
      this.replayButton.removeEventListener('click', this.replayEvent);
    }

    private replayEvent = (): void => {
      this.context.engine.emit('playGame');
    }
}
