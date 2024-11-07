import { Scene, SceneActivationContext } from "excalibur";
import { GridActor } from "../actor/grid";
import { TileActor } from "../actor/tile";
import { config } from "../config";

export class Play extends Scene {
    public onActivate(context: SceneActivationContext) {
      const {width, height} = context.engine.canvas;
      const {gridSize, tileSize } = config;

      const grid = new GridActor({
        canvasSize: {
          width,
          height
        },
        gridSize,
        tileSize
      });
    
      for (let row = 0; row < gridSize.rows; row++) {
        for (let column = 0; column < gridSize.columns; column++) {
          const tile = new TileActor({
            tileSize,
            row,
            column
          });
          grid.addChild(tile);
        }
      }

      context.engine.add(grid);
    }
}