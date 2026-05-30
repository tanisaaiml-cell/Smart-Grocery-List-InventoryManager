import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import groceryRoutes from "./routes/groceryRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    message: "Too many requests. Please try again later.",
  })
);

app.get("/", (_req, res) => {
  res.json({
    message: "Smart Grocery Inventory API is running",
    health: "/api/health",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Server healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/groceries", groceryRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
