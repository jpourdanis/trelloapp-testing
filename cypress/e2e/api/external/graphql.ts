describe("Api calls to gorest.co.in with GraphQL", () => {
  let newUserId: Number;
  const randomUserEmail = Math.round(Math.random() * 100000) + "@email.com";

  before(() => {
    cy.log("should create a user");
    const createUserMutation = `mutation ($name: String!, $gender: String!, $email: String!, $status: String!) {
      createUser(
        input: { name: $name, gender: $gender, email: $email, status: $status }
      ) {
        user {
          id
          name
          gender
          email
          status
        }
      }
    }`;

    const createUserVariables = `{
      "name" : "John Pourdanis",
      "gender" : "male",
      "email" : "${randomUserEmail}",
      "status" : "active"
    }`;

    cy.request({
      method: "POST",
      url: `${Cypress.env("EXTERNAL_API_URL")}/graphql`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      body: { query: createUserMutation, variables: createUserVariables },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.createUser.user).to.have.property(
        "name",
        "John Pourdanis"
      );
      newUserId = response.body.data.createUser.user["id"];
    });
  });

  it("should get all users", () => {
    const getAllUsersQuery = `{
      users {
        nodes {
          id
          name
          email
          gender
          status
        }
      }
    }`;

    cy.request({
      method: "POST",
      url: `${Cypress.env("EXTERNAL_API_URL")}/graphql`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      body: { query: getAllUsersQuery },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.users.nodes).to.have.length.greaterThan(0);
    });
  });

  it("should get user details by id", () => {
    const getUserDetailsQuery = `query ($id: ID!) {
      user(id: $id) {
        id
        name
        email
        gender
        status
      }
    }`;

    const getUserDetailsVariables = `{ "id" : ${newUserId} }`;

    cy.request({
      method: "POST",
      url: `${Cypress.env("EXTERNAL_API_URL")}/graphql`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      body: { query: getUserDetailsQuery, variables: getUserDetailsVariables },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.user).to.have.property(
        "name",
        "John Pourdanis"
      );
    });
  });

  it("should update name of user", () => {
    const nameToUpdate = "John Pourdanopoulos";

    const updateUserMutation = `mutation ($id: Int!, $name: String!) {
      updateUser(input: { id: $id, name: $name }) {
        user {
          id
          name
          gender
          email
          status
        }
      }
    }`;

    const updateUserVariables = `{
      "id" : ${newUserId},
      "name" : "${nameToUpdate}"
    }`;

    cy.request({
      method: "POST",
      url: `${Cypress.env("EXTERNAL_API_URL")}/graphql`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      body: { query: updateUserMutation, variables: updateUserVariables },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.updateUser.user).to.have.property(
        "name",
        nameToUpdate
      );
    });
  });

  after(() => {
    cy.log("should delete the user");

    const deleteUserMutation = `mutation ($id: Int!) {
      deleteUser(input: { id: $id }) {
        user {
          id
          name
          gender
          email
          status
        }
      }
    }`;

    const deleteUserVariables = `{
      "id" : ${newUserId}
    }`;

    cy.request({
      method: "POST",
      url: `${Cypress.env("EXTERNAL_API_URL")}/graphql`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      body: { query: deleteUserMutation, variables: deleteUserVariables },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.deleteUser.user).to.have.property(
        "id",
        newUserId
      );
    });
  });
});
