const db = require("../config/db");
const OvertimeService = require("./OvertimeService");

class PayrollService {
  static async generate(user_id, start_date, end_date) {
    // 1. Get total hours
    const result = await db.query(
      `SELECT SUM(EXTRACT(EPOCH FROM (clock_out - clock_in))/3600) as total
       FROM time_entries
       WHERE user_id = $1
       AND clock_out IS NOT NULL
       AND clock_in BETWEEN $2 AND $3`,
      [user_id, start_date, end_date],
    );

    const total_hours = parseFloat(result.rows[0].total) || 0;

    // 2. Calculate overtime
    const overtime = await OvertimeService.calculate(
      user_id,
      start_date,
      end_date,
    );

    const overtime_hours = overtime.weekly_overtime;
    const regular_hours = total_hours - overtime_hours;

    // 3. Save payroll report
    const payroll = await db.query(
      `INSERT INTO payroll_reports
       (user_id, period_start, period_end, total_hours, overtime_hours, approved)
       VALUES ($1,$2,$3,$4,$5,false)
       RETURNING *`,
      [user_id, start_date, end_date, total_hours, overtime_hours],
    );

    return {
      payroll: payroll.rows[0],
      breakdown: {
        total_hours,
        regular_hours,
        overtime_hours,
      },
    };
  }
}

module.exports = PayrollService;
