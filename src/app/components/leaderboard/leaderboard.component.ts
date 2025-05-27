import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { Score } from '../../interfaces/score.interface';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
  imports: [CommonModule, FormsModule],
})
export class LeaderboardComponent implements OnInit {

  scores: Score[] = [];
  categories: Category[] = [];
  currentCategoryId!: number;
  selectedCategory: string = '';

  constructor(
    private quizService: QuizService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quizService.getCategories().subscribe((data) => {
      this.categories = data;
      
      this.route.paramMap.subscribe(params => {
        const categoryName = params.get('category');
        if (categoryName) {
          this.selectedCategory = categoryName;
          const foundCategory = data.find(c => c.name === categoryName);
          if (foundCategory) {
            this.currentCategoryId = foundCategory.id;
          }
          this.loadScores(); // Fixed: added parentheses to call the method
        }
      });
    });
  }

  loadScores(): void {
    this.quizService.getScoresByCategory(this.selectedCategory).subscribe((data) => {
      this.scores = data.sort((a, b) => b.score - a.score);
    });
  }

  onCategoryChange(): void {
    // Navigate to the new leaderboard URL with the selected category
    this.router.navigate(['/leaderboard', this.selectedCategory]);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
