import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.error = '';
    const { username, email, password } = this.registerForm.value;

    this.authService.register(username, email, password).subscribe({
      next: (response) => {
        this.error = 'Registrazione OK! Controlla la tua email per confermare.';
      },
      error: (err) => (this.error = err.error || 'Errore nella registrazione'),
    });
  }
}
