// ---------------------------------------------------------------------------
// Nearby Places — frontend-only configuration.
// Paste your Geoapify API key here, or set VITE_GEOAPIFY_API_KEY in .env
// (https://www.geoapify.com/ — free tier available). Nothing else to change.
// ---------------------------------------------------------------------------
export const GEOAPIFY_API_KEY: string =
  (import.meta.env.VITE_GEOAPIFY_API_KEY as string | undefined) ?? "";

export const GEOAPIFY_PLACES_URL = "https://api.geoapify.com/v2/places";

/** Category filters mapped to Geoapify place categories. */
export type NearbyCategory = {
  id: string;
  label: string;
  emoji: string;
  /** Geoapify category codes */
  codes: string[];
  /** OpenStreetMap Overpass fallback selectors */
  osm: string[];
};

export const NEARBY_CATEGORIES: NearbyCategory[] = [
  { id: "tourism", label: "Tourist Attractions", emoji: "📍", codes: ["tourism.attraction", "tourism.sights"], osm: ['["tourism"="attraction"]'] },
  { id: "restaurant", label: "Restaurants", emoji: "🍽️", codes: ["catering.restaurant"], osm: ['["amenity"="restaurant"]'] },
  { id: "cafe", label: "Cafes", emoji: "☕", codes: ["catering.cafe"], osm: ['["amenity"="cafe"]'] },
  { id: "hotel", label: "Hotels", emoji: "🏨", codes: ["accommodation.hotel", "accommodation.motel"], osm: ['["tourism"="hotel"]'] },
  { id: "resort", label: "Resorts", emoji: "🌴", codes: ["accommodation.hut", "accommodation.chalet", "accommodation.apartment"], osm: ['["tourism"="resort"]'] },
  { id: "beach", label: "Beaches", emoji: "🏖️", codes: ["beach"], osm: ['["natural"="beach"]'] },
  { id: "temple", label: "Temples", emoji: "🛕", codes: ["religion.place_of_worship.hinduism", "religion.place_of_worship.buddhism"], osm: ['["amenity"="place_of_worship"]["religion"="hindu"]'] },
  { id: "church", label: "Churches", emoji: "⛪", codes: ["religion.place_of_worship.christianity"], osm: ['["amenity"="place_of_worship"]["religion"="christian"]'] },
  { id: "mosque", label: "Mosques", emoji: "🕌", codes: ["religion.place_of_worship.islam"], osm: ['["amenity"="place_of_worship"]["religion"="muslim"]'] },
  { id: "museum", label: "Museums", emoji: "🏛️", codes: ["entertainment.museum"], osm: ['["tourism"="museum"]'] },
  { id: "zoo", label: "Zoos", emoji: "🦁", codes: ["entertainment.zoo", "entertainment.aquarium"], osm: ['["tourism"="zoo"]'] },
  { id: "park", label: "Parks", emoji: "🌳", codes: ["leisure.park", "national_park"], osm: ['["leisure"="park"]'] },
  { id: "mall", label: "Shopping Malls", emoji: "🛍️", codes: ["commercial.shopping_mall", "commercial.marketplace"], osm: ['["shop"="mall"]'] },
  { id: "cinema", label: "Cinemas", emoji: "🎬", codes: ["entertainment.cinema"], osm: ['["amenity"="cinema"]'] },
  { id: "hospital", label: "Hospitals", emoji: "🏥", codes: ["healthcare.hospital"], osm: ['["amenity"="hospital"]'] },
  { id: "pharmacy", label: "Pharmacies", emoji: "💊", codes: ["healthcare.pharmacy"], osm: ['["amenity"="pharmacy"]'] },
  { id: "atm", label: "ATMs", emoji: "🏧", codes: ["service.financial.atm", "service.financial.bank"], osm: ['["amenity"="atm"]'] },
  { id: "fuel", label: "Fuel Stations", emoji: "⛽", codes: ["service.vehicle.fuel"], osm: ['["amenity"="fuel"]'] },
  { id: "bus", label: "Bus Stops", emoji: "🚌", codes: ["public_transport.bus"], osm: ['["highway"="bus_stop"]'] },
  { id: "train", label: "Railway Stations", emoji: "🚉", codes: ["public_transport.train"], osm: ['["railway"="station"]'] },
  { id: "airport", label: "Airports", emoji: "✈️", codes: ["airport"], osm: ['["aeroway"="aerodrome"]'] },
  { id: "waterfall", label: "Waterfalls", emoji: "💦", codes: ["natural.water.spring", "natural.water"], osm: ['["waterway"="waterfall"]'] },
  { id: "lake", label: "Lakes", emoji: "🏞️", codes: ["natural.water.reef", "natural.water"], osm: ['["natural"="water"]["water"="lake"]'] },
  { id: "fort", label: "Forts & Palaces", emoji: "🏰", codes: ["heritage.unesco", "building.historic", "tourism.sights.castle"], osm: ['["historic"="castle"]', '["historic"="fort"]'] },
  { id: "adventure", label: "Adventure", emoji: "🥾", codes: ["entertainment.activity_park", "sport.sports_centre"], osm: ['["leisure"="sports_centre"]'] },
];

