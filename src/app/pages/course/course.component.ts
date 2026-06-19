import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
  courses = signal<any[]>([]);
  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      idCourse: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [true, Validators.required]
    });
  }

  ngOnInit() {
    this.findAll();
  }

  async findAll() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:9090/courses', {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        this.courses.set(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async onSubmit() {
    if (this.courseForm.invalid) return;

    const data = this.courseForm.value;
    const url = data.idCourse ? `http://localhost:9090/courses/${data.idCourse}` : 'http://localhost:9090/courses';
    const method = data.idCourse ? 'PUT' : 'POST';
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        await this.findAll();
        this.courseForm.reset({ status: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  edit(course: any) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    this.courseForm.patchValue({
      idCourse: course.idCourse,
      name: course.name,
      description: course.description,
      status: course.status
    });
  }

  cancelEdit() {
    this.courseForm.reset({ status: true });
  }

  async delete(id: number) {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:9090/courses/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          await this.findAll();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}