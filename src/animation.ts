import {Player, PlayerOptions} from "./player";
import {isPresent, isNumber} from "./util";
import {BrowserClock} from './browser_clock.ts';
import {BrowserStyles} from './browser_styles';

export class Animation {
  options: PlayerOptions;
  private _clock: BrowserClock;
  private _styles: BrowserStyles;

  constructor(public keyframes: {[key: string]: string}[],
              options: any,
              clock: BrowserClock = null,
              styles: BrowserStyles = null) {
    if (isNumber(options)) {
      options = { duration: options };
    }

    this.options = new PlayerOptions(options);
    this._clock = clock || new BrowserClock();
    this._styles = styles || new BrowserStyles();
  }

  create(element: HTMLElement): Player {
    return new Player(element, this.keyframes, this.options, this._clock, this._styles);
  }

  start(element): Player {
    var player = this.create(element);
    player.play();
    return player;
  }
}
