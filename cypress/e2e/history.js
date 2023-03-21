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
  it.only("The Disqus iframe should load successfully", () => {
    const testComment = "Checking the ability to write comments";
    cy.intercept({
      method: "GET",
      url: "https://disqus.com/api/3.0/forums/**",
      resourceType: "xhr",
    }).as("disqus");
    cy.visit("/history.html");

    cy.wait("@disqus").then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
      expect(request.headers).to.have.property("host", "disqus.com");
      expect(response.body.response.id).to.eq("eurobolat");
      expect(response.body.response.category).to.eq("Entertainment");
    });
    //
    cy.get("iframe[id^='dsq-app']").then((disqus) => {
      const body = disqus.contents().find("body");
      cy.wrap(body).as("disqusFrame");
    });
    cy.get("@disqusFrame").find("#reactions__container").should("be.visible");
    cy.get("@disqusFrame").find("#conversation").should("be.visible");
    cy.get("@disqusFrame")
      .find("div.textarea")
      .type(testComment, { force: true });
    cy.get("@disqusFrame")
      .find("div.textarea > p")
      .should("have.text", testComment);
  });
});
