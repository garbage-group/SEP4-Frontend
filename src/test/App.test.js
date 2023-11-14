import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "../App";

it("renders Hello World", () => {
  render(<App />);
  const element = screen.getByText(/Hello World/i);
  expect(element).toBeInTheDocument();
});
