const Onboarding = require("../Models/onboardingmodels");
const jwt = require("jsonwebtoken");

// Predefined list of valid sports
const validSports = ["Athletics", "Basketball", "Swimming", "Cycling", "Football", "Weightlifting"];

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Controller to save or update onboarding data
const saveOnboarding = async (req, res) => {
  try {
    const { age, sports } = req.body;

    // Basic validation
    if (!age || !sports || !Array.isArray(sports) || sports.length === 0) {
      return res.status(400).json({ message: "Age and at least one sport are required" });
    }

    if (parseInt(age) <= 0) {
      return res.status(400).json({ message: "Age must be a positive number" });
    }

    // Validate selected sports
    const invalidSports = sports.filter(s => !validSports.includes(s));
    if (invalidSports.length > 0) {
      return res.status(400).json({ message: `Invalid sport(s) selected: ${invalidSports.join(", ")}` });
    }

    // Check if onboarding already exists for this user
    let onboarding = await Onboarding.findOne({ user: req.userId });

    if (onboarding) {
      // Update existing onboarding
      onboarding.age = age;
      onboarding.sports = sports;
      await onboarding.save();
    } else {
      // Create new onboarding document
      onboarding = await Onboarding.create({
        user: req.userId,
        age,
        sports,
      });
    }

    res.status(200).json({ message: "Onboarding saved successfully", onboarding });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { authenticate, saveOnboarding };
