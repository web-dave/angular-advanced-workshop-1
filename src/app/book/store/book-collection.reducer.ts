/* eslint-disable ngrx/on-function-explicit-return-type */
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { bookNa } from '../models';
import { BookCollectionSlice, BookState } from './book-collection.slice';
import {
  loadBookComplete,
  createBookComplete,
  deleteBookComplete,
  updateBookComplete
} from './book-collection.actions';

import { bookAdapter } from './book.feature';

const initialState: BookCollectionSlice = bookAdapter.getInitialState();
const { setAll, updateOne, removeOne, addOne } = bookAdapter;

export const bookCollectionReducer = createReducer(
  initialState,
  on(createBookComplete, (state, { book }) => addOne(book, state)),
  on(deleteBookComplete, (state, { isbn }) => removeOne(isbn, state)),
  on(loadBookComplete, (state, { books }) => setAll(books, state)),
  on(updateBookComplete, (state, { update }) => updateOne({ id: update.isbn, changes: update }, state))
);

export const bookReducers: ActionReducerMap<BookState> = {
  bookstate: bookCollectionReducer
};
