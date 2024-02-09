import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../env/env';
import { Story } from '../Model/Story';
import { Vote } from '../Model/Vote';

@Injectable({
    providedIn: 'root'
})
export class StoryService {
    apiUrl = `${env.apiUrl}/Stories`;

    constructor(private http: HttpClient) { }

    get(): Observable<Story[]> {
        return this.http.get<Story[]>(this.apiUrl);
    }

    addVote(vote: Vote): Observable<boolean> {
        return this.http.post<boolean>(`${this.apiUrl}/AddVote`, vote);
    }
}
