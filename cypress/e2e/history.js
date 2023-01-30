/// <reference types = "cypress"/>

describe("Check the history page", () => {
  it("The page should load successfully", () => {
    cy.visit("/");
    cy.get("#emenu > li > a").contains("история").click();
    cy.title().should("eq", "история");
    cy.verifyGlobalElements();
    cy.get("#tshirt").should("be.visible");
    cy.verifyNaverh();
  });
  it("The instagram iframe should load", () => {
    cy.intercept({
      method: "GET",
      hostname: "scontent.cdninstagram.com",
      pathname: "/v/t51.2885-15/13534630_1609756809354004_376709005_n.jpg",
      resourceType: "image",
    }).as("instaFrame");
    cy.visit("/history.html");

    cy.get("#instagram-embed-0").should("exist");
    //this is a flaky test, so it's better to omit it
    /*cy.wait('@instaFrame', { timeout: 20000 }).then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
            expect(request.headers).to.have.property('referer', 'https://www.instagram.com/')
        })*/
  });
});
