# Cypress API Testings Demo

[![Cypress and Postman Tests](https://github.com/jpourdanis/trelloapp-testing/actions/workflows/main.yml/badge.svg?branch=api-testing&event=push)](https://github.com/jpourdanis/trelloapp-testing/actions/workflows/main.yml)

### Installation for external API Testing

1. Create an account to https://gorest.co.in/
2. Create an API Token
3. Create to root folder a `cypress.env.json` file that contains the token configuration :

```json
{
  "token": "<Your-API-Token-Here>"
}
```

4. Run `npm install`
5. Run `npm run cy:open`
6. Run [cypress/e2e/api/external/graphql.ts](cypress/e2e/api/external/graphql.ts) and [cypress/e2e/api/external/rest.ts](cypress/e2e/api/external/rest.ts)

### Instalation for local API Testing

> Before we start, open this in a new tab and let the container load. Takes a few mins. Longer for slower internet.

[![Try in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/jpourdanis/trelloapp-testing/tree/api-testing)

1. Run `npm install`
2. Run `npm start`
3. Open your browser to verify that the app running on http://localhost:3000
4. Open a new terminal window and run `npm run cy:open`
5. Run [cypress/e2e/api/local/board.ts](cypress/e2e/api/local/board.ts)
6. See GitHub Actions on every push for CI results.
