import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { IndividualUserComponent } from "../../components/users/InvidualUser";

describe("Individual User Component", () => {
  const userData = {
    fullname: "Garbage Collector",
    username: "fohorUthauneyManxeyMoh",
    showExtraElements: true,
    extraElements: <p>Extra Elements</p>,
  };

  // Test case to ensure the component renders user data correctly and shows extra elements
  it("renders user data correctly and shows extra elements", () => {
    render(<IndividualUserComponent {...userData} />);

    expect(screen.getByText("Garbage Collector")).toBeInTheDocument();
    expect(screen.getByText("@fohorUthauneyManxeyMoh")).toBeInTheDocument();

    expect(screen.getByText(/Extra Elements/i)).toBeInTheDocument();
  });

  // Test case to ensure extra elements are not rendered when showExtraElements is false
  it("should not render extra elements", () => {
    const updatedUserData = { ...userData, showExtraElements: false };

    render(<IndividualUserComponent {...updatedUserData} />);
    expect(screen.queryByText(/Extra Elements/i)).not.toBeInTheDocument();
  });
});
