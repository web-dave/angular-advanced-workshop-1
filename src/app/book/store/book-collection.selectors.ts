import { createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '@store/router';
import { Book } from '../models';
import { bookFeature } from './book.feature';

const adapter = createEntityAdapter<Book>();

const bookCollectionSelector = createSelector(bookFeature, slice => slice.bookCollection);

export const { selectAll: bookCollection } = adapter.getSelectors(bookCollectionSelector);

export const bookByIsbn = createSelector(selectRouteParam('isbn'), bookCollection, (isbn, books) =>
  books.find(book => book.isbn === isbn)
);
