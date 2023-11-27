import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../components/SignUp';

describe('SignUp Component', () => {

  //check whether specific elements are present in the rendered SignUp component
  //Passed
  test('renders all input elements and a button', () => {
    render(<SignUp />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Region')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repeat Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

 
  //assertions to check if specific elements (icons in this case) are present in the rendered SignUp component
  //Passed
  test('renders username, full name, region, password, and repeat password icons', () => {
    render(<SignUp />);
    expect(screen.getByAltText('Username Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Full Name Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Region Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Password Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Repeat Password Icon')).toBeInTheDocument();
  });


/*checks whether the input fields in the SignUp component are correctly 
updated when the user interacts with them by simulating changes in their values*/
  test('input elements should change on user interaction', () => {
    render(<SignUp />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const fullNameInput = screen.getByPlaceholderText(/full name/i);
    const regionInput = screen.getByPlaceholderText(/region/i);
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    const repeatPasswordInputs = screen.getAllByPlaceholderText(/repeat password/i);
  
    fireEvent.change(usernameInput, { target: { value: 'testUsername' } });
    fireEvent.change(fullNameInput, { target: { value: 'testFullName' } });
    fireEvent.change(regionInput, { target: { value: 'testRegion' } });
  
    // Change the first password input
    fireEvent.change(passwordInputs[0], { target: { value: 'testPassword' } });
  
    // Change the first repeat password input
    fireEvent.change(repeatPasswordInputs[0], { target: { value: 'testPassword' } });
  
    expect(usernameInput.value).toBe('testUsername');
    expect(fullNameInput.value).toBe('testFullName');
    expect(regionInput.value).toBe('testRegion');
    expect(passwordInputs[0].value).toBe('testPassword');
    expect(repeatPasswordInputs[0].value).toBe('testPassword');
  });
  

//check if the window.alert method is called without actually triggering it in the test environment
  test('throws error on sign-up button click with empty fields', () => {
    // Mock the window.alert method
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    render(<SignUp />);
  
    const buttonEl = screen.getByRole('button');
    fireEvent.click(buttonEl);
  
    // Verify that window.alert was called
    expect(alertMock).toHaveBeenCalledWith('Please fill in all fields.');
  
    // Restore the original implementation of window.alert
    alertMock.mockRestore();
  });
});
