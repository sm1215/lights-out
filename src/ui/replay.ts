import { ScreenElement, Color, vec, Font, FontUnit, TextAlign, Label } from "excalibur";

export class ReplayButton extends ScreenElement {
  constructor() {
    super({
      pos: vec(350, 300),
      color: new Color(75, 75, 200),
      height: 40,
      width: 150
    });

    const text = new Label({
      text: 'Replay',
      pos: vec(72, 5),
      font: new Font ({
        family: 'Arial',
        size: 30,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
        color: new Color(255, 255 ,255)
      })
    });
    this.addChild(text);
  }

  onInitialize() {
    this.on('pointerup', () => {
      console.log('replay clicked');
      // TODO: add event and refactor main.ts to restart game
    })
  }
}
