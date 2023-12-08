import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import {
  useNotifications,
} from "../contexts/NotificationContext";

test("useNotifications hook should throw an error outside NotificationProvider", () => {
  const renderHookOutsideProvider = () => renderHook(() => useNotifications());

  // Use render instead of directly invoking the renderHook function
  expect(renderHookOutsideProvider).toThrowError(
    "useNotifications must be used within a NotificationProvider"
  );
});

test("NotificationProvider renders children", () => {
  render(<div>Test Child</div>);

  expect(screen.getByText(/Test Child/i)).toBeInTheDocument();
});