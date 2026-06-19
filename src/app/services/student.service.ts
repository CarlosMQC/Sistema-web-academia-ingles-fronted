import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends GenericService<Student> {

  constructor() {
    super('http://localhost:9090/students');
  }

}