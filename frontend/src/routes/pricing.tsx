import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Starfield, SectionTitle } from "@/components/site/decor";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/site/button";
import { FAQS, PRICING } from "@/lib/mock-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — Jatayuv AI" }, { name: "description", content: "Simple, honest pricing — free forever, with optional Pro and Premium upgrades." }] }),
  component: PricingPage,
});

function PricingPage() {
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
            eyebrow="Pricing"
            title={<>Simple, <span className="text-gradient">honest pricing</span></>}
            description="Free forever for casual planners. Pro & Premium for the curious."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {PRICING.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className={`relative h-full p-7 ${p.highlight ? "glass-strong border-accent/40 glow-ring" : "glass"}`}>
                  {p.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-hero px-3 py-1 text-xs font-semibold text-white">Most popular</div>
                  )}
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-bold">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.period}</span>
                  </div>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full" variant={p.highlight ? "hero" : "glass"}>
                    <Link to="/signup">{p.cta}</Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-3xl">
            <SectionTitle eyebrow="Pricing FAQ" title={<>Questions, <span className="text-gradient">answered</span></>} />
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="overflow-hidden rounded-2xl glass border-0 px-5">
                  <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
