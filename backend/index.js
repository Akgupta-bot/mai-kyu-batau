const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const AuthRoute = require("./Routes/AuthRoute");
const OnboardingRoute = require("./Routes/onboardingroute");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // allow both ports
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", AuthRoute);
app.use("/api/onboarding", OnboardingRoute);

// Start server (AFTER middleware and routes)
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
