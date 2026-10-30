import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plane, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/site/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Jatayuv AI" },
      { name: "description", content: "Join Jatayuv AI to plan trips with AI." },
      { property: "og:title", content: "Create account — Jatayuv AI" },
      { property: "og:description", content: "Join Jatayuv AI to plan trips with AI." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const nav = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const strength = Math.min(100, pwd.length * 12);

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
        <h1 className="font-display text-3xl font-bold">Start your journey</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create a free account in seconds.</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (pwd !== confirm) return setError("Passwords do not match.");
            const res = await signUp({ name, email, password: pwd });
            if (!res.ok) return setError(res.error ?? "Could not create account.");
            nav({ to: "/destinations" });
          }}
        >

          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="relative mt-1.5">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="name" required placeholder="Jane Doe" className="pl-9 bg-card/40" value={name} onChange={(e) => { setName(e.target.value); setError(null); }} />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" required placeholder="you@example.com" className="pl-9 bg-card/40" value={email} onChange={(e) => { setEmail(e.target.value); setError(null); }} />
            </div>
          </div>
          <div>
            <Label htmlFor="pwd">Password</Label>
            <div className="relative mt-1.5">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="pwd" type="password" required value={pwd} onChange={(e) => { setPwd(e.target.value); setError(null); }} placeholder="At least 8 characters" className="pl-9 bg-card/40" />
            </div>
            <Progress value={strength} className="mt-2 h-1" />
          </div>
          <div>
            <Label htmlFor="cpwd">Confirm Password</Label>
            <Input id="cpwd" type="password" required placeholder="Repeat password" className="mt-1.5 bg-card/40" value={confirm} onChange={(e) => { setConfirm(e.target.value); setError(null); }} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <Checkbox className="mt-0.5" defaultChecked /> I agree to the Terms of Service and Privacy Policy.
          </label>

          <Button variant="hero" className="w-full" type="submit">
            Create account <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already a member?{" "}
          <Link to="/login" className="font-medium text-accent hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
