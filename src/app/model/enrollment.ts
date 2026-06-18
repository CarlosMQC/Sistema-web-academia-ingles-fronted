import { Student } from './student';
import { Course } from './course';

export interface Enrollment {
    idEnrollment?: number;
    student: Student;
    course: Course;
    status: boolean;
}