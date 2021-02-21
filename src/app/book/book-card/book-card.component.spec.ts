import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Book, BookNa } from '../models';
import { BookCardComponent } from './book-card.component';

describe('<ws-book-card>', () => {
  describe('unit', () => {
    describe('When no content is passed', () => {
      it('defaults to "n/a"', () => {
        const na = 'n/a';
        const component = new BookCardComponent();

        expect(component.content.title).toBe(na);
        expect(component.content.subtitle).toBe(na);
        expect(component.content.author).toBe(na);
      });
    });
  });

  describe('template', () => {
    let fixture: ComponentFixture<BookCardComponent>;
    let book: Book;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [BookCardComponent],
        imports: [MatCardModule, RouterTestingModule]
      });

      fixture = TestBed.createComponent(BookCardComponent);
      fixture.detectChanges();

      book = {
        ...new BookNa(),
        title: 'My book'
      };
    });

    describe('When content is passed', () => {
      it('renders the content', () => {
        fixture.componentInstance.content = book;
        fixture.detectChanges();

        const titleFixture = fixture.debugElement.query(By.css('[data-test=book-card-title]'));
        const titleElement: HTMLElement = titleFixture.nativeElement;

        expect(titleElement.innerHTML).toBe(book.title);
      });
    });

    describe('When no content is passed', () => {
      it('renders "n/a"', () => {
        const titleFixture = fixture.debugElement.query(By.css('[data-test=book-card-title]'));
        const titleElement: HTMLElement = titleFixture.nativeElement;

        expect(titleElement.innerHTML).toBe('n/a');
      });
    });
  });
});
