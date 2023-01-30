/// <reference types = "cypress"/>

describe("Check the eurotrips page", () => {
  it("The page should load successfully", () => {
    cy.visit("/");
    cy.get("#emenu > li > a").contains("трипы").click();
    cy.title().should("eq", "путешествия");
    cy.verifyGlobalElements();
    cy.get("#teide").should("be.visible");
    cy.get("#drezden").should("be.visible");
    cy.verifyNaverh();
  });
  it("The video should work", () => {
    cy.visit("/eurotrips.html");
    cy.get("video.video1").as("loca");
    cy.get("@loca").should("have.attr", "poster", "pictures/loca-poster.jpg");
    cy.get("@loca").should("have.prop", "paused", true);
    cy.get("@loca").then(($video) => {
      $video[0].play();
      cy.get("@loca").should("have.prop", "paused", false);
      cy.wait(3000);
    });
  });
  it("The flags section should work", () => {
    cy.visit("/eurotrips.html");
    cy.verifyCountries();
  });
});
