import { createSelector } from '@ngrx/store';
import { bookFeature } from './book.feature';

export const bookCollection = createSelector(bookFeature, slice => slice.bookCollection.entities);

export const bookByIsbn = (isbn: string) =>
  createSelector(bookCollection, books => books.find(book => book.isbn === isbn));
