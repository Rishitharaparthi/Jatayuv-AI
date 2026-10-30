import { supabase, supabaseAdmin } from "../config/supabase.js";

function parseNumeric(val) {
  if (val === null || val === undefined) return null;
  if (typeof val === "number") return isNaN(val) ? null : val;
  const cleaned = String(val).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Get all trip itinerary history for the authenticated user from `trip_history` table.
 */
export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const dbClient = supabaseAdmin || supabase;

    const { data: historyItems, error } = await dbClient
      .from("trip_history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch trip_history error:", error);
      return res.status(400).json({
        success: false,
        error: error.message || "Failed to fetch trip history.",
      });
    }

    return res.status(200).json({
      success: true,
      history: historyItems || [],
    });
  } catch (err) {
    console.error("getHistory error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred while fetching trip history.",
    });
  }
};

/**
 * Save a newly generated itinerary to `trip_history` table for the authenticated user.
 */
export const addHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      destination_name,
      destination,
      country,
      continent,
      from_date,
      to_date,
      days,
      total_days,
      travelers,
      budget,
      travel_style,
      style,
      interests,
      estimated_cost,
      weather,
      safety_score,
      itinerary,
    } = req.body;

    if (!itinerary) {
      return res.status(400).json({
        success: false,
        error: "itinerary data is required.",
      });
    }

    const dbClient = supabaseAdmin || supabase;
    const now = new Date().toISOString();

    const itinDays = parseNumeric(total_days || days || itinerary.days) || 1;
    const itinTravelers = parseNumeric(travelers || itinerary.travelers) || 1;
    const destName = destination_name || destination || itinerary.destination || "Custom Trip";

    const payload = {
      user_id: userId,
      destination_name: destName,
      country: country || null,
      continent: continent || null,
      from_date: from_date || null,
      to_date: to_date || null,
      total_days: itinDays,
      travelers: itinTravelers,
      budget: budget || itinerary.budget || "Medium",
      travel_style: travel_style || style || itinerary.style || "Solo",
      interests: interests || itinerary.interests || null,
      estimated_cost: parseNumeric(estimated_cost || itinerary.totalCost),
      weather: weather || itinerary.weather || null,
      safety_score: parseNumeric(safety_score || itinerary.safety),
      itinerary,
      created_at: now,
      updated_at: now,
    };

    console.log("Saving to trip_history payload for user:", userId, payload);

    const { data: inserted, error } = await dbClient
      .from("trip_history")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Insert trip_history error:", error);
      return res.status(400).json({
        success: false,
        error: error.message || "Failed to save trip itinerary to history.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Trip itinerary saved to history.",
      historyItem: inserted || payload,
    });
  } catch (err) {
    console.error("addHistory error:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred while saving trip history.",
    });
  }
};
