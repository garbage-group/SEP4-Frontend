import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "../components/Notifications";
import { useNotifications } from "../contexts/NotificationContext";
import "@testing-library/jest-dom/extend-expect";

// Mock the useNotifications hook
jest.mock("../contexts/NotificationContext.js");

 jest.mock("../contexts/NotificationContext.js", () => ({
  useNotifications: jest.fn(() => ({
    notifications: [
      { id: 1, message: "Notification 1", unread: true },
      { id: 2, message: "Notification 2", unread: false },
    ],
    unreadCount: 1,
    markAsRead: jest.fn(),
  })),
})); 

describe("Notifications Component", () => {
    const mockNotifications = [
    {
      id: "1",
      message: "Test Notification 1",
      unread: true,
    },
    {
      id: "2",
      message: "Test Notification 2",
      unread: false,
    },
  ];

  const mockUseNotifications = jest.fn(() => ({
    notifications: mockNotifications,
    unreadCount: 1,
    markAsRead: jest.fn(),
  }));

  beforeEach(() => {
    useNotifications.mockReturnValue(mockUseNotifications);
  });
 
  const mockUpdateBin = jest.fn();

  beforeEach(() => {
    useNotifications.mockReturnValue({
      markAsRead: mockUpdateBin,
      unReadCount: 1,
      notifications: [
        { id: 1, message: "Notification 1", unread: true },
        { id: 2, message: "Notification 2", unread: false },
      ],
    });
  });

  test("renders notifications component and clicking calls markAsRead", () => {
    const { markAsRead } = useNotifications();

    render(<Notifications />);

    const notification1Text = screen.getByText("Notification 1");

    // Your assertions for the rendered component
    expect(notification1Text).toBeInTheDocument();

    // Optionally, you can check if the useNotifications mock was called
    expect(useNotifications).toHaveBeenCalled();

    // Simulate a click on a notification
    fireEvent.click(notification1Text);

    // Check if markAsRead was called with the correct notification id
    expect(mockUpdateBin).toHaveBeenCalledWith(1);
  });
});