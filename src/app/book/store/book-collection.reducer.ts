import { createReducer, on } from '@ngrx/store';
import {
  createBookComplete,
  deleteBookComplete,
  updateBookComplete,
  loadBookComplete
} from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';
import { bookAdapter } from './book.feature';

bookAdapter.getInitialState();
const initialState: BookCollectionSlice = bookAdapter.getInitialState();

const { setAll, updateOne, removeOne, addOne } = bookAdapter;

export const bookCollectionReducer = createReducer(
  initialState,
  on(createBookComplete, (state, { book }) => addOne(book, state)),
  on(deleteBookComplete, (state, { isbn }) => removeOne(isbn, state)),
  on(loadBookComplete, (state, { books }) => setAll(books, state)),
  on(updateBookComplete, (state, { update }) => updateOne({ id: update.isbn, changes: update }, state))
);
