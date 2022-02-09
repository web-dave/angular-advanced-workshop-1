import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { bookListSelector } from '../store/book-collection.selectors';
import { ApplicationStore, BookCollectionSlice, BookFeature } from '../store/book-collection.slice';
import { bookFeatureName } from '../store/book.feature';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<ReadonlyArray<Book>>;

  constructor(private store: Store<ApplicationStore>) {
    this.books$ = this.store.select(bookListSelector);
  }
}
