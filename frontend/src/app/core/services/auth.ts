import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import axios from 'axios';
import { ApiService } from './apiglobal';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  baseURL = 'http://localhost:3000';

  constructor(private api: ApiService, private router:Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  async login(email: string, password: string) {
    const res = await this.api.post('/auth/login', { email, password });

    localStorage.setItem('token', res.data.token);
    return res.data;
  }

  async register(name:string ,email: string, password: string) {
    return this.api.post('/auth/register', {name,  email, password });
  }

  getUser(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
  
  // Dans ton composant sidebar ou navbar
logout() {
  localStorage.removeItem('token');
  
}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  
}
