import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const createBookStart = createAction('[Book] Create Book', props<{ book: Book }>());
export const createBookComplete = createAction('[Book] Create Book Completed', props<{ book: Book }>());

export const loadBooksStart = createAction('[Book] Load Books Started');
export const loadBooksComplete = createAction('[Book] Load Books Completed', props<{ books: Book[] }>());
