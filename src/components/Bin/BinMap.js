import { useNavigate} from "react-router-dom";
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
    const { bins } = useBins();
   
    const [mapPosition, setMapPosition] = useState([55.85, 9.84]);
    const [lat, lng] = useURLPosition();

  //garbage icon
  const garbageIcon = L.icon({
    iconUrl: logoImage,
    iconSize: [30, 30],
  });

    //setting  map position
    useEffect(function(){
        if (lat && lng) {
            setMapPosition([lat, lng]);
        }
    },[lat, lng]);

    
   
    return (
        <div className="mapContainer" onClick={() => navigate("form")}>
            <MapContainer className="map" center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
        <DetectClick />
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
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
    e.originalEvent.preventDefault();
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); //we are navigating to the form and passing the lat and lng to the url so that it can be accessed to the form
    },
  });
}

export default BinMap;
