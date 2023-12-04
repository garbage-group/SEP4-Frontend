import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import logoImage from '../../images/bin-icon.png';
import "../../styles/MainMap.css"
import { useBins } from '../../contexts/BinContext';


const MainMap = () => {
    const { bins } = useBins();
    const zoom = 12.5;
    const mapRef = useRef();

    const garbageIcon = L.icon({
        iconUrl: logoImage,
        iconSize: [38, 38],
    });

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current.leafletElement;
            const routingControl = L.Routing.control({
                waypoints: [],
                routeWhileDragging: true,
                geocoder: L.Control.Geocoder.nominatim(),
                createMarker: function () { return null; }
            }).addTo(map);

            bins.forEach(bin => {
                const marker = L.marker([bin.latitude, bin.longitude], { icon: garbageIcon }).addTo(map);
                marker.on('click', function () {
                    routingControl.setWaypoints([routingControl.getWaypoints()[0], L.latLng(bin.latitude, bin.longitude)]);
                });
            });
        }
    }, [bins, garbageIcon]);

    return (
        <MapContainer
            center={bins.length > 0 ? [bins[0].latitude, bins[0].longitude] : [55.86352, 9.83769]}
            zoom={zoom}
            className="map-container"
            ref={mapRef}
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        </MapContainer>
    );
};

export { MainMap };