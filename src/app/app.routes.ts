import { Routes } from '@angular/router';
import { CourseComponent } from './pages/course/course.component';
import { StudentComponent } from './pages/student/student.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'students', component: StudentComponent },
  { path: 'students/new', component: StudentEditComponent },
  { path: 'students/edit/:id', component: StudentEditComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];