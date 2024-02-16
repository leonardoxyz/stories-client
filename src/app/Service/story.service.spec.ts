import { TestBed, inject } from '@angular/core/testing';

import { StoryService } from './story.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { v4 as uuidv4 } from 'uuid';

describe('StoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryService],
      imports: [HttpClientTestingModule]
    });
  });
  
  it('should retrieve data from the API via GET', inject(
    [HttpTestingController, StoryService],
    (httpMock: HttpTestingController, storyService: StoryService) => {
      const mockData = [
        {
          id: uuidv4(),
          title: 'story test',
          description: 'description story test',
          likes: 0,
          dislikes: 0,
          departmentId: uuidv4()
        }
      ];

      storyService.get().subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const request = httpMock.expectOne(`${storyService.apiUrl}`);
      expect(request.request.method).toBe('GET');

      request.flush(mockData);
      httpMock.verify();
    }
  ));

  it('should delete data from API via DELETE', inject(
    [HttpTestingController, StoryService],
    (httpMock: HttpTestingController, storyService: StoryService) => {
      const mockId = uuidv4();

      storyService.delete(mockId).subscribe(data => {
        expect(data).toBeTruthy();
      });

      const request = httpMock.expectOne(`${storyService.apiUrl}/${mockId}`);
      expect(request.request.method).toBe('DELETE');

      request.flush(true);
      httpMock.verify();
    }
  ));
});
