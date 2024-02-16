import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { v4 as uuidv4 } from 'uuid';

import { DepartmentService } from './department.service';

describe('DepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService]
    });
  });

  it("should retrieve data from the API via GET", inject(
    [HttpTestingController, DepartmentService],
    (httpMock: HttpTestingController, departmentService: DepartmentService) => {
      const mockData = [
        {
          id: uuidv4(),
          name: 'Department one'
        },
        {
          id: uuidv4(),
          name: 'Department two'
        },
        {
          id: uuidv4(),
          name: 'Department three'
        }
      ]

      departmentService.get().subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const request = httpMock.expectOne(`${departmentService.apiUrl}`);
      expect(request.request.method).toBe('GET');

      request.flush(mockData);
      httpMock.verify();
    }
  ));
});
