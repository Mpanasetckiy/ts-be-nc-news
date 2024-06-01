import { NextFunction, Request, Response } from "express";

import {
  fetchCommentsByArticleId,
  createComment,
  deleteComment,
  patchComment,
} from "../models/comments.models";

import { ArticleQuery } from "./types";

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

export const removeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment_id: number = Number(req.params.comment_id);
    await deleteComment(comment_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment_id: number = Number(req.params.comment_id);
    const incVotes: number = req.body.inc_votes;
    const updatedComment = await patchComment(comment_id, incVotes);
    res.status(200).send({ updatedComment });
  } catch (error) {
    next(error);
  }
};
