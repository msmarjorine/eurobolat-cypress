/// <reference types = "cypress"/>

describe("Check the Animals Test page", () => {
  before(() => {
    cy.fixture("animalsTest").then((data) => {
      globalThis.data = data;
    });
  });
  it("The page should load successfully", () => {
    cy.visit("/");
    cy.get("#emenu > li > a").contains("тест").click();
    cy.title().should("eq", "кто ты");
    cy.verifyGlobalElements();
    cy.get('img[src*="bagniuk"]').should("be.visible");
    cy.get("h2.cal").should("have.text", "Кто ты по славянскому календарю?");
  });
  it("Should submit the form with valid data", () => {
    cy.visit("/calendar.html");
    cy.verifyForm(data.name, data.year);
    cy.url().should("include", data.year);
    cy.title().should("eq", "результат");
    cy.get("#yourAn").should("contain", data.name);
    cy.get('img[src*="creatures1"]').should("be.visible");
    cy.get("a")
      .contains("По ссылке")
      .should("have.attr", "href")
      .and("contain", "slavyanskij-kalendar-zhivotnyh-po-godam");
  });
  it("Should not be able to submit with invalid year", () => {
    cy.visit("/calendar.html");
    cy.verifyForm(data.name, data.yearInvalid);
    cy.title().should("eq", "кто ты");
  });
});
