import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React from "react";
import "@testing-library/jest-dom";

import { HistoryTable } from "../components/Analytics/HistoryTable";
import { useBins } from "../contexts/BinContext";

// Mock the context provider
jest.mock("../contexts/BinContext");

describe("History Table Component", () => {
  beforeEach(() => {
    useBins.mockReturnValue({
      bins: [
        {
          id: 1,
          latitude: 45,
          longitude: 50,
          capacity: 100,
          fillThreshold: 80,
          emptiedLast: Date.now(),
          fillLevels: [{ value: 50, dateTime: Date.now() }],
          humidity: [{ value: 30, dateTime: Date.now() }],
          temperatures: [{ value: 25, dateTime: Date.now() }],
        },
      ],
      isLoading: false,
    });
  });

  it("renders the table with bin data", () => {
    render(<HistoryTable />);

    // Verify that the table headers are rendered
    expect(screen.getByText("Bin Id")).toBeInTheDocument();
    expect(screen.getByText("Latitude")).toBeInTheDocument();
    expect(screen.getByText("Longitude")).toBeInTheDocument();
    expect(screen.getByText("Capacity")).toBeInTheDocument();
    expect(screen.getByText("Fill Threshold")).toBeInTheDocument();
    expect(screen.getByText("Last Emptied")).toBeInTheDocument();

    // Verify that the bin data is rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("expands and collapases rows when clicking on the expand button", async () => {
    render(<HistoryTable />);

    // Click on the expand button to open the details row
    userEvent.click(screen.getByLabelText("expand row"));

    // Wait for the details row to become visible
    await waitFor(() => {
      expect(screen.getByText(/Bin 1's History/i)).toBeInTheDocument();
    });

    // Click again to collapse the details row
    userEvent.click(screen.getByLabelText("expand row"));

    // Wait for the details row to become hidden
    await waitFor(() => {
      expect(screen.queryByText(/Bin 1's History/)).toBeNull();
    });
  });
});