export const RADIUS_OPTIONS = [5, 10, 15, 20];

export const LS_KEYS = {
  category: "jatayuv.nearby.category",
  radius: "jatayuv.nearby.radius",
};

export type NearbyPlace = {
  id: string;
  name: string;
  address: string;
  category: string;
  lat: number;
  lon: number;
  distanceKm: number;
  rating?: number;
};

export function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Geoapify fetch (preferred). */
async function fetchGeoapify(
  coords: { lat: number; lon: number },
  cat: NearbyCategory,
  radiusKm: number,
  signal: AbortSignal
): Promise<NearbyPlace[]> {
  const params = new URLSearchParams({
    categories: cat.codes.join(","),
    filter: `circle:${coords.lon},${coords.lat},${Math.round(radiusKm * 1000)}`,
    bias: `proximity:${coords.lon},${coords.lat}`,
    limit: "60",
    apiKey: GEOAPIFY_API_KEY,
  });
  const res = await fetch(`${GEOAPIFY_PLACES_URL}?${params}`, { signal });
  if (!res.ok) throw new Error(`Geoapify request failed (${res.status})`);
  const json = (await res.json()) as { features?: any[] };
  return (json.features ?? []).map((f, i) => {
    const p = f.properties ?? {};
    const lat = p.lat ?? f.geometry?.coordinates?.[1];
    const lon = p.lon ?? f.geometry?.coordinates?.[0];
    return {
      id: p.place_id ?? `${cat.id}-${i}`,
      name: p.name || p.address_line1 || cat.label,
      address: p.formatted || p.address_line2 || "Address unavailable",
      category: cat.label,
      lat,
      lon,
      distanceKm: haversineKm(coords, { lat, lon }),
    } satisfies NearbyPlace;
  });
}

/** OpenStreetMap Overpass fallback — keyless, used when no Geoapify key is set. */
async function fetchOverpass(
  coords: { lat: number; lon: number },
  cat: NearbyCategory,
  radiusKm: number,
  signal: AbortSignal
): Promise<NearbyPlace[]> {
  const r = Math.round(radiusKm * 1000);
  const body = `[out:json][timeout:25];(${cat.osm
    .map((sel) => `node${sel}(around:${r},${coords.lat},${coords.lon});way${sel}(around:${r},${coords.lat},${coords.lon});`)
    .join("")});out center 60;`;
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body,
    signal,
  });
  if (!res.ok) throw new Error(`OpenStreetMap request failed (${res.status})`);
  const json = (await res.json()) as { elements?: any[] };
  return (json.elements ?? [])
    .map((el, i) => {
      const lat = el.lat ?? el.center?.lat;
      const lon = el.lon ?? el.center?.lon;
      if (lat == null || lon == null) return null;
      const t = el.tags ?? {};
      const addr = [t["addr:housenumber"], t["addr:street"], t["addr:city"], t["addr:postcode"]]
        .filter(Boolean)
        .join(", ");
      return {
        id: `${el.type}-${el.id ?? i}`,
        name: t.name || cat.label,
        address: addr || "Address unavailable",
        category: cat.label,
        lat,
        lon,
        distanceKm: haversineKm(coords, { lat, lon }),
      } satisfies NearbyPlace;
    })
    .filter(Boolean) as NearbyPlace[];
}

export async function fetchNearbyPlaces(
  coords: { lat: number; lon: number },
  cat: NearbyCategory,
  radiusKm: number,
  signal: AbortSignal
): Promise<{ places: NearbyPlace[]; source: "Geoapify" | "OpenStreetMap" }> {
  if (GEOAPIFY_API_KEY) {
    const places = await fetchGeoapify(coords, cat, radiusKm, signal);
    return { places: dedupe(places), source: "Geoapify" };
  }
  const places = await fetchOverpass(coords, cat, radiusKm, signal);
  return { places: dedupe(places), source: "OpenStreetMap" };
}

function dedupe(list: NearbyPlace[]) {
  const seen = new Set<string>();
  return list
    .filter((p) => {
      const k = `${p.name}|${p.lat.toFixed(4)}|${p.lon.toFixed(4)}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

export function directionsUrl(p: { lat: number; lon: number; name: string }) {
  return `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}&destination_place_id=&travelmode=driving`;
}
