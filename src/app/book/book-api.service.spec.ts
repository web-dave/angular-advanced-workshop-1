import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { BookApiService } from './book-api.service';
import { BookNa } from './models';
describe('☁️ BookApi', () => {
  let httpMock: HttpTestingController;
  let bookApi: BookApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [BookApiService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    bookApi = TestBed.inject(BookApiService);
  });

  describe('When the API responds with books', () => {
    it('provides books', () => {
      const getAllSpy = subscribeSpyTo(bookApi.getAll());

      httpMock.expectOne('http://localhost:4730/books').flush([new BookNa()]);

      expect(getAllSpy.getValues()).toHaveSize(1);
    });
  });

  describe('When there is an Network error', () => {
    it('claims connectivity issues', async () => {
      const getAllSpy = subscribeSpyTo(bookApi.getAll(), { expectErrors: true });

      httpMock.expectOne('http://localhost:4730/books').error(new ErrorEvent('Network error.'));

      await getAllSpy.onError();

      expect(getAllSpy.getError().message).toBe('Sorry, we have connectivity issues.');
    });
  });

  describe('When the API responds with an error', () => {
    it('claims API issues', async () => {
      const getAllSpy = subscribeSpyTo(bookApi.getAll(), { expectErrors: true });

      httpMock
        .expectOne('http://localhost:4730/books')
        .flush('No books', { status: 500, statusText: 'The API hung up' });

      await getAllSpy.onError();

      expect(getAllSpy.getError().message).toBe('Sorry, we could not load any books');
    });
  });
});
