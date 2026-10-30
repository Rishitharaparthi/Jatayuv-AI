import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Calendar, Wallet, Users, Sparkles, ArrowRight, X, Clock } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionTitle } from "@/components/site/decor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/site/button";
import { Card as UICard } from "@/components/ui/card";
import { useAuth, type HistoryItem } from "@/lib/auth";
import { ItineraryView } from "./destination.$id";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Trip History — Way2Trip AI" },
      { name: "description", content: "Your generated AI travel itineraries on Way2Trip AI." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { user, ready, historyItems, fetchHistory } = useAuth();
  const nav = useNavigate();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    if (ready && !user) {
      nav({ to: "/login" });
    }
    if (user) {
      fetchHistory();
    }
  }, [ready, user, nav, fetchHistory]);

  if (!ready || !user) {
    return (
      <div>
        <Navbar />
        <div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground">Loading…</div>
        <Footer />
      </div>
    );
  }

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
              eyebrow="Generated Trips"
              title={<>Your Trip <span className="text-gradient">History</span></>}
              description="Review all your past AI-generated day-by-day itineraries."
            />
          </motion.div>

          {historyItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-8 max-w-xl overflow-hidden rounded-3xl glass-strong p-12 text-center"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-hero text-white">
                <History className="h-8 w-8 text-accent" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">No Generated Trips Yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't generated any trip itineraries yet. Head over to Explore Destinations, choose a destination, and click "Want a Guide?" to create your first AI itinerary!
              </p>
              <Button asChild variant="hero" size="lg" className="mt-6">
                <Link to="/destinations">
                  Explore & Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {historyItems.map((item, idx) => {
                const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString(undefined, { dateStyle: "medium" }) : "Recently";
                const totalDays = (item as any).total_days || item.days || item.itinerary?.days || 1;
                const travelers = item.travelers || item.itinerary?.travelers || 1;
                const budget = item.budget || item.itinerary?.budget || "Medium";
                const style = (item as any).travel_style || item.itinerary?.style || "Solo";

                return (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <UICard className="group relative flex h-full flex-col justify-between overflow-hidden glass p-6 transition-all hover:-translate-y-1 hover:glow-ring">
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-accent" /> {dateStr}
                          </span>
                          <Badge variant="secondary" className="border-0 bg-accent/15 text-accent">
                            {totalDays} Days
                          </Badge>
                        </div>

                        <h3 className="mt-3 font-display text-2xl font-bold group-hover:text-accent transition-colors">
                          {item.destination_name || item.itinerary?.destination || "Custom Trip"}
                        </h3>

                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1.5 rounded-xl bg-card/40 p-2.5">
                            <Users className="h-3.5 w-3.5 text-accent" />
                            <span>{travelers} Travelers</span>
                          </div>
                          <div className="flex items-center gap-1.5 rounded-xl bg-card/40 p-2.5">
                            <Wallet className="h-3.5 w-3.5 text-accent" />
                            <span>{budget}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <Badge variant="secondary" className="bg-white/10 text-xs">
                            {style}
                          </Badge>
                          {item.from_date && (
                            <Badge variant="secondary" className="bg-white/10 text-xs">
                              <Calendar className="mr-1 h-3 w-3" /> {item.from_date}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10">
                        <Button
                          variant="hero"
                          size="sm"
                          className="w-full"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Sparkles className="mr-2 h-4 w-4" /> View Saved Itinerary
                        </Button>
                      </div>
                    </UICard>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* ITINERARY VIEW MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl glass-strong p-6 shadow-elevated sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>

              <ItineraryView itinerary={selectedItem.itinerary} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
