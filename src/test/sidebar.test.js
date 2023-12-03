import React from "react";
import "@testing-library/jest-dom";

import { Sidebar } from "../components/Sidebar";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock the entire module
jest.mock("../contexts/LoginAuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Sidebar Componet", () => {
  // Mock the return value of useAuth
  beforeEach(() => {
    require("../contexts/LoginAuthContext").useAuth.mockReturnValue({
      role: "municipality worker",
    });
  });

  test("renders Sidebar component", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const overviewText = screen.getByText("Overview");
    const collectorsText = screen.getByText("User");
    const binsText = screen.getByText("Bins");
    const mapText = screen.getByText("Map");

    expect(overviewText).toBeInTheDocument();
    expect(collectorsText).toBeInTheDocument();
    expect(binsText).toBeInTheDocument();
    expect(mapText).toBeInTheDocument();
  });

  test("analytics should be displayed for Municipality Worker", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const analyticsText = screen.getByText(/Analytics/i);
    expect(analyticsText).toBeInTheDocument();
  });

  test("analytics should not be displayed for Garbage Collector", () => {
    require("../contexts/LoginAuthContext").useAuth.mockReturnValue({
      role: "garbage collector",
    });

    expect(screen.queryByText("Analytics")).toBeNull();
  });
});
