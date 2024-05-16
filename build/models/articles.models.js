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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.insertArticle = exports.updateArticle = exports.createComment = exports.checkArticleExists = exports.fetchCommentsByArticleId = exports.fetchArticles = exports.fetchArticleById = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const fetchArticleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_1.default.query(`SELECT articles.author, title, articles.body, articles.article_id, users.name, users.avatar_url AS author_avatar_url, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments) :: INTEGER  AS comment_count
      FROM articles
      LEFT JOIN comments ON 
      articles.article_id = comments.article_id
      JOIN users ON
      articles.author = users.username
      WHERE articles.article_id = $1
      GROUP BY articles.article_id, users.username;`, [id]);
    if (!rows.length) {
        return Promise.reject({ status: 404, message: "No data found" });
    }
    return rows[0];
});
exports.fetchArticleById = fetchArticleById;
const fetchArticles = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    const { sort_by = "created_at", order = "desc", topic, limit = 10, p = 1, } = queries;
    const acceptedQueries = ["asc", "desc"];
    const acceptedSortQueries = [
        "author",
        "created_at",
        "title",
        "topic",
        "votes",
        "comment_count",
    ];
    if (!acceptedSortQueries.includes(sort_by) ||
        !acceptedQueries.includes(order)) {
        return Promise.reject({ status: 400, message: "Bad query value!" });
    }
    const queryValues = [];
    let sqlStr = `SELECT articles.article_id, articles.author, users.avatar_url AS author_avatar_url, title, articles.body, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments) :: INT AS comment_count
    FROM articles
    LEFT JOIN comments ON 
    articles.article_id = comments.article_id
    JOIN users ON
    articles.author = users.username`;
    if (topic) {
        sqlStr += " WHERE topic = $1";
        queryValues.push(topic);
    }
    sqlStr += ` GROUP BY articles.article_id, users.username
     ORDER BY ${sort_by} ${order}`;
    if (!isNaN(limit) && !isNaN(p)) {
        const offset = +limit * +p - 10;
        sqlStr += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    else {
        return Promise.reject({ status: 400, message: "Bad query value!" });
    }
    const { rows } = yield connection_1.default.query(sqlStr, queryValues);
    return rows;
});
exports.fetchArticles = fetchArticles;
const fetchCommentsByArticleId = (id, queries) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, p = 1 } = queries;
    yield (0, exports.checkArticleExists)(id);
    let sqlStr = `SELECT comment_id, comments.body, comments.article_id, comments.author, users.avatar_url AS author_avatar_url, votes, created_at FROM comments
    JOIN users ON comments.author = users.username
    WHERE article_id = $1
    ORDER BY created_at DESC`;
    if (!isNaN(limit) && !isNaN(p)) {
        const offset = +limit * +p - 10;
        sqlStr += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    else {
        return Promise.reject({ status: 400, message: "Bad query value!" });
    }
    const { rows } = yield connection_1.default.query(sqlStr, [id]);
    return rows;
});
exports.fetchCommentsByArticleId = fetchCommentsByArticleId;
const checkArticleExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_1.default.query(`SELECT * FROM articles
    WHERE article_id = $1`, [id]);
    if (!rows.length) {
        return Promise.reject({ status: 404, message: "No data found" });
    }
});
exports.checkArticleExists = checkArticleExists;
const createComment = (id, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, body } = reqBody;
    if (typeof body !== "string") {
        return Promise.reject({ status: 400, message: "Bad request" });
    }
    const { rows } = yield connection_1.default.query(`INSERT INTO comments
   (author, body, article_id)
   VALUES ($1, $2, $3)
   RETURNING *;`, [username, body, id]);
    return rows[0];
});
exports.createComment = createComment;
const updateArticle = (articleId, inc_vote) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.checkArticleExists)(articleId);
    const { rows } = yield connection_1.default.query(`UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`, [inc_vote, articleId]);
    return rows[0];
});
exports.updateArticle = updateArticle;
const insertArticle = (article) => __awaiter(void 0, void 0, void 0, function* () {
    const defaultArticleUrl = "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700";
    const { title, topic, author, body, article_img_url = defaultArticleUrl, } = article;
    const { rows } = yield connection_1.default.query(`INSERT INTO articles
    (title, topic, author, body, article_img_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`, [title, topic, author, body, article_img_url]);
    const { article_id } = rows[0];
    const newArticle = yield (0, exports.fetchArticleById)(article_id);
    return newArticle;
});
exports.insertArticle = insertArticle;
const deleteArticle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rowCount } = yield connection_1.default.query(`DELETE FROM articles WHERE article_id = $1`, [id]);
    if (!rowCount) {
        return Promise.reject({ status: 404, message: "No data found" });
    }
    return rowCount;
});
exports.deleteArticle = deleteArticle;
