const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/feedbackController");

router.get("/", FeedbackController.getAllFeedback);
router.get("/:id", FeedbackController.getFeedbackByID);
router.post("/:userid", FeedbackController.createFeedback);

module.exports = router;
