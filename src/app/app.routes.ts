import { Routes } from '@angular/router';
import { StudentComponent } from './pages/student/student.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';
import { CourseComponent } from './pages/course/course.component';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { EnrollmentEditComponent } from './pages/enrollment/enrollment-edit/enrollment-edit.component';

export const routes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: 'students/new', component: StudentEditComponent },
  { path: 'students/edit/:id', component: StudentEditComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'enrollments', component: EnrollmentComponent },
  { path: 'enrollments/new', component: EnrollmentEditComponent },
  { path: 'enrollments/edit/:id', component: EnrollmentEditComponent }
];