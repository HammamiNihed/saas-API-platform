const mongoose = require("mongoose");

module.exports = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  plan: { type: String, default: "free" }
});