import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book.feature';

export const selectBooks = createSelector(selectBookFeature, state => state.entities);
