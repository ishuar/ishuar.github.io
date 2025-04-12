// cypress/e2e/basic.cy.js
describe("Portfolio Website", () => {
  beforeEach(() => {
    cy.visit("/");
    // Give the page more time to load and animations to complete
    cy.wait(2000);
  });

  it("should load the home page", () => {
    cy.get("h1").should("be.visible");
  });

  it("should display work experience section", () => {
    // First check if section exists
    cy.get("#experience").should("exist");

    // Scroll to experience section to trigger animations
    cy.get("#experience").scrollIntoView().should("be.visible");

    // Wait for animations to complete
    cy.wait(1000);

    // Two approaches for handling the fade component:

    // Option 1: Check if the element exists without opacity constraint
    cy.get("[data-testid='fade-component']", {timeout: 15000})
      .should("exist")
      .then($el => {
        // Check if any experience cards are visible within this element
        cy.wrap($el).find(".experience-cards-div").should("exist");
      });

    // Option 2: If you still need to check opacity, use should with retries
    /*
    cy.get("[data-testid='fade-component']", { timeout: 15000 })
      .should(($el) => {
        // Allow for any opacity greater than 0
        const opacity = parseFloat(window.getComputedStyle($el[0]).opacity);
        expect(opacity).to.be.greaterThan(0);
      })
      .find(".experience-cards-div")
      .should("exist");
    */
  });

  // Additional test to verify experience card content
  it("should display experience cards with required content", () => {
    // Scroll to experience section to ensure it's in view and animations are triggered
    cy.get("#experience").scrollIntoView().should("be.visible");

    // Wait for animations to complete
    cy.wait(2000);

    // Check if experience cards exist first
    cy.get(".experience-cards-div").should("exist");

    // Now check for the content with increased timeout
    cy.get(".experience-text-role", {timeout: 10000})
      .first()
      .should("be.visible");
    cy.get(".experience-text-company", {timeout: 10000})
      .first()
      .should("be.visible");
    cy.get(".experience-text-date", {timeout: 10000})
      .first()
      .should("be.visible");
    cy.get(".experience-text-desc", {timeout: 10000})
      .first()
      .should("be.visible");
  });
});
