import { createReducer, on } from '@ngrx/store';
import {
  createBookComplete,
  deleteBookComplete,
  updateBookComplete,
  loadBookComplete
} from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

const initialState: BookCollectionSlice = {
  entities: []
};

export const bookCollectionReducer = createReducer(
  initialState,
  on(createBookComplete, (state, { book }) => ({ ...state, entities: [...state.entities, book] })),
  on(deleteBookComplete, (state, { isbn }) => ({
    ...state,
    entities: state.entities.filter(book => book.isbn !== isbn)
  })),
  on(loadBookComplete, (state, { books }) => ({ ...state, entities: books })),
  on(updateBookComplete, (state, { update }) => ({
    ...state,
    entities: state.entities.map(book => (book.isbn === update.isbn ? update : book))
  }))
);
