const db = require("../config/db");

class Break {
  static async start(time_entry_id) {
    const result = await db.query(
      `INSERT INTO breaks (time_entry_id, start_time)
       VALUES ($1, NOW()) RETURNING *`,
      [time_entry_id],
    );
    return result.rows[0];
  }

  static async end(time_entry_id) {
    const result = await db.query(
      `UPDATE breaks
       SET end_time = NOW()
       WHERE time_entry_id = $1 AND end_time IS NULL
       RETURNING *`,
      [time_entry_id],
    );
    return result.rows[0];
  }
}

module.exports = Break;
