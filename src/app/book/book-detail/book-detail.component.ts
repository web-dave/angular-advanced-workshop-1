import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Book } from '../models';
import { deleteBookStart } from '../store/book-collection.actions';
import { bookByIsbnSelector } from '../store/book-collection.selectors';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  public book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.book$ = this.route.params.pipe(
      switchMap(params => this.store.select(bookByIsbnSelector(params.isbn))),
      filter((book): book is Book => !!book)
    );
  }

  remove() {
    this.store.dispatch(deleteBookStart({ isbn: this.route.snapshot.params.isbn }));
  }
}
