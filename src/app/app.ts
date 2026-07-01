import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html', 
  styleUrls: ['./app.css']  
})
export class AppComponent {
  title = 'academiaingles.fronted';

  constructor(public router: Router) {}

  isLoggedIn(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/';
  }

  isUserRole(role: string): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles && payload.roles.includes(role);
    } catch (e) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}