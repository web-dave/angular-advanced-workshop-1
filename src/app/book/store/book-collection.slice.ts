import { ActionReducerMap } from '@ngrx/store';
import { Book } from '../models';
import { bookCollectionReducer } from './book-collection.reducer';

export interface BookState {
  bookstate: BookCollectionSlice;
}
export const bookReducers: ActionReducerMap<BookState> = {
  bookstate: bookCollectionReducer
};
export interface BookCollectionSlice {
  entities: ReadonlyArray<Book>;
}
