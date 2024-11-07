import { Engine, FadeInOut, CrossFade, Color } from "excalibur";
import { loader } from "./resources";
import { config } from "./config";
import { Win } from "./scene/win";
import { Play } from "./scene/play";
import { Game } from "./interface/game";

class GameEngine extends Engine implements Game {
    randomizeTiles;
    activationChance;
    constructor() {
      const {engineSize, randomizeTiles, activationChance} = config;

      super({
        canvasElementId: 'game',
        width: engineSize.width,
        height: engineSize.height,
        backgroundColor: new Color(61, 87, 113),
        scenes: {
          playGame: {
            scene: Play,
            transitions: {
              out: new FadeInOut({ duration: 500, direction: 'out' }),
              in: new CrossFade({ duration: 250, direction: 'in', blockInput: true })
            }
          },
          winGame: {
            scene: Win,
            transitions: {
              out: new FadeInOut({ duration: 500, direction: 'out' }),
              in: new CrossFade({ duration: 250, direction: 'in', blockInput: true })
            }
          }
        }
      });

      this.randomizeTiles = randomizeTiles;
      this.activationChance = activationChance;
    }

    initialize() {
      this.events.on('winGame', () => {
        this.goToScene('winGame');
      });

      this.events.on('playGame', () => {
        this.goToScene('playGame');
      });

      this.start(loader).then(() => {
        this.goToScene('playGame');
      });
    }
  }

  export const game = new GameEngine();
  game.initialize();
