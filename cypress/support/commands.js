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
Cypress.Commands.add("hover", (element) => {
  cy.get(element).trigger("mouseover");
});
Cypress.Commands.add("verifyGlobalElements", () => {
  cy.get("#eheader").should("exist");
  cy.get("#efooter").should("exist");
  cy.get("div.wrapper").should("exist");
  cy.get("#main-title")
    .should("be.visible")
    .and("have.css", "fontSize", "50px");
  cy.get("#ukr")
    .should("be.visible")
    .and("have.attr", "src", "pictures/Ukraine.png");
  cy.hover("#ukr").should("have.class", "brighten");
});
Cypress.Commands.add("verifyMenu", () => {
  cy.get("#emenu > li > a")
    .eq(0)
    .should("contain", "история")
    .and("have.attr", "href", "history.html");
  cy.get("#emenu > li > a")
    .eq(1)
    .should("contain", "трипы")
    .and("have.attr", "href", "eurotrips.html");
  cy.get("#emenu > li > a")
    .eq(2)
    .should("contain", "мзгб")
    .and("have.attr", "href", "mozgoboyna.html");
  cy.get("#emenu > li > a")
    .eq(3)
    .should("contain", "новости")
    .and("have.attr", "href", "news.html");
  cy.get("#emenu > li > a")
    .eq(4)
    .should("contain", "тест")
    .and("have.attr", "href", "calendar.html");
  cy.get("#emenu > li > a")
    .eq(5)
    .should("contain", "музло")
    .and("have.attr", "href", "music.html");
});
Cypress.Commands.add("verifyNaverh", () => {
  cy.get("#naverh").should("not.be.visible");
  cy.get("#efooter")
    .scrollIntoView()
    .then(() => {
      cy.get("#naverh").should("be.visible");
      cy.get("#naverh").click();
      cy.get("#eheader").should("be.visible");
      cy.get("#naverh").should("not.be.visible");
    });
});
Cypress.Commands.add("verifyCountries", () => {
  cy.get("#countries").should("have.css", "justifyContent", "space-around");
  cy.get("#countries > li > a").as("countryLinks");
  cy.get("@countryLinks").its("length").should("eq", 12);
  cy.get("@countryLinks").each(($el, index, list) => {
    expect($el.attr("href")).to.contain("instagram.com");
  });
});
Cypress.Commands.add("verifyNews", () => {
  cy.get(".news-item").as("newsItems");
  cy.get("@newsItems").its("length").should("be.at.least", 13);
  cy.get("@newsItems")
    .first()
    .should("have.css", "backgroundColor", "rgb(185, 217, 201)");
  cy.get("@newsItems")
    .first()
    .find(".news-text")
    .find(".time-date")
    .should("have.css", "fontStyle", "italic");
});
Cypress.Commands.add("verifyClips", () => {
  cy.get(".youTubeVideo").as("clipsItems");
  cy.get("@clipsItems").its("length").should("be.at.least", 18);
  cy.get("@clipsItems").first().should("have.css", "flexBasis", "45%");
  cy.get(".youTubeCaption").first().should("be.visible");
});
Cypress.Commands.add("verifyForm", (name, year) => {
  cy.get("#username").should("have.attr", "placeholder", "Твоё имя");
  cy.get("#birthyear").should("have.attr", "placeholder", "Год рождения");
  cy.get("#username").type(name);
  cy.get("#birthyear").type(year);
  cy.get("#username").should("have.value", name);
  cy.get("#birthyear").should("have.value", year);
  cy.get("#submitCal").click();
});
