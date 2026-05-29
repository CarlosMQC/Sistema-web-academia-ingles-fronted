import { Routes } from '@angular/router';
import { StudentComponent } from './pages/student/student.component';
import { CourseComponent } from './pages/course/course.component';

export const routes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: 'courses', component: CourseComponent }
];