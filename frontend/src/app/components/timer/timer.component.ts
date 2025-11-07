import { Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  imports: [CommonModule, ProgressBarModule, DatePipe]
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration!: number;
  @Input() categoryId!: number;
  @Output() timeExpired = new EventEmitter<void>();
  @Output() timeUpdate = new EventEmitter<number>();
  @Output() showmodal = new EventEmitter<boolean>();

  progress = 100;
  currentTime: number = 0;
  private intervalId: any;
  private isRunning = false;
  showModal = true;

  ngOnInit(): void {
    this.startTimer();
  }

  private startTimer(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.currentTime = this.duration;

    this.intervalId = setInterval(() => {
      this.currentTime--;
      this.progress = (this.currentTime / this.duration) * 100;

      this.timeUpdate.emit(this.currentTime);

      if (this.currentTime <= 0) {
        this.stopTimer();
        this.timeExpired.emit();
        this.showmodal.emit(true);
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
    }
  }

  resetTimer(): void {
    this.progress = 100;
    this.currentTime = this.duration;
    this.startTimer();
  }

  getRemainingTime(): number {
    return this.currentTime;
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}