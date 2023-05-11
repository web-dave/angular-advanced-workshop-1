import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookCollectionSlice, bookFeatureName } from './book.feature';

export const selectBookFeature = createFeatureSelector<BookCollectionSlice>('book');

export const selectAllBooks = createSelector(selectBookFeature, state => state.entities);
