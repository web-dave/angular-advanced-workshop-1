import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookState } from './book-collection.slice';
import { bookFeatureName, bookAdapter } from './book.feature';
import { selectRouteParam } from '../../store/router-store.selectors';

export const selectBookCollectionSlice = createFeatureSelector<BookState>(bookFeatureName);

export const selectBookState = createSelector(
  selectBookCollectionSlice,
  bookCollectionSlice => bookCollectionSlice.bookstate
);

const { selectAll, selectEntities } = bookAdapter.getSelectors();
export const selectAllBooks = createSelector(selectBookState, selectAll);

export const selectBookByIsbn = createSelector(
  selectBookState,
  selectRouteParam('isbn'),
  (bookState, isbn = 'ISBN was not found') => selectEntities(bookState)[isbn]
);
export const selectBookByKey = (key = 'isbn') =>
  createSelector(selectBookState, selectRouteParam(key), (bookState, isbn = '') => selectEntities(bookState)[isbn]);
