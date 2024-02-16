import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { v4 as uuidv4 } from 'uuid';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [
        HttpClientTestingModule,
      ],
    });
  });

  it("sohuld retrieve data from the API via GET", inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      const mockData = [
        {
          id: uuidv4(),
          name: 'leo tester'
        },
        {
          id: uuidv4(),
          name: 'rodrigo tester'
        }
      ]

      userService.get().subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const request = httpMock.expectOne(`${userService.apiUrl}`);
      expect(request.request.method).toBe('GET');

      request.flush(mockData);
      httpMock.verify();
    }
  ));
});
