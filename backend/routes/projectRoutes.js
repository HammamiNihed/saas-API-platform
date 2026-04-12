const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  toggleProject
} = require("../controllers/projectController");

router.post("/", auth, createProject);
router.get("/", auth, getProjects);

router.put("/:id", auth, updateProject);      
router.delete("/:id", auth,deleteProject); 
router.patch("/:id/toggle", auth, toggleProject);

module.exports = router;