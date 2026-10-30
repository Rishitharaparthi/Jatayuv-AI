import { Link } from "@tanstack/react-router";
import { Plane, Github, Twitter, Instagram, Youtube, Linkedin, Apple, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const COLS = [
  {
    title: "Product",
    links: [
      { to: "/features", label: "Features" },
      { to: "/destinations", label: "Destinations" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/about", label: "Careers" },
      { to: "/about", label: "Press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/about", label: "Privacy Policy" },
      { to: "/about", label: "Terms of Service" },
      { to: "/about", label: "Cookies" },
      { to: "/about", label: "Licenses" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-80 rounded-full bg-gradient-hero opacity-20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold">
                Way2 <span className="text-gradient">Trip</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Plan perfect journeys with the world's most thoughtful AI travel companion.
              Personalized itineraries, hidden gems, and effortless logistics.
            </p>

            <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Email for travel inspiration" className="bg-card/40" />
              <Button className="bg-gradient-hero text-white">Subscribe</Button>
            </form>

            <div className="mt-6 flex gap-2">
              <Button variant="outline" size="sm" className="glass">
                <Apple className="mr-2 h-4 w-4" /> App Store
              </Button>
              <Button variant="outline" size="sm" className="glass">
                <Smartphone className="mr-2 h-4 w-4" /> Google Play
              </Button>
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Way2Trip. Crafted for explorers.
          </p>
          <div className="flex gap-2">
            {[Twitter, Instagram, Youtube, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full glass hover:glow-ring"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
