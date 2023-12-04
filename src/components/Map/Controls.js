import React, { useState } from 'react';
import "../../styles/Map_css/Controls.css";
const Controls = ({ onRouteUpdate }) => {
    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');

    const handleRouteChange = () => {
        // Call the prop function to update the route in the parent component
        onRouteUpdate(startPoint, endPoint);
    };

    return (
        <div className="controls-container">
            <input
                type="text"
                placeholder="Start location"
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
            />
            <input
                type="text"
                placeholder="End location"
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
            />
            <button onClick={handleRouteChange}>Update Route</button>
        </div>
    );
};

export default Controls;
