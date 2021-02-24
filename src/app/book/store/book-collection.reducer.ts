import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../models';
import {
  createBookComplete,
  deleteBookComplete,
  loadBooksComplete,
  updateBookComplete
} from './book-collection.actions';

const adapter = createEntityAdapter<Book>({ selectId: model => model.isbn });

export const bookCollectionReducer = createReducer(
  adapter.getInitialState(),

  on(createBookComplete, (slice, { book }) => adapter.addOne(book, slice)),

  on(deleteBookComplete, (slice, { bookIsbn }) => adapter.removeOne(bookIsbn, slice)),

  on(loadBooksComplete, (slice, { books }) => adapter.setAll(books, slice)),

  on(updateBookComplete, (slice, { update }) => adapter.updateOne({ id: update.isbn, changes: update }, slice))
);
