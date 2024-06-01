import express from "express";
const router = express.Router();

import * as articlesController from "../controllers/articles";

router.get("/articles", articlesController.getArticles);
router.get("/articles/:article_id", articlesController.getArticleById);
router.patch("/articles/:article_id", articlesController.updateArticle);
router.post("/articles/", articlesController.createArticle);
router.delete("/articles/:article_id", articlesController.deleteArticle);

export default router;
