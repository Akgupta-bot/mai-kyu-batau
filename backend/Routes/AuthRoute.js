const { Signup, Login } = require("../Controllers/AuthController");
const router = require("express").Router();

// Signup Route
router.post("/signup", Signup);

// Login Route
router.post("/login", Login);

module.exports = router;
