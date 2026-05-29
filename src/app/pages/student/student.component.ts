import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  private studentService = inject(StudentService);

  students: Signal<Student[]> = this.studentService.dataSignal;

  currentStudentId: number | null = null;

  studentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    documentNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')])
  });

  ngOnInit() {
    this.studentService.findAll();
  }

  async onSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value as Student;
      
      if (this.currentStudentId) {
        await this.studentService.update(this.currentStudentId, studentData);
      } else {
        await this.studentService.save(studentData);
      }
      
      this.cancelEdit();
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  editStudent(student: Student) {
    this.currentStudentId = student.idStudent;
    this.studentForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      documentNumber: student.documentNumber
    });
  }

  async deleteStudent(id: number) {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      await this.studentService.delete(id);
    }
  }

  cancelEdit() {
    this.studentForm.reset();
    this.currentStudentId = null;
  }
}