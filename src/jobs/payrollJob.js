const cron = require("node-cron");
const PayrollService = require("../services/PayrollService");

cron.schedule("0 0 1 * *", async () => {
  console.log("Running monthly payroll...");

  // loop through users
  // call PayrollService.generate()
});
