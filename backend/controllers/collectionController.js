const Collection = require("../models/Collection");


exports.createCollection = async (req, res) => {
  const { projectId, name, schema } = req.body;

  if (!Array.isArray(schema)) {
    return res.status(400).json({ error: "Schema must be an array" });
  }

  const collection = await Collection.create({ projectId, name, schema });
  res.status(201).json(collection);
};

exports.getCollections = async (req, res) => {
  const collections = await Collection.find({
    projectId: req.params.projectId
  });
  res.json(collections);
};