import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

// DEBUG: Verify authRoutes imported correctly
console.log("authRoutes imported:", authRoutes);
console.log("authRoutes type:", typeof authRoutes);
console.log("authRoutes.stack:", authRoutes?.stack?.map(r => `${r.route?.methods ? Object.keys(r.route.methods).join(',').toUpperCase() : 'MIDDLEWARE'} ${r.route?.path || r.regexp}`));

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend integration
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// DEBUG: Log every incoming request
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
  next();
});

// DEBUG: Middleware to confirm /api/auth is reached
app.use("/api/auth", (req, res, next) => {
  console.log("AUTH REQUEST:", req.method, req.originalUrl);
  next();
});

// Base API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/history", historyRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Jatayuv AI Backend Service",
    timestamp: new Date().toISOString(),
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend working"
  });
});

// 404 Handler for undefined API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "API endpoint not found.",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Backend Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// DEBUG: Print all registered routes
function printRoutes(stack, prefix = '') {
  stack.forEach((layer) => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(',');
      console.log(`  ${methods} ${prefix}${layer.route.path}`);
    } else if (layer.name === 'router' && layer.handle?.stack) {
      const routerPath = layer.regexp?.source === '^\\/?$' ? '' :
        layer.keys?.length ? prefix : 
        (layer.regexp?.toString().match(/\^\\\/(\w[\w/]*)/)?.[1] || '').replace(/\\\//, '/');
      const mountPath = prefix + (routerPath ? '/' + routerPath : '');
      printRoutes(layer.handle.stack, mountPath);
    }
  });
}

console.log('\n=== REGISTERED ROUTES ===');
if (app._router) {
  printRoutes(app._router.stack);
} else {
  console.log('  (no router initialized yet)');
}
console.log('=========================\n');

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Jatayuv AI Backend Server running on http://localhost:${PORT}`);
  
  // Also print routes after listen
  console.log('\n=== ROUTES (after listen) ===');
  printRoutes(app._router.stack);
  console.log('=============================\n');
});

export default app;
