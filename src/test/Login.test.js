
import { Login } from '../routes/Login';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from '../contexts/LoginAuthContext';
// import { useNavigate } from 'react-router-dom';

// Mocking the useNavigate hook
jest.mock('react-router', () => {
    const module = jest.requireActual('react-router');
    return {
        ...module,
        useNavigate: jest.fn(),
    }
});


// jest.mock("react-router");
// useNavigate.mockReturnValue({
//     useNavigate: jest.fn()
// });



describe("Text Content in Login Component", () => {
    test("should render all the text", () => {

        render(<AuthProvider>
            <Login />
        </AuthProvider>);
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
    test("Username input element is rendered", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    })

    test("Password input element is rendered", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    })

    test("checkbox input element is rendered", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    })

    test("sign in button is rendered", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)
        expect(screen.getByRole("button")).toBeInTheDocument();
    })

})

describe("Username and password icons in login component", () => {
    test("should render username and password icon", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)
        expect(screen.getByTestId("person-icon")).toBeInTheDocument();
        expect(screen.getByTestId("key-icon")).toBeInTheDocument();
    })
})

describe("Username, password, and checkbox input changes on user interaction", () => {
    test("username input should change", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)
        const usernameInputEl = screen.getByPlaceholderText(/username/i);
        const testValue = "testUsername";

        fireEvent.change(usernameInputEl, { target: { value: testValue } });
        expect(usernameInputEl.value).toBe(testValue);
    })

    test("password input should change", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)
        const passwordInputEl = screen.getByPlaceholderText(/password/i);
        const testValue = "testUsername";

        fireEvent.change(passwordInputEl, { target: { value: testValue } });
        expect(passwordInputEl.value).toBe(testValue);
    })

    test("checkbox input should be checked", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)
        const checkboxInputEl = screen.getByRole(/checkbox/i);
        const testValue = true;

        fireEvent.change(checkboxInputEl, { target: { checked: testValue } });
        expect(checkboxInputEl.checked).toBe(testValue);
    });
})


describe("Renders error message", () => {
    test("throws error on login button click with empty username", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)

        const passwordInputEl = screen.getByPlaceholderText(/password/i);
        const buttonEl = screen.getByRole(/button/i);
        const errorMessageEl = screen.getByTestId('error-message');
        const error = "Username or password field is empty";

        //set password and leave username emppty
        userEvent.type(passwordInputEl, 'password');

        fireEvent.click(buttonEl);

        expect(errorMessageEl.textContent).toBe(error);
    })

    test("throws error on login button click with empty password", () => {
        render(<AuthProvider>
            <Login />
        </AuthProvider>)

        const userNameInputEl = screen.getByPlaceholderText(/username/i);
        const buttonEl = screen.getByRole(/button/i);
        const errorMessageEl = screen.getByTestId('error-message');
        const error = "Username or password field is empty";

        //set username and leave password emppty
        userEvent.type(userNameInputEl, 'admin');

        fireEvent.click(buttonEl);

        expect(errorMessageEl.textContent).toBe(error);
    })

    // test("throws error on login button click with wrong username", () => {
    //     render(<AuthProvider>
    //         <Login />
    //     </AuthProvider>)

    //     const userNameInputEl = screen.getByPlaceholderText(/username/i);
    //     const passwordInputEl = screen.getByPlaceholderText(/password/i);
    //     const buttonEl = screen.getByRole(/button/i);
    //     const errorMessageEl = screen.getByTestId('error-message');
    //     const error = "Username and password do not match";

    //     //Set the username and password
    //     userEvent.type(userNameInputEl, 'invaliduser');
    //     userEvent.type(passwordInputEl, 'admin');


    //     fireEvent.click(buttonEl);

    //     expect(errorMessageEl.textContent).toBe(error);
    // })

    // test("throws error on login button click with wrong password", () => {
    //     render(<AuthProvider>
    //         <Login />
    //     </AuthProvider>)

    //     const userNameInputEl = screen.getByPlaceholderText(/username/i);
    //     const passwordInputEl = screen.getByPlaceholderText(/password/i);
    //     const buttonEl = screen.getByRole(/button/i);
    //     const errorMessageEl = screen.getByTestId('error-message');
    //     const error = "Username and password do not match";

    //     //Set the username and password
    //     userEvent.type(userNameInputEl, 'admin');
    //     userEvent.type(passwordInputEl, 'invalidPassword');


    //     fireEvent.click(buttonEl);

    //     expect(errorMessageEl.textContent).toBe(error);
    // })

})

// describe("Login successful and local storage", () => {
//     test("successful sign-in sets localStorage and updates state", () => {
        
//         render(<AuthProvider>
//             <Login />
//         </AuthProvider>)

//         const userNameInputEl = screen.getByPlaceholderText(/username/i);
//         const passwordInputEl = screen.getByPlaceholderText(/password/i);
//         const checkboxInputEl = screen.getByRole(/checkbox/i);
//         const buttonEl = screen.getByRole(/button/i);

//         // Mock localStorage.setItem
//         const localStorageSetItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');

//         // Set the username and password
//         userEvent.type(userNameInputEl, 'admin');
//         userEvent.type(passwordInputEl, 'password');

//         // Check the "Remember Me" checkbox
//         fireEvent.click(checkboxInputEl);
//         fireEvent.click(buttonEl);

//         // Verify that localStorage.setItem is called with the expected arguments
//         expect(localStorageSetItemSpy).toHaveBeenCalledWith('isLoggedIn', 'true');
//         expect(localStorageSetItemSpy).toHaveBeenCalledWith('userName', 'admin');
//         expect(localStorageSetItemSpy).toHaveBeenCalledWith('password', 'password');

//         // Verify that localStorage is updated
//         expect(localStorage.getItem('isLoggedIn')).toBe('true');
//         expect(localStorage.getItem('userName')).toBe('admin');
//         expect(localStorage.getItem('password')).toBe('password');
//     })
// })





