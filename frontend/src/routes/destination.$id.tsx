import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  MapPin, Star, Calendar, Wallet, Plane, ShieldCheck, Globe2, Languages,
  Utensils, ShoppingBag, Camera, Heart, Mountain, Sparkles, ArrowRight,
  Clock, Users, CloudSun, X, Check, Compass, Hotel, Map as MapIcon,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/site/button";
import { Button as UIButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DESTINATIONS } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/destination/$id")({
  head: ({ params }) => {
    const d = DESTINATIONS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: d ? `${d.name}, ${d.country} — Jatayuv AI` : "Destination — Jatayuv AI" },
        { name: "description", content: d?.shortDesc ?? "Destination details" },
      ],
    };
  },
  component: DestinationDetail,
});

function Rating({ value, label, icon: Icon }: { value: number; label: string; icon: any }) {
  return (
    <div className="rounded-2xl glass p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-accent" /> {label}
      </div>
      <div className="mt-2 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < value ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`}
          />
        ))}
        <span className="ml-2 text-sm font-semibold">{value}/5</span>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl glass p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function DestinationDetail() {
  const { id } = useParams({ from: "/destination/$id" });
  const d = DESTINATIONS.find((x) => x.id === id);
  const [showGuide, setShowGuide] = useState(false);
  const [itin, setItin] = useState<any | null>(null);
  const [generating, setGenerating] = useState(false);

  const { user, isWishlisted, toggleWishlist, saveHistory } = useAuth();
  const nav = useNavigate();
  const saved = d ? isWishlisted(d.id) : false;

  if (!d) {
    return (
      <div>
        <Navbar />
        <div className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 pt-32 text-center">
          <div>
            <h1 className="font-display text-3xl font-bold">Destination not found</h1>
            <p className="mt-2 text-muted-foreground">It may have moved. Try exploring more places.</p>
            <Button asChild className="mt-6" variant="hero">
              <Link to="/destinations">Back to Explore</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = DESTINATIONS.filter((x) => x.id !== d.id && (x.continent === d.continent || x.country === d.country)).slice(0, 4);

  return (
    <div className="relative">
      <Navbar />

      {/* HERO */}
      <section className="relative isolate min-h-[72vh] overflow-hidden">
        <img src={d.image} alt={d.name} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/30" />

        <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 pt-40 sm:px-6 sm:pb-16 sm:pt-48 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/destinations" className="text-xs text-accent hover:underline">← Back to Explore</Link>
            <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
              <MapPin className="h-4 w-4" /> {d.country} · {d.continent}
            </div>
            <h1 className="mt-2 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              {d.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{d.shortDesc}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {d.type.map((t) => (
                <Badge key={t} className="bg-white/15 border-0 text-white">{t}</Badge>
              ))}
              <Badge className="bg-accent/20 border-0 text-accent">
                <Star className="mr-1 h-3 w-3 fill-current" /> {d.rating}
              </Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="hero" onClick={() => setShowGuide(true)}>
                <Sparkles className="mr-2 h-4 w-4" /> Want a Guide?
              </Button>
              <UIButton
                variant="outline"
                onClick={async () => {
                  if (!user) return nav({ to: "/login" });
                  await toggleWishlist(d.id, d);
                }}
                className="border-white/20 bg-white/5"
              >
                <Heart className={`mr-2 h-4 w-4 ${saved ? "fill-rose-400 text-rose-400" : ""}`} />
                {saved ? "Saved" : "Save"}
              </UIButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <InfoRow icon={Calendar} label="Best Time" value={d.season} />
          <InfoRow icon={Clock} label="Duration" value={d.duration} />
          <InfoRow icon={Wallet} label="Budget" value={`${d.budgetTier} · ${d.budget}`} />
          <InfoRow icon={CloudSun} label="Climate" value={d.climate} />
          <InfoRow icon={Globe2} label="Currency" value={d.currency} />
          <InfoRow icon={Plane} label="Airport" value={d.airport} />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <InfoRow icon={ShieldCheck} label="Visa" value={d.visa} />
          <InfoRow icon={Languages} label="Languages" value={d.languages.join(", ")} />
          <InfoRow icon={Users} label="Ideal For" value={d.idealFor.join(", ")} />
        </div>
      </section>

      {/* RATINGS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Rating value={d.adventure} label="Adventure" icon={Mountain} />
          <Rating value={d.nightlife} label="Nightlife" icon={Sparkles} />
          <Rating value={d.safety} label="Safety" icon={ShieldCheck} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl glass p-4 text-sm">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Family Friendly</div>
            <div className="mt-1 flex items-center gap-1 font-semibold">
              {d.familyFriendly ? <><Check className="h-4 w-4 text-emerald-400" /> Yes</> : <><X className="h-4 w-4 text-rose-400" /> Limited</>}
            </div>
          </div>
          <div className="rounded-2xl glass p-4 text-sm">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Honeymoon Friendly</div>
            <div className="mt-1 flex items-center gap-1 font-semibold">
              {d.honeymoonFriendly ? <><Check className="h-4 w-4 text-emerald-400" /> Yes</> : <><X className="h-4 w-4 text-rose-400" /> Limited</>}
            </div>
          </div>
          <div className="rounded-2xl glass p-4 text-sm">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Transport</div>
            <div className="mt-1 font-semibold">{d.transport.join(", ")}</div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Camera className="h-5 w-5 text-accent" /> Top Attractions
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {(d.topAttractions.length ? d.topAttractions : ["Iconic landmarks", "Local viewpoints"]).map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {a}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="glass p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Compass className="h-5 w-5 text-accent" /> Things to Do
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {(d.thingsToDo.length ? d.thingsToDo : ["Sightseeing", "Food walks", "Photo tours"]).map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {a}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="glass p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Utensils className="h-5 w-5 text-accent" /> Famous Food
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {(d.food.length ? d.food : ["Local specialities"]).map((f) => (
                <Badge key={f} variant="secondary" className="bg-white/10">{f}</Badge>
              ))}
            </div>
          </Card>

          <Card className="glass p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <ShoppingBag className="h-5 w-5 text-accent" /> Shopping
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {(d.shopping.length ? d.shopping : ["Local markets & boutiques"]).map((f) => (
                <Badge key={f} variant="secondary" className="bg-white/10">{f}</Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* MAP + TIPS */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="glass p-6 lg:col-span-2">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <MapIcon className="h-5 w-5 text-accent" /> Map
            </h3>
            <div className="relative mt-4 aspect-[16/8] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/30 to-purple-glow/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.5_0.18_265)_0%,transparent_60%)]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <MapPin className="mx-auto h-10 w-10 text-accent animate-glow-pulse" />
                <div className="mt-2 font-display text-xl font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.country} · {d.continent}</div>
              </div>
            </div>
          </Card>

          <Card className="glass p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Sparkles className="h-5 w-5 text-accent" /> Travel Tips
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Carry local currency ({d.currency}) for small vendors.</li>
              <li>• Best months: {d.bestMonths.slice(0, 4).join(", ")} for ideal weather.</li>
              <li>• Famous for: {d.famousFor.toLowerCase()}.</li>
              <li>• Public transport: {d.transport.slice(0, 2).join(" / ")} are convenient.</li>
              <li>• Pack for {d.climate.toLowerCase()} conditions.</li>
            </ul>
          </Card>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display text-2xl font-semibold">Nearby & Similar Destinations</h3>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((r) => (
                <Link key={r.id} to="/destination/$id" params={{ id: r.id }} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <img src={r.image} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                    <div className="absolute inset-x-3 bottom-3 text-white">
                      <div className="font-display text-base font-semibold">{r.name}</div>
                      <div className="text-[11px] opacity-80">{r.country}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA: Want a Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 overflow-hidden rounded-3xl glass-strong p-10 text-center sm:p-14"
        >
          <Sparkles className="mx-auto h-8 w-8 text-accent" />
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Want a <span className="text-gradient">Guide?</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Get a personalized AI-powered day-wise itinerary for {d.name} in seconds.
          </p>
          <Button variant="hero" size="lg" className="mt-6" onClick={() => setShowGuide(true)}>
            Plan my trip <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </section>

      <Footer />

      {/* GUIDE FORM MODAL */}
      <AnimatePresence>
        {showGuide && (
          <GuideModal
            destination={d.name}
            onClose={() => { setShowGuide(false); }}
            onGenerate={(form) => {
              setGenerating(true);
              setItin(null);
              setTimeout(async () => {
                const generated = buildItinerary(d, form);
                setItin(generated);
                setGenerating(false);

                // Immediately save generated itinerary into `trip_history` table if user is logged in
                if (user) {
                  await saveHistory({
                    destination_id: d.id,
                    destination_name: `${d.name}, ${d.country}`,
                    from_date: form.from,
                    to_date: form.to,
                    days: form.days,
                    travelers: form.travelers,
                    budget: form.budget,
                    travel_style: form.style,
                    itinerary: generated,
                  });
                }
              }, 1400);
            }}
            generating={generating}
            itinerary={itin}
            onReset={() => { setItin(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ Guide modal + itinerary ============
type GuideForm = {
  from: string; to: string; days: number; travelers: number;
  budget: "Low" | "Medium" | "Luxury"; style: "Solo"|"Couple"|"Family"|"Friends";
  interests: string[];
};

const INTERESTS = ["Adventure","Nature","Beaches","Wildlife","Food","Shopping","History","Nightlife","Photography","Spiritual"];

function GuideModal({
  destination, onClose, onGenerate, generating, itinerary, onReset,
}: {
  destination: string;
  onClose: () => void;
  onGenerate: (f: GuideForm) => void;
  generating: boolean;
  itinerary: any | null;
  onReset: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState<GuideForm>({
    from: today, to: "", days: 5, travelers: 2, budget: "Medium", style: "Couple", interests: ["Food","Nature"],
  });

  const computedDays = useMemo(() => {
    if (!form.from || !form.to) return form.days;
    const a = new Date(form.from).getTime();
    const b = new Date(form.to).getTime();
    if (isNaN(a) || isNaN(b) || b < a) return form.days;
    return Math.max(1, Math.round((b - a) / 86400000) + 1);
  }, [form.from, form.to, form.days]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl glass-strong p-6 shadow-elevated sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20">
          <X className="h-4 w-4" />
        </button>

        {!itinerary && !generating && (
          <>
            <h3 className="font-display text-2xl font-bold">Plan your trip to {destination}</h3>
            <p className="mt-1 text-sm text-muted-foreground">Tell us a few details and AI will build your itinerary.</p>

            <form
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
              onSubmit={(e) => { e.preventDefault(); onGenerate({ ...form, days: computedDays }); }}
            >
              <div>
                <Label>From date</Label>
                <Input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="mt-1.5 bg-card/40" />
              </div>
              <div>
                <Label>To date</Label>
                <Input type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="mt-1.5 bg-card/40" />
              </div>
              <div>
                <Label>Days ({computedDays})</Label>
                <Input type="number" min={1} max={30} value={form.days} onChange={(e) => setForm({ ...form, days: +e.target.value })} className="mt-1.5 bg-card/40" />
              </div>
              <div>
                <Label>Travelers</Label>
                <Input type="number" min={1} max={20} value={form.travelers} onChange={(e) => setForm({ ...form, travelers: +e.target.value })} className="mt-1.5 bg-card/40" />
              </div>
              <div>
                <Label>Budget</Label>
                <div className="mt-1.5 flex gap-2">
                  {(["Low","Medium","Luxury"] as const).map((b) => (
                    <button type="button" key={b} onClick={() => setForm({ ...form, budget: b })}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${form.budget===b ? "border-accent bg-accent/10 text-accent" : "border-white/10 hover:bg-white/5"}`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Travel style</Label>
                <div className="mt-1.5 grid grid-cols-4 gap-2">
                  {(["Solo","Couple","Family","Friends"] as const).map((s) => (
                    <button type="button" key={s} onClick={() => setForm({ ...form, style: s })}
                      className={`rounded-lg border px-2 py-2 text-xs transition ${form.style===s ? "border-accent bg-accent/10 text-accent" : "border-white/10 hover:bg-white/5"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label>Interests</Label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {INTERESTS.map((i) => {
                    const active = form.interests.includes(i);
                    return (
                      <button type="button" key={i}
                        onClick={() => setForm({ ...form, interests: active ? form.interests.filter(x=>x!==i) : [...form.interests, i] })}
                        className={`rounded-full border px-3 py-1 text-xs transition ${active ? "border-accent bg-accent/10 text-accent" : "border-white/10 hover:bg-white/5"}`}>
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
                <UIButton type="button" variant="ghost" onClick={onClose}>Cancel</UIButton>
                <Button type="submit" variant="hero">
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Itinerary
                </Button>
              </div>
            </form>
          </>
        )}

        {generating && (
          <div className="grid place-items-center py-16 text-center">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-accent/30" />
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-t-accent" />
              <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-accent" />
            </div>
            <p className="mt-6 font-display text-lg">Jatayuv AI is crafting your perfect trip…</p>
            <p className="mt-1 text-xs text-muted-foreground">Optimizing routes · checking weather · finding hidden gems</p>
          </div>
        )}

        {itinerary && !generating && (
          <ItineraryView itinerary={itinerary} onReset={onReset} />
        )}
      </motion.div>
    </motion.div>
  );
}

export function ItineraryView({ itinerary, onReset }: { itinerary: any; onReset?: () => void }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs text-emerald-300">
            <Check className="h-3 w-3" /> Generated by Jatayuv AI
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold">Your trip to {itinerary.destination}</h3>
          <p className="text-sm text-muted-foreground">
            {itinerary.days} days · {itinerary.travelers} travelers · {itinerary.budget} · {itinerary.style}
          </p>
        </div>
        {onReset && <UIButton size="sm" variant="outline" onClick={onReset}>Edit</UIButton>}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <InfoRow icon={CloudSun} label="Weather" value={itinerary.weather} />
        <InfoRow icon={Wallet} label="Est. Cost" value={itinerary.totalCost} />
        <InfoRow icon={ShieldCheck} label="Safety" value={`${itinerary.safety}%`} />
        <InfoRow icon={Hotel} label="Stays" value={`${itinerary.days} curated`} />
      </div>

      <div className="mt-6 space-y-4">
        {itinerary.days_plan?.map((day: any) => (
          <Card key={day.day} className="glass p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-accent">Day {day.day}</div>
                <h4 className="mt-0.5 font-display text-lg font-semibold">{day.title}</h4>
              </div>
              <Badge variant="secondary" className="bg-white/10">{day.cost} · {day.distance}</Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Morning", day.morning],
                ["Afternoon", day.afternoon],
                ["Evening", day.evening],
                ["Night", day.night],
              ].map(([t, v]) => (
                <div key={t as string} className="rounded-xl bg-card/40 p-3">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{t}</div>
                  <div className="mt-0.5 text-sm">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-white/5 px-2.5 py-1">🏨 {day.hotel}</span>
              <span className="rounded-full bg-white/5 px-2.5 py-1">🍽️ {day.restaurant}</span>
              <span className="rounded-full bg-white/5 px-2.5 py-1">🚗 {day.transport}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Card className="glass p-4">
          <div className="text-xs uppercase tracking-wider text-accent">Packing Suggestions</div>
          <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
            {itinerary.packing?.map((p: string) => <Badge key={p} variant="secondary" className="bg-white/10">{p}</Badge>)}
          </div>
        </Card>
        <Card className="glass p-4">
          <div className="text-xs uppercase tracking-wider text-accent">Hidden Gems</div>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {itinerary.hiddenGems?.map((g: string) => <li key={g}>✦ {g}</li>)}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function buildItinerary(d: any, f: GuideForm) {
  const days = Math.min(Math.max(f.days || 5, 1), 14);
  const attractions = d.topAttractions?.length ? d.topAttractions : ["Local landmarks","City center","Heritage walk","Sunset viewpoint","Local market"];
  const acts = d.thingsToDo?.length ? d.thingsToDo : ["Cultural tour","Food tasting","Nature walk","Local experience"];
  const foods = d.food?.length ? d.food : ["Local cuisine","Street food","Cafés"];
  const stays = ["Boutique Hotel","Heritage Stay","City Resort","Lakeside Lodge","Riverfront Inn","Mountain Retreat","Beach Villa"];
  const transports = d.transport?.length ? d.transport : ["Taxi","Walk"];
  const perDay = f.budget === "Luxury" ? 350 : f.budget === "Medium" ? 180 : 80;

  const days_plan = Array.from({ length: days }).map((_, i) => ({
    day: i + 1,
    title: i === 0 ? `Arrival in ${d.name}` : i === days - 1 ? "Last day & departure" : `Exploring ${attractions[i % attractions.length]}`,
    morning: i === 0 ? `Arrive at ${d.airport || "destination"}, transfer to hotel, freshen up` : `Visit ${attractions[i % attractions.length]} early to beat crowds`,
    afternoon: `${acts[i % acts.length]} · lunch with local ${foods[i % foods.length]}`,
    evening: `${attractions[(i + 2) % attractions.length]} & sunset views`,
    night: i === days - 1 ? `Pack up, transfer to airport` : `Dinner & relax at hotel`,
    hotel: stays[i % stays.length],
    restaurant: `Local favorite — ${foods[i % foods.length]}`,
    transport: transports[i % transports.length],
    cost: `$${perDay + i * 10}`,
    distance: `${8 + i * 3} km`,
  }));

  return {
    destination: `${d.name}, ${d.country}`,
    days, travelers: f.travelers,
    budget: f.budget, style: f.style,
    weather: `${d.climate || "Pleasant"}, clear skies`,
    safety: Math.round((d.safety || 4.5) * 18 + 10),
    totalCost: `$${perDay * days * f.travelers}`,
    packing: [
      "Comfortable shoes","Travel adapter","Sunscreen","Reusable bottle","Light jacket",
      ...((d.type || []).includes("Snow") || (d.type || []).includes("Mountain") ? ["Thermals","Gloves","Beanie"] : []),
      ...((d.type || []).includes("Beach") || (d.type || []).includes("Island") ? ["Swimwear","Hat","Beach towel"] : []),
    ],
    hiddenGems: [
      `A quiet café locals love near ${attractions[0] ?? "the old town"}`,
      `Sunrise spot just outside ${d.name}`,
      `Street market only open on weekends`,
    ],
    days_plan,
  };
}
