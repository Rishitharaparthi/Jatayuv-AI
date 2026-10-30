import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Starfield, SectionTitle } from "@/components/site/decor";
import { Card } from "@/components/ui/card";
import { Globe2, Heart, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Jatayuv AI" }, { name: "description", content: "We're building the world's most thoughtful AI travel companion." }] }),
  component: AboutPage,
});

const VALUES = [
  { icon: Globe2, title: "Curiosity for every corner", desc: "We celebrate the wild, the well-known, and the unexpected in equal measure." },
  { icon: Heart, title: "Made for humans", desc: "AI should feel like a kind friend, not a search box." },
  { icon: Sparkles, title: "Effortless magic", desc: "The best trips feel inevitable. We design for that." },
  { icon: Users, title: "Local-first", desc: "Real places, real people, real recommendations — never generic." },
];

function AboutPage() {
  return (
    <div>
      <Navbar />
      <section className="relative isolate overflow-hidden pt-36 pb-20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,oklch(0.30_0.12_265)_0%,transparent_60%)]" />
          <Starfield count={50} />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Our story"
            title={<>Travel is a <span className="text-gradient">human experience</span>. AI just makes it easier.</>}
            description="Jatayuv AI was born out of the frustration of planning beautiful trips that take weeks to research. We believe every traveler deserves a thoughtful, local-aware companion — and so we built one."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <Card key={v.title} className="glass p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-hero text-white"><v.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
