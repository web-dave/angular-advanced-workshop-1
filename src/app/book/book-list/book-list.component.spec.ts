import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { bookCollection } from '@store/book';
import { BookNa } from '../models';
import { BookListComponent } from './book-list.component';

describe('<ws-book-list>', () => {
  let fixture: ComponentFixture<BookListComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [BookListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.inject(MockStore);
    store.overrideSelector(bookCollection as any, [new BookNa()]);
  });

  describe('When books provided', () => {
    it('renders a list of books', () => {
      fixture = TestBed.createComponent(BookListComponent);
      fixture.detectChanges();

      const bookCardFixtures = fixture.debugElement.queryAll(By.css('[data-test=book-list-card-item]'));

      expect(bookCardFixtures).toHaveSize(1);
    });
  });
});
