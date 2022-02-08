describe('Book Store', () => {
  beforeEach(() => {
    cy.visit('/books');
    cy.get('.mat-card').as('books');
  });
  it('As a user I want to see the heading of my app.', () => {
    cy.get('h2').should('contain.text', 'Books');
  });
  it('As a user I want to check if a book can be created.', () => {
    let countBefore = 0;
    cy.get('@books')
      .then(books => (countBefore = books.length))
      .then(() => {
        const randomISBN = Math.floor(1000000000000 + Math.random() * 900000);
        cy.get('[href="/books/new"').click();
        const fields = ['isbn', 'title', 'author', 'cover'];

        getInputAndType('isbn', randomISBN);
        getInputAndType('title', randomISBN);
        getInputAndType('author', 'Hans');

        cy.get('.mat-raised-button').contains('CREATE').click();
        cy.visit('/');
        cy.get('@books').should('have.length', countBefore + 1);
        cy.request('DELETE', 'http://localhost:4730/books/' + randomISBN);
      });
  });
});

const getInputAndType = (name: string, value: any) => {
  cy.get(`[formcontrolname="${name}"`).type(value);
};
