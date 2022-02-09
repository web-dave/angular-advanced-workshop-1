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
  loadBookComplete,
  loadBookStart,
  updateBookComplete,
  updateBookStart
} from './book-collection.actions';

@Injectable()
export class BookCollectionEffects {
  load = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadBookStart),
        exhaustMap(() => this.service.getAll()),
        map(books => loadBookComplete({ books }))
      ),
    { dispatch: true }
  );

  create = createEffect(() =>
    this.actions$.pipe(
      ofType(createBookStart),
      exhaustMap(({ book }) => this.service.create(book)),
      map(book => createBookComplete({ book }))
    )
  );

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBookStart),
      exhaustMap(({ update }) => this.service.create(update)),
      map(update => updateBookComplete({ update }))
    )
  );

  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBookStart),
      exhaustMap(({ isbn }) => this.service.delete(isbn).pipe(map(() => deleteBookComplete({ isbn }))))
    )
  );
  navigate = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteBookComplete, updateBookComplete, createBookComplete),
        switchMap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(private service: BookApiService, private actions$: Actions, private router: Router) {}
}
