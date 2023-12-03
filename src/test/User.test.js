/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Users } from "../routes/User";

jest.mock("../contexts/UserListContext", () => ({
  useUserListContext: () => ({
    isLoading: false,
    isError: false,
    data: [
      {
        username: "user1",
        name: "User One",
        address: { city: "City1" },
        role: "Admin",
      },
    ],
  }),
}));

describe("Renders User Component", () => {
  test('text "User" is within the list header', () => {
    render(<Users />);

    const listHeaderText = screen.getByText(/user/i, {
      selector: ".list-header p.members-text",
    });

    expect(listHeaderText).toBeInTheDocument();
  });

  test("correct number of users is displayed", () => {
    render(<Users />);

    // const numberOfUsersElement = screen.getByTestId("number-of-users");
    const numberOfUsersElement = screen.getByText(/1 users/i);
    expect(numberOfUsersElement).toHaveTextContent("1 users");
  });

  test("correct name, username, city is displayed", async () => {
    render(<Users />);

    await waitFor(() => {
      // Check if the information for the user is displayed
      const userFullName = screen.getByText(/User One/i);
      const username = screen.getByText(/@user1/i);
      // const city = screen.getByText(/City1/i);

      console.log(document.body.innerHTML);

      // Ensure that the elements are present in the document
      expect(userFullName).toBeInTheDocument();
      expect(username).toBeInTheDocument();
      // expect(city).toBeInTheDocument();
    });
  }); */

  /*   test("edit and remove buttons are disabled for garbage collector", () => {
    render(<Users />);

    const removeButton = screen.getByTestId("remove-button");
    const editButton = screen.getByTestId("edit-button");

    expect(removeButton).not.toHaveClass("disabled");
    expect(editButton).not.toHaveClass("disabled");
  }); */
});
