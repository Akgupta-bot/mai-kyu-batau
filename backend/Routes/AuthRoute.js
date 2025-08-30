const { Signup, Login } = require("../Controllers/AuthController");
const router = require("express").Router();

// Signup route
router.post("/signup", Signup);

// Login route (supports username OR email + password)
router.post("/login", Login);

module.exports = router;
