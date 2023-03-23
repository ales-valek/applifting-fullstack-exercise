describe('Article mutation', () => {
  it('Login, create, edit and delete article', () => {
    // Add alias for articles request
    cy.intercept({
      method: 'GET',
      url: 'https://fullstack.exercise.applifting.cz/articles',
    }).as('articlesData');

    // Login
    cy.visit('http://localhost:3000');
    cy.findByText(/log in/i).click();
    cy.findByLabelText(/username/i).type(Cypress.env('username'));
    cy.findByLabelText(/password/i).type(Cypress.env('password'));
    cy.findByRole('button', { name: /log in/i }).click();

    // See articles
    cy.url().should('include', '/admin/articles');
    cy.wait('@articlesData').its('response.statusCode').should('equal', 200);

    cy.findByText(/create article/i).click();

    // Redirect to article creation
    cy.url().should('include', '/admin/articles/create');

    // Create article
    cy.get('input[aria-labelledby="title"]').type('Testing Title #1');
    cy.get('label[for="file"]')
      .click()
      .selectFile('./cypress/fixtures/article-image.jpg');
    cy.get('textarea[aria-labelledby="perex"]').type('Perex #1');
    cy.get('textarea[aria-labelledby="content"]').type(
      'Very long article content...'
    );
    cy.findByRole('button', { name: /publish article/i })
      .should('be.visible')
      .click();

    // Redirect to articles list
    cy.url().should('include', '/admin/articles');
    cy.wait('@articlesData').its('response.statusCode').should('equal', 200);

    // Open edit article page
    cy.findAllByText('Testing Title #1').spread((article) =>
      article.parentElement.querySelector('a[aria-label="edit"]').click()
    );

    // Edit article
    cy.get('input[aria-labelledby="title"]').type(' extended');

    cy.get('label[for="file"]').selectFile(
      './cypress/fixtures/article-image.jpg'
    );

    cy.findByRole('button', { name: /delete/i }).click();

    cy.get('label[for="file"]').selectFile(
      './cypress/fixtures/article-image.jpg'
    );
    cy.get('textarea[aria-labelledby="perex"]').type(' extended');
    cy.get('textarea[aria-labelledby="content"]').type(' extended');

    // Redirect to articles
    cy.findByRole('button', { name: /publish article/i })
      .should('be.visible')
      .click();

    // Delete article
    cy.findAllByText('Testing Title #1 extended').spread((article) =>
      article.parentElement.querySelector('button[aria-label="delete"]').click()
    );
    cy.wait('@articlesData').its('response.statusCode').should('equal', 200);
    cy.findAllByText('Testing Title #1 extended').should('not.exist');
  });
});

export {};
