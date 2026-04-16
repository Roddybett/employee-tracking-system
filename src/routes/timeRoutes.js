const express = require("express");
const router = express.Router();
const controller = require("../controllers/timeController");
const auth = require("../middleware/auth");

router.post("/clock-in", auth, controller.clockIn);
router.post("/clock-out", auth, controller.clockOut);

module.exports = router;
