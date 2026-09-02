import React from "react";
import {render, screen} from "@testing-library/react";
import DisplayLottie from "./DisplayLottie";
import {StyleProvider} from "../../contexts/StyleContext";

// lottie-react draws to canvas/SVG; only the data it receives matters here.
jest.mock("lottie-react", () => props => (
  <div
    data-testid="lottie"
    data-ink={JSON.stringify(props.animationData.layers[0].shapes[0].c.k)}
  />
));

const ink = [0.031, 0, 0.224, 1]; // #080039
const animationData = {
  layers: [{shapes: [{ty: "fl", c: {a: 0, k: ink}}]}]
};
const darkModeColors = {"#080039": "#ffffff"};

function renderWithTheme(isDark) {
  return render(
    <StyleProvider value={{isDark, changeTheme: () => {}}}>
      <DisplayLottie
        animationData={animationData}
        darkModeColors={darkModeColors}
      />
    </StyleProvider>
  );
}

describe("DisplayLottie", () => {
  it("passes the animation through untouched in light mode", () => {
    renderWithTheme(false);
    expect(screen.getByTestId("lottie").dataset.ink).toBe(JSON.stringify(ink));
  });

  it("swaps mapped colours in dark mode", () => {
    renderWithTheme(true);
    expect(screen.getByTestId("lottie").dataset.ink).toBe(
      JSON.stringify([1, 1, 1, 1])
    );
  });

  it("renders without a colour map or a theme provider", () => {
    render(<DisplayLottie animationData={animationData} />);
    expect(screen.getByTestId("lottie").dataset.ink).toBe(JSON.stringify(ink));
  });
});
