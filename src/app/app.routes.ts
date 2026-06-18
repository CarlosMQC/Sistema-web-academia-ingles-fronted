import { Routes } from '@angular/router';
import { StudentComponent } from './pages/student/student.component';
import { CourseComponent } from './pages/course/course.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';

export const routes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: 'students/new', component: StudentEditComponent },
  { path: 'students/edit/:id', component: StudentEditComponent },
  { path: 'courses', component: CourseComponent }
];