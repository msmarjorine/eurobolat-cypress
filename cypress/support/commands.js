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
Cypress.Commands.add('hover', element => {
    cy.get(element).trigger('mouseover')

})
Cypress.Commands.add('verifyGlobalElements', () => {
    cy.get('#eheader').should('exist')
    cy.get('#efooter').should('exist')
    cy.get('div.wrapper').should('exist')
    cy.get('#main-title').should('be.visible')
        .and('have.css', 'fontSize', '50px')
    cy.get('#ukr').should('be.visible')
        .and('have.attr', 'src', 'pictures/Ukraine.png')
    cy.hover('#ukr').should('have.class', 'brighten')
})