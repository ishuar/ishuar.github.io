// cypress/e2e/basic.cy.js
describe("Portfolio Website", () => {
  beforeEach(() => {
    cy.visit("/");

    // Create aliases for common elements
    cy.get("#experience").as("experienceSection");
    cy.get(".experience-cards-div").as("cardsContainer");
  });

  it("should load the home page", () => {
    cy.get("h1", { timeout: 10000 }).should("be.visible");
  });

  it("should display work experience section", () => {
    cy.get("@experienceSection")
      .should("exist")
      .scrollIntoView({ duration: 500 })
      .should("be.visible");

    cy.get("h1.experience-heading")
      .should("be.visible")
      .and("contain", "Experiences");
  });

  it("should display experience cards with required content", () => {
    // First scroll to experience section
    cy.get("@experienceSection").scrollIntoView({ duration: 500 });

    // Wait for the cards container
    cy.get("@cardsContainer")
      .should("exist")
      .and("be.visible")
      .within(() => {
        // Find any experience card (light or dark mode)
        cy.get('[class*="experience-card"]')
          .should("have.length.at.least", 1)
          .first()
          .as("firstCard");
      });

    // Check the first card's content
    cy.get("@firstCard").within(() => {
      cy.get(".experience-text-role").should("be.visible");
      cy.get(".experience-text-company").should("be.visible");
      cy.get(".experience-text-date").should("be.visible");
      cy.get(".experience-text-desc").should("be.visible");
    });
  });
});

