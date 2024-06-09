const express = require("express");
const router = express.Router();
const nearbyyController = require("../controllers/nearbyController");

router.post("/", nearbyyController.uploadFilesNearbyy);
router.delete("/", nearbyyController.deleteFilesNearbyy);
router.get("/get-upload-url", nearbyyController.getUploadUrl);
router.get("/chunks", nearbyyController.getChunksNearbyy);

module.exports = router;
