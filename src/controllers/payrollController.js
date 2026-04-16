const PayrollService = require("../services/PayrollService");

exports.generatePayroll = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;

    const result = await PayrollService.generate(
      req.user.id,
      start_date,
      end_date,
    );

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
