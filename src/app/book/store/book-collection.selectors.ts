import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book.feature';

export const selectBooks = createSelector(selectBookFeature, state => state.entities);

export const selectBook = (isbn: string) =>
  createSelector(selectBooks, books => books.find(book => book.isbn === isbn));
