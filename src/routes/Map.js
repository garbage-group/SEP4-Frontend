import React from 'react';
import GoogleMapComponent from '../components/MapDirections/GoogleMap';
import "../styles/Map.css";


export function Map() {
    return (
        <div className="map-page-container">
            <GoogleMapComponent />
        </div>

    );
}