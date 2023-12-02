import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Bin_css/BinMap.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useBins } from "../../contexts/BinContext";
import { useEffect, useState } from "react";

import logoImage from "../../images/bin-icon.png";
import { useURLPosition } from "../../hooks/useURLPosition";

function BinMap() {
  const navigate = useNavigate();
  const location = useLocation();

  const { bins } = useBins();

  const [mapPosition, setMapPosition] = useState([55.85, 9.84]);
  const [mapLat, mapLng] = useURLPosition();

  //garbage icon
  const garbageIcon = L.icon({
    iconUrl: logoImage,
    iconSize: [30, 30],
  });

  //setting  map position
  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );
  // Extract the id from the pathname
  // const id = location.pathname.split("/").pop();
  // console.log(id);

  return (
    <div className="mapContainer" onClick={() => navigate("form")}>
      <MapContainer
        className="map"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {bins.map((bin) => (
          <Marker
            position={[bin.latitude, bin.longitude]}
            key={bin.id}
            icon={garbageIcon}
          >
            <Popup>
              <p>Bin {bin.id}</p>
              <span>
                Threshold: {bin.fillThreshold}, Capacity: {bin.capacity}
              </span>
            </Popup>
          </Marker>
        ))}

        <ChangeMapPosition position={mapPosition} />
        <DetectCLick />
      </MapContainer>
    </div>
  );
}

//component to change the map view as per position
function ChangeMapPosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

//detecting a click on the map
function DetectCLick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); //we are navigating to the form and passing the lat and lng to the url so that it can be accessed to the form
    },
  });
}

export default BinMap;
