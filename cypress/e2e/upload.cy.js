describe("Upload", () => {
  it("successfully shows the task video", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-generate-button"]').click({ force: true });
    cy.contains("Sentences");
    cy.contains("Chapters");
    cy.contains("Highlights");
  });

  
});
