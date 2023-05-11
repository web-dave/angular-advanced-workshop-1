import { Book } from '../models';

export interface BookState {
  bookstate: BookCollectionSlice;
}
export interface BookCollectionSlice {
  entities: ReadonlyArray<Book>;
}
