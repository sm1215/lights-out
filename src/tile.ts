import { Actor, Color } from "excalibur";
import { Resources } from "./resources";

export class Tile extends Actor {
  actorType = 'Tile';
  activated = false;
  colors = {
    on: new Color(75, 200, 75),
    off: new Color(175, 50, 50)
  };
  row = null;
  column = null;
  candle = {
    on: this.graphics.add('candleOn', Resources.CandleOn.toSprite()),
    off: this.graphics.add('candleOff', Resources.CandleOff.toSprite())
  };

  constructor({pos, height, width, row, column}) {
    super({
      pos,
      width,
      height,
      color: Color.Transparent
    });
    this.color = this.colors.off;
    this.row = row;
    this.column = column;
    this.graphics.add(this.candle.on);
    this.graphics.add(this.candle.off);
    this.graphics.use(this.candle.off);
  }

  onInitialize() {
    this.on('pointerup', () => {
      this.toggleActivated();
      this.parent?.updateGrid(this.row, this.column);
    });
  }

  toggleActivated() {
    this.activated = !this.activated;
    this.color = this.activated ? this.colors.on : this.colors.off;
    this.graphics.use(this.activated ? this.candle.on : this.candle.off);
  }
}
