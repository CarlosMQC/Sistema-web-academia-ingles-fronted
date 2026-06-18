import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudentChange().subscribe(data => {
      this.students = data;
    });

    this.studentService.findAll().subscribe(data => {
      this.students = data;
    });
  }

  delete(idStudent?: number) {
    if (idStudent != null && confirm('¿Estás seguro de eliminar este estudiante?')) {
      this.studentService.delete(idStudent).subscribe(() => {
        this.studentService.findAll().subscribe(data => {
          this.studentService.setStudentChange(data);
          this.studentService.setMessageChange('Estudiante eliminado correctamente');
        });
      });
    }
  }
}