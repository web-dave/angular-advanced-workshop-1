import { Component, Input } from '@angular/core';
import { Book, bookNa } from '../models';

@Component({
  selector: 'ws-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() content: Book = bookNa();
  foo = 'Bar';
  baz() {
    return 'BASS';
  }
}
