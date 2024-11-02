import { ImageSource, Loader } from "excalibur";
import bulbOff from "./images/bulb-off.png";
import bulbOn from "./images/bulb-on.png";

export const Resources = {
  BulbOff: new ImageSource(bulbOff),
  BulbOn: new ImageSource(bulbOn)
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
