import React from 'react';
import { render, screen } from '@testing-library/react';
import { Map } from '../components/overview/Map';

describe('Map Component', () => {
    test('renders MapContainer, TileLayer, and Marker', () => {
        render(<Map />);

        // Test attributes in the Popup:
        expect(screen.getByText('Bin ID: 121')).toBeInTheDocument();
        expect(screen.getByText('Fill Level:')).toBeInTheDocument();
        expect(screen.getByText('Humidity:')).toBeInTheDocument();

        //Further tests to be conduct later when more functionality is added.

    });
});
