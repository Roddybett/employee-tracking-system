const express = require("express");
const router = express.Router();
const controller = require("../controllers/payrollController");
const auth = require("../middleware/auth");

router.post("/generate", auth, controller.generatePayroll);

module.exports = router;
