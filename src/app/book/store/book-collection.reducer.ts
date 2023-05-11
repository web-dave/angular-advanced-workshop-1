import { createReducer, on } from '@ngrx/store';
import { bookNa } from '../models';
import { createBookStart } from './book.feature';
import { BookCollectionSlice } from './book.feature';

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
