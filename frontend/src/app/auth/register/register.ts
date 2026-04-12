import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  name            = '';
  email           = '';
  password        = '';
  confirmPassword = '';
  showPassword    = false;
  loading         = false;
  error           = '';
  success         = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  async register() {
    this.error   = '';
    this.success = '';

    // Validations front
    if (!this.name.trim()) {
      this.error = 'Full name is required.'; return;
    }
    if (!this.email.includes('@')) {
      this.error = 'Enter a valid email.'; return;
    }
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.'; return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.'; return;
    }

    try {
      this.loading = true;
      await this.auth.register(this.name, this.email, this.password);
      this.success = 'Account created! Redirecting...';
      setTimeout(() => this.router.navigate(['/projects']), 1500);
    } catch (err: any) {
      this.error = err.response?.data?.error || 'Registration failed.';
    } finally {
      this.loading = false;
    }
  }
}