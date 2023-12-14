import React from "react";
import { render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddUser } from "../../components/users/AddUser";
import {
  UserManagementProvider,
  useUserManagement,
} from "../../contexts/UserContext";
import { useAuth } from "../../contexts/LoginAuthContext";

// Mock the Modal component
jest.mock('../../components/utils/Modal', () => {
  return {
    __esModule: true,
    default: ({ isOpened, onClose }) => {
      return isOpened ? (
        <div data-testid="mocked-modal">
          {/* Mocked Modal Content */}
          Data Updated
          <button onClick={onClose}>Close</button>
        </div>
      ) : null;
    },
  };
});

jest.mock("../../contexts/LoginAuthContext.js")

// Mock the UserContext
jest.mock("../../contexts/UserContext", () => {
  const originalModule = jest.requireActual("../../contexts/UserContext");
  return {
    ...originalModule,
    useUserManagement: jest.fn(),
  };
});

describe("AddUser", () => {
  const setMockSelectedUser = jest.fn();
  beforeEach(() => {
    useUserManagement.mockImplementation(() => ({
      addUser: jest.fn(),
      isLoading: false,
    }));

    useAuth.mockImplementation(()=> ({
      token: "thisistoken",
      isAuthenticated: true
    }))
  });

  test("renders AddUser component", () => {
    render(
      <UserManagementProvider>
        <AddUser onCancel={() => {}} setSelectedUser={setMockSelectedUser} />
      </UserManagementProvider>
    );


    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Repeat Password")).toBeInTheDocument();
    // expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

 /*  test("allows the user to enter text into input fields", () => {
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
  }); */

  /* test("submits the form with the entered values", async () => {
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
  }); */
});