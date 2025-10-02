// backend/src/index.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cors from "cors";

import { dbConnection } from "./config/dbConnection.js";
import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js";
import otpRoute from "./routes/otp.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import logger from "./utils/logger.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ─── MIDDLEWARE ──────────────────────────────────────────────────────────────

// HTTP logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// JSON & CORS
app.use(express.json());
app.use(cors());

// Error logger
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message}`);
  res.status(err.status || 500).json({ error: err.message });
});

// ─── PATHS SETUP ─────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uploads directory
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use("/uploads", express.static(UPLOADS_DIR));

// ─── ROUTES ─────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.send("Welcome to Danny's Kitchen");
});

// API routes
app.use("/api/user", apiLimiter, userRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/otp", otpRoute);

// ─── FRONTEND BUILD / DIST SERVING ──────────────────────────────────────────

const clientBuildPath = path.join(__dirname, "..", "..", "frontend", "build");
const clientDistPath = path.join(__dirname, "..", "..", "frontend", "dist");

console.log("Running in NODE_ENV:", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  // Prefer React build, fallback to Vite dist
  let staticPath = null;
  if (fs.existsSync(clientBuildPath)) {
    staticPath = clientBuildPath;
    console.log("Serving React build from:", staticPath);
  } else if (fs.existsSync(clientDistPath)) {
    staticPath = clientDistPath;
    console.log("Serving Vite dist from:", staticPath);
  }

  if (staticPath) {
    app.use(express.static(staticPath));
    // ✅ Correct wildcard catch-all
    app.get("/*", (req, res) =>
      res.sendFile(path.join(staticPath, "index.html"))
    );
  } else {
    console.warn("No client build/dist files found to serve.");
  }
}

// ─── DATABASE & SERVER START ────────────────────────────────────────────────

dbConnection()
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`An error occurred while connecting to database: ${err}`);
  });
