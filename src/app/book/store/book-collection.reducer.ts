import { createReducer, on } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';
import {
  createBookComplete,
  loadBooksComplete,
  updateBookComplete,
  deleteBookComplete
} from './book-collection.actions';
import { Book } from '../models';
import { createEntityAdapter } from '@ngrx/entity';

const bookAdapter = createEntityAdapter<Book>({ selectId: entity => entity.isbn });
const { setAll, upsertOne, addOne, removeOne } = bookAdapter;

export const bookCollectionReducer = createReducer(
  bookAdapter.getInitialState(),
  on(createBookComplete, (state, action): BookCollectionSlice => addOne(action.book, state)),
  on(loadBooksComplete, (state, action): BookCollectionSlice => setAll(action.books, state)),
  on(updateBookComplete, (state, action): BookCollectionSlice => upsertOne(action.book, state)),
  on(deleteBookComplete, (state, action): BookCollectionSlice => removeOne(action.isbn, state))
);
