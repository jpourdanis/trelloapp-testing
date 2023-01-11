describe("Login form testing", () => {
  let randomUserEmail =
    (Math.random() + 1).toString(36).substring(7) + "@mail.com";
  let randomPassword = (Math.random() + 1).toString(36).substring(7);

  before(() => {
    cy.log("should create a user.");
    cy.request({
      method: "POST",
      url: "/signup",
      body: { email: randomUserEmail, password: randomPassword },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("should be able to login", () => {
    cy.visit("/");
    cy.intercept("http://localhost:3000/login").as("LoginResponse");
    cy.get('[data-cy="login-menu"').click();
    cy.get("#loginEmail").type(randomUserEmail);
    cy.get("#loginPassword").type(randomPassword);
    cy.get('[data-cy="login"').click();
    cy.wait("@LoginResponse");
  });

  it("should validate the logged in user name at top right.", () => {
    /**
     * your code here
     */
  });

  it("should validate the logged in success message to the top.", () => {
    /**
     * your code here
     */
  });

  after(() => {
    cy.log("should delete all users.");
    cy.request({
      method: "DELETE",
      url: "/users",
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
