import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../core/services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [ RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{

  constructor(private authservice: Auth, private router: Router) {}

  ngOnInit(): void {
    
  }

   logout() {
     this.authservice.logout();
     this.router.navigate(['/login']);
  }
}
