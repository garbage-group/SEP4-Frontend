
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from 'react';
import "@testing-library/jest-dom";
import Bin from "../components/Bin/Bin";
import { useBins } from "../contexts/BinContext";
import {  useParams } from "react-router-dom";



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



describe("Bin component", () => {
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


  it("verifies all the texts to be displayed on the document", () =>{
    render(<Bin />);

    expect(screen.getByText(/Bin/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByText(/Device Id/i)).toBeInTheDocument();
    expect(screen.getByText(/Fill Threshold/i)).toBeInTheDocument();
    expect(screen.getByText(/Position/i)).toBeInTheDocument();
    expect(screen.getByText(/Last emptied on/i)).toBeInTheDocument();
    expect(screen.getByText(/Fill Level/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity/i)).toBeInTheDocument();
  });

  it("verifies that the input fields displays the values", () => {
    render(<Bin />);
    expect(screen.getByTestId(/Bin/i)).toHaveValue(1);
    expect(screen.getByTestId(/Capacity/i)).toHaveValue("100");
    expect(screen.getByTestId(/DeviceId/i)).toHaveValue('8080');
    expect(screen.getByTestId(/Fill Threshold/i)).toHaveValue('75');
    expect(screen.getByTestId(/Latitude/i)).toHaveValue(40.7128);
    expect(screen.getByTestId(/Longitude/i)).toHaveValue(-74.006);
    expect(screen.getByTestId(/fillLevel/i)).toHaveValue('75%');
    expect(screen.getByTestId(/Humidity/i)).toHaveValue('40%');

  });

  // it("calls updateBin when Save button is clicked", async () => {
  //   render(<Bin />);

  //   // "Save" button clicked
  //   fireEvent.click(screen.getByText("Save"));

  //   // Wait for the updateBin function to be called
  //   await waitFor(() => {
  //     expect(mockUpdateBin).toHaveBeenCalled();
  //   });
  // });

  // it("tests updateBin is called with correct values", async () => {
  //   render(<Bin />);

  //   fireEvent.click(screen.getByText("Save"));

  //   await waitFor(() => {
  //     expect(mockUpdateBin).toHaveBeenCalledWith("1", {
  //       id: "1",
  //       newFIllThreshold: 75,
  //       newLatitude: 40.7128,
  //       newLongitude: -74.006,
  //     });
  //   });
  // });

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

