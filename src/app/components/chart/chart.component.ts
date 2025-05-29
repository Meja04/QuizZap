import { Component, OnInit, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ScoreService } from '../../services/score.service';
import { QuizService } from '../../services/quiz.service';
import { Category } from '../../interfaces/category.interface';
import { Score } from '../../interfaces/score.interface';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Score distribution by range and category'
      },
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Score ranges'
        }
      },
      y: {
        beginAtZero: true,
        stacked: false,
        title: {
          display: true,
          text: 'Number of players'
        },
        ticks: {
          stepSize: 1,
        }
      }
    }
  };

  scores: Score[] = [];
  categories: Category[] = [];

  constructor(private scoreService: ScoreService, private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadAllScores();
  }

  loadAllScores(): void {
    this.scoreService.getAllScores().subscribe((data: Score[]) => {
      this.scores = data;
      this.generateHistogramData();
    });
  }

  generateScoreRanges(min: number, max: number, step: number): string[] {
    const ranges: string[] = [];
    for (let i = min; i < max; i += step) {
      ranges.push(`${i}-${i + step}`);
    }
    return ranges;
  }

  getCSSColors(): { backgroundColor: string[], borderColors: string[] } {
    const backgroundColors: string[] = [];
    const borderColors: string[] = [];

    for (let i = 0; i < 6; i++) {
      const bgColor = getComputedStyle(document.documentElement)
        .getPropertyValue(`--category-color-${i}-light`)
        .trim();

      const borderColor = getComputedStyle(document.documentElement)
        .getPropertyValue(`--category-color-${i}`)
        .trim();

      if (bgColor) {
        backgroundColors.push(bgColor);
      }

      if (borderColor) {
        borderColors.push(borderColor);
      }
    }

    return { backgroundColor: backgroundColors, borderColors };
  }

  generateHistogramData(): void {
    const min = 0;
    const max = 1000;
    const step = 100;
    const scoreRanges = this.generateScoreRanges(min, max, step);

    this.quizService.getCategories().subscribe((data: Category[]) => {
      // Inizializza per ogni categoria un array di slot
      const dataPerCategory: Record<string, number[]> = {};
      data.forEach(cat => {
        dataPerCategory[cat.name] = new Array((max - min) / step).fill(0);
      });

      // Classifica i punteggi nei rispettivi slot
      this.scores.forEach(score => {
        const rangeIndex = Math.floor(score.score / step);
        const index = Math.min(rangeIndex, (max - min) / step - 1);
        if (dataPerCategory[score.category]) {
          dataPerCategory[score.category][index]++;
        }
      });

      const { backgroundColor, borderColors } = this.getCSSColors();

      const datasets = data.map((cat, i) => ({
        label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
        data: dataPerCategory[cat.name],
        backgroundColor: backgroundColor[i % backgroundColor.length],
        borderColor: borderColors[i % borderColors.length],
        borderWidth: 2,
        maxBarThickness: 60
      }));

      this.barChartData = {
        labels: scoreRanges,
        datasets
      };
    });
  }
  
}