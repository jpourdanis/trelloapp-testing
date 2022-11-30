describe("Web testing with the-internet.herokuapp.com", () => {
  it("should open the main page.", () => {
    cy.visit("http://the-internet.herokuapp.com/");
  });

  it("should check the heading text.", () => {
    cy.visit("http://the-internet.herokuapp.com/");
    cy.get(".heading").should("have.text", "Welcome to the-internet");
  });

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
});
