import { Scene, vec, SceneActivationContext } from "excalibur";
import { Grid } from "../grid";
import { Tile } from "../tile";

const tileSize = {
  width: 100,
  height: 100,
  margin: 1,
};
const gridSize = {
  rows: 3,
  columns: 3,
};

export class Play extends Scene {
    public onActivate(context: SceneActivationContext) {
      const {width: canvasWidth, height: canvasHeight} = context.engine.canvas;

      const grid = new Grid({
        canvasSize: {canvasWidth, canvasHeight},
        gridSize,
        tileSize
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

      context.engine.add(grid);
    }
}