import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { GenericService } from './generic.service';

@Injectable({ providedIn: 'root' })
export class CourseService extends GenericService<Course> {
  constructor() {
    super('http://localhost:9090/courses');
  }
}