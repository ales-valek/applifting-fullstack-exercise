describe('Read an article from homepage', () => {
  it('See article detail from homepage', () => {
    cy.visit('http://localhost:3000');
    cy.findAllByText(/read whole article/i).spread((articleLink) =>
      articleLink.click()
    );
    cy.get('h1');
  });
});

export {};
