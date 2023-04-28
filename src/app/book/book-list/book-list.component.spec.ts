import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NEVER, of } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book, bookNa } from '../models';
import { BookListComponent } from './book-list.component';

const mockApi = {
  getAll: () => of([bookNa()])
};

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let apiSpy: jasmine.SpyObj<BookApiService>;
  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj<BookApiService>(['getAll']);
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      providers: [
        {
          provide: BookApiService,
          //   useFactory: () => mockApi
          useValue: apiSpy
        }
      ]
    }).compileComponents();
    // apiSpy = spyOn(BookApiService, 'getAll');
    apiSpy.getAll.and.returnValue(of([bookNa()]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll', foo => {
    expect(apiSpy.getAll).toHaveBeenCalled();
    foo();
  });
});
