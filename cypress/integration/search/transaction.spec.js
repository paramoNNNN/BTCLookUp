/// <reference types="cypress" />

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.setUser();
});

afterEach(() => {
  cy.saveLocalStorage();
});

describe('Transaction search', () => {
  it('should show the given transaction info', () => {
    cy.fixture('hashes').then(({ transactionHash }) => {
      cy.getTransaction(transactionHash);
    });
  });
});

describe('Transaction subscribe', () => {
  it('should subscribe to transaction changes', () => {
    cy.fixture('hashes').then(({ transactionHash }) => {
      cy.getTransaction(transactionHash);
    });
    cy.get("button[title='Subscribe to changes']", { timeout: 10000 }).click({
      timeout: 10000,
    });
    cy.get('.toast').contains('Successfully subscribed to changes', {
      timeout: 10000,
    });
  });

  it('should unsubscribe from transaction changes', () => {
    cy.fixture('hashes').then(({ transactionHash }) => {
      cy.getTransaction(transactionHash);
    });
    cy.get("button[title='Unsubscribe']", { timeout: 10000 }).click();
    cy.get('.toast').contains('Removed from subscriptions', { timeout: 10000 });
  });
});
