import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, BookNa } from '../models';
import { bookByIsbn } from '../store';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  sink = new Subscription();
  book: Book = new BookNa();

  constructor(private route: ActivatedRoute, private store: Store, private bookService: BookApiService) {}

  ngOnInit() {
    this.sink.add(
      this.route.params
        .pipe(
          switchMap(params => this.store.select(bookByIsbn(params.isbn))),
          filter((book): book is Book => !!book)
        )
        .subscribe(book => (this.book = book))
    );
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  save() {
    this.sink.add(this.bookService.update(this.book.isbn, this.book).subscribe());
  }
}
