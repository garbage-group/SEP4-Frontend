/* import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sidebar } from "../components/Sidebar";

describe("Sidebar Component", () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, "getItem");
  });

  it("renders Sidebar with navigation links", () => {
    // Mocking localStorage.getItem to return a role
    window.localStorage.__proto__.getItem.mockReturnValueOnce(
      "municipality worker"
    );

    render(<Sidebar />);

    const navigationLinksText = [
      "Overview",
      "User",
      "Bins",
      "Map",
      "Analytics",
    ];

    navigationLinksText.forEach((linkText) => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });
});
 */
