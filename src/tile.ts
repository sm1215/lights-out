import { Actor, Color } from "excalibur";
import { Resources } from "./resources";

export class Tile extends Actor {
  activated = false;
  colors = {
    activated: new Color(75, 200, 75),
    deactivated: new Color(175, 50, 50)
  };
  row = null;
  column = null;
  bulb = {
    on: this.graphics.add('bulbOn', Resources.BulbOn.toSprite()),
    off: this.graphics.add('bulbOff', Resources.BulbOff.toSprite())
  };

  constructor({pos, height, width, row, column}) {
    super({
      pos,
      width,
      height,
      color: Color.Transparent
    });
    this.color = this.colors.deactivated;
    this.row = row;
    this.column = column;
    this.graphics.add(this.bulb.on);
    this.graphics.add(this.bulb.off);
    this.graphics.use(this.bulb.off);
  }

  onInitialize() {
    this.on('pointerup', () => {
      this.toggleActivated();
      this.parent?.updateGrid(this.row, this.column);
    });
  }

  toggleActivated() {
    this.activated = !this.activated;
    this.color = this.activated ? this.colors.activated : this.colors.deactivated;
    this.graphics.use(this.activated ? this.bulb.on : this.bulb.off);
  }
}
