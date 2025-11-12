import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from '../category/category.component';
import { Category } from '../../interfaces/category.interface';
import { QuizService } from '../../services/quiz.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, CategoryComponent],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  username: string | null = null;

  constructor(
    private quizService: QuizService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Recupera username dal token
    this.username = this.authService.getUsername();

    // Carica le categorie
    this.quizService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Errore caricamento categorie:', err);
      },
    });
  }
}
