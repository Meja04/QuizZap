import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [CommonModule, MatCardModule, MatIconModule],
})
export class CategoryComponent {
  @Input() category!: Category;


  constructor(private router: Router) { }

  onSelect(): void {
    this.router.navigate(['/quiz', this.category.name], {
});
  }


}