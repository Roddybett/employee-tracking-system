const db = require("../config/db");

class Timesheet {
  static async generate(user_id, start_date, end_date) {
    const result = await db.query(
      `SELECT SUM(EXTRACT(EPOCH FROM (clock_out - clock_in))/3600) as total_hours
       FROM time_entries
       WHERE user_id = $1 AND clock_out IS NOT NULL
       AND clock_in BETWEEN $2 AND $3`,
      [user_id, start_date, end_date],
    );

    const total_hours = result.rows[0].total_hours || 0;

    const insert = await db.query(
      `INSERT INTO timesheets (user_id, start_date, end_date, total_hours, status)
       VALUES ($1,$2,$3,$4,'pending') RETURNING *`,
      [user_id, start_date, end_date, total_hours],
    );

    return insert.rows[0];
  }

  static async approve(id) {
    const result = await db.query(
      `UPDATE timesheets SET status = 'approved'
       WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0];
  }

  static async getApproved(user_id, start_date, end_date) {
    const result = await db.query(
      `SELECT * FROM timesheets
     WHERE user_id = $1
     AND status = 'approved'
     AND start_date >= $2
     AND end_date <= $3`,
      [user_id, start_date, end_date],
    );
    return result.rows;
  }
}

module.exports = Timesheet;
