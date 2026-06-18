import { Component, OnInit } from '@angular/core';
import { Enrollment } from '../../model/enrollment';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  enrollments: Enrollment[] = [];

  constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    this.enrollmentService.getEnrollmentChange().subscribe(data => {
      this.enrollments = data;
    });

    this.enrollmentService.findAll().subscribe(data => {
      this.enrollments = data;
    });
  }

  delete(idEnrollment?: number) {
    if (idEnrollment != null && confirm('¿Estás seguro de eliminar esta matrícula?')) {
      this.enrollmentService.delete(idEnrollment).subscribe(() => {
        this.enrollmentService.findAll().subscribe(data => {
          this.enrollmentService.setEnrollmentChange(data);
          this.enrollmentService.setMessageChange('Matrícula eliminada correctamente');
        });
      });
    }
  }
}