const cron = require("node-cron");
const db = require("../config/db");
const NotificationService = require("../services/NotificationService");

result.rows.forEach(async (entry) => {
  await NotificationService.missedPunch(entry.user_id);
});

cron.schedule("*/30 * * * *", async () => {
  const result = await db.query(
    `SELECT * FROM time_entries
     WHERE clock_in IS NOT NULL
     AND clock_out IS NULL
     AND NOW() - clock_in > INTERVAL '10 hours'`,
  );

  result.rows.forEach((entry) => {
    console.log(`Alert: User ${entry.user_id} missed clock-out`);
  });
});
