import express from "express";
const router = express.Router();

import * as commentsController from "../controllers/comments";

router.get(
  "/articles/:article_id/comments",
  commentsController.getCommentsByArticleId
);
router.post("/articles/:article_id/comments", commentsController.createComment);
router.delete("/comments/:comment_id", commentsController.deleteComment);
router.patch("/comments/:comment_id", commentsController.updateComment);

export default router;
