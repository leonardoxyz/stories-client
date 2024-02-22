import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../Model/Story';
import { Vote } from '../Model/Vote';
import { env } from '../env/env';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  apiUrl = `${env.apiUrl}/Stories`;
  private storiesSubject = new BehaviorSubject<Story[]>([]);
  stories$ = this.storiesSubject.asObservable();

  constructor(private http: HttpClient) { }

  get() {
     this.http.get<Story[]>(this.apiUrl).subscribe(stories => this.storiesSubject.next(stories));
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  put(story: Story): Observable<Story> {
    return this.http.put<Story>(`${this.apiUrl}/${story.id}`, story);
  }

  add(story: Story): Observable<Story> {
    return this.http.post<Story>(`${env.apiUrl}/Stories`, story);
  }
}

