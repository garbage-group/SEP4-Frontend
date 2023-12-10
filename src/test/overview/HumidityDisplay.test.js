import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { HumidityDisplay } from "../../components/overview/HumidityDisplay";
import { useBins } from "../../contexts/BinContext";

// Mock fetch
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ value: "50%" }),
//   })
// );

jest.mock("../../contexts/BinContext", () => ({
  useBins: jest.fn(),
}));

describe("HumidityDisplay Component", () => {
  beforeEach(() => {
    useBins.mockClear();

    useBins.mockReturnValue({
      getBinHumidity: jest.fn(),
      currentBinHumidity: 50,
      isLoading: false,
      error: null,
    });
  });

  test("renders input, button, and initial texts", () => {
    render(<HumidityDisplay />);
    expect(
      screen.getByPlaceholderText(/Enter Bin Number/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Get Humidity/i })
    ).toBeInTheDocument();
  });

  test("changes in input field", () => {
    render(<HumidityDisplay />);
    const inputEl = screen.getByPlaceholderText(/Enter Bin Number/i);
    fireEvent.change(inputEl, { target: { value: "123" } });
    expect(inputEl.value).toBe("123");
  });

  /*   test("displays loading text on fetch call", () => {
    render(<HumidityDisplay />);
    fireEvent.click(screen.getByRole("button", { name: /Get Humidity/i }));
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  }); */

  /*   test("displays humidity data on successful fetch", async () => {
    render(<HumidityDisplay />);
    const button = screen.getByRole("button", { name: /Get Humidity/i });
    const inputEl = screen.getByPlaceholderText(/Enter Bin Number/i);

    fireEvent.change(inputEl, { target: { value: "123" } });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: "50%" }),
    });

    fireEvent.click(button);

    const humidityText = await screen.findByText(/Humidity Level: 50%/i);
    expect(humidityText).toBeInTheDocument();
  }); */

  /*   test("displays error message on fetch failure", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Error fetching data"))
    );
    render(<HumidityDisplay />);
    const button = screen.getByRole("button", { name: /Get Humidity/i });

    fireEvent.click(button);

    const errorMessage = await screen.findByText(/Error fetching data/i);
    expect(errorMessage).toBeInTheDocument();
  }); */
});
