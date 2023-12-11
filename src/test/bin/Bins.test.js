// File: Bins.test.js

import React from 'react';
import { render,screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { Bins } from '../../routes/Bins';



jest.mock("../../components/Bin/BinSidebar", () => () => (
    <div data-testid="bin-sidebar">Mocked BinSideBar</div>
));

jest.mock("../../components/Bin/BinMap", () => () => (
    <div data-testid="bin-map">Mocked BinMap</div>
));


test('renders Bins component with BinSidebar and BinMap', () => {
    render(<Bins />);

    // Check if Bins component contains BinSidebar and BinMap components
    const binSidebarElement = screen.getByTestId('bin-sidebar');
    const binMapElement = screen.getByTestId('bin-map');

    expect(binSidebarElement).toBeInTheDocument();
    expect(binMapElement).toBeInTheDocument();
});

// Additional tests for BinSidebar and BinMap components can be added here
