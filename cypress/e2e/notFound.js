/// <reference types = "cypress"/>

describe("Check the 404 page", () => {
  it("The not found page should load", () => {
    cy.visit("/something", { failOnStatusCode: false });
    cy.request({ url: "/something", failOnStatusCode: false })
      .its("status")
      .should("eq", 404);
    cy.title().should("eq", "ой");
    cy.verifyGlobalElements();
    cy.get("#czterysta1").should("have.css", "fontSize", "60px");
    cy.get("#lagente").should("be.visible");
  });
});
