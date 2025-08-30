const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
    unique:true,
    trim:true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
    minlength:[6,"password must be at least 6 characters long"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
//hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password is new/changed
  this.password = await bcrypt.hash(this.password, 12);
  next()});
    // Compare passwords (for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
};

module.exports = mongoose.model("User", userSchema);