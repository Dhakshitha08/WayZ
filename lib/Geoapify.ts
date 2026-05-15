import type {
  IssueCategory,
  IssueLocation,
  NearbyService,
  NearbyServicesResult,
} from "@/types";
import { ISSUE_CATEGORY_TO_SERVICES } from "@/types";

const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY!;

// Default search radius in metres
const DEFAULT_RADIUS = 2000;

/**
 * Fetches nearby services relevant to the given issue category.
 *
 * BUG FIX: The previous implementation used `location.longitude` (undefined)
 * instead of `location.lng`, and passed category codes as a space-separated
 * string instead of the pipe-separated format Geoapify expects.
 */
export async function fetchNearbyServices(
  location: IssueLocation,
  category: IssueCategory,
  radiusMeters: number = DEFAULT_RADIUS
): Promise<NearbyServicesResult> {
  const { lat, lng } = location; // ✅ use .lng, not .longitude

  if (!lat || !lng) {
    throw new Error(
      "Invalid issue location: lat/lng are required to fetch nearby services."
    );
  }

  const serviceCategories = ISSUE_CATEGORY_TO_SERVICES[category];

  // ✅ Geoapify requires categories joined with "|", not "," or " "
  const categoriesParam = serviceCategories.join("|");

  const url = new URL("https://api.geoapify.com/v2/places");
  url.searchParams.set("categories", categoriesParam);
  url.searchParams.set("filter", `circle:${lng},${lat},${radiusMeters}`); // ✅ lon,lat order for Geoapify
  url.searchParams.set("bias", `proximity:${lng},${lat}`); // ✅ sort by proximity
  url.searchParams.set("limit", "10");
  url.searchParams.set("apiKey", GEOAPIFY_API_KEY);

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Geoapify API error ${res.status}: ${text}`);
  }

  const data = await res.json();

  const services: NearbyService[] = (data.features ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (feature: any): NearbyService => {
      const props = feature.properties;
      const [featureLon, featureLat] = feature.geometry.coordinates; // GeoJSON: [lon, lat]

      // Haversine distance in metres (Geoapify sometimes omits `distance`)
      const dist =
        props.distance ?? haversineMetres(lat, lng, featureLat, featureLon);

      return {
        place_id: props.place_id,
        name: props.name ?? props.address_line1 ?? "Unnamed place",
        categories: props.categories ?? [],
        address: {
          formatted: props.formatted ?? props.address_line2 ?? "",
          city: props.city,
          postcode: props.postcode,
        },
        distance: Math.round(dist),
        lat: featureLat,
        lon: featureLon,
        phone: props.contact?.phone,
        website: props.contact?.website,
        opening_hours: props.opening_hours,
      };
    }
  );

  // Sort ascending by distance (closest first)
  services.sort((a, b) => a.distance - b.distance);

  return { services, issueLocation: location, radiusMeters };
}

/** Haversine formula — returns distance in metres between two lat/lng points */
function haversineMetres(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6_371_000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}