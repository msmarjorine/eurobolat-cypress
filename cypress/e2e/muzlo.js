/// <reference types = "cypress"/>

describe("Check the music page", () => {
  //Flaky tests due to slow loading of all iframes and associated files
  it("Verify that page loads successfully", () => {
    cy.visit("/music.html", { timeout: 100000 });
    cy.title().should("eq", "клипцы");
    cy.verifyGlobalElements();
    cy.verifyNaverh();
    cy.verifyClips();
  });

  it("Verify the youtube iframe", () => {
    cy.visit("/music.html", { timeout: 100000 });
    cy.get('iframe[src$="ee6Et8hBYxY"]').then((iframeYT) => {
      const head = iframeYT.contents().find("head");
      cy.wrap(head).as("iframeYTHead");
      const body = iframeYT.contents().find("body");
      cy.wrap(body).as("iframeYTBody");
    });
    cy.get("@iframeYTHead")
      .find("title")
      .should("have.text", "NAVIBAND - Свяці (2022) - YouTube");
    cy.get("@iframeYTBody").find("#player").should("have.attr", "style");
    cy.get("@iframeYTBody")
      .find("button.ytp-large-play-button-red-bg")
      .should("have.class", "ytp-large-play-button");
    cy.get("@iframeYTBody")
      .find("button.ytp-large-play-button-red-bg")
      .click()
      .should("not.be.visible");
  });
});
