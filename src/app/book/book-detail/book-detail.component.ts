import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { exhaustMap, filter, switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
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

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {
    this.book$ = this.route.params.pipe(
      switchMap(params => this.store.select(selectBook(params.isbn))),
      filter((book): book is Book => !!book)
    );
  }

  remove() {
    this.store.dispatch(deleteBookStart({ isbn: this.route.snapshot.params['isbn'] }));
  }
}
