import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { bookNa } from '../models';
import { Store } from '@ngrx/store';
import { createBookStart } from '../store/book-collection.actions';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html'
})
export class BookNewComponent implements OnDestroy {
  sink = new Subscription();
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private store: Store) {
    this.form = this.buildForm();
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  create() {
    const book = { ...bookNa(), ...this.form.value };
    this.store.dispatch(createBookStart({ book }));
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['']
    });
  }
}
