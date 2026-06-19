import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  async loadStudents() {
    await (this.studentService as any).findAll();
    const data = (this.studentService as any).dataSignal();
    
    this.students = typeof data === 'function' ? data() : data;
    
    this.cdr.detectChanges();
  }

  async delete(id: number) {
    if (confirm('¿Está seguro de eliminar este estudiante?')) {
      await (this.studentService as any).delete(id);
      this.loadStudents();
    }
  }
}