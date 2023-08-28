import { createReducer, on } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';
import { createBookStart } from './book-collection.actions';

const initialState: BookCollectionSlice = {
  entities: []
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
