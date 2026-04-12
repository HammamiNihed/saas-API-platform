const mongoose = require("mongoose");

const fieldSchema =  mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
}, { _id: false }); // _id: false avoids auto-generating IDs for sub-docs

const collectionSchema =  mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  name:      { type: String, required: true },
  schema:    { type: [fieldSchema], required: true }  // ✅ array of objects
});

module.exports = mongoose.model("Collection", collectionSchema);