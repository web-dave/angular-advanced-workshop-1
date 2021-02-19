import { Book } from './book';

export const emptyBook: () => Book = () => ({
  id: '',
  title: '',
  subtitle: '',
  cover: '',
  isbn: '',
  abstract: '',
  numPages: 0,
  author: '',
  publisher: {
    name: '',
    url: ''
  }
});
