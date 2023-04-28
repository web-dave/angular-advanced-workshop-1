import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book, bookNa } from '../models';

import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When no content is passed', () => {
    it('defaults to "n/a"', () => {
      // expect(component.content.isbn).toBe('n/a');
      console.log(component.content);

      expect(component.content).toEqual({
        abstract: 'n/a',
        author: 'n/a',
        cover: 'n/a',
        isbn: 'n/a',
        title: 'n/a',
        subtitle: 'n/a',
        numPages: 0,
        publisher: { name: 'n/a', url: 'n/a' }
      });
    });
  });
});

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sand-box',
  template: `<ws-book-card [content]="data"></ws-book-card>`
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class SandBox {
  data: Book = bookNa();
}
describe('BookCardComponent in a SandBox', () => {
  let component: SandBox;
  let fixture: ComponentFixture<SandBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SandBox, BookCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show "n/a" in Template', () => {
    expect(fixture.debugElement.nativeElement.innerText).toContain('n/a');
  });

  it('should show "DAS BUCH" in Template', () => {
    component.data.title = 'DAS BUCH';

    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.innerText).toContain('DAS BUCH');
  });
});

//==================================================================================

import { createComponentFactory, Spectator } from '@ngneat/spectator';

describe('Spectator BookCardComponent Test', () => {
  let spectator: Spectator<BookCardComponent>;
  let createComponent = createComponentFactory(BookCardComponent);
  beforeEach(async () => {
    spectator = createComponent();
  });

  it('should show "n/a" in Template', () => {
    expect(spectator.query('mat-card-title')?.innerHTML).toBe('n/a');
  });

  it('should show "DAS BUCH" in Template', () => {
    const book: Book = {
      abstract: 'n/a',
      author: 'n/a',
      cover: 'n/a',
      isbn: 'n/a',
      title: 'DAS BUCH',
      subtitle: 'n/a',
      numPages: 0,
      publisher: { name: 'n/a', url: 'n/a' }
    };

    spectator.setInput('content', book);
    expect(spectator.query('mat-card-title')?.innerHTML).toBe('DAS BUCH');
  });
});
