/// <reference types="../support/commands" />

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to login', () => {
    cy.login();
    cy.findByRole('button', { name: 'Log out' }).should('exist');
  });

  it('should be able to log out', () => {
    cy.login();
    cy.findByRole('button', { name: 'Log out' }).click();
    cy.findByRole('button', { name: 'Sign in' }).should('exist');
  });
});
