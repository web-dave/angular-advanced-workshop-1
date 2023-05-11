import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const createBookStart = createAction('[Book] create Book start', props<{ book: Book }>());
export const createBookComplete = createAction('[Book] create Book complete', props<{ book: Book }>());

export const loadBookStart = createAction('[Book] load Books start [Effect] BookEffects.load');
export const loadBookComplete = createAction('[Book] load Books complete', props<{ books: Book[] }>());

export const deleteBookStart = createAction('[Book] delete Book start', props<{ isbn: string }>());
export const deleteBookComplete = createAction('[Book] delete Book complete', props<{ isbn: string }>());

export const updateBookStart = createAction('[Book] Update Book Start', props<{ update: Book }>());
export const updateBookComplete = createAction('[Book] Update Book Complete', props<{ update: Book }>());
