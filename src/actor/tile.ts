import { Actor, Color, vec } from "excalibur";
import { Resources } from "../resources";
import { Tile } from "../interface/index";
import { GridActor } from "./grid";

export class TileActor extends Actor {
  actorType = 'Tile';
  activated = false;
  row;
  column;
  _candle = {
    on: this.graphics.add('candleOn', Resources.CandleOn.toSprite()),
    off: this.graphics.add('candleOff', Resources.CandleOff.toSprite())
  };

  constructor({tileSize, row, column}: Tile) {
    const {width, height, margin} = tileSize;

    const x = ((width * column) + width / 2) + margin * (column + 1);
    const y = ((height * row) + height / 2) + margin * (row + 1);

    super({
      pos: vec(x, y),
      width,
      height,
    color: Color.Transparent
    });
    this.row = row;
    this.column = column;
    this.graphics.add(this._candle.on);
    this.graphics.add(this._candle.off);
    this.graphics.use(this._candle.off);
  }

  onInitialize() {
    this.on('pointerup', () => {
      this.toggleActivated();
      (this.parent as GridActor)?.updateGrid(this.row, this.column);
    });
  }

  toggleActivated() {
    this.activated = !this.activated;
    this.graphics.use(this.activated ? this._candle.on : this._candle.off);
  }
}
