"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeArticle = exports.createArticle = exports.patchArticle = exports.addComment = exports.getCommentsByArticleId = exports.getArticles = exports.getArticleById = void 0;
const articles_models_1 = require("../models/articles.models");
const getArticleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { article_id } = req.params;
        const article = yield (0, articles_models_1.fetchArticleById)(article_id);
        res.status(200).send({ article });
    }
    catch (error) {
        next(error);
    }
});
exports.getArticleById = getArticleById;
const getArticles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allQueries = req.query;
        const articles = yield (0, articles_models_1.fetchArticles)(allQueries);
        res.status(200).send({ articles });
    }
    catch (error) {
        next(error);
    }
});
exports.getArticles = getArticles;
const getCommentsByArticleId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { article_id } = req.params;
        const queries = req.query;
        const comments = yield (0, articles_models_1.fetchCommentsByArticleId)(article_id, queries);
        res.status(200).send({ comments });
    }
    catch (error) {
        next(error);
    }
});
exports.getCommentsByArticleId = getCommentsByArticleId;
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { article_id } = req.params;
        const body = req.body;
        const newComment = yield (0, articles_models_1.createComment)(article_id, body);
        res.status(201).send({ newComment });
    }
    catch (error) {
        next(error);
    }
});
exports.addComment = addComment;
const patchArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { article_id } = req.params;
        const { inc_vote } = req.body;
        const article = yield (0, articles_models_1.updateArticle)(article_id, inc_vote);
        res.status(200).send({ article });
    }
    catch (error) {
        next(error);
    }
});
exports.patchArticle = patchArticle;
const createArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newArticle = yield (0, articles_models_1.insertArticle)(body);
        res.status(201).send({ newArticle });
    }
    catch (error) {
        next(error);
    }
});
exports.createArticle = createArticle;
const removeArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { article_id } = req.params;
        yield (0, articles_models_1.deleteArticle)(article_id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.removeArticle = removeArticle;
