import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { Store } from '@ngrx/store';
import { selectBooks } from '../store/book-collection.selectors';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<ReadonlyArray<Book>>;
  // <{ [bookFeatureName]: BookCollectionSlice }>
  constructor(private store: Store) {
    this.books$ = this.store.select(selectBooks);
  }
}
