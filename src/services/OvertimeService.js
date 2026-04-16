const db = require("../config/db");

class OvertimeService {
  // Calculate daily overtime
  static calculateDaily(hours) {
    return hours > 8 ? hours - 8 : 0;
  }

  // Calculate weekly overtime
  static async calculateWeekly(user_id, start_date, end_date) {
    const result = await db.query(
      `SELECT SUM(EXTRACT(EPOCH FROM (clock_out - clock_in))/3600) as total
       FROM time_entries
       WHERE user_id = $1
       AND clock_out IS NOT NULL
       AND clock_in BETWEEN $2 AND $3`,
      [user_id, start_date, end_date],
    );

    const total = parseFloat(result.rows[0].total) || 0;
    return total > 40 ? total - 40 : 0;
  }

  // Full overtime calculation
  static async calculate(user_id, start_date, end_date) {
    const weeklyOT = await this.calculateWeekly(user_id, start_date, end_date);

    return {
      weekly_overtime: weeklyOT,
    };
  }
}

module.exports = OvertimeService;
