import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { Score } from '../interfaces/score.interface';
import { Category } from '../interfaces/category.interface';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
  imports: [CommonModule, FormsModule],
})
export class LeaderboardComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory = '';
  scores: Score[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getCategories().subscribe((data) => {
      this.categories = data;
      if (data.length > 0) {
        this.selectedCategory = data[0].name;
        this.loadScores();
      }
    });
  }

  onCategoryChange(): void {
    this.loadScores();
  }

  loadScores(): void {
    this.quizService.getScoresByCategory(this.selectedCategory).subscribe((data) => {
      this.scores = data.sort((a, b) => b.score - a.score);
    });
  }



}
