import { EntityState } from '@ngrx/entity';
import { Book } from '../models';

export type BookCollectionSlice = EntityState<Book>;
export interface BookState {
  bookstate: BookCollectionSlice;
}
