import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  apiUrl = `${env.apiUrl}/Stories`;

  constructor(private http: HttpClient) { }
}
