# Cypress API Testings Demo

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

1. Run `npm install`
2. Run `npm start`
3. Open your browser to verify that the app running on http://localhost:3000
4. Open a new terminal windows and run `npm run cy:open`
5. Run [cypress/e2e/api/local/board.ts](cypress/e2e/api/local/board.ts)
