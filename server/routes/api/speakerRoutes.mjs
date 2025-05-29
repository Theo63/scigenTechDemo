import express from "express";
const router = express.Router();
import {
	createSpeaker,
	searchSpeakers,
	getAllSpeakers,
	deleteSpeaker,
} from "../../controllers/speakerController.mjs";

import { protect } from "../../middleware/authMiddleware.mjs";

//API route is the endpoint that the client app access the server's resources.
//    CRUD op erations for speakers
console.log("Speaker routes loaded");
router.post("/", protect, createSpeaker); //create speaker

router.get("/search", protect, searchSpeakers);

router.get("/", protect, getAllSpeakers); // get all speakers

router.delete("/:id", protect, deleteSpeaker); // delete speaker

export default router;
