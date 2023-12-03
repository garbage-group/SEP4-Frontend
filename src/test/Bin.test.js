import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bin from "../components/Bin/Bin";
import { useBins } from "../contexts/BinContext";
import { useParams } from "react-router-dom";

// Mock the useBins context
jest.mock("../contexts/BinContext.js");

jest.mock("react-router", () => {
  const module = jest.requireActual("react-router");
  return {
    ...module,
    useParams: jest.fn(),
    useNavigate: () => jest.fn(),
  };
});

describe("Update Bin", () => {
  const mockUpdateBin = jest.fn();

  beforeEach(() => {
    //Reset mock functions before each test
    mockUpdateBin.mockClear();

    // Mocking context value
    useBins.mockReturnValue({
      getBin: jest.fn(),
      updateBin: mockUpdateBin,
      currentBin: {
        deviceId: "8080",
        capacity: 100,
        emptiedLast: new Date("2023-01-01T12:00:00Z"),
        fillThreshold: 75,
        latitude: 40.7128,
        longitude: -74.006,
        fillLevels: [
          { value: 50, dateTime: new Date("2023-01-01T11:30:00Z") },
          { value: 75, dateTime: new Date("2023-01-01T12:00:00Z") },
        ],
        humidity: [
          { value: 30, dateTime: new Date("2023-01-01T11:45:00Z") },
          { value: 40, dateTime: new Date("2023-01-01T12:15:00Z") },
        ],
      },
      isLoading: false,
    });

    // Mock the useParams hook
    useParams.mockReturnValue({ id: "1" });
  });

  it("calls updateBin when Save button is clicked", async () => {
    render(<Bin />);

    // "Save" button clicked
    fireEvent.click(screen.getByText("Save"));

    // Wait for the updateBin function to be called
    await waitFor(() => {
      expect(mockUpdateBin).toHaveBeenCalled();
    });
  });

  it("tests updateBin is called with correct values", async () => {
    render(<Bin />);

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockUpdateBin).toHaveBeenCalledWith("1", {
        id: "1",
        newFIllThreshold: 75,
        newLatitude: 40.7128,
        newLongitude: -74.006,
      });
    });
  });

  it("tests if input fields are enabled when edit button is clicked", async () => {
    render(<Bin />);

    const fillThresholdInput = screen.getByTestId("Fill Threshold");
    const latitude = screen.getByTestId("Latitude");
    const longitude = screen.getByTestId("Longitude");

    // Initial check for disabled state
    expect(fillThresholdInput).toHaveClass("binInput_disabled");
    expect(latitude).toHaveClass("binInput_disabled");
    expect(longitude).toHaveClass("binInput_disabled");

    //"Edit" button clicked
    fireEvent.click(screen.getByText("Edit"));

    // Check for enabled state after clicking "Edit"
    expect(fillThresholdInput).not.toHaveClass("binInput_disabled");
    expect(latitude).not.toHaveClass("binInput_disabled");
    expect(longitude).not.toHaveClass("binInput_disabled");
  });
});
