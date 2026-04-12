const mongoose = require("mongoose");

module.exports = mongoose.model("Record", {
  projectId: mongoose.Schema.Types.ObjectId,
  collectionName: String,
  data: Object
});