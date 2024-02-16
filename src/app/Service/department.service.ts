import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../Model/Department';
import { env } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  apiUrl = `${env.apiUrl}/Departments`;

  constructor(private http: HttpClient) { }

  get(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }
}
