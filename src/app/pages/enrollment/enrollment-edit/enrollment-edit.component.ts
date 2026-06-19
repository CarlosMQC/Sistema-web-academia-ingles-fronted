import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { Enrollment } from '../../../model/enrollment';
import { Student } from '../../../model/student';
import { Course } from '../../../model/course';

@Component({
  selector: 'app-enrollment-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './enrollment-edit.component.html',
  styleUrls: ['./enrollment-edit.component.css']
})
export class EnrollmentEditComponent implements OnInit {

  form: FormGroup;
  id: number = 0;
  isEdit: boolean = false;

  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService
  ) {
    this.form = new FormGroup({
      idEnrollment: new FormControl(0),
      studentId: new FormControl('', [Validators.required]),
      courseId: new FormControl('', [Validators.required]),
      status: new FormControl(true, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadInitialData();

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  async loadInitialData() {
    await (this.courseService as any).findAll();
    this.courses = (this.courseService as any).dataSignal();

    await (this.studentService as any).findAll();
    this.students = (this.studentService as any).dataSignal();
  }

  async initForm() {
    if (this.isEdit) {
      const data = await (this.enrollmentService as any).findById(this.id);
      
      if (data) {
        this.form.patchValue({
          idEnrollment: data.idEnrollment,
          studentId: data.student.idStudent,
          courseId: data.course.idCourse,
          status: data.status
        });
      }
    }
  }

  async operate() {
    if (this.form.invalid) {
      return;
    }

    const enrollment: Enrollment = {
      idEnrollment: this.form.value['idEnrollment'],
      student: { idStudent: this.form.value['studentId'] } as Student,
      course: { idCourse: this.form.value['courseId'] } as Course,
      status: this.form.value['status']
    };

    if (this.isEdit) {
      await (this.enrollmentService as any).update(this.id, enrollment);
    } else {
      await (this.enrollmentService as any).save(enrollment);
    }

    this.router.navigate(['/enrollments']);
  }
}