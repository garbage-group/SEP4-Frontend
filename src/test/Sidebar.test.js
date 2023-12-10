import React from "react";

// Importing testing utilities and dependencies
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "../components/Sidebar";
import { MemoryRouter } from "react-router-dom";


// Test suite for the Sidebar component
describe("Sidebar Component", () => {
  // Test case: Rendering Sidebar for municipality worker
  test("renders Sidebar for municipality worker", () => {
    // Setting role in localStorage
    localStorage.setItem("role", "Municipality Worker");

    // Rendering Sidebar  inside MemoryRouter
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Expectations for rendered elements
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/User/i)).toBeInTheDocument();
    expect(screen.getByText(/Bins/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan route/i)).toBeInTheDocument();
    expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
  });

  // Test case: Does not render Analytics for Garbage Collector
  test("does not render Analytics for Garbage Collector", () => {
    // Setting role in localStorage
    localStorage.setItem("role", "Garbage Collector");

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Analytics/i)).toBeNull();
  });

  // Test case: On clicks, active nav changes
  /* test("on clicks active nav changes", () => {
    localStorage.setItem("role", "Municipality Worker");

    const history = createMemoryHistory({ initialEntries: ["/overview"] });

    render(
      <MemoryRouter location={history.location} navigator={history}>
        <Sidebar />
      </MemoryRouter>
    );

    expect(history.location.pathname).toBe("/overview");

    fireEvent.click(screen.getByText(/Bins/i));
    // expect(screen.getByText(/Bins/i)).toHaveClass("active");

    expect(history.location.pathname).toBe("/bins");
  }); */
});
