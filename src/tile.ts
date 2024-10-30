import { Actor, Color, vec } from "excalibur";

export class Tile extends Actor {
  activated = false;
  colors = {
    activated: new Color(75, 200, 75),
    deactivated: new Color(175, 50, 50)
  };

  constructor({pos, height, width}) {
    super({
      pos,
      width,
      height,
      color: Color.Transparent
    });
    this.color = this.colors.deactivated;
  }

  onInitialize() {
    this.on('pointerup', () => {
      this.activated = !this.activated;
      this.color = this.activated ? this.colors.activated : this.colors.deactivated;



      // debugging
      console.log('x, y, h, w', this.pos.x, this.pos.y, this.height, this.width);
    });
  }
}
