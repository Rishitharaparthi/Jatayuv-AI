import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, Gem, Wallet, CloudSun, BedDouble, Soup, Backpack, Map,
  ArrowRight, Globe2, Plane,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionTitle } from "@/components/site/decor";
import { Button } from "@/components/site/button";
import { Card } from "@/components/ui/card";
import { FEATURES } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Way2Trip — Plan Your Perfect Journey with AI" },
      { name: "description", content: "Premium AI travel planner. Personalized itineraries, hidden gems, and smart budgets for 190+ countries." },
    ],
  }),
  component: Landing,
});

const ICONS: Record<string, any> = {
  Sparkles, Gem, Wallet, CloudSun, BedDouble, Soup, Backpack, Map, Globe2,
};

function Landing() {
  const { user } = useAuth();

  return (
    <div className="relative">
      <Navbar />

      {/* HERO */}
      <section className="relative isolate min-h-[100svh] overflow-hidden pt-32 pb-20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,oklch(0.30_0.12_265)_0%,transparent_60%)]" />
          <div className="absolute -top-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-hero opacity-20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              AI travel companion, reimagined
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Plan Your <span className="text-gradient">Perfect Journey</span> with AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Personalized day-by-day itineraries, hidden gems, smart budgets, weather, and live maps —
              all generated in seconds.
            </p>

            {/* Auth CTA buttons in Hero - Disappear completely when user is logged in */}
            {!user && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" variant="hero">
                  <Link to="/signup">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="glass">
                  <Link to="/login">
                    Login
                  </Link>
                </Button>
              </div>
            )}

            {user && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" variant="hero">
                  <Link to="/destinations">
                    Explore Destinations <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>

          {/* Animated globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative mx-auto mt-20 h-72 w-72 sm:h-96 sm:w-96"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-hero opacity-30 blur-3xl animate-glow-pulse" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-64 w-64 rounded-full border border-white/10 animate-spin-slow sm:h-80 sm:w-80">
                <div className="absolute inset-4 rounded-full border border-accent/20" />
                <div className="absolute inset-8 rounded-full border border-white/10" />
                <Globe2 className="absolute inset-0 m-auto h-32 w-32 text-accent" strokeWidth={1.2} />
              </div>
            </div>
            <Plane
              className="absolute -right-2 top-1/3 h-10 w-10 text-white animate-float drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]"
              strokeWidth={1.5}
            />
          </motion.div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Key Features"
          title={<>An AI co-pilot for <span className="text-gradient">every step</span></>}
          description="Everything you need to plan a flawless trip — in one elegant place."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon] ?? Sparkles;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              >
                <Card className="group relative h-full overflow-hidden glass p-5 transition-all hover:-translate-y-1 hover:glow-ring">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-hero opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
                  <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-hero text-white transition-transform group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom Auth CTA Section - Disappears completely when user is logged in */}
      {!user && (
        <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center sm:p-16"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-20" />
            <h2 className="font-display text-3xl font-bold sm:text-5xl">
              Ready to <span className="text-gradient">explore the world?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Create your account and start planning in seconds.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="hero">
                <Link to="/signup">Sign Up Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <Link to="/login">I already have an account</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      )}

      <Footer />
    </div>
  );
}
