describe("Upload", () => {
  it("successfully shows the task video", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-url-input"]').type(
      "https://www.youtube.com/watch?v=kexuG-YcQFA"
    );
    cy.get('[data-cy="data-cy-upload-button"]').click();
    cy.get('[data-cy="data-cy-video"]').should("exist");
    cy.contains("Submitting...").should("exist");
  });
});
