import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookState } from './book-collection.slice';

export const selectBookFeature = createFeatureSelector<BookState>('book');

export const selectAllBooks = createSelector(selectBookFeature, state => state.bookstate.entities);

export const selectBookByIsbn = (isbn: string) =>
  createSelector(selectAllBooks, books => books.find(b => b.isbn === isbn));
