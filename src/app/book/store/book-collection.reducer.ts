import { createReducer, on } from '@ngrx/store';
import { createBookStart } from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

const initialState: BookCollectionSlice = {
  entities: []
};

export const bookCollectionReducer = createReducer(
  initialState,
  on(createBookStart, (state, { book }) => ({ ...state, entities: [...state.entities, book] }))
  //   on(createBookStart, (state, action) => {
  //     return {
  //       ...state,
  //       entities: [...state.entities, action.book]
  //     };
  //   })
);
