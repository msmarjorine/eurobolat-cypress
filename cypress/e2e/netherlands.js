/// <reference types = "cypress"/>

describe("Check the netherlands page", () => {
  it("The page should open successfullly", () => {
    cy.visit("/news.html");
    cy.get("button.btn-news").contains("Смотреть").click();
    cy.url().should("contain", "/netherlands.html");
    cy.title().should("eq", "нидерланды");
    cy.verifyGlobalElements();
    cy.get("#porches").should("be.visible");
    cy.verifyNaverh();
  });
  it("The video should work", () => {
    cy.visit("/netherlands.html");
    cy.get("video.video1").as("dancefloor");
    cy.get("@dancefloor").should(
      "have.attr",
      "poster",
      "pictures/NLposter.jpg"
    );
    cy.get("@dancefloor").should("have.prop", "paused", true);
    cy.get("@dancefloor").then(($video) => {
      $video[0].play();
      cy.get("@dancefloor").should("have.prop", "paused", false);
      cy.wait(3000);
    });
  });
  it("The instagram iframe should load", () => {
    cy.intercept({
      method: "GET",
      hostname: "scontent.cdninstagram.com",
      pathname:
        "/v/t51.2885-15/345890176_151622801049493_8388843501225896512_n.jpg",
      resourceType: "image",
    }).as("instaFrame");
    cy.visit("/netherlands.html");
    cy.checkInstaFrame();
    cy.get("#instagram-embed-0").should("exist");
  });
});
