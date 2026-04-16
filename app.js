// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// ROUTES IMPORT
// =======================
const timeRoutes = require("./src/routes/timeRoutes");
const payrollRoutes = require("./src/routes/payrollRoutes");
// (Add more as you build)
const authRoutes = require("./src/routes/authRoutes");

// =======================
// ROUTES
// =======================
app.use("/api/time", timeRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/auth", authRoutes);

// =======================
// HEALTH CHECK ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("Employee Tracking API is running...");
});

// =======================
// GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong",
  });
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 3000;
