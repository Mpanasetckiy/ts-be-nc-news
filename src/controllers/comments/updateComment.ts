import { NextFunction, Request, Response } from "express";

import * as commentsModel from "../../models/comments";

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment_id: number = Number(req.params.comment_id);
    const incVotes: number = req.body.inc_votes;
    const updatedComment = await commentsModel.updateComment(
      comment_id,
      incVotes
    );
    res.status(200).send({ updatedComment });
  } catch (error) {
    next(error);
  }
};
