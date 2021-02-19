import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent implements OnInit {
  public book$: Observable<Book>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookApiService
  ) {}

  ngOnInit() {
    this.book$ = this.route.params.pipe(
      switchMap((params: { isbn: string }) =>
        this.bookService.getByIsbn(params.isbn)
      )
    );
  }

  remove() {
    this.route.params
      .pipe(
        exhaustMap((params: { isbn: string }) =>
          this.bookService.delete(params.isbn)
        ),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
