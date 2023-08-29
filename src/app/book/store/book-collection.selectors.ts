import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book.feature';
import { createEntityAdapter } from '@ngrx/entity';
import { Book } from '../models';

const bookAdapter = createEntityAdapter<Book>();

const selectBookCollectionSlice = createSelector(selectBookFeature, state => {
  console.log(state);
  return state.bookCollection;
});

// const { selectAll, selectEntities } = bookAdapter.getSelectors(selectBookCollectionSlice);

export const { selectAll: selectBooks } = bookAdapter.getSelectors(selectBookCollectionSlice);

export const selectBook = (isbn: string) =>
  createSelector(selectBooks, (books: Book[]) => books.find(book => book.isbn === isbn));
