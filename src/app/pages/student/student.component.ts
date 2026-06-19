import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
  students = signal<any[]>([]);

  constructor(private studentService: StudentService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const data = await this.studentService.findAll();
    this.students.set(data);
  }

  async delete(id: number) {
    if (confirm('¿Seguro que deseas eliminar este estudiante?')) {
      await this.studentService.delete(id);
      await this.loadData();
    }
  }
}