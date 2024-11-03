import { Actor } from "excalibur";

export class Grid extends Actor {
  gridSize = null;
  engineCtx = null;

  constructor({pos, width, height, gridSize, engineCtx}) {
    super({
      pos,
      width,
      height,
      gridSize
    });
    this.gridSize = gridSize;
    this.engineCtx = engineCtx;
  }

  updateGrid(row, column) {
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
    const hasWon = this.hasWon();
    
    if (hasWon) {
      this.engineCtx.events.emit('gameWon');
    }
  }

  hasWon() {
    return this.children.every(({activated}) => activated ===  true);
  }
}
