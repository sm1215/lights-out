import { Scene, Label, vec, FontUnit, TextAlign, Font } from "excalibur";
import { ReplayButton } from "../ui/replay";

export class Win extends Scene {
    private _replayButton: ReplayButton;

    public onActivate(engine: Engine) {
      const winText = new Label({
        // Referencing a truck racing game meme
        text: 'You\'re Are Winner!',
        pos: vec( 400, 200 ),
        font: new Font ({
          family: 'Arial',
          size: 40,
          unit: FontUnit.Px,
          textAlign: TextAlign.Center
        })
      });
      this.add(winText);

      this._replayButton = new ReplayButton();
      this.add(this._replayButton);
    }
}