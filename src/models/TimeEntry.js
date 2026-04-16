const db = require("../config/db");

class TimeEntry {
  static async clockIn(user_id, gps_location) {
    const result = await db.query(
      `INSERT INTO time_entries (user_id, clock_in, gps_location)
       VALUES ($1, NOW(), $2) RETURNING *`,
      [user_id, gps_location],
    );
    return result.rows[0];
  }

  static async clockOut(user_id) {
    const result = await db.query(
      `UPDATE time_entries
       SET clock_out = NOW()
       WHERE user_id = $1 AND clock_out IS NULL
       RETURNING *`,
      [user_id],
    );
    return result.rows[0];
  }

  static async getActiveEntry(user_id) {
    const result = await db.query(
      `SELECT * FROM time_entries
       WHERE user_id = $1 AND clock_out IS NULL`,
      [user_id],
    );
    return result.rows[0];
  }
}

module.exports = TimeEntry;
