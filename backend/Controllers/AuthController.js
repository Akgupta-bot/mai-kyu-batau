const User = require("../Models/usermodels");
const { createSecretToken } = require("../util/SecretToken");

// ===================== SIGNUP =====================
module.exports.Signup = async (req, res) => {
  try {
    let { email, username, password } = req.body;

    // Normalize inputs
    email = email.toLowerCase().trim();
    username = username.trim();

    // Check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already in use" });

    // Check if username exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });

    // Create user
    const user = await User.create({ email, username, password });

    // Generate token
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict", // change to "none" + secure:true if frontend on different domain
      secure: false,      // set true if using HTTPS
    });

    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ===================== LOGIN =====================
module.exports.Login = async (req, res) => {
  try {
    let { emailOrUsername, password } = req.body;
    emailOrUsername = emailOrUsername.trim();

    // Find user by email (case-insensitive) OR username
    const user = await User.findOne({
      $or: [
        { email: new RegExp(`^${emailOrUsername}$`, "i") },
        { username: emailOrUsername }
      ],
    });

    if (!user) return res.status(400).json({ message: "User does not exist" });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user,
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
