const db = require("../config/db");

class PTORequest {
  static async request(data) {
    const { user_id, start_date, end_date, type } = data;

    const result = await db.query(
      `INSERT INTO pto_requests (user_id, start_date, end_date, type, status)
       VALUES ($1,$2,$3,$4,'pending') RETURNING *`,
      [user_id, start_date, end_date, type],
    );

    return result.rows[0];
  }

  static async approve(id) {
    const result = await db.query(
      `UPDATE pto_requests SET status = 'approved'
       WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0];
  }
}

module.exports = PTORequest;
