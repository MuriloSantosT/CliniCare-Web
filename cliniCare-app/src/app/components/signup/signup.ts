import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const senha = control.get('senha')?.value;
  const confirmaSenha = control.get('confirmaSenha')?.value;
  return senha === confirmaSenha ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signupForm: FormGroup;
  showPassword = false;
  showConfirm = false;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.signupForm = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmaSenha: ['', Validators.required]
      },
      { validators: passwordsMatch }
    );
  }

  get mismatch(): boolean {
    return (
      this.signupForm.hasError('passwordMismatch') &&
      !!this.signupForm.get('confirmaSenha')?.touched
    );
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    const { nome, email, senha } = this.signupForm.value;
    this.authService.register({ nome, email, senha }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error || 'Erro ao criar conta. Tente novamente.';
      }
    });
  }
}
