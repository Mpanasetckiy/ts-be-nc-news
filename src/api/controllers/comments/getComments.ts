import { NextFunction, Request, Response } from "express";

import { ArticleQuery } from "../types";

import * as commentsModel from "../../../models/comments";
import { ValidationError } from "../../../middleware/error-handling";

export const getCommentsByArticleId = async (
  req: Request<{ article_id: string }, {}, {}, ArticleQuery>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    const queries = req.query;
    const comments = await commentsModel.getCommentsByArticleId(
      articleId,
      queries
    );
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};
