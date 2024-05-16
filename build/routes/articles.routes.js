"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const articles_controllers_1 = require("../controllers/articles.controllers");
router.get("/articles", articles_controllers_1.getArticles);
router.get("/articles/:article_id", articles_controllers_1.getArticleById);
router.get("/articles/:article_id/comments", articles_controllers_1.getCommentsByArticleId);
router.post("/articles/:article_id/comments", articles_controllers_1.addComment);
router.patch("/articles/:article_id", articles_controllers_1.patchArticle);
router.post("/articles/", articles_controllers_1.createArticle);
router.delete("/articles/:article_id", articles_controllers_1.removeArticle);
exports.default = router;
