import { EntityState } from '@ngrx/entity';
import { Book } from '../models';
import { bookFeatureName } from './book.feature';

export type BookCollectionSlice = EntityState<Book>;
export interface BookFeature {
  bookCollection: BookCollectionSlice;
}

export interface ApplicationStore {
  [bookFeatureName]: BookFeature;
}
