/// <reference types = "cypress"/>

describe('Check the news page', () => {
    it.skip('The page should load successfully', () => {
        cy.visit('/')
        cy.get('#emenu > li > a').contains('новости').click()
        cy.title().should('eq', 'новости')
        cy.verifyGlobalElements()
        cy.verifyNaverh()
    })
    it('Verify the news items', () => {
        cy.visit('/news.html')
        cy.verifyNews()
    })
})