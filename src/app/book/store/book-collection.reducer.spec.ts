import { EntityState } from '@ngrx/entity';
import { Book, BookNa } from '../models';
import { createBookComplete } from './book-collection.actions';
import { bookCollectionReducer } from './book-collection.reducer';

describe('BookCollection: reducer', () => {
  describe('When a book is created', () => {
    it('adds the book to the store', () => {
      const isbn = '123-456-789';
      const book: Book = { ...new BookNa(), isbn };

      const initialState: EntityState<Book> = { entities: {}, ids: [] };

      const action = createBookComplete({ book });
      const state = bookCollectionReducer(initialState, action);

      expect(state.entities[isbn]).toBeDefined();
    });
  });
});
