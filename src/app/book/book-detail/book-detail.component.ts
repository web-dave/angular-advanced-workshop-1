import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookByIsbn, deleteBookStart } from '@store/book';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Book } from '../models';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  public book$: Observable<Book>;

  constructor(private store: Store) {
    this.book$ = this.store.select(bookByIsbn).pipe(filter((book): book is Book => !!book));
  }

  remove() {
    this.store.dispatch(deleteBookStart());
  }
}
