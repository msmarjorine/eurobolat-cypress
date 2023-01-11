const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"https://eurobolat.000webhostapp.com/",
    specPattern: "cypress/e2e/*.js",
    viewportWidth: 1366,
    viewportHeight: 768,
    pageLoadTimeout: 120000
  },
});
