import { Router } from "express";
import { getWishlist, addWishlist, removeWishlist } from "../controllers/wishlistController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// Protected wishlist routes
router.get("/", requireAuth, getWishlist);
router.post("/", requireAuth, addWishlist);
router.delete("/:destinationId", requireAuth, removeWishlist);

export default router;
