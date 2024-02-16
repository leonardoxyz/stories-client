
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../env/env';
import { Vote } from '../Model/Vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  apiUrl = `${env.apiUrl}/Stories/AddVote`;

  addVote(vote: Vote): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}`, vote);
  }
}
