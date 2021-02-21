import { Book } from './book';

export class BookNa implements Book {
  #na = 'n/a';

  abstract = this.#na;
  author = this.#na;
  cover = this.#na;
  isbn = this.#na;
  title = this.#na;
  subtitle = this.#na;
  numPages = 0;
  publisher = { name: this.#na, url: this.#na };
}
