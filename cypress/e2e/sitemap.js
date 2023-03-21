/// <reference types = "cypress"/>
const X2JS = require("x2js");

describe("Verify Sitemap and pages", () => {
  it("Should parse the sitemap", () => {
    cy.request({
      method: "GET",
      url: "/sitemap.xml",
    })
      .its("body")
      .then((body) => {
        const x2js = new X2JS();
        const json = x2js.xml2js(body);
        // get all URLs from the sitemap
        expect(json.urlset.url).to.be.an("array").and.have.length.gt(6);
        json.urlset.url.forEach((url) => {
          const parsed = new URL(url.loc);
          cy.log(parsed.pathname);
          // check if the resource exists by fetching it using the HEAD HTTP method.
          cy.request("HEAD", url.loc).its("status").should("eq", 200);
        });
      });
  });
});

//This was done thanks to the article https://glebbahmutov.com/blog/test-sitemap/
