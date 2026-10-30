import { Router } from "express";
import { getHistory, addHistory } from "../controllers/historyController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// Protected trip history routes
router.get("/", requireAuth, getHistory);
router.post("/", requireAuth, addHistory);

export default router;
