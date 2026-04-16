const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/register", (req, res) => {
  res.send("Register route. working");
});

module.exports = router;
