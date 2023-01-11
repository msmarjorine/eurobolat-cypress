/// <reference types = "cypress"/>

describe('Check the homepage', () => {
    it('The page should load successfully', () => {
        cy.intercept('GET', '**/client/homepage.js').as('homeScript')

        cy.visit('/')
        cy.title().should('eq', '#евроболат')
        cy.get('#main-title').should('be.visible')
            .and('have.css', 'fontSize', '50px')
        cy.get('#ukr').should('be.visible')
            .and('have.attr', 'src', 'pictures/Ukraine.png')
        cy.hover('#ukr').should('have.class', 'brighten')

        cy.wait('@homeScript').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            expect(response.body).to.contain('preved')
        })
    })
})