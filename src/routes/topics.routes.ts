import express from "express";
const router = express.Router();

import { getTopics, postTopic } from "../controllers/topics.controllers";

router.get("/topics", getTopics);

router.post("/topics", postTopic);

export default router;
