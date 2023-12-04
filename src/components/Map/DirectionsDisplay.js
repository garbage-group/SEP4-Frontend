import React, { useState, useEffect } from 'react';
import "../../styles/Map_css/DirectionsDisplay.css";
const DirectionsDisplay = ({ routeControl }) => {
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        const onRoutesFound = (e) => {
            // Extract the itinerary from the first route
            const itinerary = e.routes[0].instructions;
            setDirections(itinerary);
        };

        if (routeControl) {
            // Add the event listener for 'routesfound'
            routeControl.on('routesfound', onRoutesFound);
        }

        // Clean up the event listener when the component unmounts or the control changes
        return () => {
            if (routeControl) {
                routeControl.off('routesfound', onRoutesFound);
            }
        };
    }, [routeControl]);

    return (
        <div className="directions-container">
            <h2>Step by step directions</h2>
            <ul>
                {directions.map((instruction, index) => (
                    <li key={index}>
                        {instruction.text} (Distance: {instruction.distance} meters,
                        Duration: {Math.round(instruction.time / 60)} minutes)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DirectionsDisplay;
