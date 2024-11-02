import { Actor, Color, vec } from "excalibur";
import { Tile } from "./tile";

export class Grid extends Actor {
  gridSize = null;

  constructor({pos, width, height, gridSize}) {
    super({
      pos,
      width,
      height,
      gridSize
    });
    this.gridSize = gridSize;
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
      neighbors.some(([neighborRow, neighborColumn]) => childRow === neighborRow && childColumn === neighborColumn)
    );

    toToggle.forEach((tile) => tile.toggleActivated());
  }
}
