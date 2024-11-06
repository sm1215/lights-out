import { Actor, Engine, vec } from "excalibur";

export class Grid extends Actor {
  canvasSize = null;
  gridSize = null;
  tileSize = null;
  engine: Engine;
  activationChance = 0.3;

  constructor({canvasSize, gridSize, tileSize}) {
    const {canvasWidth, canvasHeight} = canvasSize;
    const {rows, columns} = gridSize;
    const {margin: tileMargin, width: tileWidth, height: tileHeight} = tileSize;

    const gridWidth = ((tileWidth + tileMargin) * columns) + tileMargin;
    const gridHeight = ((tileHeight + tileMargin) * rows) + tileMargin;

    const x = (canvasWidth - gridWidth) / 2 + tileMargin;
    const y = (canvasHeight - gridHeight) / 2 + tileMargin;

    super({
      pos: vec(x, y),
      width: gridWidth,
      height: gridHeight
    });

    this.canvasSize = canvasSize;
    this.gridSize = gridSize;
    this.tileSize = tileSize;
  }

  private get hasWon(): boolean {
    return this.children.every(({activated}) => activated ===  true);
  }

  onInitialize(engine: Engine): void {
    this.engine = engine;
    this.randomizeTiles();
  }

  private randomizeTiles(): void {
    this.children
      .filter(({actorType}) => actorType === 'Tile')
      .forEach((tile) => {
        if (Math.random() < this.activationChance) {
          tile.toggleActivated();
        }
      });
  }

  public updateGrid(row, column): void {
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

    const toToggle = this.children.filter(({row: childRow, column: childColumn}) =>
      neighbors.some(([neighborRow, neighborColumn]) =>
        childRow === neighborRow && childColumn === neighborColumn)
    );

    toToggle.forEach((tile) => tile.toggleActivated());
    
    if (this.hasWon) {
      this.engine.events.emit('winGame');
    }
  }
}
