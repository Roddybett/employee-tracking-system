const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Employee.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Employee.findByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
