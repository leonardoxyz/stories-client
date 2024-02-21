import { TestBed } from '@angular/core/testing';

import { VoteService } from './vote.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { v4 as uuidv4 } from 'uuid';
import { Vote } from '../Model/Vote';

describe('VoteService', () => {
  let httpMock: HttpTestingController;
  let voteService: VoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoteService],
      imports: [
        HttpClientTestingModule,
      ],
    });

     httpMock = TestBed.inject(HttpTestingController);
     voteService = TestBed.inject(VoteService);
  });

  it('should post vote via POST', () => {
    const mockData: Vote = {
      id: uuidv4(),
      StoryId: uuidv4(),
      isLiked: true,
      userId: 'user123',
      UserName: 'John Doe'
    };

    voteService.addVote(mockData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(`${voteService.apiUrl}`);
    expect(request.request.method).toBe('POST');

    request.flush(true); //pode retornar tanto true ou até mesmo a resposta do mockData
    httpMock.verify();
  });
});
