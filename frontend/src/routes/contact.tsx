import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Starfield, SectionTitle } from "@/components/site/decor";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/site/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Jatayuv AI" }, { name: "description", content: "Talk to the Jatayuv AI team — we'd love to hear from you." }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <Navbar />
      <section className="relative isolate overflow-hidden pt-36 pb-20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,oklch(0.30_0.12_265)_0%,transparent_60%)]" />
          <Starfield count={50} />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Contact"
            title={<>Let's <span className="text-gradient">talk travel</span></>}
            description="Press, partnerships, or just a kind hello — we read every message."
          />
          <div className="grid gap-6 lg:grid-cols-[1fr,1.4fr]">
            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email us", value: "hello@jatayuv.ai" },
                { icon: MessageCircle, title: "Live chat", value: "Mon–Fri, 9–6 IST" },
                { icon: MapPin, title: "HQ", value: "Bengaluru, India" },
              ].map((c) => (
                <Card key={c.title} className="glass p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-hero text-white"><c.icon className="h-5 w-5" /></div>
                    <div><div className="font-display font-semibold">{c.title}</div><div className="text-sm text-muted-foreground">{c.value}</div></div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="glass-strong p-7">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>Name</Label><Input className="mt-1.5 bg-card/40" placeholder="Your name" /></div>
                  <div><Label>Email</Label><Input type="email" className="mt-1.5 bg-card/40" placeholder="you@example.com" /></div>
                </div>
                <div><Label>Subject</Label><Input className="mt-1.5 bg-card/40" placeholder="How can we help?" /></div>
                <div><Label>Message</Label><Textarea rows={5} className="mt-1.5 bg-card/40" placeholder="Tell us anything..." /></div>
                <Button variant="hero" type="submit"><Send className="mr-2 h-4 w-4" /> Send message</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
