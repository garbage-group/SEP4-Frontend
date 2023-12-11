import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackButton from '../components/Bin/BackButton';
import { MemoryRouter, useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => {
    const module = jest.requireActual('react-router-dom');
    return {
        ...module,
        useNavigate: () => jest.fn(),
    }
});


describe('BackButton component', () => {
    it('navigates to the previous page', () => {
        const mockNavigate = jest.fn(() => -1);
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

        // Render the BackButton component
        render(
            <MemoryRouter>
                <BackButton>Go Back</BackButton>
            </MemoryRouter>);

        // Simulate a click on the button
        fireEvent.click(screen.getByText('Go Back'));

        // Check if the useNavigate hook was called with -1
        expect(useNavigate).toHaveBeenCalledTimes(1);
    });
});












