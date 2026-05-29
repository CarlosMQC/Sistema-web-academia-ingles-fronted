import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../model/category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // private url = 'http://localhost:9090/categories';

  private url = `${environment.HOST}/categories`; // ES6

  //constructor(private readonly http: HttpClient) {}
  private readonly http = inject(HttpClient);

  // GET, POST, PUT, DELETE methods for categories will be implemented here
  findAll(){
    return this.http.get<Category[]>(this.url);
  }
}
