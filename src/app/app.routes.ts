import { Routes } from '@angular/router';
import { CourseComponent } from './pages/course/course.component';
import { StudentComponent } from './pages/student/student.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { MisCursosComponent } from './pages/mis-cursos/mis-cursos.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  { 
    path: 'courses', 
    component: CourseComponent, 
    canActivate: [authGuard], 
    data: { expectedRole: 'ADMIN' } 
  },
  { 
    path: 'students', 
    component: StudentComponent, 
    canActivate: [authGuard], 
    data: { expectedRole: 'ADMIN' } 
  },
  { 
    path: 'students/new', 
    component: StudentEditComponent, 
    canActivate: [authGuard], 
    data: { expectedRole: 'ADMIN' } 
  },
  { 
    path: 'students/edit/:id', 
    component: StudentEditComponent, 
    canActivate: [authGuard], 
    data: { expectedRole: 'ADMIN' } 
  },
  { 
    path: 'mis-cursos', 
    component: MisCursosComponent, 
    canActivate: [authGuard], 
    data: { expectedRole: 'STUDENT' } 
  },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];