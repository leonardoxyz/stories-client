import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../env/env';
import { Department } from '../Model/Department';

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