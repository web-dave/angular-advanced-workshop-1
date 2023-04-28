import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookApiService } from './book-api.service';
import { bookNa } from './models';

describe('BookApiService', () => {
  let backend: HttpTestingController;
  let service: BookApiService;
  const mockList = [bookNa()];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookApiService]
    });

    backend = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookApiService);
  });

  afterEach(() => backend.verify());

  describe('getAll', () => {
    // Assert getAll() provides a list of Books if everything works
    it('should provide a list of Books if everything works', done => {
      service.getAll().subscribe(data => {
        expect(data).toBe(mockList);
        done();
      });

      backend.expectOne('http://localhost:4730/books').flush(mockList);
    });
    // Assert getAll() provides the error Sorry, we have connectivity issues if the Network-Connection is lost
    // Assert getAll() provides the error Sorry, we could not load any books if the API responds with error code 500.
  });
});
