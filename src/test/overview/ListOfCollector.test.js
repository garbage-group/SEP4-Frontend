import React from "react";
import "@testing-library/jest-dom";
import { useUserListContext } from "../../contexts/UserListContext";
import { render, waitFor, screen } from "@testing-library/react";

import { ListOfCollectors } from "../../components/overview/ListofCollectors";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../contexts/UserListContext.js");

const mockUsers = [
  { username: "collector1", fullname: "Collector One" },
  { username: "collector2", fullname: "Collector Two" },
];

describe("List Of Collectors Component", () => {
  beforeEach(() => {
    useUserListContext.mockReturnValue({
      users: mockUsers,
      isLoading: false,
    });
  });

  it("renders a list of users when data is available", async () => {
    render(<ListOfCollectors />);

    await waitFor(() => {
      mockUsers.forEach((user) => {
        expect(screen.getByText(user.fullname)).toBeInTheDocument();
      });
    });
  });

  /* it("navigates to the 'users' page when 'View All Users' is clicked", async () => {
    render(<ListOfCollectors />);

    const viewAllUsersLink = screen.getByText("View All Users");
    fireEvent.click(viewAllUsersLink);

    await waitFor(() => {
      expect(require("react-router-dom").useNavigate).toHaveBeenCalledWith(
        "/users"
      );
    });
  }); */
});
