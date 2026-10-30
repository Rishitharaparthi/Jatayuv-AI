import { Router } from "express";
import { getProfile, updateProfile, updatePassword } from "../controllers/profileController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// Protected profile management routes
router.get("/", requireAuth, getProfile);
router.put("/", requireAuth, updateProfile);
router.put("/password", requireAuth, updatePassword);

export default router;
