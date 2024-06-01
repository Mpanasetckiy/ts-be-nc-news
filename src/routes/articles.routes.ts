import express from "express";
const router = express.Router();

import {
  getArticleById,
  getArticles,
  patchArticle,
  createArticle,
  removeArticle,
} from "../controllers/articles.controllers";

router.get("/articles", getArticles);

router.get("/articles/:article_id", getArticleById);

router.patch("/articles/:article_id", patchArticle);

router.post("/articles/", createArticle);

router.delete("/articles/:article_id", removeArticle);

export default router;
