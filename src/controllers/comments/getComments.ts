import { NextFunction, Request, Response } from "express";

import { ArticleQuery } from "./../types";

import * as commentsModel from "../../models/comments";

export const getCommentsByArticleId = async (
  req: Request<{ article_id: string }, {}, {}, ArticleQuery>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { article_id } = req.params;
    const queries = req.query;
    const comments = await commentsModel.getCommentsByArticleId(
      article_id,
      queries
    );
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};
