import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, InfoWindow, useLoadScript, Autocomplete } from '@react-google-maps/api';
import "../../styles/MapDirections/GoogleMap.css"
import { useBins } from '../../contexts/BinContext';
import { useNotifications } from '../../contexts/NotificationContext';
import GreenBinImage from "../../images/bin-icon.png";
import RedBinImage from "../../images/bin-icon-full.png";
import Modal from "../utils/Modal";

const center = {
    lat: 55.86352,
    lng: 9.83769
};

const GoogleMapComponent = () => {
    const { bins } = useBins();
    const { notifications } = useNotifications();
    const [selectedBin, setSelectedBin] = useState(null);
    const [selectedBins, setSelectedBins] = useState([]);
    const [directions, setDirections] = useState(null);
    const [startAddress, setStartAddress] = useState('');
    const [autocomplete, setAutocomplete] = useState(null);
    const [mapRefreshKey, setMapRefreshKey] = useState(0);
    const [mapReady, setMapReady] = useState(false);
    const [startLocationError, setStartLocationError] = useState(false);
    const [selectedBinsError, setSelectedBinsError] = useState(false);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    });

    const onMapLoad = useCallback((map) => { }, []);

    const onLoad = useCallback((autoC) => setAutocomplete(autoC), []);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            setStartAddress(autocomplete.getPlace().formatted_address);
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    const toggleBinSelection = (bin) => {
        if (selectedBins.some(selectedBin => selectedBin.id === bin.id)) {
            setSelectedBins(selectedBins.filter(selectedBin => selectedBin.id !== bin.id));
        } else {
            setSelectedBins([...selectedBins, bin]);
        }
    };

    const handleDirectionsSubmit = (event) => {
        event.preventDefault();

        //Errors
        // Check if start address is empty
        if (!startAddress) {
            setStartLocationError(true);
            setSelectedBinsError(false);
            return;
        }

        // Check if at least one bin is selected
        if (selectedBins.length === 0) {
            setSelectedBinsError(true);
            setStartLocationError(false);
            return;
        }

        // Clear any previous errors
        setStartLocationError(false);
        setSelectedBinsError(false);

        //If no Errors present, proceed to the next step

        if (!startAddress || selectedBins.length === 0) return;

        const waypoints = selectedBins.map(bin => ({ location: { lat: bin.latitude, lng: bin.longitude } }));
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route({
            origin: startAddress,
            destination: waypoints[waypoints.length - 1].location,
            waypoints: waypoints.slice(0, -1),
            optimizeWaypoints: true,
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });



    };

    const resetDirections = () => {
        setSelectedBin(null);
        setSelectedBins([]);
        setDirections(null);
        setStartAddress('');
        setMapRefreshKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        setMapReady(false);
        const timer = setTimeout(() => {
            setMapReady(true);
        }, 500);
        return () => clearTimeout(timer);
    }, [mapRefreshKey]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    const greenMarkerIcon = {
        url: GreenBinImage,
        scaledSize: new window.google.maps.Size(38, 38),
    };

    const redMarkerIcon = {
        url: RedBinImage,
        scaledSize: new window.google.maps.Size(38, 38),
    };

    const hasNotification = (binId) => {
        return notifications.some((notification) => notification.binId === binId);
    };

    return (
        <div className="map-container1">
            <div className="directions-form">
                <form onSubmit={handleDirectionsSubmit}>
                    <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Enter start location"
                            value={startAddress}
                            onChange={(e) => setStartAddress(e.target.value)}
                        />
                    </Autocomplete>
                    {/* Display start location error modal */}
                    <Modal isOpened={startLocationError} onClose={() => setStartLocationError(false)}>
                        Please enter a start location.
                    </Modal>

                    <button className="directions-button" type="submit">Get Directions</button>
                    <button className="directions-button" type="button" onClick={resetDirections}>Reset</button>
                </form>
                <div className="selected-bins">
                    <h3>Select Bins</h3>
                    {selectedBins.map(bin => (
                        <div key={bin.id} className="destination-bin">
                            <span>Bin ID: {bin.id}</span>
                            <button className="remove-button" onClick={() => toggleBinSelection(bin)}>Remove</button>
                        </div>
                    ))}
                    {/* Display selected bins error modal */}
                    <Modal isOpened={selectedBinsError} onClose={() => setSelectedBinsError(false)}>
                        Please select at least one bin.
                    </Modal>
                </div>
            </div>
            <div className="google-map-container">
                <GoogleMap
                    key={`map-${mapRefreshKey}`}
                    zoom={14}
                    center={center}
                    onLoad={onMapLoad}
                >
                    {mapReady && bins.map(bin => (
                        <Marker
                            key={bin.id}
                            position={{ lat: bin.latitude, lng: bin.longitude }}
                            icon={hasNotification(bin.id) ? redMarkerIcon : greenMarkerIcon}
                            onClick={() => toggleBinSelection(bin)}
                        />
                    ))}
                    {selectedBin && (
                        <InfoWindow
                            position={{ lat: selectedBin.latitude, lng: selectedBin.longitude }}
                            onCloseClick={() => setSelectedBin(null)}
                        >
                            <div>
                                <h2>Bin ID: {selectedBin.id}</h2>
                            </div>
                        </InfoWindow>
                    )}
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </div>
        </div>
    );
};

export default GoogleMapComponent;
