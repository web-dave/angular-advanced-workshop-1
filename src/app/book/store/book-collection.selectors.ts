import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookState } from './book-collection.slice';
import { bookFeatureName, bookAdapter } from './book.feature';

export const selectBookCollectionSlice = createFeatureSelector<BookState>(bookFeatureName);
export const selectBookState = createSelector(selectBookCollectionSlice, state => state.bookstate);
const { selectAll, selectEntities } = bookAdapter.getSelectors();
export const selectAllBooks = createSelector(selectBookState, selectAll);

export const selectBookByIsbn = (isbn: string) => createSelector(selectBookState, state => selectEntities(state)[isbn]);
