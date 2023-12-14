/* //Verifying that the addUser function provided by the context can be invoked

import React from "react";
import { render, act } from "@testing-library/react";
import {
  UserManagementProvider,
  useUserManagement,
} from "../contexts/UserContext";
import { useAuth } from "../contexts/LoginAuthContext";

jest.mock("../contexts/UserContext");

// Helper component to use the context
const TestComponent = () => {
  const { addUser } = useUserManagement();

  return (
    <button onClick={() => addUser({ username: "testuser" })}>Add User</button>
  );
};

jest.mock("../../contexts/LoginAuthContext.js");

describe("UserManagementContext", () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      token: "thisistoken",
      isAuthenticated: true,
    }));
  });

  it("provides addUser function", async () => {
    const { getByText } = render(
      <UserManagementProvider>
        <TestComponent />
      </UserManagementProvider>
    );

    await act(async () => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      getByText("Add User").click();
    });

    // Test passes if no errors are thrown during the click
  });
});
 */