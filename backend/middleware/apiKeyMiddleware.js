const Project = require("../models/Project");

module.exports = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) return res.status(403).json({ error: "API key required" });

  const project = await Project.findOne({ apiKey });

  if (!project) return res.status(403).json({ error: "Invalid API key" });

  req.project = project;
  next();
};