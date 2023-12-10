import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BinList from "../../components/Bin/BinList";
import { useBins } from "../../contexts/BinContext";

jest.mock("../../contexts/BinContext.js");

jest.mock("../../components/Bin/BinItem", () => ({ bin }) => (
  <li data-testid={`mockBin-${bin.id}`} />
));

describe("BinList component", () => {
  const mockBins = [
    {
      id: 1,
      capacity: 200,
      emptiedLast: new Date("2023-01-01T12:00:00Z"),
      latitude: 123,
      longitude: 456,
    },
    {
      id: 2,
      capacity: 200,
      emptiedLast: new Date("2023-01-01T12:00:00Z"),
      latitude: 123,
      longitude: 456,
    },
  ];

  beforeEach(() => {
    useBins.mockReturnValue({
      bins: mockBins,
      isLoading: false,
    });
  });

  test("renders two bin items in the document", () => {
    render(<BinList />);
    expect(screen.getByTestId("mockBin-1")).toBeInTheDocument();
    expect(screen.getByTestId("mockBin-2")).toBeInTheDocument();
  });

  test("BinItem is rendered for each bin", () => {
    render(<BinList />);
    //In regular expressions, \d is a shorthand character class that matches any digit(equivalent to[0 - 9]).
    const mockBinElements = screen.queryAllByTestId(/mockBin-\d+/);
    expect(mockBinElements).toHaveLength(mockBins.length);
  });
});
