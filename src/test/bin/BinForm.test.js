import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import BinForm from "../../components/Bin/BinForm";
import { useBins } from "../../contexts/BinContext";

// Mock the useNavigate function from 'react-router-dom'
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("../../contexts/BinContext.js");

describe("BinForm Component", () => {
  const createBinMock = jest.fn();

  beforeEach(() => {
    useBins.mockReturnValue({
      createBin: createBinMock,
    });
  });

  it("submits the form correctly", async () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <BinForm />
      </MemoryRouter>
    );

    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText("Bin capacity..."), {
      target: { value: "200" },
    });
    fireEvent.change(screen.getByPlaceholderText("Bin threshold..."), {
      target: { value: "75" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter latitude..."), {
      target: { value: "19.8485454" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter longitude..."), {
      target: { value: "9.5846456416" },
    });

    fireEvent.click(screen.getByText(/Add/i));

    await waitFor(() => {
      expect(createBinMock).toHaveBeenCalledWith({
        capacity: "200",
        fillThreshold: "75",
        latitude: "19.8485454",
        longitude: "9.5846456416",
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/bins/binList");
    });
  });

  it("fails to submit the form correctly", async () => {
    render(
      <MemoryRouter>
        <BinForm />
      </MemoryRouter>
    );

    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText("Bin capacity..."), {
      target: { value: "200" },
    });
    fireEvent.change(screen.getByPlaceholderText("Bin threshold..."), {
      target: { value: "75" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter latitude..."), {
      target: { value: "19.8485454" },
    });

    fireEvent.click(screen.getByText(/Add/i));

    await waitFor(() => {
      expect(screen.getByTestId("form-submission-failed")).toBeInTheDocument();
    });
  });
});
