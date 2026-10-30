import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Lock, User as UserIcon, Mail, Phone, Globe2, Save, Check, Image as ImageIcon } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/site/button";
import { useAuth, initials } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — Way2Trip AI" },
      { name: "description", content: "Manage your Way2Trip AI account details, password and preferences." },
      { property: "og:title", content: "Your Profile — Way2Trip AI" },
      { property: "og:description", content: "Manage your Way2Trip AI account details, password and preferences." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, ready, signOut, updateProfile, changePassword } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({ name: "", phone: "", avatar_url: "", country: "", travelStyle: "" });
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    if (ready && !user) nav({ to: "/login" });
    if (user)
      setForm({
        name: user.name,
        phone: user.phone ?? "",
        avatar_url: user.avatar_url ?? "",
        country: user.country ?? "",
        travelStyle: user.travelStyle ?? "",
      });
  }, [ready, user, nav]);

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

      <section className="mx-auto max-w-4xl px-4 pt-28 pb-24 sm:px-6 sm:pt-32 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="glass-strong relative overflow-hidden p-6 sm:p-8">
            <div aria-hidden className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-hero opacity-25 blur-3xl" />
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:flex sm:flex-wrap sm:gap-6">
              <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-hero font-display text-xl font-bold text-white sm:h-20 sm:w-20 sm:text-2xl">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  initials(user.name)
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="truncate font-display text-2xl font-bold sm:text-3xl">{user.name}</h1>
                <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="border-0 bg-accent/15 text-accent">
                    Member since {new Date(user.joinedAt).toLocaleDateString()}
                  </Badge>
                  {user.country && (
                    <Badge variant="secondary" className="border-0 bg-white/10">{user.country}</Badge>
                  )}
                </div>
              </div>
              <Button
                variant="glass"
                className="col-span-2 w-full sm:w-auto"
                onClick={async () => {
                  await signOut();
                  nav({ to: "/" });
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Details */}
        <Card className="glass mt-6 p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <UserIcon className="h-4 w-4 text-accent" /> Your details
          </h2>
          <form
            className="mt-5 grid gap-4 sm:grid-cols-2"
            onSubmit={async (e) => {
              e.preventDefault();
              setErrorMsg(null);
              const res = await updateProfile(form);
              if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2500);
              } else {
                setErrorMsg(res.error ?? "Failed to update profile.");
              }
            }}
          >
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                className="mt-1.5 bg-card/40"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" value={user.email} readOnly className="bg-card/20 pl-9 opacity-70" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <div className="relative mt-1.5">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  className="bg-card/40 pl-9"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="avatar_url">Avatar Image URL</Label>
              <div className="relative mt-1.5">
                <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="avatar_url"
                  className="bg-card/40 pl-9"
                  placeholder="https://example.com/avatar.jpg"
                  value={form.avatar_url}
                  onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <div className="relative mt-1.5">
                <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="country"
                  className="bg-card/40 pl-9"
                  placeholder="India"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="style">Preferred travel style</Label>
              <Input
                id="style"
                className="mt-1.5 bg-card/40"
                placeholder="Solo · Couple · Family · Friends"
                value={form.travelStyle}
                onChange={(e) => setForm({ ...form, travelStyle: e.target.value })}
              />
            </div>
            {errorMsg && <p className="sm:col-span-2 text-sm text-destructive">{errorMsg}</p>}
            <div className="sm:col-span-2">
              <Button variant="hero" type="submit">
                {saved ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                {saved ? "Saved" : "Save changes"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Password */}
        <Card className="glass mt-6 p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Lock className="h-4 w-4 text-accent" /> Change password
          </h2>
          <form
            className="mt-5 grid gap-4 sm:grid-cols-3"
            onSubmit={async (e) => {
              e.preventDefault();
              if (pw.next !== pw.confirm) {
                setPwMsg({ ok: false, text: "New passwords do not match." });
                return;
              }
              const res = await changePassword(pw.current, pw.next);
              setPwMsg(res.ok ? { ok: true, text: "Password updated." } : { ok: false, text: res.error! });
              if (res.ok) setPw({ current: "", next: "", confirm: "" });
            }}
          >
            <div>
              <Label htmlFor="cur">Current password</Label>
              <Input id="cur" type="password" className="mt-1.5 bg-card/40" value={pw.current}
                onChange={(e) => setPw({ ...pw, current: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" className="mt-1.5 bg-card/40" value={pw.next}
                onChange={(e) => setPw({ ...pw, next: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="conf">Confirm new</Label>
              <Input id="conf" type="password" className="mt-1.5 bg-card/40" value={pw.confirm}
                onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required />
            </div>
            <div className="sm:col-span-3 flex flex-wrap items-center gap-3">
              <Button variant="hero" type="submit">Update password</Button>
              {pwMsg && (
                <span className={`text-sm ${pwMsg.ok ? "text-accent" : "text-destructive"}`}>{pwMsg.text}</span>
              )}
            </div>
          </form>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
