import { createSelector } from '@ngrx/store';
import { bookFeature } from './book.feature';

export const bookCollection = createSelector(bookFeature, slice => slice.bookCollection.entities);
