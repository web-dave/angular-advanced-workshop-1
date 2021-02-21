import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';
import { BookApiService } from '../book-api.service';
import { BookNa } from '../models';
import { BookListComponent } from './book-list.component';
describe('<ws-book-list>', () => {
  let fixture: ComponentFixture<BookListComponent>;
  let bookApiMock: BookApiService;

  beforeEach(() => {
    bookApiMock = mock(BookApiService);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookApiService,
          useFactory: () => {
            return instance(bookApiMock);
          }
        }
      ],
      declarations: [BookListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  describe('When books provided', () => {
    it('renders a list of books', () => {
      when(bookApiMock.getAll()).thenReturn(of([new BookNa()]));

      fixture = TestBed.createComponent(BookListComponent);
      fixture.detectChanges();

      const bookCardFixtures = fixture.debugElement.queryAll(By.css('[data-test=book-list-card-item]'));

      expect(bookCardFixtures).toHaveSize(1);
    });
  });
});
