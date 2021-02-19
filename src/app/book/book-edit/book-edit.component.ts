import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from '../shared/book';
import { BookApiService } from '../shared/book-data.service';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  sink = new Subscription();
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookApiService
  ) {}

  ngOnInit() {
    this.sink.add(
      this.route.params
        .pipe(
          switchMap((params: { isbn: string }) =>
            this.bookService.getByIsbn(params.isbn)
          )
        )
        .subscribe(book => (this.book = book))
    );
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  save() {
    this.sink.add(
      this.bookService.update(this.book.isbn, this.book).subscribe()
    );
  }
}
