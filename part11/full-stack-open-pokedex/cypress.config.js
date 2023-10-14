const { defineConfig } = require('cypress')

/* global module */
module.exports = defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
})
