import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  imports: [CommonModule, MatProgressBarModule],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration = 120; // Durata del timer in secondi (2 minuti)
  progress = 100; // Valore iniziale della progress bar (100%)
  private timerSubscription!: Subscription;

  @Output() timeExpired = new EventEmitter<void>();

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    let remainingTime = this.duration;
    
    this.timerSubscription = interval(1000).pipe(
      map(() => --remainingTime),
      takeWhile(time => time >= 0)
    ).subscribe({
      next: (time) => {
        this.progress = (time / this.duration) * 100;
      },
      complete: () => {
  this.progress = 0;
  this.timeExpired.emit();
}
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}