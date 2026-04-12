const Project = require("../models/Project");
const crypto = require("crypto");

// Créer un projet
exports.createProject = async (req, res) => {
  try {
    const apiKey = crypto.randomBytes(24).toString("hex");

    const project = await Project.create({
      userId: req.user.id,
      name: req.body.name,
      apiKey
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du projet", error: err.message });
  }
};

// Récupérer tous les projets
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des projets", error: err.message });
  }
};

// Modifier un projet
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });

    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé ou accès non autorisé" });
    }

    // Mettre à jour uniquement les champs autorisés
    if (req.body.name) project.name = req.body.name;
    if (req.body.description) project.description = req.body.description;

    // Régénérer l'API key si demandé
    if (req.body.regenerateApiKey) {
      project.apiKey = crypto.randomBytes(24).toString("hex");
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification du projet", error: err.message });
  }
};

// Supprimer un projet
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé ou accès non autorisé" });
    }

    res.json({ message: "Projet supprimé avec succès", projectId: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du projet", error: err.message });
  }
};
exports.toggleProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });

    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    project.isActive = !project.isActive; // ← inverse le statut
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Erreur toggle", error: err.message });
  }
};  
