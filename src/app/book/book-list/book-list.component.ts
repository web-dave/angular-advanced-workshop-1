import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookCollection } from '@store/book';
import { Observable } from 'rxjs';
import { Book } from '../models';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<ReadonlyArray<Book>>;

  constructor(private store: Store) {
    this.books$ = this.store.select(bookCollection);
  }
}
