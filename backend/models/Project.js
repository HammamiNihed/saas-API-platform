const mongoose = require("mongoose");

module.exports = mongoose.model("Project", {
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  apiKey: String,
  isActive:  { type: Boolean, default: true }, 
  createdAt: { type: Date, default: Date.now }
});