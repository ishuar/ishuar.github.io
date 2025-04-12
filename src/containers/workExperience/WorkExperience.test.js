import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkExperience from "./WorkExperience";
import {workExperiences} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

// Mock the Fade component from react-awesome-reveal
jest.mock("react-awesome-reveal", () => ({
  Fade: ({children}) => <div data-testid="fade-component">{children}</div>
}));

describe("WorkExperience Component", () => {
  const mockStyleContext = {
    isDark: false,
    setIsDark: jest.fn()
  };

  let originalExperiences;
  let consoleErrorSpy;

  beforeEach(() => {
    // Spy on console.error
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    originalExperiences = {...workExperiences};
  });

  afterEach(() => {
    // Restore original console.error and workExperiences
    consoleErrorSpy.mockRestore();
    Object.assign(workExperiences, originalExperiences);
  });

  it("validates and logs missing role field correctly", () => {
    workExperiences.experience = [
      {
        company: "Test Company",
        role: "", // Empty role
        date: "2024",
        desc: "Test Description"
      }
    ];

    render(
      <StyleContext.Provider value={mockStyleContext}>
        <WorkExperience />
      </StyleContext.Provider>
    );

    // Check if console.error was called with the expected message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test Company") &&
        expect.stringContaining("Missing/empty required fields: role")
    );

    // Component should not render when validation fails
    const cardsDiv = screen.queryByTestId("fade-component");
    expect(cardsDiv).not.toBeInTheDocument();
  });

  it("validates and rejects whitespace-only strings", () => {
    const testCases = ["", " ", "  ", "\t", "\n"];

    testCases.forEach(invalidValue => {
      const experience = {
        role: "Valid Role",
        company: "Valid Company",
        date: "2024",
        desc: "Valid Description"
      };

      // Test each field with whitespace
      ["role", "company", "date", "desc"].forEach(field => {
        // Clear previous calls to console.error
        consoleErrorSpy.mockClear();

        const testExperience = {...experience};
        testExperience[field] = invalidValue;
        workExperiences.experience = [testExperience];

        render(
          <StyleContext.Provider value={mockStyleContext}>
            <WorkExperience />
          </StyleContext.Provider>
        );

        // Check if console.error was called with the expected message
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(`Missing/empty required fields: ${field}`)
        );
      });
    });
  });

  it("accepts valid experiences with non-empty trimmed strings", () => {
    const validExperience = {
      role: "  Test Role  ", // Has whitespace but will be trimmed
      company: "Test Company",
      date: "2024",
      desc: "Test Description"
    };

    workExperiences.experience = [validExperience];
    workExperiences.display = true;

    render(
      <StyleContext.Provider value={mockStyleContext}>
        <WorkExperience />
      </StyleContext.Provider>
    );

    // Should find the trimmed text content
    expect(screen.getByText("Test Role")).toBeInTheDocument();
  });

  it("does not render when display is set to false", () => {
    workExperiences.display = false;
    const {container} = render(
      <StyleContext.Provider value={mockStyleContext}>
        <WorkExperience />
      </StyleContext.Provider>
    );

    // Verify the experience section is not rendered
    const cardsDiv = container.querySelector(".experience-cards-div");
    expect(cardsDiv).not.toBeInTheDocument();
  });

  it("validates actual portfolio.js work experience data", () => {
    // Test the actual work experiences from portfolio.js
    consoleErrorSpy.mockClear();

    render(
      <StyleContext.Provider value={mockStyleContext}>
        <WorkExperience />
      </StyleContext.Provider>
    );

    // Get all error messages from console.error calls
    const errorMessages = consoleErrorSpy.mock.calls
      .filter(call => call[0] && typeof call[0] === "string")
      .map(call => call[0]);

    // Get validation error messages specifically
    const validationErrors = errorMessages.filter(
      msg =>
        msg.includes("validation failed") ||
        msg.includes("Missing/empty required fields")
    );

    // Create a detailed error report
    if (validationErrors.length > 0) {
      const errorReport = [
        "\n============ WORK EXPERIENCE VALIDATION ERRORS ============",
        "The following issues were found in your portfolio.js work experiences:"
      ];

      // Add each validation error with details
      validationErrors.forEach((error, index) => {
        errorReport.push(`\n[Error #${index + 1}]`);
        errorReport.push(error);
      });

      // Additional helper message about how to fix
      errorReport.push("\n============ HOW TO FIX ============");
      errorReport.push(
        "Each experience entry must have non-empty values for: role, company, date, and desc.",
        "Check your portfolio.js and ensure all work experience entries have these fields properly filled.",
        "Whitespace-only values like '   ' are considered empty and will be rejected."
      );

      // Print the error report for better visibility in test output
      console.log(errorReport.join("\n"));

      // Fail the test with a helpful message
      expect(validationErrors).toHaveLength(
        0,
        `Found ${validationErrors.length} validation errors in work experiences. See detailed report above.`
      );
    }

    // Verify that all required fields in portfolio.js experiences are properly filled
    workExperiences.experience.forEach((exp, index) => {
      const expNumber = index + 1;
      const role = exp.role?.trim() || "";
      const company = exp.company?.trim() || "";
      const date = exp.date?.trim() || "";
      const desc = exp.desc?.trim() || "";

      // Use more informative expect failures with better context
      expect(role).toBeTruthy();
      if (!role) {
        throw new Error(
          `Experience #${expNumber} has an empty 'role' field. Company: "${company || "Unknown"}"`
        );
      }
      expect(company).toBeTruthy();
      if (!company) {
        throw new Error(
          `Experience #${expNumber} has an empty 'role' field. Company: "${role || "Unknown"}"`
        );
      }
      expect(date).toBeTruthy();
      if (!date) {
        throw new Error(
          `Experience #${expNumber} has an empty 'role' field. Company:  "${company || "Unknown"}", Role: "${role || "Unknown"}"`
        );
      }
      expect(desc).toBeTruthy();
      if (!desc) {
        throw new Error(
          `Experience #${expNumber} has an empty 'role' field. Company:  "${company || "Unknown"}", Role: "${role || "Unknown"}"`
        );
      }
    });

    // Verify that at least some experiences are rendered when there are no validation errors
    if (validationErrors.length === 0) {
      const experienceCards = screen.getAllByRole("heading", {level: 5});
      expect(experienceCards.length).toBeGreaterThan(
        0,
        "No experience cards were rendered despite having valid experiences"
      );
    }
  });
});
