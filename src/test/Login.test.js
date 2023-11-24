
import {Login} from '../components/Login';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";



it("renders login component", () => {

    render(<Login  />);

    // Check if the required elements are present
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    expect(screen.getByText('Smart Waste Management system')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
})


