import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { bookNa } from '../models';
import { BookCollectionSlice, BookState } from './book-collection.slice';
import { createBookStart } from './book-collection.actions';

const initialState: BookCollectionSlice = {
  entities: [{ ...bookNa(), isbn: '999999999', cover: '' }]
};
export const bookCollectionReducer = createReducer(
  initialState,
  on(
    createBookStart,
    (state, action): BookCollectionSlice => ({
      ...state,
      entities: [...state.entities, action.book]
    })
  )
);

export const bookReducers: ActionReducerMap<BookState> = {
  bookstate: bookCollectionReducer
};
