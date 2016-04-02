import {AnimationClock} from '../clock';

export class MockAnimationClock extends AnimationClock {
  _queue = [];
  public startingTime: number;
  public incrementedTime: number = 0;

  constructor() {
    super();
    this.startingTime = this.now();
  }

  next(fn) {
    this._queue.push(fn);
  }

  fastForward(time: number) {
    this.incrementedTime += time;
  }

  get currentTime() {
    return this.startingTime + this.incrementedTime;
  }

  _flush(): boolean {
    if (this._queue.length == 0) return false;

    var oldQueue = this._queue;
    this._queue = [];

    oldQueue.forEach(entry => entry());
    return true;
  }
}
