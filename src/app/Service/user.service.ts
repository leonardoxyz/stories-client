import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { env } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = `${env.apiUrl}/Users`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
