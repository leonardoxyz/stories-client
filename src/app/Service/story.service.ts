import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../Model/Story';
import { Vote } from '../Model/Vote';
import { env } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  apiUrl = `${env.apiUrl}/Stories`;

  constructor(private http: HttpClient) { }

  get(): Observable<Story[]> {
    return this.http.get<Story[]>(this.apiUrl);
  }

  post(story: Story): Observable<Story> {
    return this.http.post<Story>(this.apiUrl, story);
  }

  addVote(vote: Vote): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/AddVote`, vote);
  }
}