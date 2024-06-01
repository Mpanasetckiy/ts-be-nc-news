import { NextFunction, Request, Response } from "express";

import * as topicsModel from "../../models/topics";

export const getTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topics = await topicsModel.getTopics();
    res.status(200).send({ topics });
  } catch (error) {
    next(error);
  }
};
