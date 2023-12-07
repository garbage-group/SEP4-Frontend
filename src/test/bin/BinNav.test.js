import React from "react";
import BinNav from "../../components/Bin/BinNav";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/LoginAuthContext";

describe("BinNav component", () => {
  test("BinNav renders all text corectly", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <BinNav />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText(/List of Bi/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Bin/i)).toBeInTheDocument();
  });

  test("BinNav link's changes color depending on being active or not", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <BinNav />
        </MemoryRouter>
      </AuthProvider>
    );
    // Click on "List of Bins" link
    fireEvent.click(screen.getByText("List of Bins"));
    expect(screen.getByText("List of Bins")).toHaveStyle("color: black");
    expect(screen.getByText("Add Bin")).toHaveStyle("color: grey");

    // Click on "Add Bin" link
    fireEvent.click(screen.getByText("Add Bin"));
    expect(screen.getByText("List of Bins")).toHaveStyle("color: grey");
    expect(screen.getByText("Add Bin")).toHaveStyle("color: black");
  });
});
