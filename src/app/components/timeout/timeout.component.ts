import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.css'],
  imports: [MatButtonModule, MatDialogModule],
})
export class TimeoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<TimeoutDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
