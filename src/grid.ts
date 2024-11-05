import { Actor, Engine } from "excalibur";

export class Grid extends Actor {
  gridSize = null;
  engine: Engine;
  activationChance = 0.3;

  constructor({pos, width, height, gridSize}) {
    super({
      pos,
      width,
      height,
      gridSize
    });
    this.gridSize = gridSize;
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
