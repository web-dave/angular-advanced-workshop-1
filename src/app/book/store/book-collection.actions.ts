import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const loadBooksStart = createAction('[Book] load Books Start');
export const loadBooksComplete = createAction('[Book] load Books Complete', props<{ books: Book[] }>());

export const createBookStart = createAction('[Book] create Book start', props<{ book: Book }>());
