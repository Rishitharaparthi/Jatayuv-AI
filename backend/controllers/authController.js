import { supabase, supabaseAdmin } from "../config/supabase.js";

/**
 * Register a new user with Supabase Auth and insert profile into `profiles` table.
 * Exact schema for `profiles`: id, full_name, email, phone, avatar_url, created_at, updated_at
 */
export const signup = async (req, res) => {
  try {
    const { name, full_name, email, password, phone, avatar_url } = req.body;

    const userFullName = (full_name || name || "").trim();
    const userEmail = (email || "").trim().toLowerCase();
    const userPassword = password || "";
    const userPhone = phone ? phone.trim() : null;
    const userAvatar = avatar_url ? avatar_url.trim() : null;

    if (!userFullName) {
      return res.status(400).json({ success: false, error: "Full name is required." });
    }
    if (!userEmail) {
      return res.status(400).json({ success: false, error: "Email is required." });
    }
    if (!userPassword || userPassword.length < 6) {
      return res.status(400).json({ success: false, error: "Password must be at least 6 characters long." });
    }

    // 1. Create auth user in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: {
        data: {
          full_name: userFullName,
        },
      },
    });

    if (authError) {
      return res.status(400).json({ success: false, error: authError.message });
    }

    if (!authData?.user) {
      return res.status(500).json({ success: false, error: "Failed to create authentication user." });
    }

    const userId = authData.user.id;
    const now = new Date().toISOString();

    // 2. Insert corresponding user details into `profiles` table
    const profilePayload = {
      id: userId, // UUID references auth.users.id
      full_name: userFullName,
      email: userEmail,
      phone: userPhone,
      avatar_url: userAvatar,
      created_at: now,
      updated_at: now,
    };

    // Use admin client if available to ensure RLS bypass during registration insert if needed
    const dbClient = supabaseAdmin || supabase;
    const { data: profileData, error: profileError } = await dbClient
      .from("profiles")
      .upsert([profilePayload], { onConflict: "id" })
      .select()
      .single();

    if (profileError) {
      console.error("Error creating profile record in `profiles` table:", profileError);
      // Even if upsert fails, return the user info with profilePayload fallback
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      session: authData.session,
      user: authData.user,
      profile: profileData || profilePayload,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred during sign up.",
    });
  }
};

/**
 * Authenticate user via Supabase Auth and fetch profile.
 */
export const login = async (req, res) => {
  console.log("LOGIN CONTROLLER EXECUTED");
  try {
    const { email, password } = req.body;

    const userEmail = (email || "").trim().toLowerCase();
    const userPassword = password || "";

    if (!userEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required.",
      });
    }

    // DEBUG: Log login request
    console.log("LOGIN REQUEST", {
      email: userEmail
    });

    // Authenticate through Supabase Auth only
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    // DEBUG: Log Supabase response
    console.log("SUPABASE LOGIN RESULT");
    console.log("authData =", JSON.stringify(authData, null, 2));
    console.log("authError =", authError ? JSON.stringify(authError, null, 2) : null);

    if (authError) {
      console.log("LOGIN FAILED - full authError:", authError);
      return res.status(401).json({
        success: false,
        error: authError.message || "Invalid credentials.",
      });
    }

    if (!authData?.user) {
      return res.status(401).json({
        success: false,
        error: "Authentication failed.",
      });
    }

    const userId = authData.user.id;

    // Fetch matching profile from `profiles` table
    const dbClient = supabaseAdmin || supabase;
    const { data: profileData, error: profileError } = await dbClient
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    let profile = profileData;
    if (profileError || !profile) {
      // If profile does not exist yet for some reason, create baseline profile
      const now = new Date().toISOString();
      const fallbackProfile = {
        id: userId,
        full_name: authData.user.user_metadata?.full_name || userEmail.split("@")[0],
        email: userEmail,
        phone: null,
        avatar_url: null,
        created_at: now,
        updated_at: now,
      };
      const { data: newProfile } = await dbClient.from("profiles").upsert([fallbackProfile]).select().single();
      profile = newProfile || fallbackProfile;
    }

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      session: authData.session,
      user: authData.user,
      profile,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred during login.",
    });
  }
};

/**
 * Get current authenticated user details and profile.
 */
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const dbClient = supabaseAdmin || supabase;

    const { data: profileData, error: profileError } = await dbClient
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    const profile = profileData || {
      id: userId,
      full_name: req.user.user_metadata?.full_name || req.user.email?.split("@")[0] || "",
      email: req.user.email || "",
      phone: req.user.phone || null,
      avatar_url: req.user.user_metadata?.avatar_url || null,
      created_at: req.user.created_at,
      updated_at: req.user.updated_at || req.user.created_at,
    };

    return res.status(200).json({
      success: true,
      user: req.user,
      profile,
    });
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred fetching user details.",
    });
  }
};

/**
 * Logout authenticated user session.
 */
export const logout = async (req, res) => {
  try {
    if (req.token) {
      await supabase.auth.signOut(req.token);
    }
    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred during logout.",
    });
  }
};
