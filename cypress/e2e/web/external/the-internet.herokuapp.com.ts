describe("Web testing with the-internet.herokuapp.com", () => {
  it("should open the main page.", () => {
    cy.visit("http://the-internet.herokuapp.com/");
  });

  it("should check the heading text.", () => {
    cy.visit("http://the-internet.herokuapp.com/");
    cy.get(".heading").should("have.text", "Welcome to the-internet");
  });

  //add_remove_elements/ web page
  it("should add an element to page.", () => {
    cy.visit("http://the-internet.herokuapp.com/add_remove_elements/");
    cy.get("button").contains("Add Element").click();
    cy.get(".added-manually").should("be.visible");
  });

  it("should add 3 elements to page.", () => {
    cy.visit("http://the-internet.herokuapp.com/add_remove_elements/");
    const numberOfElements = 3;
    for (let i = 0; i < numberOfElements; i++) {
      cy.get("button").contains("Add Element").click();
    }
    cy.get(".added-manually").should("have.length", numberOfElements);
  });

  it("should add 3 elements and then remove 2.", () => {
    /**
     * your code here
     */
  });

  //checkboxes web page
  it("should check the first checkbox.", () => {
    cy.visit("http://the-internet.herokuapp.com/checkboxes");
    cy.get("input").first().check();
    cy.get("input").eq(0).should("be.checked");

    //cy.get("#checkboxes [type=checkbox]").first().uncheck();
  });

  //dropdowns web page
  it("should select the first option.", () => {
    cy.visit("http://the-internet.herokuapp.com/dropdown");
    cy.get("#dropdown").select(1);

    cy.get('#dropdown [selected="selected"]')
      .should("have.value", "1")
      .and("have.text", "Option 1");
  });

  Cypress.config("defaultCommandTimeout", 1000);
  //dynamic controls web page
  it("should wait the element to disappear.", () => {
    cy.visit("http://the-internet.herokuapp.com/dynamic_controls");
    cy.get('#checkbox-example [type="button"]').click();
    cy.get("#checkbox").should("not.exist");
  });

  //login web page
  it("should login and verify that you are in a secure area.", () => {
    cy.visit("http://the-internet.herokuapp.com/login");
    /**
     * your code here
     */
  });

  //status code page
  it("should wait and verify that response status is 200", () => {
    cy.visit("http://the-internet.herokuapp.com/status_codes");
    cy.intercept("http://the-internet.herokuapp.com/status_codes/200").as(
      "status_code_api"
    );
    cy.get('a[href="status_codes/200"]').click();
    cy.wait("@status_code_api").its("response.statusCode").should("eq", 200);
  });

  //table page
  it("should wait and verify that response status is 404", () => {
    cy.visit("http://the-internet.herokuapp.com/status_codes");
    /**
     * your code here
     */
  });

  it("should sort by due on the example 1 table", () => {
    cy.visit("http://the-internet.herokuapp.com/tables");
    cy.get("#table1 span").contains("Due").click();
    cy.get("#table1 tr").eq(1).should("contain", "$50.00");
    cy.get("#table1 tr").eq(2).should("contain", "$50.00");
    cy.get("#table1 tr").eq(3).should("contain", "$51.00");
    cy.get("#table1 tr").eq(4).should("contain", "$100.00");
  });

  it("should sort by first name on the example 2 table", () => {
    cy.visit("http://the-internet.herokuapp.com/tables");
    /**
     * your code here
     */
  });
});
