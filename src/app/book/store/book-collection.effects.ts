import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
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

@Injectable()
export class BookCollectionEffects {
  load = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooksStart),
      exhaustMap(() => this.bookApi.getAll()),
      map(books => loadBooksComplete({ books }))
    )
  );

  create = createEffect(() =>
    this.actions$.pipe(
      ofType(createBookStart),
      exhaustMap(({ book }) => this.bookApi.create(book)),
      map(bookCreated => createBookComplete({ book: bookCreated }))
    )
  );
  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBookStart),
      exhaustMap(({ bookIsbn }) => this.bookApi.delete(bookIsbn).pipe(map(() => deleteBookComplete({ bookIsbn }))))
    )
  );

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBookStart),
      exhaustMap(({ patch }) =>
        this.bookApi.update(patch.isbn, patch).pipe(map(update => updateBookComplete({ update })))
      )
    )
  );

  navigateToStart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createBookComplete, deleteBookComplete, updateBookComplete),
        switchMap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(private router: Router, private actions$: Actions, private bookApi: BookApiService) {}
}
