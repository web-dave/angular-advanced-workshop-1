import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookCollectionSlice, BookState } from './book-collection.slice';

export const selectBookFeature = createFeatureSelector<BookState>('book');

export const selectAllBooks = createSelector(selectBookFeature, state => state.bookstate.entities);
