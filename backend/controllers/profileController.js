import { supabase, supabaseAdmin, getAuthenticatedClient } from "../config/supabase.js";

/**
 * Fetch profile details for authenticated user from `profiles` table.
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const dbClient = supabaseAdmin || supabase;

    const { data: profile, error } = await dbClient
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Fetch profile error:", error);
    }

    const resultProfile = profile || {
      id: userId,
      full_name: req.user.user_metadata?.full_name || "",
      email: req.user.email || "",
      phone: req.user.phone || null,
      avatar_url: req.user.user_metadata?.avatar_url || null,
      created_at: req.user.created_at,
      updated_at: req.user.updated_at || req.user.created_at,
    };

    return res.status(200).json({
      success: true,
      profile: resultProfile,
    });
  } catch (err) {
    console.error("getProfile error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve user profile.",
    });
  }
};

/**
 * Update user profile details (full_name, phone, avatar_url, email).
 * Synchronizes with both Supabase `profiles` table and Supabase Auth records.
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, name, phone, avatar_url, email } = req.body;

    const userFullName = full_name !== undefined ? full_name : name;
    const dbClient = supabaseAdmin || supabase;

    const updateFields = {
      updated_at: new Date().toISOString(),
    };

    if (userFullName !== undefined) updateFields.full_name = userFullName.trim();
    if (phone !== undefined) updateFields.phone = phone ? phone.trim() : null;
    if (avatar_url !== undefined) updateFields.avatar_url = avatar_url ? avatar_url.trim() : null;
    if (email !== undefined && email.trim() !== "") updateFields.email = email.trim().toLowerCase();

    // 1. Update `profiles` table
    const { data: updatedProfile, error: profileError } = await dbClient
      .from("profiles")
      .upsert({ id: userId, ...updateFields }, { onConflict: "id" })
      .select()
      .single();

    if (profileError) {
      console.error("Update profile DB error:", profileError);
      return res.status(400).json({
        success: false,
        error: profileError.message || "Failed to update profile record in database.",
      });
    }

    // 2. Synchronize with Supabase Auth records if full_name, avatar_url, or email changed
    const authUpdates = {};
    if (userFullName !== undefined) authUpdates.data = { ...(authUpdates.data || {}), full_name: userFullName.trim() };
    if (avatar_url !== undefined) authUpdates.data = { ...(authUpdates.data || {}), avatar_url: avatar_url ? avatar_url.trim() : null };
    if (email !== undefined && email.trim().toLowerCase() !== req.user.email?.toLowerCase()) {
      authUpdates.email = email.trim().toLowerCase();
    }

    if (Object.keys(authUpdates).length > 0) {
      try {
        const userClient = req.token ? getAuthenticatedClient(req.token) : supabase;
        await userClient.auth.updateUser(authUpdates);
      } catch (authErr) {
        console.warn("Auth update sync notice:", authErr.message || authErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      profile: updatedProfile,
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred while updating profile.",
    });
  }
};

/**
 * Update authenticated user password in Supabase Auth.
 */
export const updatePassword = async (req, res) => {
  try {
    const { password, newPassword, currentPassword } = req.body;
    const targetPassword = newPassword || password;

    if (!targetPassword || targetPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "New password must be at least 6 characters long.",
      });
    }

    // Optional: If current password is sent, verify credentials first via signInWithPassword
    if (currentPassword && req.user.email) {
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: req.user.email,
        password: currentPassword,
      });

      if (verifyError) {
        return res.status(400).json({
          success: false,
          error: "Current password is incorrect.",
        });
      }
    }

    // Update password in Supabase Auth
    let updateError = null;

    if (req.token) {
      const userClient = getAuthenticatedClient(req.token);
      const { error } = await userClient.auth.updateUser({ password: targetPassword });
      updateError = error;
    } else if (supabaseAdmin) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(req.user.id, { password: targetPassword });
      updateError = error;
    } else {
      const { error } = await supabase.auth.updateUser({ password: targetPassword });
      updateError = error;
    }

    if (updateError) {
      return res.status(400).json({
        success: false,
        error: updateError.message || "Failed to update password.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (err) {
    console.error("updatePassword error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred while updating password.",
    });
  }
};
