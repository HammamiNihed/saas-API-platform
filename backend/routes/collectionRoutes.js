const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createCollection,
  getCollections
} = require("../controllers/collectionController");

router.post("/", auth, createCollection);
router.get("/:projectId", auth, getCollections);

module.exports = router;