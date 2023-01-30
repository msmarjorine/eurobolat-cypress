const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "qowcgr",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://eurobolat.000webhostapp.com/",
    specPattern: "cypress/e2e/*.js",
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    videoUploadOnPasses: false,
  },
});
