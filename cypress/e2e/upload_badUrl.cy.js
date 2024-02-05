describe("Upload", () => {
  it("successfully shows the error message with empty input", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-url-input"]').type(" ");
    cy.get('[data-cy="data-cy-upload-button"]').click();
    cy.contains("Please enter a valid video URL").should("exist");
  });

  it("successfully shows the error message with falsy input", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-url-input"]').type("asdfasdf");
    cy.get('[data-cy="data-cy-upload-button"]').click();
    cy.contains("failed").should("exist");
  });
});
