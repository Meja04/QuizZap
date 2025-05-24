import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router} from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      const match = url.match(/^\/leaderboard\/.+/);
      
    });
  }
}