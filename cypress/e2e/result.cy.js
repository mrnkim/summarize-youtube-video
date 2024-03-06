describe("Result", () => {
  it("successfully loads the results of all fields", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-generate-button"]').click({ force: true });
    cy.contains("Sentences");
    cy.contains("Chapters");
    cy.contains("Highlights");
  });

  it("dynamically changes the results based on (un)checking each field", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-checkbox-summary"]').click({ force: true });
    cy.get('[data-cy="data-cy-generate-button"]').click({ force: true });
    cy.contains("Sentences").should("not.exist");
    cy.contains("Chapters");
    cy.contains("Highlights");
  });

  it("shows warning message when all checkboxes are unchecked", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-checkbox-summary"]').click({ force: true });
    cy.get('[data-cy="data-cy-checkbox-chapters"]').click({ force: true });
    cy.get('[data-cy="data-cy-checkbox-highlights"]').click({ force: true });
    cy.get('[data-cy="data-cy-generate-button"]').click({ force: true });
    cy.contains("Please select one of the checkboxes");
  });
});
