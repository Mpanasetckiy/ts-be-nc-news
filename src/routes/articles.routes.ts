import express from "express";
const router = express.Router();

import {
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  addComment,
  patchArticle,
  createArticle,
  removeArticle,
} from "../controllers/articles.controllers";

router.get("/articles", getArticles);

router.get("/articles/:article_id", getArticleById);

router.get("/articles/:article_id/comments", getCommentsByArticleId);

router.post("/articles/:article_id/comments", addComment);

router.patch("/articles/:article_id", patchArticle);

router.post("/articles/", createArticle);

router.delete("/articles/:article_id", removeArticle);

export default router;
