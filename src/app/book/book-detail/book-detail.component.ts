import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, filter, switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { bookByIsbn } from '../store';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  public book$: Observable<Book>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private bookService: BookApiService
  ) {
    this.book$ = this.route.params.pipe(
      switchMap(params => this.store.select(bookByIsbn(params.isbn))),
      filter((book): book is Book => !!book)
    );
  }

  remove() {
    this.route.params
      .pipe(
        exhaustMap(params => this.bookService.delete(params.isbn)),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
