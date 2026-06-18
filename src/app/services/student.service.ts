import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'http://localhost:9090/students';
  private studentChange = new Subject<Student[]>();
  private messageChange = new Subject<string>();

  constructor(private http: HttpClient) { }

  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  findById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.url}/${id}`);
  }

  save(student: Student): Observable<Student> {
    return this.http.post<Student>(this.url, student);
  }

  update(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.url}/${id}`, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  setStudentChange(lista: Student[]) {
    this.studentChange.next(lista);
  }

  getStudentChange() {
    return this.studentChange.asObservable();
  }

  setMessageChange(mensaje: string) {
    this.messageChange.next(mensaje);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}