// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import BinMap from "../../components/Bin/BinMap"
// import { useBins } from '../../contexts/BinContext';
// import { MemoryRouter, useNavigate} from 'react-router';
// import BinForm from '../../components/Bin/BinForm';

// jest.mock('../../contexts/BinContext', () => ({
//     ...jest.requireActual('../../contexts/BinContext'),
//     useBins: jest.fn(),
// }));

// jest.mock('react-router-dom', () => {
//     const module = jest.requireActual('react-router-dom');
//     return {
//         ...module,
//         useNavigate: jest.fn(),
//     };
// });

// jest.mock('../../components/Bin/BinForm', () => {
//     return {
//         __esModule: true,
//         default: jest.fn(() => <div data-testid="form-page">Mocked BinForm</div>),
//     };
// });



// describe('BinMap component', () => {
//     beforeEach(() => {
//         // Mock useBins to return dummy data for testing
//         useBins.mockReturnValue({
//             bins: [
//                 { id: 1, latitude: 55.85, longitude: 9.84, fillThreshold: 70, capacity: 100 },
//                 // Add more dummy data as needed
//             ],
//         });
//     });


//     it('detects click and navigates to form for municipality worker', async() => {
//         const { useNavigate } = require('react-router-dom');
//         const mockNavigate = jest.fn();
//         useNavigate.mockReturnValue(mockNavigate);
//         render(
//             <MemoryRouter>
//                 <BinMap />
//             </MemoryRouter>
//         );

//         // Mock localStorage role for a municipality worker
//         localStorage.setItem('role', 'municipality worker');

//         const mapContainer = screen.getByTestId('map-container');
//         fireEvent.click(mapContainer);

//         await waitFor(() => {
//             expect(screen.getByTestId('form-page')).toBeInTheDocument();
//         });

//         // Add assertions for navigation to form
//         // You might need to wait for the navigation to happen, depending on your app's behavior
//     });

//     it('detects click and opens modal for non-municipality worker', () => {
//         render(
//             <MemoryRouter>
//                 <BinMap />
//             </MemoryRouter>
//         );

//         // Mock localStorage role for a non-municipality worker
//         localStorage.setItem('role', 'garbage collector');

//         const mapContainer = screen.getByTestId('map-container');
//         fireEvent.click(mapContainer);

//         // Add assertions for modal being opened
//         // You might need to wait for the modal to appear, depending on your app's behavior
//     });
// });








