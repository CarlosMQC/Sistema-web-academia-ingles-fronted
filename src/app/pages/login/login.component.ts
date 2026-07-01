import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    try {
      const response = await fetch('http://localhost:9090/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.loginForm.value)
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem('token', token); 

        const payload = this.decodificarToken(token);

        if (payload && payload.roles) {
          if (payload.roles.includes('ADMIN') || payload.roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/courses']); 
          } else if (payload.roles.includes('STUDENT') || payload.roles.includes('ROLE_STUDENT')) {
            this.router.navigate(['/mis-cursos']); 
          } else {
            this.router.navigate(['/']); 
          }
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.errorMessage = 'Credenciales incorrectas';
      }
    } catch (error) {
      this.errorMessage = 'Error al conectar con el servidor';
    }
  }

  private decodificarToken(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1];
      return JSON.parse(atob(payloadBase64)); 
    } catch (error) {
      return null;
    }
  }
}