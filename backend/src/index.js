import "dotenv/config";
import express from "express";
import cors from "cors";
import {connectDB} from "./config/db.js";
import orderRoute from "./routes/orderRoute.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import productRoute from "./routes/productRoute.js"
import aiRoutes from "./routes/aiRoutes.js";
const app = express();

// Middleware
app.use(
  cors({
    origin: "*",          // allow all origins (DEV ONLY)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "Accept",
    ]
    // origin: "http://localhost:5173", // Vite default port
    // credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
// app.use('/api/ai', require('./routes/aiRoutes'));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/order", orderRoute);
app.use("/api/product",productRoute);
app.use("/api/ai",aiRoutes);

// Basic Routes
app.get("/", (req, res) => {
  res.send("VyapaarSaarthi API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

app.listen("8080",()=>{
  // Database Connection
  connectDB();
  console.log("listing the the port 8080");
})

export default app;
