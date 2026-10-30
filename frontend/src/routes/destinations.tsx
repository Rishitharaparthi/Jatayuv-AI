import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, MapPin, Star, Sparkles, Filter, X, Heart } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionTitle } from "@/components/site/decor";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, DESTINATIONS, type Destination } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Explore Destinations — Jatayuv AI" },
      { name: "description", content: "Discover the world's most beautiful destinations, curated by AI." },
    ],
  }),
  component: ExplorePage,
});

function Card({ d }: { d: Destination }) {
  const { user, isWishlisted, toggleWishlist } = useAuth();
  const nav = useNavigate();
  const saved = isWishlisted(d.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <Link
        to="/destination/$id"
        params={{ id: d.id }}
        className="block overflow-hidden rounded-3xl glass shadow-elevated transition-all hover:-translate-y-1 hover:glow-ring"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={d.image}
            alt={`${d.name}, ${d.country}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium backdrop-blur">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {d.rating}
          </div>

          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!user) return nav({ to: "/login" });
              await toggleWishlist(d.id, d);
            }}
            className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:scale-110 hover:bg-black/70"
            title={saved ? "Remove from wishlist" : "Save to wishlist"}
            aria-label="Wishlist"
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-rose-500 text-rose-500" : "text-white"}`} />
          </button>

          <div className="absolute inset-x-4 bottom-4 text-white">
            <div className="flex items-center gap-1 text-xs uppercase tracking-wider opacity-80">
              <MapPin className="h-3 w-3" /> {d.country}
            </div>
            <h3 className="mt-1 font-display text-2xl font-bold leading-tight">{d.name}</h3>
            <p className="mt-1.5 line-clamp-2 text-xs text-white/80">{d.shortDesc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {d.type.slice(0, 2).map((t) => (
                <Badge key={t} variant="secondary" className="bg-white/15 text-white border-0 text-[10px]">
                  {t}
                </Badge>
              ))}
              <span className="ml-auto text-[11px] opacity-80">{d.duration}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ExplorePage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [continent, setContinent] = useState<string | null>(null);

  const continents = useMemo(
    () => Array.from(new Set(DESTINATIONS.map((d) => d.continent))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return DESTINATIONS.filter((d) => {
      if (continent && d.continent !== continent) return false;
      if (activeCat && !d.categories.includes(activeCat)) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.type.some((t) => t.toLowerCase().includes(q)) ||
        d.categories.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [query, activeCat, continent]);

  const india = filtered.filter((d) => d.country === "India");
  const world = filtered.filter((d) => d.country !== "India");
  const trending = [...DESTINATIONS].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-32 pb-12">
        <div aria-hidden className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> AI-curated for you
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Explore <span className="text-gradient">Destinations</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              From snowy Alps to tropical atolls — pick a place and let AI plan the rest.
            </p>

            <div className="relative mx-auto mt-8 max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, countries, or categories…"
                className="h-12 rounded-full bg-card/60 pl-11 pr-4 text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Continent:
          </div>
          <button
            onClick={() => setContinent(null)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              !continent ? "border-accent bg-accent/10 text-accent" : "border-white/10 hover:bg-white/5"
            }`}
          >
            All
          </button>
          {continents.map((c) => (
            <button
              key={c}
              onClick={() => setContinent(continent === c ? null : c)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                continent === c ? "border-accent bg-accent/10 text-accent" : "border-white/10 hover:bg-white/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-3 no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => {
            const active = activeCat === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setActiveCat(active ? null : c.name)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition ${
                  active ? "border-accent bg-accent/10 text-accent" : "border-white/10 hover:bg-white/5"
                }`}
              >
                <span>{c.icon}</span> {c.name}
              </button>
            );
          })}
          {(activeCat || continent || query) && (
            <button
              onClick={() => { setActiveCat(null); setContinent(null); setQuery(""); }}
              className="flex shrink-0 items-center gap-1 rounded-full border border-destructive/40 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
      </section>

      {/* TRENDING (only when no filters) */}
      {!query && !activeCat && !continent && (
        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle align="left" eyebrow="Trending now" title={<>Most-loved <span className="text-gradient">right now</span></>} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {trending.map((d) => (
              <Link key={d.id} to="/destination/$id" params={{ id: d.id }} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <img src={d.image} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-2 bottom-2 text-white">
                    <div className="font-display text-sm font-semibold leading-tight">{d.name}</div>
                    <div className="text-[10px] opacity-80">{d.country}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* DISCOVER INDIA */}
      {india.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            align="left"
            eyebrow="Discover India"
            title={<>The soul of <span className="text-gradient">India</span></>}
            description="From the snows of Kashmir to Kerala's backwaters."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {india.map((d) => <Card key={d.id} d={d} />)}
          </div>
        </section>
      )}

      {/* WORLD */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionTitle
          align="left"
          eyebrow="Around the world"
          title={<>The world, <span className="text-gradient">curated</span></>}
          description={`${world.length} destinations · ${filtered.length} matching results`}
        />
        {world.length === 0 ? (
          <div className="grid place-items-center rounded-3xl glass p-12 text-center">
            <p className="text-muted-foreground">No destinations match your filters.</p>
            <Button className="mt-4" variant="outline" onClick={() => { setActiveCat(null); setContinent(null); setQuery(""); }}>
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {world.map((d) => <Card key={d.id} d={d} />)}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
