import { MapContainer, TileLayer } from "react-leaflet";

function TrafficInformation() {
  return (
    <>
      <MapContainer
        center={[55.863424, 9.837361]}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          height: 600,
          width: 600,
          border: 1,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </>
  );
}

export { TrafficInformation };
