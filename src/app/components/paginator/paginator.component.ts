import { Component, EventEmitter, Input, Output, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements AfterViewInit {
  @Input() total = 0;
  @Input() current = 0;
  @Input() categoryId = 0;
  @Input() answeredQuestions: number[] = []; // Array degli indici delle domande risposte
  @Output() change = new EventEmitter<number>();
  
  itemsPerPage = 1;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Aggiorna le classi dopo che la vista è stata inizializzata
    setTimeout(() => {
      this.updateAnsweredClasses();
    }, 100);
  }

  ngOnChanges(): void {
    // Aggiorna le classi quando cambiano gli input
    setTimeout(() => {
      this.updateAnsweredClasses();
    }, 100);
  }

  handlePageChange(event: any): void {
    this.change.emit(event.page);
    // Aggiorna le classi dopo il cambio pagina
    setTimeout(() => {
      this.updateAnsweredClasses();
    }, 100);
  }

  private updateAnsweredClasses(): void {
    const paginatorElement = this.elementRef.nativeElement.querySelector('.custom-paginator');
    if (!paginatorElement) return;

    const pageButtons = paginatorElement.querySelectorAll('.p-paginator-page');
    
    pageButtons.forEach((button: HTMLElement, index: number) => {
      // Rimuovi la classe answered se presente
      button.classList.remove('answered');
      
      // Aggiungi la classe answered se la domanda è stata risposta
      if (this.answeredQuestions.includes(index)) {
        button.classList.add('answered');
      }
    });
  }
}