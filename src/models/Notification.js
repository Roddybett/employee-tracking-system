const db = require("../config/db");

class Notification {
  static async create(user_id, message, type) {
    const result = await db.query(
      `INSERT INTO notifications (user_id, message, type, is_read)
       VALUES ($1,$2,$3,false) RETURNING *`,
      [user_id, message, type],
    );
    return result.rows[0];
  }

  static async getUserNotifications(user_id) {
    const result = await db.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id],
    );
    return result.rows;
  }
}

module.exports = Notification;
