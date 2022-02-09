import { Book } from './book';

export class BookNa implements Book {
  #na = 'n/a';

  abstract = 'n/a';
  author = 'n/a';
  cover = 'n/a';
  isbn = 'n/a';
  title = 'n/a';
  subtitle = 'n/a';
  numPages = 0;
  publisher = { name: 'n/a', url: 'n/a' };
}
