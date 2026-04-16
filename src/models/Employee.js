const db = require("../config/db");

class Employee {
  static async create(data) {
    const { name, email, password, role, department } = data;
    const result = await db.query(
      `INSERT INTO users (name, email, password, role, department)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, email, password, role, department],
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  }
}

module.exports = Employee;
