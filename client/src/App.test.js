import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-canvas-draw", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

test("renders Polygons component", () => {
  render(<App />);
  const aboutElement = screen.getByText(/About Polygons Editor:/i);
  expect(aboutElement).toBeInTheDocument();
});
