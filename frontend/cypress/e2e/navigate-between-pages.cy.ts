describe('Navigate between navbar pages', () => {
  it('Navigate between pages', () => {
    cy.visit('http://localhost:3000');
    cy.findByText(/about/i).click();
    cy.url().should('include', '/about');
    cy.findByText(/log in/i).click();
    cy.url().should('include', '/admin/login');
    cy.findByText(/recent articles/i).click();
    cy.url().should('include', '/articles');
  });
});

export {};
