import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { CategoryComponent } from '../category/category.component';
import { Category } from '../../interfaces/category.interface';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, CategoryComponent, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatGridListModule,],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  playerName: string | null = null;
  inputName: string = '';

  constructor(private router: Router, private quizService: QuizService) { 
    this.playerName = localStorage.getItem('playerName');
  }

  ngOnInit(): void {
    // Controllo se esiste già un nome utente nel localStorage
    

    // Prendo le categorie dal servizio
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