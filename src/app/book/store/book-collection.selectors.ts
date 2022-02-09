import { createFeatureSelector, createSelector } from '@ngrx/store';
import { features } from 'process';
import { BookFeature } from './book-collection.slice';
import { bookFeatureName } from './book.feature';

export const BookFeatureSelector = createFeatureSelector<BookFeature>(bookFeatureName);

export const bookCollectionSelector = createSelector(BookFeatureSelector, feature => feature.bookCollection);

export const bookListSelector = createSelector(bookCollectionSelector, collection => collection.entities);
export const bookListSelector2 = createSelector(BookFeatureSelector, features => features.bookCollection.entities);
