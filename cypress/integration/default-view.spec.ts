/// <reference types="../support/commands" />

describe('Default View', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('should see default view tab with sessionId alert and FaceLivenessDetector card', () => {
    cy.intercept(/start/).as('startLiveness');

    cy.waitFor('@startLiveness');
    cy.findByText(/Session ID*/).should('exist');
    // cy.findByText('Photosensitivity warning').should('exist');
  });
});
