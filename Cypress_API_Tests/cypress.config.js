const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'nzdhn9',
  e2e: {
    setupNodeEvents(on, config) {
      
    },
    baseUrl: 'http://localhost:8080',  
  },
});
