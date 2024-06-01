import express from "express";
const router = express.Router();

import * as topicsController from "../controllers/topics";

router.get("/topics", topicsController.getTopics);
router.post("/topics", topicsController.createTopic);

export default router;
