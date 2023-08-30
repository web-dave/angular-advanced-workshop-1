import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './book-collection.effects';
import { Store, StoreModule } from '@ngrx/store';
import { bookFeatureName, bookReducers } from './book.feature';
import { bookCollectionReducer } from './book-collection.reducer';
import { BookApiService } from '../book-api.service';
import { Book, bookNa } from '../models';
import { firstValueFrom, of, tap } from 'rxjs';
import { createBookStart } from './book-collection.actions';
import { selectBooks } from './book-collection.selectors';

describe('NGRX Test | Action - Effect - Reducer - Selector', () => {
  const bookMockApi = jasmine.createSpyObj<BookApiService>(['create']);
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        EffectsModule.forRoot([BookEffects]),
        StoreModule.forRoot({}),
        StoreModule.forFeature(bookFeatureName, bookReducers)
      ],
      providers: [
        {
          provide: BookApiService,
          useFactory: () => bookMockApi
        }
      ]
    });

    store = TestBed.inject(Store);
  });

  //   it('test if dispatched Book aprears in Store (with done)', done => {
  //     let book: Book = { ...bookNa(), title: '@NGRX Rocks', id: '1', isbn: '1' };
  //     bookMockApi.create.and.returnValue(of(book));
  //     store.dispatch(createBookStart({ book }));

  //     store.select(selectBooks).subscribe(books => {
  //       expect(books).toContain(book);
  //       done();
  //     });
  //   });

  //   it('test if dispatched Book aprears in Store with expectAsync', async () => {
  //     let book: Book = { ...bookNa(), title: '@NGRX Rocks', id: '1', isbn: '1' };
  //     bookMockApi.create.and.returnValue(of(book));
  //     store.dispatch(createBookStart({ book }));

  //     await expectAsync(firstValueFrom(store.select(selectBooks))).toBeResolvedTo([book]);
  //   });

  it('test if dispatched Book aprears in Store', async () => {
    let book_: Book = { ...bookNa(), title: '@NGRX Rocks', id: '1', isbn: '1' };
    const book: Book = {
      abstract: 'na',
      author: 'na',
      cover: '.png',
      subtitle: 'na',
      numPages: 0,
      publisher: { name: 'na', url: 'na' },
      title: '@NGRX Rocks',
      isbn: '1'
    };
    console.log(book_);
    bookMockApi.create.and.returnValue(of(book).pipe(tap(data => console.log(data))));
    store.dispatch(createBookStart({ book }));

    const books = await firstValueFrom(store.select(selectBooks));
    expect(books).toEqual([book]);
  });
  describe('When a book was created successfully', () => {
    it('caches the book locally', done => {
      const book = bookNa();

      bookMockApi.create.and.returnValue(of(book));

      store.dispatch(createBookStart({ book }));

      store.select(selectBooks).subscribe(books => {
        expect(books).toContain(book);
        done();
      });
    });
  });
});
