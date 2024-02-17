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

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  put(story: Story): Observable<Story> {
    return this.http.put<Story>(`${this.apiUrl}/${story.id}`, story);
  }
}

