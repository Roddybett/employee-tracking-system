require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const timeRoutes = require("../src/routes/timeRoutes");
const payrollRoutes = require("../src/routes/payrollRoutes");
const authRoutes = require("../src/routes/authRoutes");

app.use("/api/time", timeRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/auth", authRoutes);

// IMPORTANT: root API test
app.get("/api", (req, res) => {
  res.send("API running on Vercel 🚀");
});

module.exports = app;
