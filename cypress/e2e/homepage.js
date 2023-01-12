/// <reference types = "cypress"/>

describe('Check the homepage', () => {
    it('The page should load successfully', () => {
        cy.intercept('GET', '**/client/homepage.js').as('homeScript')

        cy.visit('/')
        cy.verifyGlobalElements()
        cy.title().should('eq', '#евроболат')

        cy.wait('@homeScript').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            expect(response.body).to.contain('preved')
        })
    })
})