import { supabase } from "../config/supabase.js";

/**
 * Express middleware to authenticate requests via Supabase Auth JWT token.
 * Expects "Authorization: Bearer <access_token>" header.
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized: Missing or invalid Authorization header.",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized: Access token is missing.",
      });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({
        success: false,
        error: error?.message || "Unauthorized: Invalid or expired session token.",
      });
    }

    req.user = data.user;
    req.token = token;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error during authentication check.",
    });
  }
};
