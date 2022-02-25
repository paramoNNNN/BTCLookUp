/// <reference types="cypress" />

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.setUser();
});

afterEach(() => {
  cy.saveLocalStorage();
});

describe('Address search', () => {
  it('Should show the given address info', () => {
    cy.fixture('hashes').then(({ addressHash }) => {
      cy.getAddress(addressHash);
    });
    cy.get('h5', { timeout: 10000 }).contains('Address');
  });
});

describe.only('Address subscribe', () => {
  it('Should subscribe to address changes', () => {
    cy.fixture('hashes').then(({ addressHash }) => {
      cy.getAddress(addressHash);
    });
    cy.get("button[title='Subscribe to changes']", { timeout: 10000 }).click({
      timeout: 10000,
    });
    cy.get('.toast', {
      timeout: 10000,
    }).contains('Successfully subscribed to changes');
  });

  it('Should unsubscribe from address changes', () => {
    cy.fixture('hashes').then(({ addressHash }) => {
      cy.getAddress(addressHash);
    });
    cy.get("button[title='Unsubscribe']", { timeout: 10000 }).click();
    cy.get('.toast', { timeout: 10000 }).contains('Removed from subscriptions');
  });
});
