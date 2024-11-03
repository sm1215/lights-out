import { Engine, vec, FadeInOut, CrossFade } from "excalibur";
import { Grid } from "./grid";
import { Tile } from "./tile";
import { loader } from "./resources";
import { Win } from "./scenes/win";

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
      super({
        width: 800,
        height: 600,
        scenes: {
          win: {
            scene: Win,
            transitions: {
              out: new FadeInOut({ duration: 500, direction: 'out' }),
              in: new CrossFade({ duration: 250, direction: 'in', blockInput: true })
            }
          }
        }
      });
    }
    initialize() {
      const grid = new Grid({
        pos: vec(tileSize.margin, tileSize.margin),
        width: (tileSize.width + tileSize.margin * gridSize.columns) + tileSize.margin,
        height: (tileSize.height + tileSize.margin * gridSize.rows) + tileSize.margin,
        gridSize,
        engineCtx: this
      });

      for (let row = 0; row < gridSize.rows; row++) {
        for (let column = 0; column < gridSize.columns; column++) {
          const x = ((tileSize.width * column) + tileSize.width / 2) + tileSize.margin * column + 1;
          const y = ((tileSize.height * row) + tileSize.height / 2) + tileSize.margin * row + 1;
          const tile = new Tile({
            pos: vec(x, y),
            height: tileSize.height,
            width: tileSize.width,
            row,
            column
          });
          grid.addChild(tile);
        }
      }
      this.add(grid);

      this.events.on('gameWon', () => {
        this.goToScene('win');
      });

      this.start(loader);
    }
  }

  export const game = new Game();
  game.initialize();
