import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Navigation, Loader2, RefreshCw, LocateFixed, AlertTriangle, Star, Compass, Search,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/site/button";
import { Input } from "@/components/ui/input";
import {
  NEARBY_CATEGORIES, RADIUS_OPTIONS, LS_KEYS, GEOAPIFY_API_KEY,
  fetchNearbyPlaces, directionsUrl, type NearbyPlace,
} from "@/lib/nearby";

export const Route = createFileRoute("/nearby")({
  head: () => ({
    meta: [
      { title: "Nearby Places — Jatayuv AI" },
      { name: "description", content: "Discover attractions, food, stays and essentials around your current location." },
      { property: "og:title", content: "Nearby Places — Jatayuv AI" },
      { property: "og:description", content: "Live geolocation discovery of attractions, restaurants, stays and essentials near you." },
    ],
  }),
  component: NearbyPage,
});

type GeoState =
  | { status: "idle" }
  | { status: "locating" }
  | { status: "ready"; lat: number; lon: number; accuracy: number }
  | { status: "denied" }
  | { status: "unavailable"; message: string };

function NearbyPage() {
  const [geo, setGeo] = useState<GeoState>({ status: "idle" });
  const [categoryId, setCategoryId] = useState(NEARBY_CATEGORIES[0].id);
  const [radius, setRadius] = useState(10);
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string>("");
  const [query, setQuery] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const category = useMemo(
    () => NEARBY_CATEGORIES.find((c) => c.id === categoryId) ?? NEARBY_CATEGORIES[0],
    [categoryId]
  );

  // Restore saved preferences after hydration.
  useEffect(() => {
    try {
      const c = localStorage.getItem(LS_KEYS.category);
      const r = localStorage.getItem(LS_KEYS.radius);
      if (c && NEARBY_CATEGORIES.some((x) => x.id === c)) setCategoryId(c);
      if (r && RADIUS_OPTIONS.includes(Number(r))) setRadius(Number(r));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LS_KEYS.category, categoryId); } catch { /* ignore */ }
  }, [categoryId]);
  useEffect(() => {
    try { localStorage.setItem(LS_KEYS.radius, String(radius)); } catch { /* ignore */ }
  }, [radius]);

  const locate = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setGeo({ status: "unavailable", message: "Your browser does not support geolocation." });
      return;
    }
    setGeo({ status: "locating" });
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setGeo({
          status: "ready",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setGeo({ status: "denied" });
        else
          setGeo({
            status: "unavailable",
            message:
              err.code === err.TIMEOUT
                ? "Timed out while finding your location."
                : "Your location is currently unavailable.",
          });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }, []);

  // Fetch whenever location / category / radius changes.
  useEffect(() => {
    if (geo.status !== "ready") return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);
    fetchNearbyPlaces({ lat: geo.lat, lon: geo.lon }, category, radius, ctrl.signal)
      .then(({ places: p, source: s }) => {
        setPlaces(p);
        setSource(s);
      })
      .catch((e: unknown) => {
        if ((e as Error)?.name === "AbortError") return;
        setError((e as Error)?.message ?? "Could not load nearby places.");
        setPlaces([]);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [geo, category, radius]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return places;
    return places.filter((p) => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q));
  }, [places, query]);

  return (
    <div>
      <Navbar />

      <section className="relative isolate overflow-hidden pt-28 pb-8 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,oklch(0.30_0.12_265)_0%,transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium">
            <Compass className="h-3.5 w-3.5 text-accent" /> Live around you
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Nearby <span className="text-gradient">Places</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Attractions, food, stays and essentials around your current location — powered by your browser's
            location and {GEOAPIFY_API_KEY ? "Geoapify" : "OpenStreetMap"}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Location state */}
        {geo.status !== "ready" && (
          <Card className="glass-strong mx-auto max-w-xl p-8 text-center">
            {geo.status === "idle" && (
              <>
                <LocateFixed className="mx-auto h-10 w-10 text-accent" />
                <h2 className="mt-4 font-display text-xl font-bold">Enable location access</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We use your device location only in your browser to find places around you. Nothing is stored
                  or sent to a server.
                </p>
                <Button variant="hero" className="mt-5" onClick={locate}>
                  <Navigation className="mr-2 h-4 w-4" /> Use my location
                </Button>
              </>
            )}
            {geo.status === "locating" && (
              <>
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-accent" />
                <h2 className="mt-4 font-display text-xl font-bold">Finding you…</h2>
                <p className="mt-2 text-sm text-muted-foreground">Allow the location prompt to continue.</p>
              </>
            )}
            {geo.status === "denied" && (
              <>
                <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
                <h2 className="mt-4 font-display text-xl font-bold">Location permission denied</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enable location for this site in your browser's address-bar settings, then retry.
                </p>
                <Button variant="glass" className="mt-5" onClick={locate}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Retry
                </Button>
              </>
            )}
            {geo.status === "unavailable" && (
              <>
                <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
                <h2 className="mt-4 font-display text-xl font-bold">Location unavailable</h2>
                <p className="mt-2 text-sm text-muted-foreground">{geo.message}</p>
                <Button variant="glass" className="mt-5" onClick={locate}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Try again
                </Button>
              </>
            )}
          </Card>
        )}

        {geo.status === "ready" && (
          <>
            <Card className="glass-strong p-4 sm:p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between">
                <div className="flex min-w-0 items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                  <span className="truncate text-muted-foreground">
                    {geo.lat.toFixed(4)}, {geo.lon.toFixed(4)} · ±{Math.round(geo.accuracy)} m
                  </span>
                </div>
                <Button variant="glass" size="sm" onClick={locate}>
                  <RefreshCw className="mr-2 h-3.5 w-3.5" /> Refresh
                </Button>
              </div>

              <div className="mt-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Radius</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {RADIUS_OPTIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRadius(r)}
                      className={`rounded-full px-4 py-1.5 text-sm transition-all ${
                        radius === r ? "bg-gradient-hero text-white glow-ring" : "glass hover:bg-white/10"
                      }`}
                    >
                      Within {r} km
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Category</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {NEARBY_CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCategoryId(c.id)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all sm:text-sm ${
                        categoryId === c.id ? "bg-accent/20 text-accent" : "glass hover:bg-white/10"
                      }`}
                    >
                      <span>{c.emoji}</span> {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mt-5">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter results by name or address…"
                  className="bg-card/40 pl-9"
                />
              </div>
            </Card>

            {/* Results */}
            <div className="mt-6">
              {loading && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="glass h-40 animate-pulse p-5" />
                  ))}
                </div>
              )}

              {!loading && error && (
                <Card className="glass grid place-items-center p-10 text-center">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                  <p className="mt-3 text-sm text-muted-foreground">{error}</p>
                  <Button variant="glass" className="mt-4" onClick={locate}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Retry
                  </Button>
                </Card>
              )}

              {!loading && !error && visible.length === 0 && (
                <Card className="glass grid place-items-center p-10 text-center">
                  <span className="text-3xl">{category.emoji}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold">
                    No {category.label.toLowerCase()} within {radius} km
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try a wider radius or a different category.
                  </p>
                </Card>
              )}

              {!loading && !error && visible.length > 0 && (
                <>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>{visible.length} places · sorted by distance</span>
                    <span>Source: {source}</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
                      >
                        <Card className="glass flex h-full flex-col p-5 transition-all hover:-translate-y-1 hover:glow-ring">
                          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                            <h3 className="font-display font-semibold leading-tight">{p.name}</h3>
                            <Badge variant="secondary" className="shrink-0 border-0 bg-accent/15 text-accent">
                              {p.distanceKm.toFixed(1)} km
                            </Badge>
                          </div>
                          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{p.address}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                            <Badge variant="secondary" className="border-0 bg-white/10">
                              {category.emoji} {p.category}
                            </Badge>
                            {p.rating != null && (
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {p.rating}
                              </span>
                            )}
                            <span className="ml-auto">
                              {p.lat.toFixed(3)}, {p.lon.toFixed(3)}
                            </span>
                          </div>
                          <a
                            href={directionsUrl(p)}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium transition hover:bg-white/10"
                          >
                            <Navigation className="h-3.5 w-3.5" /> Directions
                          </a>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
