import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Clock } from "../components/Overview/TimeInfo";

// Mocking the setInterval and clearInterval functions
jest.useFakeTimers();

describe('Clock', () => {
    test('renders Clock component', () => {
        render(<Clock />);
        // Check if the clock is in the document
        expect(screen.getByText(/horsens/i)).toBeInTheDocument();
    });

    test('displays time in 12-hour format initially', () => {
        render(<Clock />);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        // This will check if there is AM or PM in the time string which indicates a 12-hour format
        expect(screen.getByText(/AM|PM/i)).toBeInTheDocument();
    });

    test('toggles to 24-hour format when button is clicked', () => {
        render(<Clock />);
        // Click the button to toggle to 24-hour format
        fireEvent.click(screen.getByText(/24-hour format/i));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        // After toggling, AM or PM should not be found which indicates a 24-hour format
        expect(screen.queryByText(/AM|PM/i)).not.toBeInTheDocument();
    });

    test('toggles back to 12-hour format when button is clicked again', () => {
        render(<Clock />);
        // Click the button to toggle to 24-hour format
        fireEvent.click(screen.getByText(/24-hour format/i));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        // Click again to toggle back to 12-hour format
        fireEvent.click(screen.getByText(/12-hour format/i));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        // Check for AM or PM again
        expect(screen.getByText(/AM|PM/i)).toBeInTheDocument();
    });

    // Clean up timers
    afterEach(() => {
        jest.clearAllTimers();
    });
});