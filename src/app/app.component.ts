import { Component, OnInit } from '@angular/core';
import { TimerService } from "./timer-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  hasStarted: boolean = false;
  timer: number = 60;
  shots: number = 0;
  displayDrink: boolean = false;
  timerInterval;
  audio = new Audio('../assets/airhorn.mp3');
  
  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.timerService.timerStart.subscribe(
      (data) => {
        if(data) {
          this.startTimerInterval();
        }
      }
    );
    this.timerService.timerStop.subscribe(
      (data) => {
        if(data) {
          this.stopTimerInterval();
        }
      }
    );
    this.timerService.timerRestart.subscribe(
      (data) => {
        if(data) {
          this.restartTimer();
        }
      }
    );
  }

  startTimerInterval() {
    if(!this.hasStarted) {
      this.timerInterval = setInterval((() => {
        this.timer--;
        this.checkTimer();
      }), 1000);
    }
  }

  checkTimer() {
    this.hasStarted = true;
    if(this.timer === 1) {
      this.audio.play();
    }
    if(this.timer === 0) {
      this.addShot();
      this.showDrink();
      setTimeout(() => {
        this.timer = 60;
      }, 1000);
    }
  }

  stopTimerInterval() {
    this.hasStarted = false;
    clearInterval(this.timerInterval);
  }

  restartTimer() {
    this.shots = 0;
    this.timerService.shotCounter.emit(this.shots);
    this.timer = 60;
  }

  addShot() {
    this.shots++;
    this.timerService.shotCounter.emit(this.shots);
  }

  showDrink() {
    this.displayDrink = true;
    setTimeout(() => {
      this.displayDrink = false;
    }, 2000);
  }


}
