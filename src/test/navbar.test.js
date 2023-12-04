import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Navbar } from "../components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the entire module
jest.mock("../contexts/LoginAuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Navbar Component", () => {
  // Mock the return value of useAuth
  beforeEach(() => {
    require("../contexts/LoginAuthContext").useAuth.mockReturnValue({
      logout: jest.fn(),
    });
  });

  test("renders logo, search bar, and icons", () => {
    render(
      <Router>
        <Navbar setIsLoggedIn={() => {}} />
      </Router>
    );

    const logo = screen.getByAltText("logo");
    const searchBar = screen.getByPlaceholderText(
      "Search bins, or collectors....."
    );
    const notificationIcon = screen.getByTestId(
      "NotificationsNoneOutlinedIcon"
    );
    const logoutIcon = screen.getByTestId("LogoutIcon");

    expect(logo).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(notificationIcon).toBeInTheDocument();
    expect(logoutIcon).toBeInTheDocument();
  });
});
