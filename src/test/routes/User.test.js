/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// import React from "react";
import "@testing-library/jest-dom";
/* import {
  render,
  waitFor,
  screen,
  fireEvent,
  within,
} from "@testing-library/react"; */

import { useUserListContext } from "../../contexts/UserListContext.js";
// import { Users } from "../../routes/User.js";
import { useUserManagement } from "../../contexts/UserContext.js";

jest.mock("../../contexts/UserListContext.js");
jest.mock("../../contexts/UserContext.js");
jest.mock("../../contexts/LoginAuthContext")

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockUsers = [
  { username: "collector1", fullname: "Collector One" },
  { username: "collector2", fullname: "Collector Two" },
  { username: "collector3", fullname: "Collector Three" },
  { username: "collector4", fullname: "Collector Four" },
  { username: "collector5", fullname: "Collector Five" },
  { username: "collector6", fullname: "Collector Six" },
  { username: "collector7", fullname: "Collector Seven" },
];

describe("User List Container", () => {
  
  beforeEach(() => {
    useUserListContext.mockReturnValue({
      users: mockUsers,
      isLoading: false,
    });

    useUserManagement.mockReturnValue({
      fetchUserByUsername : jest.fn(),
    })

  });

  /* it("renders only six users", async () => {
    localStorage.setItem("role", "Municipality Worker");

    render(<Users />);


    await waitFor(() => {
      // Check if user names are rendered
      expect(screen.getByText("Collector One")).toBeInTheDocument();
      expect(screen.getByText("Collector Two")).toBeInTheDocument();
      expect(screen.getByText("Collector Three")).toBeInTheDocument();
      expect(screen.getByText("Collector Four")).toBeInTheDocument();
      expect(screen.getByText("Collector Five")).toBeInTheDocument();
      expect(screen.getByText("Collector Six")).toBeInTheDocument();

      // collector seven should not be rendered since only six users in displayed on page 1
      expect(screen.queryByText("Collector Seven")).not.toBeInTheDocument();
    });
  }); */

  /* it("change the page when the pagination component is interacted with", async () => {
    localStorage.setItem("role", "Municipality Worker");
    render(<Users />);

    expect(screen.getByText("Collector One")).toBeInTheDocument();
    // collector seven should not be rendered since only six users in displayed on page 1
    expect(screen.queryByText("Collector Seven")).not.toBeInTheDocument();

    const listFooter = screen.getByTestId("user-list-footer");
    fireEvent.click(within(listFooter).getByText("2"));

    // collector seven should  be rendered now since page is changed to 2
    expect(screen.getByText("Collector Seven")).toBeInTheDocument();
    expect(screen.queryByText("Collector Two")).not.toBeInTheDocument();
  }); */
});
