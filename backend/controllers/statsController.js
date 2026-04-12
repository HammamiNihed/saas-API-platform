const Project = require("../models/Project");
const Collection = require("../models/Collection");
const mongoose = require("mongoose");

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Récupère tous les projets de l'utilisateur
    const projects = await Project.find({ userId: req.user.id });
    const projectIds = projects.map(p => p._id);

    // Total collections liées à ses projets
    const totalCollections = await Collection.countDocuments({
      projectId: { $in: projectIds }
    });

    // Collections créées ce mois-ci
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const collectionsThisMonth = await Collection.countDocuments({
      projectId: { $in: projectIds },
      _id: {
        $gte: mongoose.Types.ObjectId.createFromTime(
          Math.floor(startOfMonth.getTime() / 1000)
        )
      }
    });

    res.json({
      totalProjects: projects.length,
      totalCollections,
      collectionsThisMonth,
      // Statique pour l'instant — à remplacer si tu as un modèle ApiRequest
      totalRequests: 0,
      requestsChangePercent: 0
    });

  } catch (err) {
    res.status(500).json({ message: "Erreur stats", error: err.message });
  }
};