/// <reference types="cypress" />

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.setUser();
});

afterEach(() => {
  cy.saveLocalStorage();
});

describe('Transaction search', () => {
  it('Should show the given transaction info', () => {
    cy.fixture('hashes').then(({ transactionHash }) => {
      cy.getTransaction(transactionHash);
    });
    cy.get('h5', { timeout: 10000 }).contains('Transaction');
  });
});

describe('Transaction subscribe', () => {
  it('Should subscribe to transaction changes', () => {
    cy.fixture('hashes').then(({ transactionHash }) => {
      cy.getTransaction(transactionHash);
    });
    cy.get("button[title='Subscribe to changes']", { timeout: 10000 }).click({
      timeout: 10000,
    });
    cy.get('.toast', {
      timeout: 10000,
    }).contains('Successfully subscribed to changes');
  });

  it('Should unsubscribe from transaction changes', () => {
    cy.fixture('hashes').then(({ transactionHash }) => {
      cy.getTransaction(transactionHash);
    });
    cy.get("button[title='Unsubscribe']", { timeout: 10000 }).click();
    cy.get('.toast', { timeout: 10000 }).contains('Removed from subscriptions');
  });
});
