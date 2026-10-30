import { supabase, supabaseAdmin } from "../config/supabase.js";

/**
 * Get all saved destinations for the authenticated user from `saved_trips` table.
 */
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const dbClient = supabaseAdmin || supabase;

    const { data: savedTrips, error } = await dbClient
      .from("saved_trips")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch saved_trips error:", error);
      return res.status(400).json({
        success: false,
        error: error.message || "Failed to fetch wishlist.",
      });
    }

    return res.status(200).json({
      success: true,
      wishlist: savedTrips || [],
    });
  } catch (err) {
    console.error("getWishlist error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred while fetching wishlist.",
    });
  }
};

/**
 * Save a destination to `saved_trips` table for the authenticated user.
 */
export const addWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { destination_id, destination_data } = req.body;

    if (!destination_id) {
      return res.status(400).json({
        success: false,
        error: "destination_id is required.",
      });
    }

    const dbClient = supabaseAdmin || supabase;
    const now = new Date().toISOString();
    const d = destination_data || {};

    const payload = {
      user_id: userId,
      destination_id: String(destination_id),
      destination_name: d.name || d.destination_name || String(destination_id),
      country: d.country || null,
      continent: d.continent || null,
      image_url: d.image || d.image_url || null,
      rating: d.rating ? parseFloat(String(d.rating)) : null,
      short_desc: d.shortDesc || d.short_desc || null,
      budget: d.budget || null,
      duration: d.duration || null,
      created_at: now,
      updated_at: now,
    };

    console.log("Saving to wishlist payload for user:", userId, payload);

    let { data: inserted, error } = await dbClient
      .from("saved_trips")
      .upsert(payload, { onConflict: "user_id,destination_id" })
      .select()
      .single();

    if (error) {
      console.warn("Upsert with onConflict notice:", error.message, "- fallback to select & insert/update");

      const { data: existing } = await dbClient
        .from("saved_trips")
        .select("id")
        .eq("user_id", userId)
        .eq("destination_id", String(destination_id))
        .single();

      if (existing) {
        const { data: updated, error: updateError } = await dbClient
          .from("saved_trips")
          .update(payload)
          .eq("id", existing.id)
          .select()
          .single();

        if (updateError) {
          console.error("Update saved_trips error:", updateError);
          return res.status(400).json({ success: false, error: updateError.message });
        }
        inserted = updated;
      } else {
        const { data: newIns, error: insError } = await dbClient
          .from("saved_trips")
          .insert([payload])
          .select()
          .single();

        if (insError) {
          console.error("Insert saved_trips error:", insError);
          return res.status(400).json({ success: false, error: insError.message });
        }
        inserted = newIns;
      }
    }

    return res.status(201).json({
      success: true,
      message: "Destination saved to wishlist.",
      savedTrip: inserted || payload,
    });
  } catch (err) {
    console.error("addWishlist error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred while saving destination.",
    });
  }
};

/**
 * Remove a destination from `saved_trips` table for the authenticated user.
 */
export const removeWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { destinationId } = req.params;

    if (!destinationId) {
      return res.status(400).json({
        success: false,
        error: "destinationId parameter is required.",
      });
    }

    const dbClient = supabaseAdmin || supabase;

    const { error } = await dbClient
      .from("saved_trips")
      .delete()
      .eq("user_id", userId)
      .eq("destination_id", String(destinationId));

    if (error) {
      console.error("Delete saved_trips error:", error);
      return res.status(400).json({
        success: false,
        error: error.message || "Failed to remove destination from wishlist.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Destination removed from wishlist.",
      destination_id: String(destinationId),
    });
  } catch (err) {
    console.error("removeWishlist error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred while removing destination.",
    });
  }
};
