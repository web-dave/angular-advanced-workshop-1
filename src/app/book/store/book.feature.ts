import { createFeatureSelector } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';

export const bookFeatureName = 'book';

export const bookFeature = createFeatureSelector<{ bookCollection: BookCollectionSlice }>(bookFeatureName);
