import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent {

}