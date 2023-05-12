import { createEntityAdapter } from '@ngrx/entity';
import { Book } from '../models';

export const bookFeatureName = 'book';

export const bookAdapter = createEntityAdapter<Book>({ selectId: model => model.isbn });
