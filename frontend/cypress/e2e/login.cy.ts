describe('Login', () => {
  it('Login and logout', () => {
    cy.visit('http://localhost:3000');
    // Redirect to login page
    cy.findByText(/log in/i).click();
    cy.findByLabelText(/username/i).type(Cypress.env('username'));
    cy.findByLabelText(/password/i).type(Cypress.env('password'));
    cy.findByRole('button', { name: /log in/i }).click();

    // Redirect to my articles
    cy.url().should('include', '/admin/articles');

    // Log out from dropdown
    cy.findByLabelText('dropdown').click();
    cy.findByText(/Log out/i).click();
    cy.url().should('include', '/admin/login');
  });
});

export {};
