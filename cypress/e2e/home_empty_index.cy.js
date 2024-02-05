before(() => {
  Cypress.env("REACT_APP_INDEX_ID", "65b06772f71020557ada01c7");
});

describe("The server", () => {
  it("successfully loads an empty index", () => {
    const indexId = Cypress.env("REACT_APP_INDEX_ID"); // Retrieve the index ID set in the test file
    cy.request(`http://localhost:4001/indexes/${indexId}/videos`);
  });
});

describe("The home page", () => {
  it("successfully loads the title", () => {
    cy.visit("/");
    cy.contains("Summarize a Youtube Video");
  });

  // it("displays a message for empty index", () => {
  //   cy.visit("/");
  //   cy.contains("Please upload a video");
  // });
});
