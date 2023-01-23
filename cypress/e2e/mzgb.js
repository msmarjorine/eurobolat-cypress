/// <reference types = "cypress"/>

describe('Check the mzgb page', () => {
    it('The page should load successfully', () => {
        cy.visit('/')
        cy.get('#emenu > li > a').contains('мзгб').click()
        cy.title().should('eq', 'мозгобойня')
        cy.verifyGlobalElements()
        cy.get('#mozbol').should('be.visible')
        cy.verifyNaverh()
    })
    it('The video should work', () => {
        cy.visit('/mozgoboyna.html')
        cy.get('video.video1').as('champagne')
        cy.get('@champagne').should('have.attr', 'poster', 'pictures/poster.jpg')
        cy.get('@champagne').should('have.prop', 'paused', true)
        cy.get('@champagne').then($video => {
            $video[0].play()
            cy.get('@champagne').should('have.prop', 'paused', false)
            cy.wait(3000)
        })
    })
    it('The rating section should work', () => {
        cy.visit('/mozgoboyna.html')
        cy.get('#mzgbbrst').should('have.css', 'backgroundColor', 'rgb(74, 0, 69)')
        cy.get('#mzgbbttn').parent().should('have.attr', 'href')
        .and('contain', 'mzgb.net/results')

    })
    it('The telegram section should work', () => {
        cy.visit('/mozgoboyna.html')
        cy.get('#telega').should('have.css', 'textAlign', 'center')
        cy.get('#tgic').should('have.attr', 'src')
        .and('contain', 'icons8-telegram-app-64.png')
        cy.get('#tgic').parent().should('have.attr', 'href')
        .and('contain', 'addstickers/eurobolat')
    })

})