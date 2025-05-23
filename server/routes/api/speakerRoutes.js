const express = require("express");
const router = express.Router();
const speakerController = require("../../controllers/speakerController");

const { protect } = require("../../middleware/authMiddleware");

//API route is the endpoint that the client app access the server's resources.
//    CRUD op erations for speakers
router.post("/", speakerController.createSpeaker); //create speaker

router.get("/search", speakerController.searchSpeakers);

router.get("/", speakerController.getAllSpeakers); // get all speakers

router.delete("/:id", speakerController.deleteSpeaker); // delete speaker

module.exports = router;
