import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { bookNa } from '../models';
import { of } from 'rxjs';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let template: HTMLElement;
  let store: Store;
  let mySpy;
  const mockbooks = [
    {
      ...bookNa(),
      title: 'Das Buch 1'
    },
    {
      ...bookNa(),
      title: 'Das Buch 2'
    },
    {
      ...bookNa(),
      title: 'Das Buch 3'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);

    mySpy = spyOn(store, 'select').and.returnValue(of(mockbooks));
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 books', () => {
    const titleElems = template.querySelectorAll('ws-book-card');
    expect(titleElems.length).toBe(mockbooks.length);
  });
});
