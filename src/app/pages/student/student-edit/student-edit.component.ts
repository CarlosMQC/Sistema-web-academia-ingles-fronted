import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../model/student';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  form: FormGroup;
  id: number = 0;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {
    this.form = new FormGroup({
      idStudent: new FormControl(0),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      status: new FormControl(true, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.isEdit) {
      this.studentService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          idStudent: new FormControl(data.idStudent),
          firstName: new FormControl(data.firstName, [Validators.required, Validators.maxLength(50)]),
          lastName: new FormControl(data.lastName, [Validators.required, Validators.maxLength(50)]),
          dni: new FormControl(data.dni, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
          status: new FormControl(data.status, [Validators.required])
        });
      });
    }
  }

  operate() {
    if (this.form.invalid) {
      return;
    }

    const student: Student = {
      idStudent: this.form.value['idStudent'],
      firstName: this.form.value['firstName'],
      lastName: this.form.value['lastName'],
      dni: this.form.value['dni'],
      status: this.form.value['status']
    };

    if (this.isEdit) {
      this.studentService.update(this.id, student).subscribe(() => {
        this.studentService.findAll().subscribe(data => {
          this.studentService.setStudentChange(data);
          this.studentService.setMessageChange('Estudiante actualizado');
        });
      });
    } else {
      this.studentService.save(student).subscribe(() => {
        this.studentService.findAll().subscribe(data => {
          this.studentService.setStudentChange(data);
          this.studentService.setMessageChange('Estudiante registrado');
        });
      });
    }

    this.router.navigate(['/students']);
  }
}