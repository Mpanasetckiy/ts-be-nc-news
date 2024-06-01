import { NextFunction, Request, Response } from "express";

import * as commentsModel from "../../../models/comments";

import { ValidationError } from "../../../middleware/error-handling";

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentId: number = Number(req.params.comment_id);
    if (isNaN(commentId)) {
      throw new ValidationError("Invalid comment id provided");
    }
    const incVotes: number = req.body.inc_votes;
    const updatedComment = await commentsModel.updateComment(
      commentId,
      incVotes
    );
    res.status(200).send({ updatedComment });
  } catch (error) {
    next(error);
  }
};
