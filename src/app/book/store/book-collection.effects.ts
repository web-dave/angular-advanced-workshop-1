import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookApiService } from '../book-api.service';
import {
  createBookComplete,
  createBookStart,
  deleteBookComplete,
  deleteBookStart,
  loadBooksComplete,
  loadBooksStart,
  updateBookComplete,
  updateBookStart
} from './book-collection.actions';
import { exhaustMap, map, tap, withLatestFrom } from 'rxjs';
import { Book } from '../models';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRouteParam } from 'src/app/store/router.selectors';

@Injectable()
export class BookEffects {
  loadBooks = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBooksStart),
      exhaustMap(() => this.service.getAll()),
      map((books: Book[]) => loadBooksComplete({ books }))
    );
  });

  createBook = createEffect(() => {
    return this.actions$.pipe(
      ofType(createBookStart),
      exhaustMap(action => this.service.create(action.book)),
      tap(() => this.router.navigateByUrl('/')),
      map(book => createBookComplete({ book }))
    );
  });

  updateBook = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateBookStart),
      exhaustMap(action => this.service.update(action.book.isbn, action.book)),
      tap(() => this.router.navigateByUrl('/')),
      map(book => updateBookComplete({ book }))
    );
  });

  deleteBook = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBookStart),
      withLatestFrom(this.store.select(selectRouteParam('isbn'))),
      exhaustMap(([action, isbn]) =>
        this.service.delete(isbn || '').pipe(
          tap(() => this.router.navigateByUrl('/')),
          map(() => deleteBookComplete({ isbn: isbn || '' }))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private service: BookApiService,
    private router: Router,
    private store: Store
  ) {}
}
