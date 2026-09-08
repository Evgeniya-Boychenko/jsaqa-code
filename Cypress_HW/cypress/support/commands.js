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
Cypress.Commands.add("login", (email, pass) => {
  cy.contains("Log in").click();
  cy.get("#mail").type(email);
  cy.get("#pass").type(pass);
  cy.contains("Submit").click();
});

Cypress.Commands.add('loginWithEmptyEmail', (pass) => {
  cy.contains("Log in").click();
  cy.get('#mail').type(' ');
  cy.get('#pass').type(pass);
  cy.contains("Submit").click();
});

Cypress.Commands.add('loginWithEmptyPassword', (email) => {
  cy.contains("Log in").click();
  cy.get('#mail').type(email);
  cy.contains("Submit").click();
});

Cypress.Commands.add('goToBooks', () => {
  cy.visit('/');
  cy.login('bropet@mail.ru', '123');
  cy.contains('Books list').click();
});




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
