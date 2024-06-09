const express = require("express");
const router = express.Router();
const descriptionController = require("../controllers/descriptionController");

router.get("/", descriptionController.getAllDescriptions);

router.get("/:id", descriptionController.getDescriptionByID);
router.post("/:userId", descriptionController.createDescription);

module.exports = router;
