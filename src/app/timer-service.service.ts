import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TimerService {

  timerStart = new EventEmitter<boolean>();
  timerStop = new EventEmitter<boolean>();
  timerRestart = new EventEmitter<boolean>();

  shotCounter = new EventEmitter<number>();

  constructor() { }

}
