import { ImageSource, Loader } from "excalibur";
import candleOff from "./images/candle-off.png";
import candleOn from "./images/candle-on.png";

export const Resources = {
  CandleOff: new ImageSource(candleOff),
  CandleOn: new ImageSource(candleOn)
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
