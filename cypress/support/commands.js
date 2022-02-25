import 'cypress-localstorage-commands';
import { USER_ID_KEY } from 'consts';
import { nanoid } from 'nanoid';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setUser', () => {
  cy.getLocalStorage(USER_ID_KEY).then((userId) => {
    console.log(userId);
    if (userId === null) {
      cy.setLocalStorage(USER_ID_KEY, nanoid(8));
    }
  });
});

Cypress.Commands.add('getTransaction', (transactionHash) => {
  cy.visit('http://localhost:3000');

  cy.get('.select__control').click();
  cy.get('#react-select-select-option-1').click();

  cy.get("[name='query']").as('searchInput');
  cy.get('@searchInput').focus();
  cy.get('@searchInput').type(transactionHash);

  cy.get("button[type='submit']").click();
});
