import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import GreenBinImage from "../../images/bin-icon.png";
import RedBinImage from "../../images/bin-icon-full.png";
import "../../styles/MapOverview.css";
import { useBins } from "../../contexts/BinContext";
import { useNotifications } from "../../contexts/NotificationContext";

const MapOverview = () => {
  const { bins } = useBins();
  const { notifications } = useNotifications(); // Use the useNotifications hook
  const zoom = 12.5;

  const garbageIcon = L.icon({
    iconUrl: GreenBinImage,
    iconSize: [38, 38],
  });

  const fullGarbageIcon = L.icon({
    iconUrl: RedBinImage,
    iconSize: [38, 38],
  });


  const formatDateAndTime = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  };

  // Function to check if a bin has a notification
  const hasNotification = (binId) => {
    return notifications.some((notification) => notification.binId === binId);
  };

  return (
    <MapContainer center={bins.length > 0 ? [bins[0].latitude, bins[0].longitude] : [55.86352, 9.83769]} zoom={zoom} className="map-container">
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {bins.map((bin) => (
        <Marker key={bin.id} position={[bin.latitude, bin.longitude]} icon={hasNotification(bin.id) ? fullGarbageIcon : garbageIcon}>
          <Popup className="custom-popup">
            <div className="data-section">
              <strong>Bin ID: {bin.id}</strong> <br /> <br />
              Capacity: {bin.capacity ? `${bin.capacity} Liters` : 'N/A'} <br />
              Last Emptied Time: {bin.emptiedLast ? formatDateAndTime(bin.emptiedLast) : 'N/A'} <br />
              Last Pickup Time: {bin.pickUpTime ? formatDateAndTime(bin.pickUpTime) : 'N/A'} <br />
              Fill Threshold: {bin.fillThreshold ? `${bin.fillThreshold}%` : 'N/A'} <br />
            </div>

            <div className="data-section">
              Latest Fill Level: {bin.fillLevels && bin.fillLevels.length > 0 ? `${bin.fillLevels[bin.fillLevels.length - 1].value}%` : 'N/A'} <br />
              Date: {bin.fillLevels && bin.fillLevels.length > 0 ? formatDateAndTime(bin.fillLevels[bin.fillLevels.length - 1].dateTime) : 'N/A'} <br />
            </div>

            <div className="data-section">
              Latest Humidity: {bin.humidity && bin.humidity.length > 0 ? `${bin.humidity[bin.humidity.length - 1].value}%` : 'N/A'} <br />
              Date: {bin.humidity && bin.humidity.length > 0 ? formatDateAndTime(bin.humidity[bin.humidity.length - 1].dateTime) : 'N/A'}
            </div>
            <a href={`/map?lat=${bin.latitude}&lng=${bin.longitude}`}>Directions to this Bin</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export { MapOverview };
