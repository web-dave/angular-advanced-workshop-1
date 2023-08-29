import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book.feature';
import { createEntityAdapter } from '@ngrx/entity';
import { Book } from '../models';
import { selectRouteParam } from 'src/app/store/router.selectors';

const bookAdapter = createEntityAdapter<Book>();

const selectBookCollectionSlice = createSelector(selectBookFeature, state => {
  console.log(state);
  return state.bookCollection;
});

// const { selectAll, selectEntities } = bookAdapter.getSelectors(selectBookCollectionSlice);

export const { selectAll: selectBooks } = bookAdapter.getSelectors(selectBookCollectionSlice);

export const selectBook = createSelector(selectRouteParam('isbn'), selectBooks, (isbn: string = '', books: Book[]) =>
  books.find(book => book.isbn === isbn)
);
