import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        // Verifica silenziosa in background
        this.authService.verifyEmail(token).subscribe({
          next: () => {
            // Pulisci URL, continua normalmente
            this.router.navigate(['/login'], {
              queryParams: { token: null },
              queryParamsHandling: 'merge',
              replaceUrl: true,
            });
          },
          error: () => {
            // Token errore, pulisci URL, continua normalmente
            this.router.navigate(['/login'], {
              queryParams: { token: null },
              queryParamsHandling: 'merge',
              replaceUrl: true,
            });
          },
        });
      }
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.error = '';
    const { username, password } = this.loginForm.value as {
      username: string;
      password: string;
    };

    this.authService.login(username, password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => (this.error = 'Credenziali non valide'),
    });
  }
}
