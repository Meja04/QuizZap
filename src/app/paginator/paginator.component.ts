import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() total = 0;
  @Input() current = 0;
  @Output() change = new EventEmitter<number>();
  
  itemsPerPage = 1;

  handlePageChange(event: any): void {
    this.change.emit(event.page);
  }
}