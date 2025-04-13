const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 800,
    chromeWebSecurity: false,
    retries: {
      runMode: 3,
      openMode: 0
    },
    waitForAnimations: true,
    experimentalWebKitSupport: true,
    testIsolation: true
  },
});
