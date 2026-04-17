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
// ROUTES
// =======================
const timeRoutes = require("../src/routes/timeRoutes");
const payrollRoutes = require("../src/routes/payrollRoutes");
const authRoutes = require("../src/routes/authRoutes");

app.use("/api/time", timeRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/auth", authRoutes);

// =======================
// ROOT TEST ROUTE
// =======================
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "API running on Vercel 🚀",
  });
});

// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
  });
});

// =======================
// EXPORT (VERY IMPORTANT)
// =======================
module.exports = app;
