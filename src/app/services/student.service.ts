import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:9090/students';

  async findAll() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(this.apiUrl, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      
      if (!response.ok) {
        console.error('Error del servidor:', response.status, response.statusText);
        return []; 
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error de conexión:', error);
      return [];
    }
  }

  async findById(id: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.apiUrl}/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) return null;
    return await response.json();
  }

  async save(student: any) {
    const token = localStorage.getItem('token');
    await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(student)
    });
  }

  async update(id: number, student: any) {
    const token = localStorage.getItem('token');
    await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(student)
    });
  }

  async delete(id: number) {
    const token = localStorage.getItem('token');
    await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}