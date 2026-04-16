const cron = require("node-cron");
const Timesheet = require("../models/Timesheet");

cron.schedule("0 0 * * 0", async () => {
  console.log("Running weekly timesheet generation...");
  // loop through users and generate timesheets
});
