import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from './models';

@Injectable({ providedIn: 'root' })
export class BookApiService {
  private endpoint = 'http://localhost:4730/books';

  constructor(private http: HttpClient, private notification: MatSnackBar) {}

  getAll(): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${this.endpoint}`)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          err.status === 500
            ? throwError(new Error('Sorry, we could not load any books'))
            : throwError(new Error('Sorry, we have connectivity issues.'))
        )
      );
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.endpoint}/${isbn}`);
  }

  create(book: Book): Observable<Book> {
    return this.http
      .post<Book>(`${this.endpoint}`, book)
      .pipe(tap({ error: (error: HttpErrorResponse) => this.notification.open(error.error, '', { duration: 5000 }) }));
  }

  update(isbn: string, patch: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.endpoint}/${isbn}`, patch);
  }

  delete(isbn: string): Observable<Book> {
    return this.http.delete<Book>(`${this.endpoint}/${isbn}`);
  }
}
