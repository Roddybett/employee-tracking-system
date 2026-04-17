const express = require("express");
const app = express();

app.use(express.json());

// SIMPLE TEST ROUTE FIRST
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Backend working ✅",
  });
});

module.exports = app;
