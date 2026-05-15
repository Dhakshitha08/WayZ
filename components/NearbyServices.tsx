"use client";

import { useEffect, useState } from "react";

type Report = {
  id: string;
  category: string;
  latitude: number;
  longitude: number;
};

type Place = {
  properties: {
    place_id: string;
    name: string;
    formatted: string;
    datasource?: {
      raw?: {
        phone?: string;
      };
    };
  };
};

export default function NearbyServices({
  reports,
}: {
  reports: Report[];
}) {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (!reports.length) return;

    fetchNearby();
  }, [reports]);
const getSearchKeyword = (category: string) => {
  switch (category.toLowerCase()) {
    case "water leakage":
      return "plumber";

    case "plumbing":
      return "plumber";

    case "street light":
      return "electrician";

    case "electricity":
      return "electrician";

    case "garbage":
      return "cleaning service";

    case "flooding":
      return "drainage service";

    case "road damage":
      return "construction contractor";

    default:
      return "plumber";
  }
};
const fetchNearby = async () => {
  try {
    const latest = reports[0];

    const keyword = getSearchKeyword(latest.category);

    const url = `https://api.geoapify.com/v1/geocode/search?text=${keyword}&filter=circle:${latest.longitude},${latest.latitude},5000&bias=proximity:${latest.longitude},${latest.latitude}&limit=15&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;
    const res = await fetch(url);

    const data = await res.json();
    console.log("GEOAPIFY RESPONSE:", data);
const features = data.features || [];

const filtered = features.filter((place: any) => {
  const name =
    place.properties?.name?.toLowerCase() || "";

  return name.includes(keyword);
});

setPlaces(filtered);
    console.log(data);

    
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Nearby {getSearchKeyword(reports[0]?.category || "").replace("-", " ")}s
      </h2>

      <div className="space-y-4">
  {places.length === 0 ? (
  <div className="text-gray-400 text-center py-10">
    No nearby professionals found.
  </div>
) : (
  places.map((place: any) => (
    <div
      key={place.properties.place_id}
      className="bg-black/20 border border-white/10 rounded-2xl p-5 hover:border-green-500/30 transition"
    >
      <h3 className="font-bold text-lg text-white">
        {place.properties.name || "Unknown Service"}
      </h3>

      <p className="text-sm text-gray-400 mt-2">
        📍 {place.properties.formatted}
      </p>

      <p className="text-sm text-green-400 mt-2">
        📞 {place.properties.datasource?.raw?.phone || "Not Available"}
      </p>
    </div>
  ))
)}
      </div>
    </div>
  );
}
