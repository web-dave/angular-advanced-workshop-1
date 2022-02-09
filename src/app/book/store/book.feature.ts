import { createEntityAdapter } from '@ngrx/entity';
import { ActionReducerMap } from '@ngrx/store';
import { Book } from '../models';
import { bookCollectionReducer } from './book-collection.reducer';
import { BookFeature } from './book-collection.slice';

export const bookFeatureName = 'book';

export const bookAdapter = createEntityAdapter<Book>({ selectId: model => model.isbn });

export const bookReducers: ActionReducerMap<BookFeature> = { bookCollection: bookCollectionReducer };
