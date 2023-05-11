import { ActionReducerMap } from '@ngrx/store';
import { bookCollectionReducer } from './book-collection.reducer';
import { BookCollectionSlice } from './book-collection.slice';
export * from './book-collection.actions';
export * from './book-collection.slice';
export * from './book-collection.reducer';
export * from './book-collection.selectors';
export const bookFeatureName = 'book';

export interface BookState {
  bookstate: BookCollectionSlice;
}
export const bookReducers: ActionReducerMap<BookState> = {
  bookstate: bookCollectionReducer
};
