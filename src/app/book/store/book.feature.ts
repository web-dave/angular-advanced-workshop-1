import { createFeatureSelector } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';

export const bookFeatureName = 'BOOK';

export const selectBookFeature = createFeatureSelector<BookCollectionSlice>(bookFeatureName);
