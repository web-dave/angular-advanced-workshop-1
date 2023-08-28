import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookApiService } from '../book-api.service';
import { loadBooksComplete, loadBooksStart } from './book-collection.actions';
import { exhaustMap, map } from 'rxjs';
import { Book } from '../models';
import { Injectable } from '@angular/core';

@Injectable()
export class BookEffects {
  loadBooks = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBooksStart),
      exhaustMap(() => this.service.getAll()),
      map((books: Book[]) => loadBooksComplete({ books }))
    );
  });

  constructor(private actions$: Actions, private service: BookApiService) {}
}
