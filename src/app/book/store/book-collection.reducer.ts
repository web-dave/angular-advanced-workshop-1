import { createReducer, on } from '@ngrx/store';
import { createBookOptimistic } from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

const initial: BookCollectionSlice = {
  entities: []
};

export const bookCollectionReducer = createReducer(
  initial,
  on(createBookOptimistic, (slice, { book }) => ({ ...slice, entities: [...slice.entities, book] }))
);
