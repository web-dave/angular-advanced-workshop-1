import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { exhaustMap } from 'rxjs';
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
import { Router } from '@angular/router';

@Injectable()
export class BookEffects {
  load = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBookStart),
      exhaustMap(() => this.service.getAll().pipe(map(data => loadBookComplete({ books: data }))))
    );
  });
  create = createEffect(() => {
    return this.actions$.pipe(
      ofType(createBookStart),
      exhaustMap(({ book }) => this.service.create(book)),
      map(book => createBookComplete({ book }))
    );
  });

  update = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateBookStart),
      exhaustMap(({ update }) => this.service.create(update)),
      map(update => updateBookComplete({ update }))
    );
  });

  delete = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBookStart),
      exhaustMap(({ isbn }) => this.service.delete(isbn).pipe(map(() => deleteBookComplete({ isbn }))))
    );
  });
  navigate = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteBookComplete, updateBookComplete, createBookComplete),
        switchMap(() => this.router.navigateByUrl('/'))
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private service: BookApiService, private router: Router) {}
}
