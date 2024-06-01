import { NextFunction, Request, Response } from "express";

import * as commentsModel from "../../../models/comments";
import { ValidationError } from "../../../middleware/error-handling";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    const body = req.body;
    const newComment = await commentsModel.createComment(articleId, body);
    res.status(201).send({ newComment });
  } catch (error) {
    next(error);
  }
};
