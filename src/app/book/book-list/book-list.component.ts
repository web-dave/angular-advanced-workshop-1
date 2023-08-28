import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { Store } from '@ngrx/store';
import { BookCollectionSlice } from '../store/book-collection.slice';
import { bookFeatureName } from '../store/book.feature';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<ReadonlyArray<Book>>;
  // <{ [bookFeatureName]: BookCollectionSlice }>
  constructor(private bookData: BookApiService, private store: Store) {
    // eslint-disable-next-line ngrx/prefer-selector-in-select
    this.books$ = this.store.select((state: any) => state[bookFeatureName].entities);
  }
}
