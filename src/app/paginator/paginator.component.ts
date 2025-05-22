import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  imports: [CommonModule, MatPaginatorModule],
})
export class PaginatorComponent {
  @Input() total = 0;
  @Input() current = 0;
  @Output() change = new EventEmitter<number>();
}
