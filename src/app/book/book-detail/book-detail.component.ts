import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Book } from '../models';
import { deleteBookStart } from '../store/book-collection.actions';
import { selectBookByIsbn } from '../store/book-collection.selectors';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  public book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.book$ = this.store
      .select(selectBookByIsbn(this.route.snapshot.params.isbn))
      .pipe(filter((book): book is Book => !!book));
  }

  remove() {
    this.store.dispatch(deleteBookStart({ isbn: this.route.snapshot.params.isbn }));
  }
}
