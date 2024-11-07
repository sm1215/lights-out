import { ImageSource, Loader, vec, Color } from "excalibur";
import candleOff from "./images/candle-off.png";
import candleOn from "./images/candle-on.png";

export const Resources = {
  CandleOff: new ImageSource(candleOff),
  CandleOn: new ImageSource(candleOn)
} as const;

export const loader = new Loader();
loader.logoWidth = 100;
loader.logoHeight = 100;
loader.logoPosition = vec(102, 70);
loader.backgroundColor = '#3d5771';
loader.loadingBarColor = new Color(91, 34, 7);
loader.loadingBarPosition = vec(105, 245);

loader.startButtonFactory = () => {
  const startButton = document.createElement('button');
  startButton.classList.add('start-button');
  startButton.textContent = 'Start';
  return startButton;
};

for (const res of Object.values(Resources)) {
  loader.addResource(res);
}

loader.logo = 'data:image/png;base64,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';
