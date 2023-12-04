import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import Controls from './Controls'; // Adjust the path based on your project structure
import DirectionsDisplay from './DirectionsDisplay'; // Adjust the path based on your project structure

const RouteMap = () => {
    const mapRef = useRef(null);
    const [routeControl, setRouteControl] = useState(null);

    useEffect(() => {
        if (!mapRef.current) {
            // Initialize the map
            const map = L.map('map').setView([51.505, -0.09], 13);
            mapRef.current = map;

            // Add a tile layer to the map
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Initialize Leaflet Routing Machine without adding it to the map yet
            const routingControl = L.Routing.control({
                waypoints: [],
                routeWhileDragging: true,
                show: false, // Hide the default UI
            });

            setRouteControl(routingControl);
        }
    }, []);

    // Function to update the route based on user inputs
    const updateRoute = (start, end) => {
        if (routeControl && start && end) {
            const startPoint = L.latLng(start);
            const endPoint = L.latLng(end);

            // If the control hasn't been added to the map yet, add it now
            if (!routeControl.getPlan().isOnMap()) {
                routeControl.addTo(mapRef.current);
            }

            // Set new waypoints
            routeControl.setWaypoints([startPoint, endPoint]);
        }
    };

    return (
        <div class="controls-directions-container">
            <Controls onRouteUpdate={updateRoute} />
            <div id="map" style={{ height: '400px' }} />
            {routeControl && <DirectionsDisplay routeControl={routeControl} />}
        </div>
    );
};

export default RouteMap;
