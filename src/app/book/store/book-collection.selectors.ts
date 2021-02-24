import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '@store/router';
import { bookFeature } from './book.feature';

export const bookCollection = createSelector(bookFeature, slice => slice.bookCollection.entities);

export const bookByIsbn = createSelector(selectRouteParam('isbn'), bookCollection, (isbn, books) =>
  books.find(book => book.isbn === isbn)
);
