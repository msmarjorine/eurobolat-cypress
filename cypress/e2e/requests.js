/// <reference types = "cypress"/>

describe("Verify http requests", () => {
  it("The homepage request should be successful", () => {
    cy.request({
      method: "GET",
      url: "/",
    }).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.headers).to.have.property("server", "LiteSpeed");
      expect(response.duration).to.be.lt(1000);
    });
  });
});
