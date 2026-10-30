import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Plane, Sparkles, ChevronDown, User as UserIcon, Lock, LogOut, Heart, History } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth, initials } from "@/lib/auth";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/destinations", label: "Explore" },
  { to: "/nearby", label: "Nearby" },
  { to: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, ready, signOut, wishlist } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-elevated" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero glow-ring">
            <Plane className="h-5 w-5 text-white" />
            <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-accent animate-twinkle" />
          </div>
          <span className="font-display text-base font-bold tracking-tight sm:text-lg">
            Way2 <span className="text-gradient">Trip</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {!ready || !user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-hero text-white hover:opacity-90">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex max-w-[10rem] items-center gap-2 rounded-full glass px-2.5 py-1.5 text-sm transition hover:bg-white/10 sm:max-w-none"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  title="Profile"
                >
                  <span className="relative grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-hero text-xs font-bold text-white">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      initials(user.name)
                    )}
                  </span>
                  <span className="hidden truncate font-medium sm:inline">{user.name}</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
                </button>

                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    role="menu"
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl glass-strong p-1.5 shadow-elevated"
                  >
                    <div className="px-3 py-2">
                      <div className="truncate text-sm font-medium">{user.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{user.email}</div>
                    </div>
                    <div className="my-1 h-px bg-white/10" />
                    <Link to="/profile" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-white/10">
                      <UserIcon className="h-4 w-4 text-accent" /> Your profile
                    </Link>
                    <Link to="/wishlist" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-white/10">
                      <Heart className="h-4 w-4 text-rose-400" /> Wishlist
                    </Link>
                    <Link to="/history" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-white/10">
                      <History className="h-4 w-4 text-accent" /> Trip History
                    </Link>
                    <Link
                      to="/profile"
                      hash="password"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-white/10"
                    >
                      <Lock className="h-4 w-4 text-muted-foreground" /> Change password
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMenuOpen(false);
                        nav({ to: "/" });
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Wishlist (Heart) icon button placed immediately after Profile */}
              <Link
                to="/wishlist"
                className={`relative flex h-9 w-9 items-center justify-center rounded-full glass transition hover:bg-white/10 ${
                  pathname === "/wishlist" ? "bg-white/15 text-rose-400" : "text-muted-foreground hover:text-rose-400"
                }`}
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className={`h-4.5 w-4.5 ${wishlist.length > 0 ? "fill-rose-400 text-rose-400" : ""}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-gradient-hero text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* History icon button placed immediately after Wishlist icon */}
              <Link
                to="/history"
                className={`flex h-9 w-9 items-center justify-center rounded-full glass transition hover:bg-white/10 ${
                  pathname === "/history" ? "bg-white/15 text-accent" : "text-muted-foreground hover:text-accent"
                }`}
                title="Trip History"
                aria-label="Trip History"
              >
                <History className="h-4.5 w-4.5" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t border-white/5 px-4 pb-2 pt-1 md:hidden">
        {NAV.map((n) => {
          const active = pathname === n.to;
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
                active ? "bg-white/10 text-foreground" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          );
        })}
        {user && (
          <>
            <Link
              to="/wishlist"
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
                pathname === "/wishlist" ? "bg-white/10 text-rose-400" : "text-muted-foreground"
              }`}
            >
              Wishlist
            </Link>
            <Link
              to="/history"
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
                pathname === "/history" ? "bg-white/10 text-accent" : "text-muted-foreground"
              }`}
            >
              History
            </Link>
          </>
        )}
      </nav>
    </motion.header>
  );
}
