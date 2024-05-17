import { Request, Response, NextFunction } from "express";

import { ArticleQuery } from "./types";

import {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  createComment,
  updateArticle,
  insertArticle,
  deleteArticle,
} from "../models/articles.models";

export const getArticleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { article_id } = req.params;
    const article = await fetchArticleById(article_id);

    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};

export const getArticles = async (
  req: Request<{}, {}, {}, ArticleQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const allQueries = req.query;
    const articles = await fetchArticles(allQueries);

    res.status(200).send({ articles });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByArticleId = async (
  req: Request<{ article_id: string }, {}, {}, ArticleQuery>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { article_id } = req.params;
    const queries = req.query;
    const comments = await fetchCommentsByArticleId(article_id, queries);
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { article_id } = req.params;
    const body = req.body;
    const newComment = await createComment(article_id, body);
    res.status(201).send({ newComment });
  } catch (error) {
    next(error);
  }
};

export const patchArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { article_id } = req.params;
    const { inc_vote } = req.body;
    const article = await updateArticle(article_id, inc_vote);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newArticle = await insertArticle(body);
    res.status(201).send({ newArticle });
  } catch (error) {
    next(error);
  }
};

export const removeArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { article_id } = req.params;
    await deleteArticle(article_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
