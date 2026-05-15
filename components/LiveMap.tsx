"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
const customIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -40],
});
type Report = {
  id: string;
  title: string;
  category: string;
  image_url?: string;
  latitude: number;
  longitude: number;
};

export default function LiveMap({
  reports,
}: {
  reports: Report[];
}) {
  return (
    <MapContainer
      center={[11.021259, 77.005787]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full min-h-[420px] w-full rounded-3xl z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.latitude, report.longitude]}
          icon={customIcon}
        >
          <Popup>
            <div className="bg-[#071510] text-white p-3 rounded-2xl w-56">
  <h3 className="font-bold text-lg">
    {report.title}
  </h3>

  <p className="text-sm text-gray-300 mb-3">
    {report.category}
  </p>

  {report.image_url && (
    <img
      src={report.image_url}
      alt="Issue"
      className="w-full h-32 object-cover rounded-xl border border-white/10"
    />
  )}
</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}