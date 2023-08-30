import { EntityState } from '@ngrx/entity';
import { Book, bookNa } from '../models';
import {
  createBookComplete,
  deleteBookComplete,
  loadBooksComplete,
  updateBookComplete
} from './book-collection.actions';
import { bookCollectionReducer } from './book-collection.reducer';

describe('NGRX Reducer', () => {
  let initialState: EntityState<Book>;
  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {}
    };
  });

  it('loadBooksComplete', () => {
    const book: Book = { ...bookNa(), title: '@NGRX Rocks', id: '1', isbn: '1' };
    const action = loadBooksComplete({ books: [book] });
    const state = bookCollectionReducer(initialState, action);
    expect(state.entities['1']?.title).toBe('@NGRX Rocks');
  });

  it('createBookComplete', () => {
    const book: Book = { ...bookNa(), title: '@NGRX Rocks!!', id: '2', isbn: '2' };
    const action = createBookComplete({ book: book });
    const state = bookCollectionReducer(initialState, action);
    expect(state.entities['2']?.title).toBe('@NGRX Rocks!!');
  });

  it('updateBookComplete', () => {
    const book: Book = { ...bookNa(), title: '@NGRX Rocks!!', id: '2', isbn: '2' };
    initialState = {
      ids: [],
      entities: {
        '2': book
      }
    };
    const book2: Book = { ...bookNa(), title: '@NGRX Rocks total', id: '2', isbn: '2' };
    const action = updateBookComplete({ book: book2 });
    const state = bookCollectionReducer(initialState, action);
    expect(state.entities['2']?.title).toBe('@NGRX Rocks total');
  });

  it('deleteBookComplete', () => {
    const book: Book = { ...bookNa(), title: '@NGRX Rocks!!', id: '2', isbn: '2' };
    initialState.entities['2'] = book;
    const book2: Book = { ...bookNa(), title: '@NGRX Rocks total', id: '2', isbn: '2' };
    const action = deleteBookComplete({ isbn: '2' });
    const state = bookCollectionReducer(initialState, action);
    expect(state.entities['2']).toBeUndefined();
  });
});
