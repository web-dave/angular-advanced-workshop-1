import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { anything, instance, mock, when } from 'ts-mockito';
import { BookApiService } from '../book-api.service';
import { BookNa } from '../models';
import { createBookStart } from './book-collection.actions';
import { BookCollectionEffects } from './book-collection.effects';
import { bookCollection } from './book-collection.selectors';
import { bookFeatureName, bookReducers } from './book.feature';

describe('BookCollection: Effects', () => {
  let store: Store;
  let bookApiMock: BookApiService;

  beforeEach(() => {
    bookApiMock = mock(bookApiMock);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        EffectsModule.forRoot([BookCollectionEffects]),
        StoreModule.forRoot({}),
        StoreModule.forFeature(bookFeatureName, bookReducers)
      ],
      providers: [{ provide: BookApiService, useFactory: () => instance(bookApiMock) }]
    });

    store = TestBed.inject(Store);
  });

  describe('When a book was created successfully', () => {
    it('caches the book locally', () => {
      when(bookApiMock.create(anything())).thenReturn(of(new BookNa()));

      store.dispatch(createBookStart({ book: anything() }));

      expect(subscribeSpyTo(store.select(bookCollection)).getFirstValue()).toContain(new BookNa());
    });
  });
});
