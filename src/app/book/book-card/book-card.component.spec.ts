import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { bookNa } from '../models';

import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBe('huhu');
    expect(component).toBeTruthy();
  });

  it('should fall back to "na" on default', () => {
    const na = 'n/a';
    const myComp = new BookCardComponent();
    const book = myComp.content;
    expect(book.title).toBe(na);
  });

  it('should show title in Template', () => {
    const book = {
      ...bookNa(),
      title: 'Das Buch!'
    };
    // const titleElem = template.querySelector('mat-card-title');
    const titleElem = template.querySelector('[data-testid="book-title"]');
    expect(titleElem?.innerHTML).toBe('n/a');
    component.content = book;
    fixture.detectChanges();
    expect(titleElem?.innerHTML).toBe('Das Buch!');
  });
});
