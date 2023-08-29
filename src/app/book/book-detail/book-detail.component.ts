import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Book } from '../models';
import { Store } from '@ngrx/store';
import { selectBook } from '../store/book-collection.selectors';
import { deleteBookStart } from '../store/book-collection.actions';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  // @Input({required: true}) foo!: string;

  public book$: Observable<Book>;

  constructor(private store: Store) {
    this.book$ = this.store.select(selectBook).pipe(filter((book): book is Book => !!book));
  }

  remove() {
    this.store.dispatch(deleteBookStart());
  }
}
