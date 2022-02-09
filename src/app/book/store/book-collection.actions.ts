import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const createBookStart = createAction('[Book] Create Book Start', props<{ book: Book }>());
export const createBookComplete = createAction('[Book] Create Book Complete', props<{ book: Book }>());

export const loadBookStart = createAction('[Book] Load Book Start');
export const loadBookComplete = createAction('[Book] Load Book Complete', props<{ books: Book[] }>());

export const deleteBookStart = createAction('[Book] Delete Book Start', props<{ isbn: string }>());
export const deleteBookComplete = createAction('[Book] Delete Book Complete', props<{ isbn: string }>());

export const updateBookStart = createAction('[Book] Update Book Start', props<{ update: Book }>());
export const updateBookComplete = createAction('[Book] Update Book Complete', props<{ update: Book }>());
