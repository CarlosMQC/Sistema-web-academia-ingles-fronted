import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StudentService } from '../../../services/student.service';
import { Student } from '../../../model/student';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
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

  async initForm() {
    if (this.isEdit) {
      const data = await this.studentService.findById(this.id);
      
      if (data) {
        this.form.patchValue({
          idStudent: data.idStudent,
          firstName: data.firstName,
          lastName: data.lastName,
          dni: data.dni,
          email: data.email,
          status: data.status
        });
      }
    }
  }

  async operate() {
    if (this.form.invalid) {
      return;
    }

    const student: Student = {
      idStudent: this.form.value['idStudent'],
      firstName: this.form.value['firstName'],
      lastName: this.form.value['lastName'],
      dni: this.form.value['dni'],
      email: this.form.value['email'],
      status: this.form.value['status']
    };

    if (this.isEdit) {
      await this.studentService.update(this.id, student);
    } else {
      await this.studentService.save(student);
    }

    this.router.navigate(['/students']);
  }
}