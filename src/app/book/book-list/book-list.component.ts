import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../shared/book';
import { BookApiService } from '../shared/book-api.service';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private bookData: BookApiService) {}

  ngOnInit() {
    this.books$ = this.bookData.getAll();
  }
}
