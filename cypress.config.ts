import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    coverage: false,
  },
  projectId: "7vknyb",
  retries: {
    openMode: 0,
    runMode: 10,
  },
  video: true,
  viewportHeight: 550,
  viewportWidth: 700,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      config.env.EXTERNAL_API_URL = "https://gorest.co.in/public/v2";
      return require("./cypress/plugins/index.ts")(on, config);
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
});
