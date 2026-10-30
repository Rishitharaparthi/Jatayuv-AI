import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  country?: string;
  travelStyle?: string;
  joinedAt: string;
};

export type SavedTrip = {
  id?: string;
  user_id?: string;
  destination_id: string;
  destination_name?: string;
  country?: string;
  continent?: string;
  image_url?: string;
  rating?: string | number;
  short_desc?: string;
  budget?: string;
  duration?: string;
  destination_data?: any;
  created_at?: string;
};

export type HistoryItem = {
  id?: string;
  user_id?: string;
  destination_name?: string;
  country?: string;
  continent?: string;
  from_date?: string;
  to_date?: string;
  total_days?: number;
  days?: number;
  travelers?: number;
  budget?: string;
  travel_style?: string;
  interests?: any;
  estimated_cost?: number | string;
  weather?: string;
  safety_score?: number | string;
  itinerary: any;
  created_at?: string;
};

type AuthState = {
  user: User | null;
  ready: boolean;
  wishlist: string[];
  savedTrips: SavedTrip[];
  historyItems: HistoryItem[];
  signUp: (d: { name: string; email: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  signIn: (d: { email: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<Omit<User, "joinedAt">>) => Promise<{ ok: boolean; error?: string }>;
  changePassword: (current: string, next: string) => Promise<{ ok: boolean; error?: string }>;
  toggleWishlist: (destinationId: string, destinationData?: any) => Promise<{ ok: boolean; isSaved?: boolean; error?: string }>;
  isWishlisted: (destinationId: string) => boolean;
  fetchWishlist: () => Promise<void>;
  fetchHistory: () => Promise<HistoryItem[]>;
  saveHistory: (data: any) => Promise<{ ok: boolean; historyItem?: HistoryItem; error?: string }>;
};

const TOKEN_KEY = "jatayuv_access_token";
const REFRESH_TOKEN_KEY = "jatayuv_refresh_token";
const USER_KEY = "jatayuv.user";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

const AuthContext = createContext<AuthState | null>(null);

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function setStoredSession(token: string | null, refreshToken?: string | null, user?: User | null) {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  }
}

function readCachedUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function formatProfileToUser(authData: any, profileData: any): User {
  const profile = profileData || {};
  return {
    id: profile.id || authData?.id,
    name: profile.full_name || authData?.user_metadata?.full_name || authData?.email?.split("@")[0] || "User",
    email: profile.email || authData?.email || "",
    phone: profile.phone || authData?.phone || "",
    avatar_url: profile.avatar_url || authData?.user_metadata?.avatar_url || "",
    country: profile.country || "",
    travelStyle: profile.travelStyle || "",
    joinedAt: profile.created_at || authData?.created_at || new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readCachedUser());
  const [ready, setReady] = useState(false);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  const wishlist = useMemo(() => savedTrips.map((s) => String(s.destination_id)), [savedTrips]);

  const loadUserData = useCallback(async (token: string) => {
    try {
      // Fetch Wishlist
      const resW = await fetch(`${API_BASE}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resW.ok) {
        const dataW = await resW.json();
        if (dataW.success && Array.isArray(dataW.wishlist)) {
          console.log("Loaded wishlist from backend:", dataW.wishlist.length, "items");
          setSavedTrips(dataW.wishlist);
        }
      }

      // Fetch History
      const resH = await fetch(`${API_BASE}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resH.ok) {
        const dataH = await resH.json();
        if (dataH.success && Array.isArray(dataH.history)) {
          console.log("Loaded trip history from backend:", dataH.history.length, "items");
          setHistoryItems(dataH.history);
        }
      }
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  }, []);

  // Initialize and verify existing session with backend on load
  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setReady(true);
      return;
    }

    fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          const mappedUser = formatProfileToUser(data.user, data.profile);
          setUser(mappedUser);
          setStoredSession(token, null, mappedUser);
          loadUserData(token);
        } else {
          setStoredSession(null);
          setUser(null);
        }
      })
      .catch(() => {
        setUser(readCachedUser());
      })
      .finally(() => {
        setReady(true);
      });
  }, [loadUserData]);

  const fetchWishlist = useCallback(async () => {
    const token = getStoredToken();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.wishlist)) {
          setSavedTrips(data.wishlist);
        }
      }
    } catch (err) {
      console.error("fetchWishlist error:", err);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    const token = getStoredToken();
    if (!token) return [];
    try {
      const res = await fetch(`${API_BASE}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.history)) {
          setHistoryItems(data.history);
          return data.history;
        }
      }
    } catch (err) {
      console.error("fetchHistory error:", err);
    }
    return [];
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      ready,
      wishlist,
      savedTrips,
      historyItems,
      isWishlisted: (destinationId: string) => wishlist.includes(String(destinationId)),
      fetchWishlist,
      fetchHistory,
      signUp: async ({ name, email, password }) => {
        if (!name.trim()) return { ok: false, error: "Please enter your name." };
        if (!email.trim()) return { ok: false, error: "Please enter your email." };
        if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

        try {
          const res = await fetch(`${API_BASE}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name: name, email, password }),
          });

          const data = await res.json();
          if (!res.ok || !data.success) {
            return { ok: false, error: data.error || "Could not create account." };
          }

          const accessToken = data.session?.access_token;
          const refreshToken = data.session?.refresh_token;
          const mappedUser = formatProfileToUser(data.user, data.profile);

          if (accessToken) {
            setStoredSession(accessToken, refreshToken, mappedUser);
            loadUserData(accessToken);
          }
          setUser(mappedUser);

          return { ok: true };
        } catch (err: any) {
          console.error("Signup request failed:", err);
          return { ok: false, error: "Unable to connect to backend server." };
        }
      },
      signIn: async ({ email, password }) => {
        if (!email.trim()) return { ok: false, error: "Please enter your email." };
        if (!password) return { ok: false, error: "Please enter your password." };

        try {
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();
          if (!res.ok || !data.success) {
            return { ok: false, error: data.error || "Incorrect email or password." };
          }

          const accessToken = data.session?.access_token;
          const refreshToken = data.session?.refresh_token;
          const mappedUser = formatProfileToUser(data.user, data.profile);

          if (accessToken) {
            setStoredSession(accessToken, refreshToken, mappedUser);
            loadUserData(accessToken);
          }
          setUser(mappedUser);

          return { ok: true };
        } catch (err: any) {
          console.error("Login request failed:", err);
          return { ok: false, error: "Unable to connect to backend server." };
        }
      },
      signOut: async () => {
        const token = getStoredToken();
        if (token) {
          try {
            await fetch(`${API_BASE}/auth/logout`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
            });
          } catch {
            /* ignore logout API network errors */
          }
        }
        setStoredSession(null);
        setUser(null);
        setSavedTrips([]);
        setHistoryItems([]);
      },
      updateProfile: async (patch) => {
        const token = getStoredToken();
        if (!token) return { ok: false, error: "You are not signed in." };

        try {
          const res = await fetch(`${API_BASE}/profile`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              full_name: patch.name,
              phone: patch.phone,
              avatar_url: patch.avatar_url,
              country: patch.country,
              travelStyle: patch.travelStyle,
              email: patch.email,
            }),
          });

          const data = await res.json();
          if (!res.ok || !data.success) {
            return { ok: false, error: data.error || "Failed to update profile." };
          }

          const updatedUser: User = {
            ...user!,
            ...patch,
            name: data.profile?.full_name || patch.name || user?.name || "",
            phone: data.profile?.phone ?? patch.phone ?? user?.phone ?? "",
            avatar_url: data.profile?.avatar_url ?? patch.avatar_url ?? user?.avatar_url ?? "",
            email: data.profile?.email || patch.email || user?.email || "",
          };

          setUser(updatedUser);
          setStoredSession(token, null, updatedUser);

          return { ok: true };
        } catch (err: any) {
          console.error("Update profile request failed:", err);
          return { ok: false, error: "Unable to connect to backend server." };
        }
      },
      changePassword: async (current, next) => {
        const token = getStoredToken();
        if (!token) return { ok: false, error: "You are not signed in." };

        try {
          const res = await fetch(`${API_BASE}/profile/password`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              currentPassword: current,
              newPassword: next,
            }),
          });

          const data = await res.json();
          if (!res.ok || !data.success) {
            return { ok: false, error: data.error || "Failed to update password." };
          }

          return { ok: true };
        } catch (err: any) {
          console.error("Change password request failed:", err);
          return { ok: false, error: "Unable to connect to backend server." };
        }
      },
      toggleWishlist: async (destinationId: string, destinationData?: any) => {
        const token = getStoredToken();
        if (!token) return { ok: false, error: "Please log in to save destinations." };

        const idStr = String(destinationId);
        const currentlySaved = wishlist.includes(idStr);

        try {
          if (currentlySaved) {
            const res = await fetch(`${API_BASE}/wishlist/${idStr}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
              return { ok: false, error: data.error || "Could not remove from wishlist." };
            }
            // Update UI state ONLY after successful database response from backend
            setSavedTrips((prev) => prev.filter((s) => String(s.destination_id) !== idStr));
            return { ok: true, isSaved: false };
          } else {
            const res = await fetch(`${API_BASE}/wishlist`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                destination_id: idStr,
                destination_data: destinationData || null,
              }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
              return { ok: false, error: data.error || "Could not save to wishlist." };
            }
            // Update UI state ONLY after successful database response from backend
            const newTrip: SavedTrip = data.savedTrip || {
              destination_id: idStr,
              destination_data: destinationData || null,
              created_at: new Date().toISOString(),
            };
            setSavedTrips((prev) => [newTrip, ...prev]);
            return { ok: true, isSaved: true };
          }
        } catch (err: any) {
          console.error("toggleWishlist network/server error:", err);
          return { ok: false, error: "Unable to connect to backend server." };
        }
      },
      saveHistory: async (historyPayload: any) => {
        const token = getStoredToken();
        if (!token) return { ok: false, error: "Please log in to save trip history." };

        try {
          const res = await fetch(`${API_BASE}/history`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(historyPayload),
          });

          const data = await res.json();
          if (!res.ok || !data.success) {
            console.error("saveHistory error response:", data);
            return { ok: false, error: data.error || "Could not save trip history." };
          }

          if (data.historyItem) {
            setHistoryItems((prev) => [data.historyItem, ...prev]);
          }

          return { ok: true, historyItem: data.historyItem };
        } catch (err: any) {
          console.error("saveHistory network/server error:", err);
          return { ok: false, error: "Unable to connect to backend server." };
        }
      },
    }),
    [user, ready, wishlist, savedTrips, historyItems, loadUserData, fetchWishlist, fetchHistory]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export function initials(name: string) {
  if (!name) return "U";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
