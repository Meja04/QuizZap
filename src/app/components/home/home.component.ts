import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from '../category/category.component';
import { Category } from '../../interfaces/category.interface';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, CategoryComponent],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  playerName: string | null = null;
  inputName: string = '';

  constructor(private quizService: QuizService) { 
    this.playerName = localStorage.getItem('playerName');
  }

  ngOnInit(): void {
        this.quizService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  saveName(): void {
    if (this.inputName.trim()) {
      this.playerName = this.inputName.trim();
      localStorage.setItem('playerName', this.playerName);
    }
  }

}