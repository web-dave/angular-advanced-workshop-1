import { BookCardComponent } from './book-card.component';

describe('<ws-book-card>', () => {
  describe('unit', () => {
    describe('When no content is passed', () => {
      it('defaults to "n/a"', () => {
        const na = 'n/a';
        const component = new BookCardComponent();

        expect(component.content.title).toBe(na);
        expect(component.content.subtitle).toBe(na);
        expect(component.content.author).toBe(na);
      });
    });
  });
});
