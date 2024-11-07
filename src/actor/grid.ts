import { Actor, Engine, vec } from "excalibur";
import { Grid } from '../interface/index';
import { TileActor } from './tile';
import { game } from '../main';

export class GridActor extends Actor {
  canvasSize;
  gridSize;
  tileSize;
  engine: Engine | null;

  constructor({canvasSize, gridSize, tileSize}: Grid) {
    const {width: canvasWidth, height: canvasHeight} = canvasSize;
    const {rows, columns} = gridSize;
    const {margin: tileMargin, width: tileWidth, height: tileHeight} = tileSize;

    const gridWidth = ((tileWidth + tileMargin) * columns) + tileMargin;
    const gridHeight = ((tileHeight + tileMargin) * rows) + tileMargin;

    const x = (canvasWidth - gridWidth) / 2;
    const y = (canvasHeight - gridHeight) / 2;

    super({
      pos: vec(x, y),
      width: gridWidth,
      height: gridHeight
    });

    this.canvasSize = canvasSize;
    this.gridSize = gridSize;
    this.tileSize = tileSize;
    this.engine = null;
  }

  onInitialize(engine: typeof game) {
    this.engine = engine;
    if (engine.randomizeTiles) {
      this.randomizeTiles(engine.activationChance);
    }
  }

  get hasWon(): boolean {
    const tiles = this.children as [TileActor];
    return tiles.every(({activated}) => activated ===  true);
  }

  randomizeTiles(activationChance: number) {
    (this.children as [TileActor])
      .filter(({actorType}) => actorType === 'Tile')
      .forEach((tile) => {
        if (Math.random() < activationChance) {
          tile.toggleActivated();
        }
      });
  }

  updateGrid(row: number, column: number) {
    const neighbors = [
      [row - 1, column],
      [row + 1, column],
      [row, column - 1],
      [row, column + 1]
    ].filter(([row, column]) =>
      row >= 0 &&
      row < this.gridSize.rows &&
      column >= 0 &&
      column < this.gridSize.columns
    );

    const toToggle = (this.children as [TileActor])
      .filter(({row: childRow, column: childColumn}) =>
        neighbors.some(([neighborRow, neighborColumn]) =>
          childRow === neighborRow && childColumn === neighborColumn)
    );

    toToggle.forEach((tile) => tile.toggleActivated());
    
    if (this.hasWon) {
      this.engine?.events.emit('winGame');
    }
  }
}
