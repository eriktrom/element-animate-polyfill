import {Player, PlayerOptions} from "./player";
import {isNumber} from "./util";

export class Animation {
  options: PlayerOptions;

  constructor(public keyframes: {[key: string]: string}[], options: any) {
    if (isNumber(options)) {
      options = { duration: options };
    }
    this.options = new PlayerOptions(options);
  }

  create(element: HTMLElement): Player {
    return new Player(element, this.keyframes, this.options);
  }

  start(element): Player {
    var player = this.create(element);
    player.play();
    return player;
  }
}
