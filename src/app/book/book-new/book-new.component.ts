import { Component, ɵɵtrustConstantResourceUrl } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { createBookStart } from '@store/book';
import { debounceTime, first, map, Observable, of, switchMap, take, tap, timer } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html'
})
export class BookNewComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private service: BookApiService) {
    this.form = this.buildForm();
  }

  create() {
    const book = { ...bookNa(), ...this.form.value };

    this.store.dispatch(createBookStart({ book }));
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required], [asyncNameValidator(this.service)]],
      author: ['', [Validators.required, nameValidator('Hans')]],
      cover: ['1', [], []]
    });
  }
}

const asyncNameValidator = (service: BookApiService): AsyncValidatorFn => (
  control: AbstractControl
): Observable<ValidationErrors | null> => {
  return timer(1).pipe(
    switchMap(() => {
      return service.isNameAvailable(control.value).pipe(
        map(data => {
          console.log('asyncNameValidator==>', data);
          if (!data) {
            return null;
          } else {
            return {
              name: 'Title ist schon vergeben. Pech gehabt KEULE'
            };
          }
        })
      );
    }),
    tap(data => console.log('error?', data))
  );
};

// In dem Control soll FOO stehen
const fooValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  console.log('==>', control);
  if (control.value === 'FOO') {
    return null;
  } else {
    return {
      foo: 'Value ist nicht FOO'
    };
  }
};

// const nameValidator = (name: string) => (control: AbstractControl): ValidationErrors | null => {
function nameValidator(name: string) {
  return function (control: AbstractControl): ValidationErrors | null {
    console.log('==>', control);
    if (control.value === name) {
      return null;
    } else {
      return {
        foo: 'Value ist nicht ' + name
      };
    }
  };
}
