import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';
import { bookReducer } from './book-collection.reducer';

export const bookFeatureName = 'BOOK';

export interface BookState {
  bookCollection: BookCollectionSlice;
}

export const bookReducers: ActionReducerMap<BookState> = {
  bookCollection: bookReducer
};

export const selectBookFeature = createFeatureSelector<BookState>(bookFeatureName);
