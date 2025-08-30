const express = require("express");
const router = express.Router();
const { saveOnboarding, authenticate } = require("../Controllers/onboardingcontroller");

router.post("/", authenticate, saveOnboarding);

module.exports = router;
