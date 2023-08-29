import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const loadBooksStart = createAction('[Book] load Books Start');
export const loadBooksComplete = createAction('[Book] load Books Complete', props<{ books: Book[] }>());

export const createBookStart = createAction('[Book] create Book Start', props<{ book: Book }>());
export const createBookComplete = createAction('[Book] create Book Complete', props<{ book: Book }>());

export const updateBookStart = createAction('[Book] update Books Start', props<{ book: Book }>());
export const updateBookComplete = createAction('[Book] update Books Complete', props<{ book: Book }>());

export const deleteBookStart = createAction('[Book] delete Book Start');
export const deleteBookComplete = createAction('[Book] delete Book Complete', props<{ isbn: string }>());
