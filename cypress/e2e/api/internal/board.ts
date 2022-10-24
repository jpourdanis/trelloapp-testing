import dayjs = require("dayjs");
describe("Boards", () => {
  let boardId;
  let randomBoardName = (Math.random() + 1).toString(36).substring(7) + " CY";

  before(() => {
    cy.log("should create a board");
    cy.request({
      method: "POST",
      url: "/api/boards",
      body: { name: randomBoardName },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", randomBoardName);
      boardId = response.body["id"];
    });
  });

  it("should get all boards", () => {
    cy.request({
      method: "GET",
      url: "/api/boards",
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  it("should get board details by id", () => {
    cy.request({
      method: "GET",
      url: `/api/boards/${boardId}`,
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", randomBoardName);
      expect(response.body).to.have.property(
        "created",
        dayjs().format("YYYY-MM-DD")
      );
    });
  });

  it("should update name of board", () => {
    cy.request({
      method: "PATCH",
      url: `/api/boards/${boardId}`,
      headers: {
        Accept: "application/json",
      },
      body: { name: "UPDATED CY" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "UPDATED CY");
    });
  });

  after(() => {
    cy.log("should delete the board");
    cy.request({
      method: "DELETE",
      url: `/api/boards/${boardId}`,
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
