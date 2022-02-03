import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { bookByIsbn, updateBookStart } from '@store/book';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Book, bookNa } from '../models';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  sink = new Subscription();
  book: Book = bookNa();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.sink.add(
      this.route.params
        .pipe(
          switchMap(params => this.store.select(bookByIsbn(params.isbn))),
          filter((book): book is Book => !!book)
        )
        .subscribe(book => (this.book = { ...book }))
    );
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  save() {
    this.store.dispatch(updateBookStart({ patch: this.book }));
  }
}
