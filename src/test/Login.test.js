
import {Login} from '../components/Login';
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";


describe("Text Content in Login Component", () => {
    test("should render all the text", () => {
    
        render(<Login  />);
        // Check if the required elements are present
        expect(screen.getByText(/welcome back!/i)).toBeInTheDocument();
        expect(screen.getByText(/Smart Waste Management system/i)).toBeInTheDocument();
        expect(screen.getByText(/Waste & material traceability solution for sustainable facilities/i)).toBeInTheDocument();
        expect(screen.getByText('Sign in')).toBeInTheDocument();
        expect(screen.getByText(/"Smart Waste Management Solution"/i)).toBeInTheDocument();
        expect(screen.getByText(/Smart waste bins are equipped with advanced sensors that detect fill levels and notify collection services in real-time. This optimizes collection routes, reducing fuel consumption and minimizing unnecessary pickups./i)).toBeInTheDocument();
    })
})


describe("Input Elements and Button in Login Component", () => {
    test("all input element and a button should e rendered", () => {
        render(<Login />);
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    })
})

describe("Username and password icons in login component", () =>{
    test("should render username and password icon", () => {
        render(<Login />);
        expect(screen.getByTestId("person-icon")).toBeInTheDocument();
        expect(screen.getByTestId("key-icon")).toBeInTheDocument();
    })
})

describe("Username, password, and checkbox input changes on user interaction", () =>{
    test("username input should change", () => {
        render(<Login />);
        const usernameInputEl = screen.getByPlaceholderText(/username/i);
        const testValue = "testUsername";
    
        fireEvent.change(usernameInputEl, {target: {value: testValue}});
        expect(usernameInputEl.value).toBe(testValue);
    })
    
    test("password input should change", () => {
        render(<Login />);
        const passwordInputEl = screen.getByPlaceholderText(/password/i);
        const testValue = "testUsername";
    
        fireEvent.change(passwordInputEl, { target: { value: testValue } });
        expect(passwordInputEl.value).toBe(testValue);
    })
    
    test("checkbox input should be checked", () => {
        render(<Login />);
        const checkboxInputEl = screen.getByRole(/checkbox/i);
        const testValue = true;
    
        fireEvent.change(checkboxInputEl, { target: { checked: testValue } });
        expect(checkboxInputEl.checked).toBe(testValue);
    });
})


describe("Renders error message", () => {
    test("throws error on login button click with empty username", () => {
        render(<Login />);

        const passwordInputEl = screen.getByPlaceholderText(/password/i);
        const password = "password";

        const buttonEl = screen.getByRole(/button/i);

        const errorMessageEl = screen.getByTestId('error-message');
        const error = "Username or password field is empty";

        fireEvent.change(passwordInputEl, { target: { value: password } });
        fireEvent.click(buttonEl);

        expect(errorMessageEl.textContent).toBe(error); 
    })

    test("throws error on login button click with empty password", () => {
        render(<Login  />);

        const userNameInputEl = screen.getByPlaceholderText(/username/i);
        const userName = "admin";

        const buttonEl = screen.getByRole(/button/i);

        const errorMessageEl = screen.getByTestId('error-message');
        const error = "Username or password field is empty";

        fireEvent.change(userNameInputEl, { target: { value: userName } });
        fireEvent.click(buttonEl);

        expect(errorMessageEl.textContent).toBe(error);
    })

    //axios continue with wrong username and password, mock axios
})





