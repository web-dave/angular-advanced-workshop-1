import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookFeature } from './book-collection.slice';
import { bookFeatureName } from './book.feature';

export const BookFeatureSelector = createFeatureSelector<BookFeature>(bookFeatureName);

export const bookCollectionSelector = createSelector(BookFeatureSelector, feature => feature.bookCollection);

export const bookListSelector = createSelector(bookCollectionSelector, collection => collection.entities);
export const bookListSelector2 = createSelector(BookFeatureSelector, features => features.bookCollection.entities);

export const bookByIsbnSelector = (isbn: string) =>
  createSelector(bookListSelector, books => books.find(book => book.isbn === isbn));
