const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "mpgasy",
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1366,  // ← ширина экрана ноутбука
    viewportHeight: 768,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
