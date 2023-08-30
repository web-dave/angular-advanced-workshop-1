import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { BookListComponent } from './book-list.component';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectBooks } from '../store/book-collection.selectors';

describe('<ws-book-list>', () => {
  let fixture: ComponentFixture<BookListComponent>;
  //   let bookApiMock: jasmine.SpyObj<BookApiService>;

  let store: MockStore;

  beforeEach(() => {
    // bookApiMock = jasmine.createSpyObj<BookApiService>(['getAll']);

    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [BookListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  describe('When books provided', () => {
    it('renders a list of books', () => {
      //   bookApiMock.getAll.and.returnValue(of([bookNa()]));
      store = TestBed.inject(MockStore);
      store.overrideSelector(selectBooks as any, [bookNa()]);
      fixture = TestBed.createComponent(BookListComponent);
      fixture.detectChanges();

      const bookCardFixtures = fixture.debugElement.queryAll(By.css('ws-book-card'));

      expect(bookCardFixtures).toHaveSize(1);
    });
  });
});
