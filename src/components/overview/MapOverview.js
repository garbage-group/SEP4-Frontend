import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import logoImage from "../../images/bin-icon.png";
import "../../styles/MapOverview.css";
import { useBins } from "../../contexts/BinContext"; // Import useBins hook

const Map = () => {
  const { bins } = useBins(); // Use bins data from BinContext
  const zoom = 12.5; // Set bin zoom

  const garbageIcon = L.icon({
    iconUrl: logoImage,
    iconSize: [38, 38],
  });

  const formatDateAndTime = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  };

  return (
    <MapContainer center={bins.length > 0 ? [bins[0].latitude, bins[0].longitude] : [55.86352, 9.83769]} zoom={zoom} className="map-container">
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {bins.map((bin) => (
        <Marker key={bin.id} position={[bin.latitude, bin.longitude]} icon={garbageIcon}>
          <Popup className="custom-popup">
            <div className="data-section">
              Bin ID: {bin.id} <br /> <br />
              Latest Fill Level: {bin.fillLevels && bin.fillLevels.length > 0 ? `${bin.fillLevels[bin.fillLevels.length - 1].value}%` : 'N/A'} <br />
              Date: {bin.fillLevels && bin.fillLevels.length > 0 ? formatDateAndTime(bin.fillLevels[bin.fillLevels.length - 1].dateTime) : 'N/A'} <br />
            </div>
            <div className="data-section">
              Latest Humidity: {bin.humidity && bin.humidity.length > 0 ? `${bin.humidity[bin.humidity.length - 1].value}%` : 'N/A'} <br />
              Date: {bin.humidity && bin.humidity.length > 0 ? formatDateAndTime(bin.humidity[bin.humidity.length - 1].dateTime) : 'N/A'}
            </div>
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export { Map };
