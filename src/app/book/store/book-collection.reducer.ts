import { createReducer, on } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';
import {
  createBookComplete,
  loadBooksComplete,
  updateBookComplete,
  deleteBookComplete
} from './book-collection.actions';

const initialState: BookCollectionSlice = {
  entities: []
};

export const bookCollectionReducer = createReducer(
  initialState,
  on(
    createBookComplete,
    (state, action): BookCollectionSlice => ({
      ...state,
      entities: [...state.entities, action.book]
    })
  ),
  on(
    loadBooksComplete,
    (state, action): BookCollectionSlice => ({
      ...state,
      entities: action.books
    })
  ),
  on(
    updateBookComplete,
    (state, action): BookCollectionSlice => ({
      ...state,
      entities: state.entities.map(book => (book.isbn !== action.book.isbn ? book : action.book))
    })
  ),
  on(
    deleteBookComplete,
    (state, action): BookCollectionSlice => ({
      ...state,
      entities: state.entities.filter(book => book.isbn !== action.isbn)
    })
  )
);
