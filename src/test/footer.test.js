import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer';

describe('Footer Component', () => {
    test('renders links, icons, and credits', () => {
        render(<Footer />);

        // Quick Links
        expect(screen.getByText('Quick Links')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Contact Form')).toBeInTheDocument();

        // Social Media Links
        expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
        expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
        expect(screen.getByLabelText('GitHub')).toBeInTheDocument();

        // Credits
        expect(screen.getByText('Credits')).toBeInTheDocument();
        expect(screen.getByText('Developed by The Garbage Crew')).toBeInTheDocument();

        // Check for current year in credits
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`© ${currentYear} The Garbage Crew. All rights reserved.`)).toBeInTheDocument();
    });
});