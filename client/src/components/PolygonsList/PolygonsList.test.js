import { render, screen } from "@testing-library/react";
import { usePolygons } from "../PolygonsContext";
import PolygonsList from "./PolygonsList";

// Mock the usePolygons hook
jest.mock("../PolygonsContext", () => ({
  ...jest.requireActual("../PolygonsContext"),
  usePolygons: jest.fn(),
}));

describe("PolygonsList", () => {
  it('should display "No Data" when there are no polygons', () => {
    usePolygons.mockReturnValue({
      polygons: [],
      isLoading: false,
      isDelay: false,
      handleDeletePolygon: jest.fn(),
      handlePolygonHover: jest.fn(),
      handlePolygonMouseLeave: jest.fn(),
    });

    render(<PolygonsList />);
    expect(screen.getByText("No Data")).toBeInTheDocument();
  });

  it("should display loading spinner when loading", () => {
    usePolygons.mockReturnValue({
      polygons: [],
      isLoading: true,
      isDelay: false,
      handleDeletePolygon: jest.fn(),
      handlePolygonHover: jest.fn(),
      handlePolygonMouseLeave: jest.fn(),
    });

    render(<PolygonsList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
