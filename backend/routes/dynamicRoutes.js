const router = require("express").Router();
const apiKey = require("../middleware/apiKeyMiddleware");
const checkProjectActive = require("../middleware/checkProjectActive");
const { handle } = require("../controllers/dynamicController");

router.get('/:projectId/:collection',    apiKey, checkProjectActive, handle);
router.post('/:projectId/:collection',   apiKey, checkProjectActive, handle);
router.put('/:projectId/:collection/:id', apiKey, checkProjectActive, handle);

module.exports = router;