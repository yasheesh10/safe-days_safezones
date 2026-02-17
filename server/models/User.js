const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  blockchainId: { type: String, unique: true },
  role: String
});

module.exports = mongoose.model("User", UserSchema);
