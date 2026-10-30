import { Router } from "express";
import { signup, login, getMe, logout } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// DEBUG: Log when a request enters authRoutes
router.use((req, res, next) => {
  console.log("INSIDE AUTH ROUTER:", req.method, req.originalUrl);
  next();
});

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Authenticated routes
router.get("/me", requireAuth, getMe);
router.post("/logout", requireAuth, logout);

export default router;
