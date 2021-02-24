import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { bookByIsbn, deleteBookStart } from '@store/book';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Book } from '../models';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  public book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.book$ = this.route.params.pipe(
      switchMap(params => this.store.select(bookByIsbn(params.isbn))),
      filter((book): book is Book => !!book)
    );
  }

  remove() {
    this.route.params.pipe(tap(params => this.store.dispatch(deleteBookStart({ bookIsbn: params.isbn })))).subscribe();
  }
}
