const express = require("express");
const app = express();

app.use(express.json());

const timeRoutes = require("./routes/timeRoutes");

app.use("/api/time", timeRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
