import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sanitizes Supabase project URL by removing subpaths like /rest/v1 and trailing slashes.
 */
function sanitizeSupabaseUrl(url) {
  if (!url) return "https://your-supabase-project.supabase.co";
  let cleaned = url.trim();
  cleaned = cleaned.replace(/\/rest\/v1\/?$/i, "");
  cleaned = cleaned.replace(/\/+$/, "");
  return cleaned;
}

const rawUrl = process.env.SUPABASE_URL || "https://your-supabase-project.supabase.co";
const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn("⚠️ Warning: SUPABASE_URL or SUPABASE_ANON_KEY is missing in environment variables. Using placeholder config.");
}

// Standard client for public / anon operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Admin client using service role key (for administrative tasks / profile updates if RLS bypass is needed)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Helper to create a client with a user's JWT access token attached.
 * Useful for user-scoped queries respecting RLS policies.
 */
export const getAuthenticatedClient = (accessToken) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
