import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Starfield, SectionTitle } from "@/components/site/decor";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/site/button";
import { FEATURES } from "@/lib/mock-data";
import {
  Sparkles, Gem, Wallet, CloudSun, BedDouble, UtensilsCrossed, Soup, Backpack,
  MapPin, ShieldAlert, Map, PieChart, Coins, MessageSquare, WifiOff, Languages,
  FileCheck, ShieldCheck, Plane, Bell, ArrowRight,
} from "lucide-react";

const ICONS: Record<string, any> = {
  Sparkles, Gem, Wallet, CloudSun, BedDouble, UtensilsCrossed, Soup, Backpack,
  MapPin, ShieldAlert, Map, PieChart, Coins, MessageSquare, WifiOff, Languages,
  FileCheck, ShieldCheck, Plane, Bell,
};

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Way2Trip AI" },
      { name: "description", content: "20+ AI-powered capabilities to plan, navigate, and live the perfect trip." },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <div>
      <Navbar />
      <section className="relative isolate overflow-hidden pt-36 pb-20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,oklch(0.30_0.12_265)_0%,transparent_60%)]" />
          <Starfield count={50} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Features"
            title={<>Twenty intelligent ways we <span className="text-gradient">elevate every trip</span></>}
            description="Every feature is crafted to feel invisible — until you need it."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
              const Icon = ICONS[f.icon] ?? Sparkles;
              return (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}>
                  <Card className="group h-full glass p-6 transition-all hover:-translate-y-1 hover:glow-ring">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-hero text-white transition-transform group-hover:rotate-6">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/destinations">Try it free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
