import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Navbar Component', () => {
    test('renders logo, search bar, and icons', () => {
        render(
            <Router>
                <Navbar setIsLoggedIn={() => { }} />
            </Router>
        );

        const logo = screen.getByAltText('logo');
        const searchBar = screen.getByPlaceholderText('Search bins, or collectors.....');
        const notificationIcon = screen.getByTestId('NotificationsNoneOutlinedIcon');
        const logoutIcon = screen.getByTestId('LogoutIcon');

        expect(logo).toBeInTheDocument();
        expect(searchBar).toBeInTheDocument();
        expect(notificationIcon).toBeInTheDocument();
        expect(logoutIcon).toBeInTheDocument();
    });

});
