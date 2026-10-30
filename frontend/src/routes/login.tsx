import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plane, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/site/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Jatayuv AI" },
      { name: "description", content: "Sign in to your Jatayuv AI account and explore destinations." },
      { property: "og:title", content: "Sign in — Jatayuv AI" },
      { property: "og:description", content: "Sign in to your Jatayuv AI account and explore destinations." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const nav = useNavigate();

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden px-4 py-16">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,oklch(0.30_0.12_265)_0%,transparent_60%)]" />
      </div>

      <Link to="/" className="absolute left-6 top-6 flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero">
          <Plane className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-base font-bold">
          Jatayuv <span className="text-gradient">AI</span>
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl glass-strong p-8 shadow-elevated"
      >
        <Plane className="absolute -right-6 -top-6 h-24 w-24 text-accent/20 animate-float" />
        <h1 className="font-display text-3xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to continue your journey.</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await signIn({ email, password });
            if (!res.ok) return setError(res.error ?? "Could not sign in.");
            nav({ to: "/destinations" });
          }}
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@example.com" required className="bg-card/40 pl-9"
                value={email} onChange={(e) => { setEmail(e.target.value); setError(null); }} />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1.5">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type={show ? "text" : "password"} placeholder="••••••••" required
                className="bg-card/40 pl-9 pr-9"
                value={password} onChange={(e) => { setPassword(e.target.value); setError(null); }} />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Toggle password">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked /> Remember me for 30 days
          </label>
          <Button variant="hero" className="w-full" type="submit">
            Sign in <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="font-medium text-accent hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
