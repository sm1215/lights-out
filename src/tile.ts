import { Actor, Color } from "excalibur";

export class Tile extends Actor {
  activated = false;
  colors = {
    activated: new Color(75, 200, 75),
    deactivated: new Color(175, 50, 50)
  };
  row = null;
  column = null;

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
  }
}
