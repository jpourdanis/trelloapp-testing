describe("Web testing with testpages.herokuapp.com", () => {
  it("should fill the form , sumbit it and valide the error message", () => {
    cy.visit(
      "https://testpages.herokuapp.com/styled/validation/input-validation.html"
    );
    cy.get("#firstname").type("John");
    cy.get("#surname").type("Pourdanis");
    cy.get("#age").type("35");
    cy.get("#country").select("Greece");
    cy.get("#notes").type("Those are test notes");
    cy.get('[type="submit"]').click();
    cy.get("[name=surnamevalidation]").should(
      "contain.text",
      "Surname provided is too short"
    );
  });

  it("should calculate and verify the results.", () => {
    cy.visit("https://testpages.herokuapp.com/styled/calculator");
    /**
     * 3 + 5
     * 15 x 8
     * 132 - 256
     * 3 / 0
     */
  });

  it("should wait the timer to finish.", () => {
    cy.visit(
      "https://testpages.herokuapp.com/styled/javascript-countdown-test.html"
    );
    /**
     * type 10 seconds and wait the "Time up" label appear.
     */
  });
});
