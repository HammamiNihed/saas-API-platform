import { Component, OnInit } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  email = '';
  password = '';
  error = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  async login() {
    try {
      await this.auth.login(this.email, this.password);

      // ✅ redirect après login
      this.router.navigate(['/projects']);

    } catch (err: any) {
      this.error = err.response?.data?.error || 'Login failed';
    }
  }
}
