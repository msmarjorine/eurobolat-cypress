/// <reference types = "cypress"/>

describe("Check the homepage", () => {
  it("The page should load successfully", () => {
    cy.intercept({
      method: "GET",
      url: "**/homepage.js",
      resourceType: "script",
    }).as("homeScript");
    cy.visit("/");
    cy.wait("@homeScript").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.contain("preved");
    });

    cy.verifyGlobalElements();
    cy.title().should("eq", "#евроболат");
    cy.verifyMenu();
    cy.get("#grtn").should("be.visible");
    cy.get("#champions").should("be.visible");
    cy.get("#pazanskaya").should("be.visible");
    cy.get("div.grid-item-two")
      .should("have.css", "backgroundImage")
      .and("contain", "volchara.png");
  });

  //Should debug this. Looks like yandex is protecting from autorequests somehow?
  it.skip("The yandex iframe should load successfully", () => {
    cy.intercept({
      method: "GET",
      url: "https://music.yandex.by/api/v2.1/index/music.yandex.by",
      resourceType: "xhr",
    }).as("yandexMusic");
    cy.visit("/");

    cy.wait("@yandexMusic", { timeout: 20000 }).then(
      ({ request, response }) => {
        expect(response.statusCode).to.eq(200);
        expect(request.headers).to.have.property(
          "referer",
          "https://music.yandex.by/iframe/"
        );
      }
    );
    cy.get('iframe[src*="music.yandex.by/iframe/"]').as("yandexFrame");
    cy.get("@yandexFrame").should("be.visible");
  });
});
