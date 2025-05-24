const express = require("express");
const router = express.Router();
const speakerController = require("../../controllers/speakerController");

const { protect } = require("../../middleware/authMiddleware");

//API route is the endpoint that the client app access the server's resources.
//    CRUD op erations for speakers
console.log("Speaker routes loaded");
router.post("/", protect, speakerController.createSpeaker); //create speaker

router.get("/search", protect, speakerController.searchSpeakers);

router.get("/", protect, speakerController.getAllSpeakers); // get all speakers

router.delete("/:id", protect, speakerController.deleteSpeaker); // delete speaker

module.exports = router;
