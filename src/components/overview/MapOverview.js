import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import logoImage from "../../images/bin-icon.png";
import "../../styles/Map.css";

const Map = () => {
  const position = [55.86352, 9.83769];
  const zoom = 12.5;

  const garbageIcon = L.icon({
    iconUrl: logoImage,
    iconSize: [38, 38],
  });

  return (
    <MapContainer center={position} zoom={zoom} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[55.86352, 9.83769]} icon={garbageIcon}>
        <Popup>
          Bin ID: 121 <br />
          Fill Level: <br />
          Humidity:
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export { Map };
