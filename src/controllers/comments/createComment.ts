import { NextFunction, Request, Response } from "express";

import * as commentsModel from "../../models/comments";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { article_id } = req.params;
    const body = req.body;
    const newComment = await commentsModel.createComment(article_id, body);
    res.status(201).send({ newComment });
  } catch (error) {
    next(error);
  }
};
