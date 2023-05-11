import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const createBookStart = createAction('[Book] create Book start', props<{ book: Book }>());
// that requires the property { book: Book}
