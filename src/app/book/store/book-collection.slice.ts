import { Book } from '../models';
import { bookFeatureName } from './book.feature';

export interface BookCollectionSlice {
  entities: ReadonlyArray<Book>;
}
export interface BookFeature {
  bookCollection: BookCollectionSlice;
}

export interface ApplicationStore {
  [bookFeatureName]: BookFeature;
}
