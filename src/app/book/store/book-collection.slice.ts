import { Book } from '../models';
import { EntityState } from '@ngrx/entity';

export type BookCollectionSlice = EntityState<Book>;
