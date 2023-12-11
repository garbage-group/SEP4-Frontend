import { useNavigate } from "react-router-dom";
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
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import logoImage from "../../images/bin-icon.png";
import { useURLPosition } from "../../hooks/useURLPosition";
import Modal from "../Modal";

function BinMap() {
  const { bins } = useBins();
  const [mapPosition, setMapPosition] = useState([55.85, 9.84]);
  const [mapLat, mapLng] = useURLPosition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };


  //garbage icon
  const garbageIcon = L.icon({
    iconUrl: logoImage,
    iconSize: [30, 30],
  });

  //setting  map position
  useEffect(function () {
    if (mapLat && mapLng) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);



  return (
    <>
      <div className="mapContainer" data-testid="map-container">
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
          <DetectClick setIsModalOpen={setIsModalOpen} />
        </MapContainer>
      </div>
      <Modal isOpened={isModalOpen} onClose={closeModal}>
        <DoDisturbOnIcon className="errorIcon" />
        <span> You are not authorized to add a bin.</span>
      </Modal>
    </>
  );
}

//component to change the map view as per position
function ChangeMapPosition({ position }) {
  const map = useMap();
  map.setView(position);
}

//detecting a click on the map
function DetectClick({ setIsModalOpen }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");



  useMapEvents({
    click: (e) => {
      e.originalEvent.preventDefault();
      if (role === "municipality worker") {

        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); //we are navigating to the form and passing the lat and lng to the url so that it can be accessed to the form
      } else {
        setIsModalOpen(true);
      }
    },
  });
}

export default BinMap;
