import React from "react";
import "@testing-library/jest-dom";

import { Sidebar } from "../components/Sidebar";
import { render, screen } from "@testing-library/react";

it("renders Sidebar Component", () => {
  render(<Sidebar />);

  const overviewText = screen.getByText("Overview");
  const collectorsText = screen.getByText("Collectors");
  const binsText = screen.getByText("Bins");
  const mapText = screen.getByText("Map");
  const analyticsText = screen.getByText("Analytics");

  expect(overviewText).toBeInTheDocument();
  expect(collectorsText).toBeInTheDocument();
  expect(binsText).toBeInTheDocument();
  expect(mapText).toBeInTheDocument();
  expect(analyticsText).toBeInTheDocument();
});

/* it("activates correct nav element", () => {
  render(<Sidebar />);

  const overviewElement = screen.getByText("Overview");
  const collectorsElement = screen.getByText("Collectors");
  const binsElement = screen.getByText("Bins");
  const mapElement = screen.getByText("Map");
  const analyticsElement = screen.getByText("Analytics");

  // console.log(Array.from(overviewElement.classList));

  // expect(overviewElement).toHaveClass("active");
  expect(collectorsElement).not.toHaveClass("active");
  expect(binsElement).not.toHaveClass("active");
  expect(mapElement).not.toHaveClass("active");
  expect(analyticsElement).not.toHaveClass("active");
}); */
