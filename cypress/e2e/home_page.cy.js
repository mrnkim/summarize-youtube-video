describe("The server", () => {
  it("successfully loads", () => {
    cy.request("http://localhost:4001/indexes/653c0592480f870fb3bb01be/videos");
  });
  it("successfully loads an empty index", () => {
    cy.request("http://localhost:4001/indexes/65b06772f71020557ada01c7/videos");
  });
});

describe("The home page", () => {
  it("successfully loads the title", () => {
    cy.visit("/");
    cy.contains("Summarize a Youtube Video");
  });

  it("successfully loads the first video of an index", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-video"]');
  });

  it("successfully loads the first video of an index", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-video"]');
  });
});

describe("The home page", () => {
  before(() => {
    // Set the REACT_APP_INDEX_ID environment variable to the empty index_id
    Cypress.env("REACT_APP_INDEX_ID", "65b06772f71020557ada01c7");
  });

  it("successfully loads the title", () => {
    cy.visit("/");
    cy.contains("Summarize a Youtube Video");
  });

  it("displays a message for empty index", () => {
    cy.visit("/");
    cy.contains("Please upload a video"); // Assuming this message is displayed when there are no videos
  });
});
