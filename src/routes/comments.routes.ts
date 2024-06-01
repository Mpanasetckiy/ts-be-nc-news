import express from "express";
const router = express.Router();

import {
  getCommentsByArticleId,
  addComment,
  removeComment,
  updateComment,
} from "../controllers/comments.controllers";

router.get("/articles/:article_id/comments", getCommentsByArticleId);

router.post("/articles/:article_id/comments", addComment);

router.delete("/comments/:comment_id", removeComment);

router.patch("/comments/:comment_id", updateComment);

export default router;
