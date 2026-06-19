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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}