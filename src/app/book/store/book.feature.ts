import { ActionReducerMap } from '@ngrx/store';
import { bookCollectionReducer } from './book-collection.reducer';
import { BookFeature } from './book-collection.slice';

export const bookFeatureName = 'book';

export const bookReducers: ActionReducerMap<BookFeature> = { bookCollection: bookCollectionReducer };
