"use client";

import { useEffect, useState } from "react";

type Report = {
  id: string;
  category: string;
  latitude: number;
  longitude: number;
  service_type?: string;
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
  const [places, setPlaces] = useState<
    Place[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!reports.length) return;

    fetchNearby();
  }, [reports]);

  const getSearchKeyword = (
    category: string
  ) => {
    switch (
      category.toLowerCase()
    ) {
      case "water leakage":
      case "plumbing":
        return "plumber";

      case "street light":
      case "electricity":
        return "electrician";

      case "garbage":
        return "cleaning service";

      case "flooding":
        return "drainage service";

      case "road damage":
        return "construction contractor";

      case "furniture repair":
        return "furniture repair";

      case "appliance repair":
        return "appliance repair";

      case "painting":
        return "painter";

      default:
        return category;
    }
  };

  const fetchNearby = async () => {
    try {
      setLoading(true);

      const latest = reports[0];

      const keyword =
        getSearchKeyword(
          latest.service_type ||
            latest.category
        );

      const url = `https://api.geoapify.com/v1/geocode/search?text=${keyword}&filter=circle:${latest.longitude},${latest.latitude},5000&bias=proximity:${latest.longitude},${latest.latitude}&limit=15&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;

      const res = await fetch(url);

      const data = await res.json();

      console.log(
        "GEOAPIFY RESPONSE:",
        data
      );

      const features =
        data.features || [];

      setPlaces(features);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold">
          Nearby Services
        </h2>

        <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm font-medium">
          {places.length} Found
        </div>

      </div>

      {loading ? (
        <div className="text-gray-400 text-center py-10">
          Searching nearby professionals...
        </div>
      ) : places.length === 0 ? (
        <div className="text-gray-400 text-center py-10">
          No nearby professionals found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {places.map(
            (place: any) => (
              <div
                key={
                  place.properties
                    .place_id
                }
                className="bg-black/20 border border-white/10 rounded-2xl p-5 hover:border-green-500/30 transition"
              >

                <h3 className="font-bold text-lg text-white">
                  {place.properties
                    .name ||
                    "Unknown Service"}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  📍{" "}
                  {
                    place.properties
                      .formatted
                  }
                </p>

                <p className="text-sm text-green-400 mt-2">
                  📞{" "}
                  {place.properties
                    .datasource?.raw
                    ?.phone ||
                    "Not Available"}
                </p>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    place.properties
                      .formatted
                  )}`}
                  target="_blank"
                  className="inline-block mt-4 bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-xl text-sm"
                >
                  Open in Maps
                </a>

              </div>
            )
          )}

        </div>
      )}
    </div>
  );
}