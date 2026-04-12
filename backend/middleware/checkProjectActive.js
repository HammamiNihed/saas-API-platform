const Project = require("../models/Project");

module.exports = (req, res, next) => {
  if (!req.project.isActive) {
    return res.status(403).json({ message: "Ce projet est désactivé" });
  }
  next();
};