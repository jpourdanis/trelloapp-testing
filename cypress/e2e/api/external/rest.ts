describe("Api calls to gorest.co.in with REST", () => {
  let newUserId: Number;
  const randomUserEmail = Math.round(Math.random() * 100000) + "@email.com";

  before(() => {
    cy.log("should create a user");
    cy.request({
      method: "POST",
      url: `${Cypress.env("EXTERNAL_API_URL")}/users`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      qs: {
        name: "John Pourdanis",
        email: randomUserEmail,
        gender: "male",
        status: "active",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", "John Pourdanis");
      expect(response.body).to.have.property("email", randomUserEmail);

      newUserId = response.body["id"];
    });
  });

  it("should get all users", () => {
    cy.request(`${Cypress.env("EXTERNAL_API_URL")}/users`)
      .its("status")
      .should("eq", 200);

    cy.request(`${Cypress.env("EXTERNAL_API_URL")}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  it("should get user details by id", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("EXTERNAL_API_URL")}/users/${newUserId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "John Pourdanis");
      expect(response.body).to.have.property("email", randomUserEmail);
    });
  });

  it("should update name of user", () => {
    const updatedName = "John Pourdanopoulos";

    cy.request({
      method: "PUT",
      url: `${Cypress.env("EXTERNAL_API_URL")}/users/${newUserId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      qs: {
        name: updatedName,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", updatedName);
      expect(response.body).to.have.property("email", randomUserEmail);
    });
  });

  after(() => {
    cy.log("should delete the user");
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("EXTERNAL_API_URL")}/users/${newUserId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
