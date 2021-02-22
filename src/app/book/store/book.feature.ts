import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { bookCollectionReducer } from './book-collection.reducer';
import { BookCollectionSlice } from './book-collection.slice';

export const bookFeatureName = 'book';

export interface BookState {
  bookCollection: BookCollectionSlice;
}

export const bookReducers: ActionReducerMap<BookState> = {
  bookCollection: bookCollectionReducer
};

export const bookFeature = createFeatureSelector<BookState>(bookFeatureName);
