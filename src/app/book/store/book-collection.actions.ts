import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const createBookStart = createAction('[Book] Create Book', props<{ book: Book }>());
export const createBookComplete = createAction('[Book] Create Book Completed', props<{ book: Book }>());

export const deleteBookStart = createAction('[Book] Delete Book Started');
export const deleteBookComplete = createAction('[Book] Delete Book Completed', props<{ bookIsbn: string }>());

export const loadBooksStart = createAction('[Book] Load Books Started');
export const loadBooksComplete = createAction('[Book] Load Books Completed', props<{ books: Book[] }>());

export const updateBookStart = createAction('[Book] Update Book Started', props<{ patch: Book }>());
export const updateBookComplete = createAction('[Book] Update Book Completed', props<{ update: Book }>());
