const User = require("../Models/usermodels");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// ===================== SIGNUP =====================
module.exports.Signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Schema auto-hashes password, no need to hash here
    const user = await User.create({
      email,
      username,
      password, 
      createdAt: new Date(),
    });

    const token = createSecretToken(user._id);

    res.cookie("token", token, { httpOnly: true });
    console.log("Signup successful for:", user.username);

    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error during signup" });
  }
};

// ===================== LOGIN =====================
module.exports.Login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    console.log("Login attempt:", { identifier, password });

    if (!identifier || !password) {
      return res.status(400).json({ message: "Username/Email and password are required" });
    }

    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    console.log("Found user:", user);

    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // DEBUG: log raw password, hashed password, and comparison result
    console.log("Raw password:", password);
    console.log("Hashed password from DB:", user.password);
    console.log("Password valid?", isPasswordValid);

    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    const token = createSecretToken(user._id);
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};
