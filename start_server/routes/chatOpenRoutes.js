const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// router.post("/", chatController.getResponseChat);
router.post("/gemini", chatController.getResponseChatGemini);

module.exports = router;
