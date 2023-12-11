import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddUser } from "../../components/users/AddUser";
import {
  UserManagementProvider,
  useUserManagement,
} from "../../contexts/UserContext";

// Mock the Modal component
jest.mock(
  "../../components/Modal",
  () =>
    ({ children, isOpened }) =>
      isOpened ? <div>{children}</div> : null
);

// Mock the UserContext
jest.mock("../../contexts/UserContext", () => {
  const originalModule = jest.requireActual("../../contexts/UserContext");
  return {
    ...originalModule,
    useUserManagement: jest.fn(),
  };
});

describe("AddUser", () => {
  beforeEach(() => {
    useUserManagement.mockImplementation(() => ({
      addUser: jest.fn(),
      isLoading: false,
    }));
  });

  test("renders AddUser component", () => {
    render(
      <UserManagementProvider>
        <AddUser onCancel={() => {}} />
      </UserManagementProvider>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Repeat Password")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  test("allows the user to enter text into input fields", () => {
    render(
      <UserManagementProvider>
        <AddUser onCancel={() => {}} />
      </UserManagementProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "password123" },
    });

    expect(screen.getByPlaceholderText("Username").value).toBe("testuser");
    expect(screen.getByPlaceholderText("Full Name").value).toBe("Test User");
    expect(screen.getByPlaceholderText("Password").value).toBe("password123");
    expect(screen.getByPlaceholderText("Repeat Password").value).toBe(
      "password123"
    );
  });

  test("submits the form with the entered values", async () => {
    const mockAddUser = jest.fn();
    useUserManagement.mockImplementation(() => ({
      addUser: mockAddUser,
      isLoading: false,
    }));

    render(
      <UserManagementProvider>
        <AddUser onCancel={() => {}} />
      </UserManagementProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Sign up"));

    await waitFor(() => {
      expect(mockAddUser).toHaveBeenCalledWith({
        username: "testuser",
        fullName: "Test User",
        password: "password123",
        role: "Garbage Collector",
        region: "Horsens North",
      });
    });
  });
});
