import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookApiService } from '../shared/book-data.service';
import { emptyBook } from '../shared/book-empty';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html'
})
export class BookNewComponent implements OnInit, OnDestroy {
  sink = new Subscription();
  form: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookApiService) {}

  ngOnInit() {
    this.form = this.fb.group({
      isbn: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13)
        ]
      ],
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  create() {
    const book = { ...emptyBook(), ...this.form.value };
    this.sink.add(this.bookService.create(book).subscribe());
  }
}
