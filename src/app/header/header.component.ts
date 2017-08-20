import { Component, OnInit } from '@angular/core';
import { TimerService } from "../timer-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  shots: number = 0;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.timerService.shotCounter.subscribe(
      (data) => {
        this.shots = data;
      }
    );
  }

  onStart() {
    this.timerService.timerStart.emit(true);
  }

  onStop()
 {
   this.timerService.timerStop.emit(true);
 }
  onRestart() {
    this.timerService.timerRestart.emit(true);
  }

}
