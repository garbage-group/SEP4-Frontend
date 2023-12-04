import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useBins } from "../contexts/BinContext";
import BinItem from "../components/Bin/BinItem";
import { MemoryRouter } from "react-router-dom";

jest.mock("../contexts/BinContext.js");


describe("BinItem component", () => {
    const mockDeleteBin = jest.fn();

    const mockBin = {
        id: 1,
        capacity: 200,
        emptiedLast: new Date("2023-01-01T12:00:00Z"),
        latitude: 123,
        longitude: 456,
    };

    beforeEach(() =>{
        useBins.mockReturnValue({
            currentBin: {
                deviceId: "8080",
                capacity: 100,
                emptiedLast: new Date("2023-01-01T12:00:00Z"),
                fillThreshold: 75,
                latitude: 40.7128,
                longitude: -74.006,
                fillLevels: [
                    { value: 50, dateTime: new Date("2023-01-01T11:30:00Z") },
                    { value: 75, dateTime: new Date("2023-01-01T12:00:00Z") },
                ],
                humidity: [
                    { value: 30, dateTime: new Date("2023-01-01T11:45:00Z") },
                    { value: 40, dateTime: new Date("2023-01-01T12:15:00Z") },
                ],
            },
            deleteBin: mockDeleteBin,
            isLoading: false,
        });
    })

   

    test("renders Binitem with correct content", () =>{
        render(
            <MemoryRouter>
                <BinItem bin={mockBin}/>
            </MemoryRouter>
        );
        expect(screen.getByText(/Bin 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Capacity: 200/i)).toBeInTheDocument();
    
    });

    test("calls deleteBin when delete button is clicked", () => {
        render(
            <MemoryRouter>
                <BinItem bin={mockBin} />
            </MemoryRouter>
        );

        // Simulate a click on the delete button
        fireEvent.click(screen.getByTestId(/deleteBin/i));

        // Check if deleteBin has been called
        expect(mockDeleteBin).toHaveBeenCalledWith(mockBin.id);
    });
})