const TimeService = require("../services/TimeService");

exports.clockIn = async (req, res) => {
  try {
    const result = await TimeService.clockIn(req.user.id, req.body.gps);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.clockOut = async (req, res) => {
  try {
    const result = await TimeService.clockOut(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
