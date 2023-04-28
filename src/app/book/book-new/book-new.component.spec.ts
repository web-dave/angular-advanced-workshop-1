import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BookNewComponent } from './book-new.component';
import { MatInputHarness } from '@angular/material/input/testing';

describe('BookNewComponent', () => {
  let fixture: ComponentFixture<BookNewComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookNewComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    fixture = TestBed.createComponent(BookNewComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  describe('When an ISBN has less than 3 characters', () => {
    it('displays an error message', async () => {
      const isbnFormField = await loader.getHarness(MatFormFieldHarness.with({ selector: '[data-test-id="isbn"]' }));
      const isbnInput = (await isbnFormField.getControl()) as MatInputHarness;

      let isbnError = await isbnFormField.getTextErrors();
      expect(isbnError.length).toBe(0);

      await isbnInput.setValue('12');
      await isbnInput.blur();
      isbnError = await isbnFormField.getTextErrors();

      expect(isbnError.length).toBe(1);
      expect(isbnError).toContain('ISBN has to be at least 3 characters long.');
    });
  });
});
// =====================================================================

import { createComponentFactory, Spectator } from '@ngneat/spectator';
describe('BookNewComponent with SPectator', () => {
  let spectator: Spectator<BookNewComponent>;
  let createComponent = createComponentFactory({
    component: BookNewComponent,
    imports: [
      NoopAnimationsModule,
      ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      HttpClientTestingModule,
      RouterTestingModule
    ]
  });
  beforeEach(async () => {
    spectator = createComponent();
  });

  describe('When an ISBN has less than 3 characters', () => {
    it('displays an error message', () => {
      expect(spectator.queryAll('mat-error').length).toBe(0);
      spectator.typeInElement('12', '#isbn');
      spectator.blur('#isbn');

      expect(spectator.queryAll('mat-error').length).toBe(1);

      expect(spectator.queryAll('mat-error')).toContainText('ISBN has to be at least 3 characters long.');
    });
  });
});
