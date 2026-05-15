"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Report {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

export default function Map({
  reports,
}: {
  reports: Report[];
}) {
  return (
    <MapContainer
      center={[6.9271, 79.8612]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full rounded-3xl z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports
  .filter(
    (r) =>
      typeof r.latitude === "number" &&
      typeof r.longitude === "number" &&
      !isNaN(r.latitude) &&
      !isNaN(r.longitude)
  )
  .map((report) => (
    <Marker
      key={report.id}
      position={[report.latitude, report.longitude]}
      icon={icon}
    >
      <Popup>
        <div className="text-black">
          <h3 className="font-bold">{report.title}</h3>
          <p>{report.description}</p>
        </div>
      </Popup>
    </Marker>
  ))}
    </MapContainer>
  );
}