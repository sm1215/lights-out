import { Engine, FadeInOut, CrossFade, Color } from "excalibur";
import { loader } from "./resources";
import { Win } from "./scenes/win";
import { Play } from "./scenes/play";

class Game extends Engine {
    constructor() {
      super({
        width: 304,
        height: 304,
        backgroundColor: new Color(230, 230, 255),
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

  export const game = new Game();
  game.initialize();
