import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookApiService } from './book-api.service';
import { firstValueFrom } from 'rxjs';
import { bookNa } from './models';

const mockbooks = [
  {
    ...bookNa(),
    title: 'Das Buch 1'
  },
  {
    ...bookNa(),
    title: 'Das Buch 2'
  },
  {
    ...bookNa(),
    title: 'Das Buch 3'
  }
];
describe('BookApiService', () => {
  let backend: HttpTestingController;
  let service: BookApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookApiService]
    });
    service = TestBed.inject(BookApiService);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  it('getAll', done => {
    service.getAll().subscribe(data => {
      expect(data).toBe(mockbooks);
      done();
    });
    backend.expectOne('http://localhost:4730/books').flush(mockbooks);
  });

  describe('Errorhandling', () => {
    it('offline', async () => {
      const callAllBooks = firstValueFrom(service.getAll());
      backend.expectOne('http://localhost:4730/books').error(new ProgressEvent('Network error.'));
      await expectAsync(callAllBooks).toBeRejectedWithError('Sorry, we have connectivity issues');
    });
    it('500 error', async () => {
      const callAllBooks = firstValueFrom(service.getAll());
      backend.expectOne('http://localhost:4730/books').flush('no books', { status: 500, statusText: 'Api crashed' });
      await expectAsync(callAllBooks).toBeRejectedWithError('Sorry, we could not load any books');
    });
  });
});
