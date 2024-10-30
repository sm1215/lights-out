import { Engine, vec } from "excalibur";
import { Tile } from "./tile";
import { loader } from "./resources";

const tileSize = {
  width: 100,
  height: 100,
  margin: 1,
};
const gridSize = {
  rows: 3,
  columns: 3,
};

class Game extends Engine {
    constructor() {
      super({width: 800, height: 600});
    }
    initialize() {
      const grid = [];
      for (let row = 0; row < gridSize.rows; row++) {
        for (let column = 0; column < gridSize.columns; column++) {
          const tile = new Tile({
            pos: vec(
              ((tileSize.width * row) + tileSize.width / 2) + tileSize.margin * row + 1,
              ((tileSize.height * column) + tileSize.height / 2) + tileSize.margin * column + 1
            ),
            height: tileSize.height,
            width: tileSize.width
          });
          grid.push(tile);
          this.add(tile);
        }
      }
      console.log(grid);




      this.start(loader);
    }
  }
  
  export const game = new Game();
  game.initialize();