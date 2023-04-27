import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book, bookNa } from '../models';

import { BookCardComponent } from './book-card.component';

@Component({
  selector: 'sand-box',
  template: `<ws-book-card [content]="data"></ws-book-card>`
})
class SandBox {
  data: Book = bookNa();
}

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

describe('BookCardComponentSandBox', () => {
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
