const TimeEntry = require("../models/TimeEntry");

class TimeService {
  static async clockIn(user_id, gps) {
    const active = await TimeEntry.getActiveEntry(user_id);

    if (active) {
      throw new Error("Already clocked in");
    }

    return await TimeEntry.clockIn(user_id, gps);
  }

  static async clockOut(user_id) {
    const entry = await TimeEntry.getActiveEntry(user_id);

    if (!entry) {
      throw new Error("No active session");
    }

    return await TimeEntry.clockOut(user_id);
  }
}

module.exports = TimeService;
