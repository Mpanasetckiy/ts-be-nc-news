import { NextFunction, Request, Response } from "express";

import * as commentsModel from "../../models/comments";

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment_id: number = Number(req.params.comment_id);
    await commentsModel.deleteComment(comment_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
