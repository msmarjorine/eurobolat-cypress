/// <reference types = "cypress"/>

describe('Check the news page', () => {
    it('The page should load successfully', () => {
        cy.visit('/')
        cy.get('#emenu > li > a').contains('музло').click()
        cy.title().should('eq', 'клипцы')
        cy.verifyGlobalElements()
        cy.verifyNaverh()
    })
    it('Verify video grid', () => {
        cy.visit('/music.html')
        cy.verifyClips()

    })
    it('Verify the youtube iframe', () => {
        cy.visit('/music.html')
        cy.get('iframe[src$="ee6Et8hBYxY"]').then($iframeYT => {
            const head = $iframeYT.contents().find('head')
            cy.wrap(head).as('iframeYTHead')
            const body = $iframeYT.contents().find('body')
            cy.wrap(body).as('iframeYTBody')
        })
        cy.get('@iframeYTHead').find('title').should('have.text', 'NAVIBAND - Свяці (2022) - YouTube')
        cy.get('@iframeYTBody').find('#player').should('have.attr', 'style')
        cy.get('@iframeYTBody').find('button[aria-label="Смотреть"]').should('have.class', 'ytp-large-play-button')
        cy.get('@iframeYTBody').find('button[aria-label="Смотреть"]').click()
            .should('not.be.visible')

    })

})