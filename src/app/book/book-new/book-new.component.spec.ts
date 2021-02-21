import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BookNewComponent } from './book-new.component';

describe('<ws-book-new>', () => {
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
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });

    fixture = TestBed.createComponent(BookNewComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  describe('When an ISBN has less than 3 characters', () => {
    it('displays an error message', async () => {
      const isbnFormField = await loader.getHarness(MatFormFieldHarness.with({ selector: '[data-test=isbn-field]' }));
      const isbnInput = (await isbnFormField.getControl()) as MatInputHarness;

      await isbnInput.setValue('12');
      await isbnInput.blur();

      const isbnErrors = await isbnFormField.getTextErrors();

      expect(isbnErrors).toContain('ISBN has to be at least 3 characters long.');
    });
  });
});
