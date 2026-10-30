import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, ArrowRight, Trash2 } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionTitle } from "@/components/site/decor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/site/button";
import { Card as UICard } from "@/components/ui/card";
import { DESTINATIONS, type Destination } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Way2Trip AI" },
      { name: "description", content: "Your saved travel destinations on Way2Trip AI." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { user, ready, savedTrips, fetchWishlist, toggleWishlist } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (ready && !user) {
      nav({ to: "/login" });
    }
    if (user) {
      fetchWishlist();
    }
  }, [ready, user, nav, fetchWishlist]);

  if (!ready || !user) {
    return (
      <div>
        <Navbar />
        <div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground">Loading…</div>
        <Footer />
      </div>
    );
  }

  // Resolve saved destinations from mock-data or saved record fields
  const savedDestinations: Destination[] = savedTrips
    .map((st) => {
      const found = DESTINATIONS.find((d) => d.id === st.destination_id);
      if (found) return found;
      return {
        id: st.destination_id,
        name: st.destination_name || st.destination_id,
        country: st.country || "Explore",
        continent: st.continent || "Global",
        image: st.image_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
        rating: st.rating ? parseFloat(String(st.rating)) : 4.8,
        shortDesc: st.short_desc || "Saved destination in your travel wishlist.",
        duration: st.duration || "5 Days",
        type: ["Saved"],
        categories: ["General"],
        season: "Year round",
        budgetTier: "Medium",
        budget: "$150/day",
        climate: "Pleasant",
        currency: "USD",
        airport: "Main Airport",
        visa: "Standard",
        languages: ["English"],
        idealFor: ["Travelers"],
        adventure: 4,
        nightlife: 4,
        safety: 4.5,
        familyFriendly: true,
        honeymoonFriendly: true,
        transport: ["Taxi"],
        topAttractions: [],
        thingsToDo: [],
        food: [],
        shopping: [],
        bestMonths: ["Jan-Dec"],
        famousFor: "Sightseeing",
      };
    })
    .filter(Boolean) as Destination[];

  return (
    <div>
      <Navbar />

      <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-36">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,oklch(0.30_0.12_265)_0%,transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionTitle
              eyebrow="Saved Destinations"
              title={<>Your Personal <span className="text-gradient">Wishlist</span></>}
              description="Keep track of places you dream to explore."
            />
          </motion.div>

          {savedDestinations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-8 max-w-xl overflow-hidden rounded-3xl glass-strong p-12 text-center"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-hero text-white">
                <Heart className="h-8 w-8 text-rose-300" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">Your Wishlist is Empty</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't saved any destinations yet. Browse through our curated collection and tap the heart icon to save your favorite spots.
              </p>
              <Button asChild variant="hero" size="lg" className="mt-6">
                <Link to="/destinations">
                  Explore Destinations <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {savedDestinations.map((d) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group relative"
                >
                  <UICard className="overflow-hidden rounded-3xl glass shadow-elevated transition-all hover:-translate-y-1 hover:glow-ring">
                    <Link to="/destination/$id" params={{ id: d.id }} className="block">
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

                        {/* Remove from Wishlist button */}
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            await toggleWishlist(d.id, d);
                          }}
                          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-rose-400 backdrop-blur transition hover:scale-110 hover:bg-rose-500 hover:text-white"
                          title="Remove from wishlist"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        <div className="absolute inset-x-4 bottom-4 text-white">
                          <div className="flex items-center gap-1 text-xs uppercase tracking-wider opacity-80">
                            <MapPin className="h-3 w-3" /> {d.country}
                          </div>
                          <h3 className="mt-1 font-display text-2xl font-bold leading-tight">{d.name}</h3>
                          <p className="mt-1.5 line-clamp-2 text-xs text-white/80">{d.shortDesc}</p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {d.type?.slice(0, 2).map((t) => (
                              <Badge key={t} variant="secondary" className="bg-white/15 text-white border-0 text-[10px]">
                                {t}
                              </Badge>
                            ))}
                            <span className="ml-auto text-[11px] opacity-80">{d.duration}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </UICard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
