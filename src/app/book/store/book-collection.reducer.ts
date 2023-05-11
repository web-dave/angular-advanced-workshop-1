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

const initialState: BookCollectionSlice = {
  entities: [{ ...bookNa(), isbn: '999999999', cover: '' }]
};
export const bookCollectionReducer = createReducer(
  initialState,
  on(createBookComplete, (state, action) => ({
    ...state,
    entities: [...state.entities, action.book]
  })),
  on(loadBookComplete, (state, { books }) => ({ ...state, entities: books })),
  on(deleteBookComplete, (state, { isbn }) => ({
    ...state,
    entities: [...state.entities.filter(book => book.isbn != isbn)]
  })),
  on(updateBookComplete, (state, { update }) => ({
    ...state,
    entities: state.entities.map(book => (book.isbn === update.isbn ? update : book))
  }))
);

export const bookReducers: ActionReducerMap<BookState> = {
  bookstate: bookCollectionReducer
};
