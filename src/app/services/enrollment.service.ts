import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Enrollment } from '../model/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private url = 'http://localhost:9090/enrollments';
  private enrollmentChange = new Subject<Enrollment[]>();
  private messageChange = new Subject<string>();

  constructor(private http: HttpClient) { }

  findAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.url);
  }

  findById(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.url}/${id}`);
  }

  save(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.url, enrollment);
  }

  update(id: number, enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.url}/${id}`, enrollment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  setEnrollmentChange(lista: Enrollment[]) {
    this.enrollmentChange.next(lista);
  }

  getEnrollmentChange() {
    return this.enrollmentChange.asObservable();
  }

  setMessageChange(mensaje: string) {
    this.messageChange.next(mensaje);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}