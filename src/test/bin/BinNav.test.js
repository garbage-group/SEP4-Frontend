import React from "react";
import BinNav from "../../components/Bin/BinNav";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/LoginAuthContext";


jest.mock('../../components/utils/Modal.js', () => {
  return {
    __esModule: true,
    default: ({ isOpened, onClose }) => {
      return isOpened ? (
        <div data-testid="mocked-modal">
          {/* Mocked Modal Content */}
          You are not authorized to add a bin
          <button onClick={onClose}>Close</button>
        </div>
      ) : null;
    },
  };
});

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


  test("opens and closes modal based on user role", () => {
    localStorage.setItem("role", "garbage collector");
  
    render(
      <BinNav />, {
      wrapper: MemoryRouter
    }
    );

    //Initially, modal should not be open
    expect(screen.queryByText(/You are not authorized to add a bin/i)).not.toBeInTheDocument();

    // Click on the "Add Bin" link
    const addBinLink = screen.getByText(/Add Bin/i);
    fireEvent.click(addBinLink);

    // Modal should be open due to the user role
    expect(screen.getByText(/You are not authorized to add a bin/i)).toBeInTheDocument();


    //Modal should close when clicked on closed button
    const closeModalButton = screen.getByRole("button", {name:"Close"});
    fireEvent.click(closeModalButton);

    expect(screen.queryByText(/You are not authorized to add a bin/i)).not.toBeInTheDocument();
    
  })
});


