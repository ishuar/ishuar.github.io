import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import GithubRepoCard from "./GithubRepoCard";

jest.mock("react-awesome-reveal", () => ({
  Fade: ({children}) => <div>{children}</div>
}));

// Shape of one pinnedItems edge as written by fetch.js into profile.json.
// stargazerCount is the scalar field readable by fine-grained tokens; the
// stargazers connection is not.
const repo = {
  node: {
    name: "terraform-azurerm-aks",
    description: "Terraform module for AKS",
    forkCount: 4,
    stargazerCount: 27,
    url: "https://github.com/ishuar/terraform-azurerm-aks",
    id: "R_1",
    diskUsage: 512,
    primaryLanguage: {name: "HCL", color: "#844FBA"}
  }
};

describe("GithubRepoCard", () => {
  it("renders the star count from stargazerCount", () => {
    render(<GithubRepoCard repo={repo} isDark={false} />);
    expect(screen.getByText("terraform-azurerm-aks")).toBeInTheDocument();
    expect(screen.getByText("27")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
