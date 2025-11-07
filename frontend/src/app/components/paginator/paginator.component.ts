import { Component, EventEmitter, Input, Output, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements AfterViewInit, OnDestroy {
  @Input() total = 0;
  @Input() current = 0;
  @Input() categoryId = 0;
  @Input() answeredQuestions: number[] = [];
  @Output() change = new EventEmitter<number>();

  itemsPerPage = 1;
  pageLinkSize = 10;

  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private breakpointObserver: BreakpointObserver
  ) {
    // Osserva i breakpoint per aggiornare pageLinkSize
    this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.matches) {
          this.pageLinkSize = 5; // Mobile e tablet
        } else {
          this.pageLinkSize = 10; // Desktop
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateAnsweredClasses();
    }, 100);
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.updateAnsweredClasses();
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handlePageChange(event: any): void {
    this.change.emit(event.page);
    setTimeout(() => {
      this.updateAnsweredClasses();
    }, 100);
  }

  private updateAnsweredClasses(): void {
    const paginatorElement = this.elementRef.nativeElement.querySelector('.custom-paginator');
    if (!paginatorElement) return;

    const pageButtons = paginatorElement.querySelectorAll('.p-paginator-page');

    pageButtons.forEach((button: HTMLElement) => {
      button.classList.remove('answered');

      const pageNumber = parseInt(button.textContent?.trim() || '0', 10);

      const questionIndex = pageNumber - 1;

      if (this.answeredQuestions.includes(questionIndex)) {
        button.classList.add('answered');
      }
    });
  }
  
}