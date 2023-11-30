import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/Bin_css/BinMap.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useBins } from "../../contexts/BinContext";
import { useState } from "react";

import logoImage from "../../images/bin-icon.png";

function BinMap() {
    const navigate = useNavigate();
    const { bins } = useBins();
    const [param, setParam] = useSearchParams();
    const [mapPosition, setMapPosition] = useState([55.85, 9.84]);

    //garbage icon
    const garbageIcon = L.icon({
        iconUrl: logoImage,
        iconSize: [30, 30],
    });

    //get lat and lng params from the url
    // const lat = param.get("lat");
    // const lng = param.get("lng");
    return (
        <div className="mapContainer" onClick={() => navigate("form")}>
            <MapContainer className="map" center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

                {bins.map((bin) => (
                    <Marker position={[bin.latitude, bin.longitude]} key={bin.id} icon={garbageIcon}>
                        <Popup>
                            <p>Bin {bin.id}</p>
                            <span>
                                Threshold: {bin.fillThreshold}, Capacity: {bin.capacity}
                            </span>

                        </Popup>
                    </Marker>
                ))}

            </MapContainer>
        </div>
    )
}

export default BinMap
