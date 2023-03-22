describe('Redirect on protected routes', () => {
  it('Redirect on protected routes', () => {
    cy.visit('http://localhost:3000/admin/articles');
    cy.url().should('include', '/admin/login');
    cy.visit('http://localhost:3000/admin/articles/articleId/edit');
    cy.url().should('include', '/admin/login');
    cy.visit('http://localhost:3000/admin/articles/create');
    cy.url().should('include', '/admin/login');
  });
});

export {};
